<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="$t('profile.activity')" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane :label="$t('profile.account')" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane v-if="user.role !== 'admin'" :label="$t('profile.company')" name="company">
                <company :company="company" />
              </el-tab-pane>
              <!-- <el-tab-pane label="Change Password" name="changePassword">
                <change-password />
              </el-tab-pane> -->
              <el-tab-pane v-if="user.role !== 'admin'" :label="$t('profile.billing')" name="billing">
                <billing :curr-package="currPackage" :list-package="listPackage" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Account from './components/Account'
import Company from './components/Company'
// import ChangePassword from './components/ChangePassword'
import Billing from './components/Billing'

import { getCurrentPackage } from '@/api/package'
import { fetchAccountData } from '@/api/user'
import { fetchTransactionOfAccount } from '../../api/report'

export default {
  name: 'Profile',
  components: {
    UserCard,
    Activity,
    Account,
    Company,
    // ChangePassword,
    Billing
  },
  data() {
    return {
      user: {},
      company: {},
      currPackage: {},
      listPackage: [],
      activeTab: 'activity',
      account: null
    }
  },
  computed: {
    ...mapGetters([
      'fullname',
      'avatar',
      'roles',
      'username'
    ]),
    accountId() {
      return this.$store.state.user.accId
    }
  },
  created() {
    this.getAccountData()
    this.getPackage()
    this.fetchUserPkg()
  },
  methods: {
    getAccountData() {
      fetchAccountData(this.accountId).then(response => {
        this.account = response.data
        this.user = {
          id: this.account.id,
          fullname: this.account.fullname,
          role: this.account.role,
          email: this.account.email,
          phone: this.account.phoneNo,
          phoneNo: this.account.phoneNo,
          avatar: this.avatar,
          company: this.account.companyById
        }
        this.company = {
          id: this.account.companyId,
          name: this.account.companyById.name,
          email: this.account.companyById.email,
          phoneNo: this.account.companyById.phoneNo,
          location: this.account.companyById.location,
          taxCode: this.account.companyById.taxCode,
          description: this.account.companyById.description,
          avatar: this.account.companyById.avatar,
          verified: this.account.companyById.verified,
          openjobCompanyId: this.account.companyById.openjobCompanyId
        }
      })
    },
    fetchUserPkg() {
      fetchTransactionOfAccount(this.accountId).then(response => {
        if (response.data) {
          this.listPackage = response.data
        } else {
          this.listPackage = []
        }
      })
    },
    getPackage() {
      getCurrentPackage(this.accountId)
        .then(response => {
          if (response.data) {
            this.currPackage = response.data
          } else {
            this.currPackage = {}
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
