<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+ postForm.status">
        <el-button :loading="loading" style="width: 105px" @click="handleCancelAction()">
          {{ $t('btn.discard') }}
        </el-button>
        <el-button :loading="loading" type="warning" style="width: 105px" @click="handleSubmitAction(2)">
          {{ $t('btn.draft') }}
        </el-button>
        <el-button :loading="loading" style="margin-left: 10px; width: 105px" type="success" @click="handleSubmitAction(1)">
          {{ $t('btn.publish') }}
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="fmaxLength.titleLength" name="name" required @change="isModified = true">
                {{ $t('job.title') }}
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="110px" :label="$t('job.deadline')" class="postInfo-container-item" prop="applyTo">
                    <el-date-picker v-model="postForm.applyTo" type="datetime" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="Choose date and time" @change="isModified = true" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="120px" :label="$t('job.vacancies')" class="postInfo-container-item">
                    <el-input-number v-model="postForm.vacancies" placeholder="1" style="width: 225px" @change="isModified = true" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="120px" :label="$t('job.type')" class="postInfo-container-item" prop="jobType">
                    <el-select v-model="postForm.jobType" :remote-method="getJobTypeList" filterable default-first-option remote placeholder="" @change="isModified = true">
                      <el-option v-for="(item,index) in jobTypeListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="80px" :label="$t('job.category')" class="postInfo-container-item" prop="category">
                    <el-select v-model="postForm.category" :remote-method="getCategoryList" filterable remote placeholder="" prop="category" @change="isModified = true">
                      <el-option v-for="(item,index) in categoryListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="110px" :label="$t('job.hidden')" class="postInfo-container-item" prop="salaryHidden">
                    <el-checkbox v-model="postForm.salaryHidden" @change="isModified = true" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="120px" :label="$t('job.salaryFrom')" class="postInfo-container-item" prop="salaryFrom">
                    <money v-model="postForm.salaryFrom" v-bind="money" class="my-money" placeholder="0" :maxlength="fmaxLength.priceLength" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="120px" :label="$t('job.salaryTo')" class="postInfo-container-item" prop="salaryTo">
                    <money v-model="postForm.salaryTo" v-bind="money" class="my-money" placeholder="0" :maxlength="fmaxLength.priceLength" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="80px" :label="$t('job.currency')" class="postInfo-container-item" prop="currency">
                    <el-select v-model="postForm.currency" :remote-method="getCurrencyList" filterable default-first-option remote placeholder="" @change="isModified = true">
                      <el-option v-for="(item,index) in currencyListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item label-width="125px" :label="$t('job.description')" />
        <el-form-item prop="description" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.description" :height="400" :maxlength="fmaxLength.jdLength" @input="isModified = true" />
        </el-form-item>
      </div>
    </el-form>

    <el-dialog :visible.sync="showDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="hasError ? 'failed' : 'success'" /> {{ dialogTitle }}</span>
      <p class="message" v-html="message" />
    </el-dialog>

    <el-dialog :visible.sync="showConfirmDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="'warning'" /> {{ dialogTitle }}</span>
      <p class="message" v-html="message" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDialog = false">
          {{ $t('btn.close') }}
        </el-button>
        <el-button type="success" @click="submitForm">
          {{ $t('btn.continue') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showCancelDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="'warning'" /> {{ $t('cf.titleDiscard') }}</span>
      <p class="message" v-html="$t('cf.msgDiscard')" />
      <div slot="footer" class="dialog-footer">
        <router-link :to="'/job/list'">
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
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky'
import { createJob, fetchCategory, publishJob, fetchJob } from '@/api/job'
import { uppercaseFirst } from '../../../filters'
import { validDigits } from '../../../utils/validate'
import { maxLength } from '../../../store'
import { Money } from 'v-money'

const defaultForm = {
  method: '',
  display_time: undefined,
  id: undefined,
  data: {
    status: 'Draft',
    title: '',
    description: '',
    applyTo: '',
    salaryFrom: '',
    salaryTo: '',
    salaryHidden: false,
    currency: '',
    vacancies: 1,
    jobType: '',
    category: '',
    createDate: new Date().toISOString(),
    creatorId: ''
  }
}

export default {
  name: 'JobDetail',
  components: {
    Tinymce,
    MDinput,
    Money,
    Sticky
  },
  // directives: { fmoney: VMoney },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isReopen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      let item = rule.field
      if (item === 'applyTo') {
        item = 'deadline'
      }
      if (value === '') {
        callback(new Error(uppercaseFirst(item) + ' is required.'))
      } else {
        callback()
      }
    }
    const validateTitle = (rule, value, callback) => {
      const item = rule.field
      if (value === '') {
        callback(new Error(uppercaseFirst(item) + ' is required.'))
      } else if (validDigits(value)) {
        callback(new Error(uppercaseFirst(item) + ' must not be a digit.'))
      } else {
        callback()
      }
    }
    const validateCurrency = (rule, value, callback) => {
      const item = rule.field
      if (value === '') {
        callback(new Error(uppercaseFirst(item) + ' is required.'))
      } else if (this.postForm.salaryFrom > this.postForm.salaryTo || this.postForm.salaryFrom <= 0) {
        this.$message({
          message: 'Salary range is not valid.',
          type: 'error'
        })
      } else {
        callback()
      }
    }
    return {
      money: {
        decimal: this.$store.getters.language === 'vi' ? ',' : '.',
        thousands: this.$store.getters.language === 'vi' ? '.' : ',',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false
      },
      fmaxLength: maxLength,
      postForm: Object.assign({}, defaultForm.data),
      loading: false,
      currencyListOptions: [],
      categoryListOptions: [],
      jobTypeListOptions: [],
      rules: {
        title: [{ validator: validateTitle }],
        jobType: [{ validator: validateRequire }],
        category: [{ validator: validateRequire }],
        salaryTo: [{ validator: validateCurrency, trigger: 'blur' }],
        description: [{ validator: validateRequire }]
      },
      tempRoute: {},
      message: '',
      showDialog: false,
      btnLoading: false,
      hasError: false,
      dialogTitle: '',
      // true la continue
      confirmation: undefined,
      showConfirmDialog: false,
      action: '',
      deadline: new Date(),
      showCancelDialog: false,
      isModified: false,
      pickerOptions: {
        disabledDate: this.disabledDate
      }
    }
  },
  computed: {
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
    },
    accountId() {
      return this.$store.state.user.accId
    }
  },
  created() {
    this.getCategoryList('')
    this.getJobTypeList('')
    this.getCurrencyList('')
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
      this.method = 'put'
    } else {
      this.method = 'post'
    }
    if (this.isReopen) {
      this.method = 'post'
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    disabledDate(time) {
      return time.getTime() < Date.now()
    },
    fetchData(id) {
      fetchJob(id).then(response => {
        // auto fill data when edit
        this.postForm = response.data
        delete this.postForm.accountByCreatorId
        delete this.postForm.talentPoolByTalentPoolId
        delete this.postForm.applyFrom
        if (this.isReopen) {
          delete this.postForm.id
          this.postForm.status = 'Draft'
        }

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Job'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Job'
      document.title = `${title} - ${this.postForm.id}`
    },
    handleSubmitAction(type) {
      if (this.postForm.description.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: 'Please fill in the required title and contents',
          type: 'warning'
        })
        return
      }
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.action = type
          if (!this.validateSalary()) {
            this.showConfirmDialog = true
            this.dialogTitle = 'Warning'
            this.message = 'This salary range is not reasonable.</br>Do you want to continue?'
          } else {
            this.submitForm()
          }
        }
      })
    },
    submitForm() {
      this.showConfirmDialog = false
      this.loading = true
      this.postForm.creatorId = this.accountId
      if (typeof this.postForm.applyTo === 'object') {
        this.postForm.applyTo = new Date(this.postForm.applyTo + 'Z').toISOString()
      }
      // API create job
      createJob(this.postForm, this.method).then(response => {
        this.postForm.id = response.data.id
        if (this.action === 1) {
          // API Publish job
          publishJob(this.postForm.id).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Published the post successfully',
              type: 'success',
              duration: 2000
            })
            this.$router.push('/job/list')
          }).catch(err => {
            this.dialogTitle = 'Something went wrong!'
            this.hasError = true
            if (err.response.data.status === 402) {
              this.message = 'You have run out of job posts.</br>Click <a href="http://localhost:9527/#/purchase/index" style="color: #0a76a4 !important;"><u>here</u></a> to select and purchase other packages!'
            } else {
              this.message = err.response.data.message
            }
            this.showDialog = true
          })
          // end Publish job
        } else {
          // Create job successful
          this.$notify({
            title: 'Success',
            message: 'Save the post successfully',
            type: 'success',
            duration: 2000
          })
          this.$router.push('/job/list')
          // end Create job successful
        }
        this.loading = false
      }).catch(error => {
        // create job fail
        this.$message({
          message: error.response.data.message,
          type: 'warning'
        })
        this.loading = false
      })
      // end create job
    },
    getCategoryList(query) {
      fetchCategory().then(response => {
        if (!response.data) return
        const filterList = response.data.filter(item => {
          const lowerCase = item.name.toLowerCase()
          return !(query && lowerCase.indexOf(query.toLowerCase()) < 0)
        })
        this.categoryListOptions = filterList.map(v => v.name)
      })
    },
    getCurrencyList(query) {
      const CurrencyList = [{ 'name': 'VND' }, { 'name': 'USD' }, { 'name': 'SGD' }, { 'name': 'EUR' }, { 'name': 'JPY' }, { 'name': 'CNY' }]
      const filterList = CurrencyList.filter(item => {
        const lowerCase = item.name.toLowerCase()
        return !(query && lowerCase.indexOf(query.toLowerCase()) < 0)
      })
      this.currencyListOptions = filterList.map(v => v.name)
    },
    getJobTypeList(query) {
      const JobTypeList = [{ 'name': 'Full-time' }, { 'name': 'Part-time' }, { 'name': 'Internship' }, { 'name': 'Contract' }]
      const filterList = JobTypeList.filter(item => {
        const lowerCase = item.name.toLowerCase()
        return !(query && lowerCase.indexOf(query.toLowerCase()) < 0)
      })
      this.jobTypeListOptions = filterList.map(v => v.name)
    },
    validateSalary() {
      let min = 0
      let max = 0
      switch (this.postForm.currency) {
        case 'VND':
          min = 1000000
          max = 1000000000
          break
        case 'USD':
          min = 50
          max = 50000
          break
        case 'SGD':
          min = 67
          max = 67000
          break
        case 'EUR':
          min = 42
          max = 41433
          break
        case 'JPY':
          min = 5200
          max = 5200000
          break
        case 'CNY':
          min = 327
          max = 327000
          break
      }
      return (this.postForm.salaryFrom >= min && this.postForm.salaryTo <= max)
    },
    handleCancelAction() {
      if (this.isModified) {
        this.showCancelDialog = true
      } else {
        this.$router.push('/job/list')
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

.my-money {
  width: 225px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  text-align: center;
  color: #606266;
}

</style>
