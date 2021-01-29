<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+ postForm.status">
        <el-button :loading="loading" style="width: 105px" @click="handleCancelAction()">
          {{ $t('btn.discard') }}
        </el-button>
        <el-button :loading="loading" style="margin-left: 10px; width: 105px" type="success" @click="submitForm">
          {{ $t('btn.save') }}
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="12">
            <h4 style="margin-left: 130px">COMPANY INFORMATION</h4>
            <div v-if="postForm.role !== 'admin'" class="company-info">
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="compName" label-width="150px" label="Company name:" class="postInfo-container-item">
                    <el-input ref="compName" v-model="postForm.companyById.name" autocomplete="on" tabindex="6" style="width: 300px" :maxlength="fmaxLength.compNameLength" placeholder="Please enter the company name" @change="isModified = true" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item prop="compEmail" label-width="150px" label="Company email:" class="postInfo-container-item">
                    <el-input v-model="postForm.companyById.email" autocomplete="on" tabindex="9" type="text" :maxlength="fmaxLength.emailLength" style="width: 300px" placeholder="Please enter the company email" @change="isModified = true" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item prop="compPhone" label-width="150px" label="Phone number:" class="postInfo-container-item">
                    <el-input v-model="postForm.companyById.phoneNo" autocomplete="on" tabindex="10" type="text" :maxlength="fmaxLength.phoneLength" autosize style="width: 300px" placeholder="Please enter the company phone number" @change="isModified = true" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item prop="location" label-width="150px" label="Location:" class="postInfo-container-item">
                    <el-input v-model="postForm.companyById.location" autocomplete="on" :maxlength="fmaxLength.locationLength" tabindex="8" style="width: 300px" placeholder="Please enter the company's location" @change="isModified = true" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item prop="taxCode" label-width="150px" label="Tax code:" class="postInfo-container-item">
                    <el-input v-model="postForm.companyById.taxCode" autocomplete="on" tabindex="7" style="width: 300px" type="text" :maxlength="fmaxLength.taxCodeLength" placeholder="Please enter the tax code" :disabled="isEdit" @change="isModified = true" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item prop="description" label-width="150px" label="Description:">
                    <el-input v-model="postForm.companyById.description" :rows="1" tabindex="11" :maxlength="fmaxLength.compDesLength" autocomplete="on" type="textarea" class="article-textarea" autosize placeholder="Please enter the description" @change="isModified = true" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <h4 style="margin-left: 130px">ACCOUNT INFORMATION</h4>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="fullname" label-width="130px" label="Full name:" class="postInfo-container-item">
                    <el-input
                      ref="fullname"
                      v-model="postForm.fullname"
                      style="width: 300px"
                      :placeholder="$t('register.fullname')"
                      name="fullname"
                      type="text"
                      :maxlength="fmaxLength.nameLength"
                      tabindex="1"
                      autocomplete="on"
                      :disabled="isEdit"
                      @change="isModified = true"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item prop="phoneNo" label-width="130px" label="Phone number:" class="postInfo-container-item">
                    <el-input
                      ref="phoneNo"
                      v-model="postForm.phoneNo"
                      style="width: 300px"
                      :placeholder="$t('register.phoneNo')"
                      name="phoneNo"
                      type="text"
                      :maxlength="fmaxLength.phoneLength"
                      tabindex="1"
                      autocomplete="on"
                      :disabled="isEdit"
                      @change="isModified = true"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="email" label-width="130px" label="Email:" class="postInfo-container-item">
                    <el-input
                      ref="email"
                      v-model="postForm.email"
                      style="width: 300px"
                      :placeholder="$t('register.email')"
                      name="email"
                      type="text"
                      :maxlength="fmaxLength.emailLength"
                      tabindex="2"
                      autocomplete="on"
                      :disabled="isEdit"
                      @change="isModified = true"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="role" label-width="130px" label="Role:" class="postInfo-container-item">
                    <el-select v-model="postForm.role" tabindex="3" :remote-method="getRoleList" style="width: 300px" filterable default-first-option remote placeholder="Select a role" :disabled="isEdit" @change="isModified = true">
                      <el-option v-for="(item,index) in roleListOptions" :key="item+index" :label="item" :value="item.toLowerCase()" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <el-dialog :visible.sync="showCancelDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="'warning'" /> {{ $t('cf.titleDiscard') }}</span>
      <p class="message" v-html="$t('cf.msgDiscard')" />
      <div slot="footer" class="dialog-footer">
        <router-link :to="'/'">
          <el-button style="margin-right: 10px">
            {{ $t('btn.confirm') }}
          </el-button>
        </router-link>
        <el-button type="primary" @click="showCancelDialog = false">
          {{ $t('btn.close') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'

// @ la ref toi root folder do
import { checkCompanyName, fetchAccountCompany, updateCompanyByAdmin } from '../../../api/account'
import { validDigits, validEmail } from '../../../utils/validate'
import { maxLength } from '../../../store'
const defaultForm = {
  source_uri: '',
  image_uri: '',
  display_time: undefined,
  id: '',
  fullname: '',
  email: '',
  phoneNo: '',
  password: '',
  role: 'User',
  avatar: 'https://paailajob.com/uploads/employer/profileImg/default.jpg',
  companyById: {
    id: '',
    name: '',
    email: '',
    taxCode: '',
    phoneNo: '',
    location: '',
    description: ''
  }
}

export default {
  name: 'JobDetail',
  components: {
    // MDinput,
    Sticky
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validatePhoneNo = (rule, value, callback) => {
      if (!validDigits(this.postForm.companyById.phoneNo)) {
        callback(new Error('The phone number only contains digits.'))
      } else {
        callback()
      }
    }
    const validateCompName = (rule, value, callback) => {
      if (this.postForm.companyById.name.length === 0) {
        callback(new Error('The company name can not be empty.'))
      } else {
        const data = { 'id': this.postForm.companyById.id, 'name': this.postForm.companyById.name }
        checkCompanyName(data).then(() => {
          callback()
        })
          .catch(() => {
            callback(new Error('This company name already exist.'))
          })
      }
    }
    const validateLocation = (rule, value, callback) => {
      if (this.postForm.companyById.location.length === 0) {
        callback(new Error('The location can not be empty.'))
      } else {
        callback()
      }
    }
    const validateCompEmail = (rule, value, callback) => {
      if (!validEmail(this.postForm.companyById.email)) {
        callback(new Error('Please enter a valid email.'))
      } else {
        callback()
      }
    }
    return {
      fmaxLength: maxLength,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      roleListOptions: [],
      rules: {
        phoneNo: [{ required: true, trigger: 'blur', validator: validatePhoneNo }],
        compName: [{ required: true, trigger: 'blur', validator: validateCompName }],
        location: [{ required: true, trigger: 'blur', validator: validateLocation }],
        compEmail: [{ required: true, trigger: 'blur', validator: validateCompEmail }],
        compPhone: [{ required: true, trigger: 'blur', validator: validatePhoneNo }]
      },
      tempRoute: {},
      showCancelDialog: false,
      isModified: false
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    this.$refs.compName.focus()
  },
  methods: {
    fetchData(id) {
      fetchAccountCompany(id).then(response => {
        // auto fill data when edit
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Company'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.companyById.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Company'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          updateCompanyByAdmin(this.postForm.companyById).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Update company successfully',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getRoleList(query) {
      this.roleListOptions = ['Admin', 'User'].map(v => v)
    },
    handleCancelAction() {
      if (this.isModified) {
        this.showCancelDialog = true
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.message {
  margin-left: 10px;
  font-size: 1.15em;
}
</style>
