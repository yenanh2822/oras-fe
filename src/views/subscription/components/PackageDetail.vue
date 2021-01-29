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

          <div class="postInfo-container">
            <el-row>
              <el-col :span="24">
                <el-form-item style="margin-bottom: 40px;" prop="name">
                  <MDinput v-model="postForm.name" :maxlength="fmaxLength.pkgNameLength" name="name" required @change="isModified = true">
                    {{ $t('package.name') }}
                  </MDinput>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="130px" prop="tag" :label="$t('package.tag') + ':'" class="postInfo-container-item">
                  <el-input v-model="postForm.tag" style="width: 300px" :maxlength="fmaxLength.pkgTagLength" @change="isModified = true" />
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label-width="130px" :label="$t('package.numOfPost') + ':'" class="postInfo-container-item">
                  <el-input-number v-model="postForm.numOfPost" placeholder="0" style="width: 300px" :max="fmaxLength.postMax" @change="isModified = true" />
                </el-form-item>
              </el-col>

              <!-- alo YAnh -->
              <!-- duration: 1 month, 3 month, 6 month... -->
              <!--                <el-col :span="12">-->
              <!--                  <el-form-item label-width="130px" :label="Duration:" class="postInfo-container-item">-->
              <!--                    <el-select v-model="postForm.duration" :remote-method="getDurationList" filterable default-first-option remote placeholder="">-->
              <!--                      <el-option v-for="(item,index) in durationListOptions" :key="item+index" :label="item" :value="item" />-->
              <!--                    </el-select>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->

              <!--              <el-row> -->
              <el-col :span="24">
                <el-form-item label-width="130px" :label="$t('package.price') + ':'" class="postInfo-container-item">
                  <el-input-number v-model="postForm.price" :max-length="fmaxLength.priceLength" placeholder="0" style="width: 300px" @change="isModified = true" />
                  <!--                  <money v-model="postForm.price" v-bind="money" :maxlength="fmaxLength.priceLength" placeholder="0" style="width: 300px" />-->
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label-width="130px" prop="currency" :label="$t('package.currency') + ':'" class="postInfo-container-item">
                  <el-select v-model="postForm.currency" :remote-method="getCurrencyList" filterable default-first-option remote placeholder="Select currency..." style="width: 300px" @change="isModified = true">
                    <el-option v-for="(item,index) in currencyListOptions" :key="item+index" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-form-item label-width="130px" :label="$t('package.desc') + ':'">
          <el-input v-model="postForm.description" :rows="1" :maxlength="fmaxLength.pkgDesLength" type="textarea" class="article-textarea" autosize placeholder="Please enter the description" @change="isModified = true" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>
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
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
// import Warning from './Warning'
// import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { getUserId } from '../../../utils/auth'
import { editPackage, fetchPackage } from '../../../api/package'
import { maxLength } from '../../../store'
// import { Money } from 'v-money'

const defaultForm = {
  method: '',
  // content_short: '',
  source_uri: '',
  image_uri: '',
  display_time: undefined,
  id: undefined,
  // platforms: ['a-platform'],
  // comment_disabled: false,
  // importance: 0
  data: {
    name: '',
    tag: '',
    numOfPost: 0,
    duration: '',
    price: 0,
    currency: '',
    description: '',
    createDate: new Date().toISOString(),
    creatorId: getUserId()
  }
}

export default {
  name: 'JobDetail',
  components: {
    MDinput,
    Sticky
    // Money
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + ' is required',
          type: 'error'
        })
        callback(new Error(rule.field + ' is required'))
      } else {
        callback()
      }
    }
    return {
      money: {
        decimal: ',',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 0
      },
      fmaxLength: maxLength,
      postForm: Object.assign({}, defaultForm.data),
      loading: false,
      currencyListOptions: [],
      durationListOptions: [],
      rules: {
        // image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        currency: [{ validator: validateRequire }]
      },
      tempRoute: {},
      showCancelDialog: false,
      isModified: false
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.description.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    this.getCurrencyList('')
    this.getDurationList('')
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
      this.method = 'put'
    } else {
      this.method = 'post'
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchPackage(id).then(response => {
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
      const title = 'Edit Package'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Package'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      if (this.postForm.description.length === 0 || this.postForm.name.length === 0) {
        this.$message({
          message: 'Please fill in the required title and contents',
          type: 'warning'
        })
        return
      }
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.createDate = new Date().toISOString()
          this.postForm.duration = 30
          if (!this.isEdit) {
            this.postForm.active = true
          }
          let msg = ''
          if (this.isEdit) {
            msg = 'Save package successfully'
          } else {
            msg = 'Create new package successfully'
          }
          editPackage(this.postForm, this.method).then(response => {
            this.postForm.id = response.data.id
            this.$notify({
              title: 'Success',
              message: msg,
              type: 'success',
              duration: 2000
            })
            this.loading = false
            this.$router.back()
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.description.length === 0 || this.postForm.name.length === 0) {
        this.$message({
          message: 'Please fill in the required title and contents',
          type: 'warning'
        })
        return
      }
      this.postForm.status = 'Draft'
      this.$store.dispatch()
    },
    getCurrencyList(query) {
      const CurrencyList = [{ 'name': 'VND' }, { 'name': 'USD' }, { 'name': 'SGD' }, { 'name': 'EUR' }, { 'name': 'JPY' }, { 'name': 'CNY' }]
      const filterList = CurrencyList.filter(item => {
        const lowerCase = item.name.toLowerCase()
        return !(query && lowerCase.indexOf(query.toLowerCase()) < 0)
      })
      this.currencyListOptions = filterList.map(v => v.name)
    },
    getDurationList(query) {
      const durationList = [{ 'name': '30 days' }, { 'name': '90 days' }, { 'name': '6 months' }, { 'name': '12 months' }]
      const filterList = durationList.filter(item => {
        const lowerCase = item.name.toLowerCase()
        return !(query && lowerCase.indexOf(query.toLowerCase()) < 0)
      })
      this.durationListOptions = filterList.map(v => v.name)
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
