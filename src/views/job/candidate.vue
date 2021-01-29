<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <div class="title-container">
          <strong style="font-size: 36px">{{ job && job.title }}</strong><br>
          <div style="padding: 10px 0px">
            <strong>{{ job && job.accountByCreatorId.companyById.name }}</strong>
            <span style="margin-left: 30px">{{ $t('job.published') }}: {{ job && (new Date(job.createDate)).toLocaleString('en-GB') }}</span>
            <span style="margin-left: 30px">{{ $t('job.deadline') }}: {{ job && (new Date(job.applyTo)).toLocaleString('en-GB') }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
        <div class="filter-container">
          <el-input v-model="listQuery.name" :placeholder="$t('job.plName')" style="width: 250px; margin-right: 10px" class="filter-item" :maxlength="fmaxLength.nameLength" @keyup.enter.native="handleFilter" />
          <el-select v-model="listQuery.status" :placeholder="$t('job.status')" clearable class="filter-item" style="width: 130px; margin-right: 10px" @change="handleFilter">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t('btn.search') }}
          </el-button>
          <el-button class="filter-item" :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">
            {{ $t('btn.export') }}
          </el-button>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
        <div class="filter-container" style="float: right">
          <el-button class="filter-item" type="primary" @click="refresh">
            {{ $t('job.get') }}
          </el-button>
          <el-button v-if="accountRole === 'user'" class="filter-item" type="warning" @click="rankCV">
            {{ $t('job.rank') }}
          </el-button>

        </div>
      </el-col>
    </el-row>

    <el-table
      v-if="list"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column type="index" align="center" :label="$t('job.no')" width="50">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (listQuery.page - 1)*listQuery.limit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('job.fullname')" prop="fullname" sortable="custom" min-width="150px" :class-name="getSortClass('fullname')">
        <template slot-scope="{row}">
          <div class="link-type" @click="viewDetail(row)">
            <span style="white-space: nowrap">{{ row.candidateByCandidateId.fullname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('job.email')" align="center" width="240px">
        <template slot-scope="{row}">
          <span>{{ row.candidateByCandidateId.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('job.phoneNo')" align="center" width="160px">
        <template slot-scope="{row}">
          <span>{{ row.candidateByCandidateId.phoneNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('job.applyDate')" prop="applyDate" sortable="custom" width="200px" align="center" :class-name="getSortClass('applyDate')">
        <template slot-scope="{row}">
          <span>{{ (new Date(row.applyDate)).toLocaleString('en-GB') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('job.source')" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('job.status')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('job.resume')" width="90px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-tooltip content="View resume" placement="top">
            <el-button type="primary" size="small" icon="el-icon-paperclip" @click="openCV(row.cv)">
              <!-- View -->
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('job.match')" prop="matchingRate" sortable="custom" width="180px" :class-name="getSortClass('matchingRate')">
        <template slot-scope="{row}">
          <span>{{ row.matchingRate }}%</span>
        </template>
      </el-table-column>
      <el-table-column v-if="accountRole === 'user'" align="center" :label="$t('job.actions')" width="100px">
        <template slot-scope="scope">
          <el-tooltip :content="$t('job.ttHire')" placement="top">
            <el-button v-if="scope.row.status !== 'Hired'" type="success" size="small" icon="el-icon-circle-check" @click="handleHireCandidate(scope.row.id)">
              <!-- Hire -->
            </el-button>
          </el-tooltip>
          <el-tooltip :content="$t('job.ttDismiss')" placement="top">
            <el-button v-if="scope.row.status === 'Hired'" type="danger" size="small" icon="el-icon-circle-close" @click="handleDismissCandidate(scope.row.id)">
              <!-- Dismiss -->
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Candidate Detail" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 90%; margin-left:50px;">
        <el-form-item :label="$t('job.fullname') + ':'" label-width="150px" style="margin-bottom: 0px">
          <span>{{ temp.candidateByCandidateId.fullname }}</span>
        </el-form-item>
        <el-form-item :label="$t('job.email') + ':'" label-width="150px" style="margin-bottom: 0px">
          <span>{{ temp.candidateByCandidateId.email }}</span>
        </el-form-item>
        <el-form-item :label="$t('job.phoneNo') + ':'" label-width="150px" style="margin-bottom: 0px">
          <span>{{ temp.candidateByCandidateId.phoneNo }}</span>
        </el-form-item>
        <el-form-item :label="$t('job.address') + ':'" label-width="150px" style="margin-bottom: 0px">
          <span>{{ temp.candidateByCandidateId.address }}</span>
        </el-form-item>
        <el-form-item :label="$t('job.status') + ':'" label-width="150px" style="margin-bottom: 0px">
          <el-tag :type="temp.status | statusFilter">
            {{ temp.status }}
          </el-tag>
        </el-form-item>
        <el-form-item :label="$t('job.comment') + ':'" label-width="150px" style="margin-bottom: 0px;">
          <el-input v-model="temp.comment" :readonly="accountRole !== 'user'" type="textarea" :rows="5" :maxlength="fmaxLength.cmtLength" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('btn.close') }}
        </el-button>
        <el-button v-if="accountRole === 'user'" :loading="listLoading" type="success" @click="handleComment(temp)">
          {{ $t('btn.saveComment') }}
        </el-button>
      </div>
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getApplications" />
  </div>
</template>

<script>
import { fetchTotalCandidate, fetchCandidateList, fetchApplicationFromRP, rankCV, commentOnApplication, hireCandidate, dismissCandidate } from '@/api/candidate'
import { fetchJob } from '@/api/job'
import Pagination from '@/components/Pagination'
import { maxLength } from '../../store' // Secondary package based on el-pagination

export default {
  name: 'CandidateList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Hired: 'success',
        Applied: 'primary',
        Reject: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      fmaxLength: maxLength,
      job: null,
      list: null,
      totalList: null,
      total: 0,
      listLoading: false,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        status: '',
        sort: '-matchingRate'
      },
      sortNameTemp: 'descending',
      sortDateTemp: 'descending',
      sortRateTemp: 'descending',
      statusOptions: ['Applied', 'Hired'],
      jobId: '',
      temp: {
        id: undefined,
        candidateId: '',
        matchingRate: 0,
        cv: 0,
        applyDate: '',
        hiredDate: '',
        source: '',
        status: '',
        comment: '',
        jobId: undefined,
        candidateByCandidateId: {
          id: undefined,
          fullname: '',
          emaill: '',
          address: '',
          phoneNo: ''
        },
        jobByJobId: null
      },
      dialogFormVisible: false,
      multipleSelection: []
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    },
    accountRole() {
      return this.$store.state.user.roles[0]
    }
  },
  created() {
    this.jobId = this.$route.params && this.$route.params.id
    this.fetchAll(this.jobId)
    this.fetchData(this.jobId)
    this.getApplications(this.jobId)
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchAll(id) {
      fetchTotalCandidate(id).then(response => {
        this.totalList = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    fetchData(id) {
      fetchJob(id).then(response => {
        // auto fill data when edit
        this.job = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    openCV(link) {
      window.open(link, '_blank')
    },
    getApplications() {
      this.listLoading = true
      fetchCandidateList(this.jobId, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    refresh() {
      this.listLoading = true
      fetchApplicationFromRP(this.jobId).then(() => {
        fetchCandidateList(this.jobId, this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    rankCV() {
      this.listLoading = true
      console.log('st', new Date())
      rankCV(this.jobId, this.listQuery).then(response => {
        this.list = response.data.data
        this.listLoading = false
        console.log('en', new Date())
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    viewDetail(candidate) {
      this.temp = Object.assign({}, candidate) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogFormVisible = true
    },
    handleComment(ja) {
      console.log('comment', ja)
      const { applyDate, candidateId, comment, cv, hiredDate, id, jobId, matchingRate, source, status } = ja
      const data = {
        'applyDate': applyDate,
        'candidateId': candidateId,
        'comment': comment,
        'cv': cv,
        'hiredDate': hiredDate,
        'id': id,
        'jobId': jobId,
        'matchingRate': matchingRate,
        'source': source,
        'status': status
      }
      this.listLoading = true
      commentOnApplication(data)
        .then(() => {
          this.$message({
            message: 'The comment has been saved.',
            type: 'success'
          })
          this.listLoading = false
          this.dialogFormVisible = false
          this.getApplications()
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: 'The comment can not be saved.',
            type: 'fail'
          })
          this.listLoading = false
        })
    },
    handleHireCandidate(id) {
      this.listLoading = true
      hireCandidate(id)
        .then(response => {
          this.listLoading = false
          this.getApplications()
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: 'The candidate can not be hired.',
            type: 'fail'
          })
          this.listLoading = false
        })
    },
    handleDismissCandidate(id) {
      this.listLoading = true
      dismissCandidate(id)
        .then(response => {
          this.listLoading = false
          this.getApplications()
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: 'The candidate can not be dismissed.',
            type: 'fail'
          })
          this.listLoading = false
        })
    },
    sortChange(data) {
      var { prop, order } = data
      if (prop === 'fullname') {
        if (this.sortNameTemp === 'ascending') {
          this.sortNameTemp = 'descending'
        } else {
          this.sortNameTemp = 'ascending'
        }
        console.log(order, this.sortNameTemp)
        this.sortByName(this.sortNameTemp)
      } else if (prop === 'applyDate') {
        if (this.sortDateTemp === 'ascending') {
          this.sortDateTemp = 'descending'
        } else {
          this.sortDateTemp = 'ascending'
        }
        console.log(order, this.sortDateTemp)
        this.sortByDate(this.sortDateTemp)
      } else if (prop === 'matchingRate') {
        if (this.sortRateTemp === 'ascending') {
          this.sortRateTemp = 'descending'
        } else {
          this.sortRateTemp = 'ascending'
        }
        console.log(order, this.sortRateTemp)
        this.sortByRate(this.sortRateTemp)
      }
    },
    sortByName(order) {
      console.log('sortByName')
      if (order === 'ascending') {
        this.listQuery.sort = '+candidateByCandidateId.fullname'
      } else {
        this.listQuery.sort = '-candidateByCandidateId.fullname'
      }
      this.handleFilter()
    },
    sortByDate(order) {
      console.log('sortByDate')
      if (order === 'ascending') {
        this.listQuery.sort = '+applyDate'
      } else {
        this.listQuery.sort = '-applyDate'
      }
      this.handleFilter()
    },
    sortByRate(order) {
      console.log('sortByRate')
      if (order === 'ascending') {
        this.listQuery.sort = '+matchingRate'
      } else {
        this.listQuery.sort = '-matchingRate'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getApplications()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      if (key === 'fullname') {
        key = 'candidateByCandidateId.fullname'
      }
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Full name', 'Email', 'Phone number', 'Address', 'Apply Date', 'Source', 'Status', 'Resume', 'Matching Rate', 'Comment']
        const filterVal = ['id', 'fullname', 'email', 'phoneNo', 'address', 'applyDate', 'source', 'status', 'cv', 'matchingRate', 'comment']
        let list = []
        if (this.multipleSelection.length) {
          list = this.multipleSelection
        } else {
          list = this.totalList
        }
        const data = this.formatJson(filterVal, list)
        const currentTime = new Date().toLocaleString('en-GB')
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'applications-of-' + this.job.title.toLowerCase().replace(' ', '-') + '-' + currentTime.replace('/', '').replace(', ', '').replace(':', ''),
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'applyDate') {
          return (new Date(v[j])).toLocaleString('en-GB')
        } else if (j === 'fullname' || j === 'email' || j === 'phoneNo' || j === 'address') {
          return v['candidateByCandidateId'][j]
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.title-container {
  padding-bottom: 10px;
}
</style>
