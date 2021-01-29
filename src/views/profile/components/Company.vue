<template>
  <el-row :gutter="20">
    <el-form ref="infoForm" :model="infoForm" :rules="rules">
      <el-col :lg="12">
        <el-form-item :label="$t('profile.name')" prop="compName">
          <el-input v-model="company.name" :maxlength="fmaxLength.compNameLength" />
        </el-form-item>
      </el-col>
      <el-col :lg="12">
        <el-form-item :label="$t('profile.email')" prop="compEmail">
          <el-input v-model.trim="company.email" :maxlength="fmaxLength.emailLength" />
        </el-form-item>
      </el-col>
      <el-col :lg="12">
        <el-form-item :label="$t('profile.phoneNo')" prop="compPhone">
          <el-input v-model.trim="company.phoneNo" :maxlength="fmaxLength.phoneLength" />
        </el-form-item>
      </el-col>
      <el-col :lg="12">
        <el-form-item :label="$t('profile.location')" prop="location">
          <el-input v-model="company.location" :maxlength="fmaxLength.locationLength" />
        </el-form-item>
      </el-col>
      <el-col :lg="12">
        <el-form-item :label="$t('profile.tax')" prop="taxCode">
          <el-input v-model.trim="company.taxCode" :maxlength="fmaxLength.taxCodeLength" :readonly="true" />
        </el-form-item>
      </el-col>
      <el-col :lg="24">
        <el-form-item :label="$t('profile.desc')" prop="description">
          <el-input v-model="company.description" type="textarea" :rows="5" :maxlength="fmaxLength.compDesLength" />
        </el-form-item>
      </el-col>
      <el-col :lg="24">
        <el-form-item>
          <el-button type="primary" @click="submit">{{ $t('btn.update') }}</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
import { checkCompanyName, updateCompany } from '../../../api/account'
import { validDigits, validEmail } from '../../../utils/validate'
import { maxLength } from '../../../store'

export default {
  props: {
    company: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          phoneNo: '',
          location: '',
          taxCode: '',
          description: ''
        }
      }
    }
  },
  data() {
    const validatePhoneNo = (rule, value, callback) => {
      if (!validDigits(this.company.phoneNo)) {
        callback(new Error('The phone number only contains digits.'))
      } else {
        callback()
      }
    }
    const validateCompName = (rule, value, callback) => {
      if (this.company.name.length === 0) {
        callback(new Error('The company name can not be empty.'))
      } else {
        const data = { 'id': this.company.id, 'name': this.company.name }
        checkCompanyName(data).then(() => {
          callback()
        })
          .catch(() => {
            callback(new Error('This company name already exist.'))
          })
      }
    }
    const validateLocation = (rule, value, callback) => {
      if (this.company.location.length === 0) {
        callback(new Error('The location can not be empty.'))
      } else {
        callback()
      }
    }
    const validateCompEmail = (rule, value, callback) => {
      if (!validEmail(this.company.email)) {
        callback(new Error('Please enter a valid email.'))
      } else {
        callback()
      }
    }
    const validateDescription = (rule, value, callback) => {
      if (this.company.description.length === 0) {
        callback(new Error('The description can not be empty.'))
      } else {
        callback()
      }
    }
    return {
      fmaxLength: maxLength,
      infoForm: Object.assign({}, this.company),
      checkName: '',
      rules: {
        compName: [{ required: true, trigger: 'blur', validator: validateCompName }],
        location: [{ required: true, trigger: 'blur', validator: validateLocation }],
        compEmail: [{ required: true, trigger: 'blur', validator: validateCompEmail }],
        compPhone: [{ required: true, trigger: 'blur', validator: validatePhoneNo }],
        description: [{ required: true, trigger: 'blur', validator: validateDescription }]
      }
    }
  },
  computed: {

  },
  methods: {
    submit() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          updateCompany(this.company).then(() => {
            this.$message({
              message: 'Your change has been saved successfully. Please wait until we re-verify your information.',
              type: 'success',
              duration: 5 * 1000
            })
            this.$router.go(0)
          }).catch(err => {
            this.$message({
              message: 'Unexpected error occurs',
              type: 'error',
              duration: 5 * 1000
            })
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
