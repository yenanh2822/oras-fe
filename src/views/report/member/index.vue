<template>
  <div class="dashboard-editor-container">

    <panel-group />

    <el-row style="background:#fff;padding:0px 16px 16px 16px; margin-bottom:32px;">
      <candidate-status />
    </el-row>

    <el-row style="background:#fff;padding:0px 16px 16px 16px; margin-bottom:32px;">
      <time-to-hire />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('report.jobByCate') }}</h2>
          <job-by-category v-if="jobByCate" :chart-data="jobByCate" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('report.candidateByCate') }}</h2>
          <candidate-by-category v-if="candidateByCate" :chart-data="candidateByCate" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h2 class="title" v-text="$t('report.avgSalary') + '('+ baseCurrency.toUpperCase() + ')' + $t('report.byCate')" />
          <avg-salary-by-category style="barchartStyle" :chart-data="avgSalaryData" />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('report.purchaseHistory') }}</h2>
          <purchase-history />
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <h2 class="title">{{ $t('report.expMonth') }}</h2>
          <select v-model="selectedYear" @click="handleSetLineChartData">
            <option disabled value="">{{ $t('report.selectYear') }}</option>
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
// import LineChart from './components/LineChart'
import PurchaseByMonth from './components/PurchaseByMonth'
import TimeToHire from './components/TimeToHire'
import CandidateStatus from './components/CandidateStatus'
import JobByCategory from './components/JobByCategory'
import CandidateByCategory from './components/CandidateByCategory'
import AvgSalaryByCategory from './components/AvgSalaryByCategory'

import {
  fetchAverageSalaryOfAccount,
  fetchJobByCategoryOfAccount,
  fetchCandidateByCategoryOfAccount,
  fetchPurchaseByMonthAccount
} from '@/api/report'

export default {
  name: 'DashboardAdmin',
  components: {
    PurchaseHistory,
    PanelGroup,
    // LineChart,
    PurchaseByMonth,
    TimeToHire,
    CandidateStatus,
    JobByCategory,
    CandidateByCategory,
    AvgSalaryByCategory
  },
  data() {
    return {
      avgSalaryData: {
        category: [],
        systemData: [],
        userData: []
      },
      jobByCate: {
        category: [],
        userData: []
      },
      candidateByCate: {
        category: [],
        userData: []
      },
      purchaseData: {
        month: [],
        userData: []
      },
      barchartStyle: {
        width: '100%',
        height: '386px'
      },
      selectedYear: '2020'
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
    // Average Salary (USD) by Category
    this.getSalaryData()
    // Number of Jobs by Category
    this.getJobData()
    // Number of Applications by Category
    this.getCandidateData()
    // Expenses By Month
    this.getPurchaseData(this.selectedYear)
  },
  methods: {
    handleSetLineChartData() {
      this.getPurchaseData(this.selectedYear)
    },
    getSalaryData() {
      fetchAverageSalaryOfAccount(this.accountId, this.baseCurrency).then(response => {
        this.avgSalaryData.systemData = response.data.system.map(item => item.averageSalary)
        this.avgSalaryData.userData = response.data.user.map(item => item.averageSalary)
        this.avgSalaryData.category = response.data.user.map(item => item.category)
      })
    },
    getJobData() {
      fetchJobByCategoryOfAccount(this.accountId).then(response => {
        this.jobByCate.category = response.data.map(item => item.category)
        this.jobByCate.userData = response.data.map(item => ({ value: item.numOfPost, name: item.category }))
      })
    },
    getCandidateData() {
      fetchCandidateByCategoryOfAccount(this.accountId).then(response => {
        this.candidateByCate.category = response.data.map(item => item.category)
        this.candidateByCate.userData = response.data.map(item => ({ value: item.numOfApplication, name: item.category }))
      })
    },
    getPurchaseData(selectedYear) {
      fetchPurchaseByMonthAccount(this.accountId, selectedYear).then(response => {
        this.purchaseData.month = response.data.map(item => item.month)
        this.purchaseData.userData = response.data.map(item => item.amount)
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
