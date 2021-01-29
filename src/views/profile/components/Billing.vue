<template>
  <div>
    <div>
      <el-form v-if="currPackage.id">
        <h3>{{ $t('billing.title') }}</h3>
        <el-form-item :label="$t('billing.packName') + ':'" label-width="150px" style="margin-bottom: 0px">
          <span>{{ currPackage.packageById && currPackage.packageById.name }}</span>
        </el-form-item>
        <el-form-item :label="$t('billing.post') + ':'" label-width="150px" style="margin-bottom: 0px">
          <span>{{ currPackage && currPackage.numOfPost }}</span>
        </el-form-item>
        <el-form-item :label="$t('billing.expiry') + ':'" label-width="150px" style="margin-bottom: 0px">
          <span>{{ currPackage && (new Date(currPackage.validTo)).toLocaleString("en-GB") }}</span>
        </el-form-item>
        <el-button type="danger" @click="cancelCurrentPackage">{{ $t('btn.cancelPack') }}</el-button>
      </el-form>
      <p v-if="!currPackage.id" style="font-size: 1.1em"><i>{{ $t('billing.notBought') }}</i></p>
    </div>
    <div>
      <h3>{{ $t('billing.history') }}</h3>
      <el-timeline>
        <el-timeline-item v-for="(item,index) of listPackage" :key="index" :timestamp="(new Date(item.purchaseById.purchaseDate)).toLocaleString('en-GB')" placement="top">
          <el-card>
            <h3>{{ item.packageById.name }}</h3>
            <p style="font-style: italic">{{ $t('billing.expire') }}{{ (new Date(item.validTo)).toLocaleString('en-GB') }}</p>
            <p style="font-style: italic">{{ $t('billing.numOfPost') }}{{ item.numOfPost }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { cancelPackage } from '@/api/package'

export default {
  props: {
    currPackage: {
      type: Object,
      required: true
    },
    listPackage: {
      type: Array,
      required: true
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    }
  },
  methods: {
    cancelCurrentPackage() {
      cancelPackage(this.accountId)
        .then(() => {
          this.$router.push({ name: 'Profile' })
          this.$message({
            message: 'Your package has been canceled successfully',
            type: 'success',
            duration: 2.5 * 1000
          })
          this.$router.go(0)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
