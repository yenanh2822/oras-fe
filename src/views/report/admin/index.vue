<template>
  <div class="dashboard-editor-container">

    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('reportAdmin.userMonth') }}</h2>
          <select v-model="selectedYearForAccount" @click="handleSetAccountData">
            <option disabled value="">{{ $t('reportAdmin.selectYear') }}</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
          </select>
          <account-by-month v-if="accountData" :chart-data="accountData" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('reportAdmin.jobByCate') }}</h2>
          <job-by-category v-if="jobByCate" :chart-data="jobByCate" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('reportAdmin.candidateByCate') }}</h2>
          <candidate-by-category v-if="candidateByCate" :chart-data="candidateByCate" />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('reportAdmin.avgSalary') }}</h2>
          <avg-salary-by-category style="barchartStyle" :chart-data="avgSalaryData" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('reportAdmin.purchaseHistory') }}</h2>
          <purchase-history />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('reportAdmin.purByPack') }}</h2>
          <buy-by-package v-if="packageData" :chart-data="packageData" />
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('reportAdmin.revenueMonth') }}</h2>
          <select v-model="selectedYearForPurchase" @click="handleSetPurchaseData">
            <option disabled value="">{{ $t('reportAdmin.selectYear') }}</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
          </select>
          <purchase-by-month v-if="purchaseData" :chart-data="purchaseData" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PurchaseHistory from './components/PurchaseHistory'
import PanelGroup from './components/PanelGroup'
import PurchaseByMonth from './components/PurchaseByMonth'
import JobByCategory from './components/JobByCategory'
import CandidateByCategory from './components/CandidateByCategory'
import AvgSalaryByCategory from './components/AvgSalaryByCategory'
import AccountByMonth from './components/AccountByMonth'
import BuyByPackage from './components/BuyByPackage'

import {
  fetchAccountByMonth,
  fetchAverageSalary,
  fetchJobByCategory,
  fetchCandidateByCategory,
  fetchBuyByPackage,
  fetchPurchaseByMonth
} from '@/api/report'

export default {
  name: 'DashboardAdmin',
  components: {
    PurchaseHistory,
    PanelGroup,
    PurchaseByMonth,
    JobByCategory,
    CandidateByCategory,
    AvgSalaryByCategory,
    AccountByMonth,
    BuyByPackage
  },
  data() {
    return {
      accountData: {
        month: [],
        systemData: []
      },
      jobByCate: {
        category: [],
        systemData: []
      },
      candidateByCate: {
        category: [],
        systemData: []
      },
      avgSalaryData: {
        category: [],
        systemData: []
      },
      packageData: {
        category: [],
        systemData: []
      },
      purchaseData: {
        month: [],
        systemData: []
      },
      barchartStyle: {
        width: '100%',
        height: '386px'
      },
      selectedYearForAccount: '2020',
      selectedYearForPurchase: '2020'
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    },
    baseCurrency() {
      const lang = this.$store.getters.language
      return lang === 'vi' ? 'vnd' : 'usd'
    }
  },
  created() {
    this.getAccountData(this.selectedYearForAccount)
    this.getJobData()
    this.getCandidateData()
    this.getSalaryData()
    this.getBuyData()
    this.getPurchaseData(this.selectedYearForPurchase)
  },
  methods: {
    handleSetAccountData() {
      this.getAccountData(this.selectedYearForAccount)
    },
    handleSetPurchaseData() {
      this.getPurchaseData(this.selectedYearForPurchase)
    },
    getAccountData(selectedYearForAccount) {
      fetchAccountByMonth(selectedYearForAccount).then(response => {
        this.accountData.month = response.data.map(item => item.month)
        this.accountData.systemData = response.data.map(item => item.amount)
      })
    },
    getJobData() {
      fetchJobByCategory().then(response => {
        this.jobByCate.category = response.data.map(item => item.category)
        this.jobByCate.systemData = response.data.map(item => ({ value: item.numOfPost, name: item.category }))
      })
    },
    getCandidateData() {
      fetchCandidateByCategory(this.accountId).then(response => {
        this.candidateByCate.category = response.data.map(item => item.category)
        this.candidateByCate.systemData = response.data.map(item => ({ value: item.numOfApplication, name: item.category }))
      })
    },
    getSalaryData() {
      fetchAverageSalary(this.baseCurrency).then(response => {
        this.avgSalaryData.systemData = response.data.map(item => item.averageSalary)
        this.avgSalaryData.category = response.data.map(item => item.category)
      })
    },
    getBuyData() {
      fetchBuyByPackage().then(response => {
        this.packageData.category = response.data.map(item => item.packageName)
        this.packageData.systemData = response.data.map(item => ({ value: item.num, name: item.packageName }))
      })
    },
    getPurchaseData(selectedYearForPurchase) {
      fetchPurchaseByMonth(selectedYearForPurchase).then(response => {
        this.purchaseData.month = response.data.map(item => item.month)
        this.purchaseData.systemData = response.data.map(item => item.amount)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .title {
    color: #182642;
    line-height: 1.25;
    text-decoration: none;
    margin-bottom: 20px;
    font-weight: 300;
  }

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
