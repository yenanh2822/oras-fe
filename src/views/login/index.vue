<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="logo-container">
        <img :src="logo" class="logo">
      </div>
      <div class="title-container">
        <!-- <h1 class="title">ORAS</h1> -->
        <h3 class="title">
          <!-- {{ $t('login.title') }} -->
        </h3>
        <lang-select class="set-language" />
      </div>

      <div class="form-container">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            :maxlength="fmaxLength.emailLength"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              :maxlength="fmaxLength.passwordLength"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" class="oras-btn" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>

        <div style="text-align: right; margin-bottom: 20px">
          <router-link to="/reset-password">
            <p style="font-style: italic; color: rgb(91 104 111)">
              {{ $t('login.forgot') }}
            </p>
          </router-link>
        </div>

        <div style="text-align: right">
          <router-link to="/signup">
            <p style="font-style: italic; color: rgb(91 104 111)">
              {{ $t('login.signup') }}
            </p>
          </router-link>
        </div>
      </div>
    </el-form>

    <el-dialog :title="title" :visible.sync="showDialog" width="33%">
      <p class="message" v-html="message" />
      <span v-if="resend" class="link-type" @click="handleResendConfirmationEmail(loginForm.username)">Click here to resend your confirmation email.</span>
    </el-dialog>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { resendConfirmationEmail } from '@/api/user'
import { maxLength } from '../../store'

export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      logo: 'https://oras-myfile.s3-ap-southeast-1.amazonaws.com/1607931466649-logo_2.png',
      fmaxLength: maxLength,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      title: '',
      message: '',
      resend: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    // if (this.loginForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(err => {
              this.loading = false
              this.title = 'Something went wrong!'
              if (err.response) {
                if (err.response.data.status === 412) {
                  this.resend = true
                }
                this.message = err.response.data.message
              } else {
                this.message = 'Network is unstable. Please check your connection.'
              }
              this.showDialog = true
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleResendConfirmationEmail(email) {
      resendConfirmationEmail(email).then(response => {
        console.log(response)
        this.title = 'Notification'
        this.message = 'The confirmation was sent. Please check your email.'
        this.resend = false
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$dark_gray:#889aa4;
$cursor: #fff;
$black: #000000;

@supports (-webkit-mask: none) and (not (cater-color: $black)) {
  .login-container .el-input input {
    color: black;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      color: $black !important;
      height: 47px;
      // caret-color: $cursor;
      caret-color: $black;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid $dark_gray;
    // background: rgba(0, 0, 0, 0.1);
    background: #ffffff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$black: #000000;

.login-container {
  min-height: 100%;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/custom-theme/image/start_bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // background: rgb(0,197,129);
  // background: linear-gradient(0deg, rgba(0,197,129,1) 0%, rgba(52,70,95,1) 90%);
  overflow: hidden;
  display:flex;
	flex-direction:column;

  .login-form {
    position: relative;
    width: 596px;
    max-width: 100%;
    padding: 68px 0px 160px 0px;
    margin: 0 auto;
    overflow: hidden;
    height: 100%;
    background-color: white;

    .logo-container {
      position: relative;
      text-align: center;
      margin-bottom: 20px;

      .logo {
        width: 231.5;
        height: 200px;
      }
    }

    .form-container {
      width: 82%;
      margin: 0 auto;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    width: 85%;
    margin: 0 auto;
    height: 40px;

    .title {
      font-size: 26px;
      // color: $light_gray;
      color: $black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .set-language {
    color: #000;
    position: absolute;
    top: 3px;
    font-size: 24px;
    right: 0px;
    cursor: pointer;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.oras-btn {
  background-color: #03ac71;
  border-color: #03ac71;
  color: #fff;
  font-weight: 550;
  font-size: 1.2em;
}

.message {
  color: red;
  font-size: 1.25em;
}

.action {
  color: blue;
  font-size: 1em;
}
</style>
