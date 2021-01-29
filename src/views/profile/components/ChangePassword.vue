<template>
  <el-form>
    <el-row :gutter="20">
      <el-col :lg="12">
        <el-form-item label="Current Password">
          <el-input v-model.trim="pw.curPassword" :maxlength="fmaxLength.passwordLength" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="12">
        <el-form-item label="New Password">
          <el-input v-model.trim="pw.newPassword" :maxlength="fmaxLength.passwordLength" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="12">
        <el-form-item label="Confirm Password">
          <el-input v-model.trim="pw.confirmPassword" :maxlength="fmaxLength.passwordLength" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="24">
        <el-form-item>
          <el-button type="primary" @click="submit">Update</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { maxLength } from '../../../store'

export default {
  data() {
    return {
      fmaxLength: maxLength,
      pw: {
        curPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
