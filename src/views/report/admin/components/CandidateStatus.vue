<template>
  <div class="">
    <h2 class="title">Candidate Status</h2>
    <el-table v-if="!list" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="No." width="80" />
      <el-table-column label="Job Title" min-width="300px" />
      <el-table-column label="Duration" width="300px" align="center" />
      <el-table-column label="Total Applications" width="200px" />
      <el-table-column label="Hired" width="200px" align="center" />
      <el-table-column label="Reject" width="200px" align="center" />
    </el-table>
    <el-table
      v-if="list"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" label="No." width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Job Title" min-width="300px">
        <template slot-scope="{row}">
          <span>{{ row.job.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Job Status" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.job.status | statusFilter">
            {{ row.job.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Duration" width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ (new Date(row.job.createDate)).toLocaleDateString('en-GB') }} - {{ (new Date(row.job.applyTo)).toLocaleDateString('en-GB') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Total Applications" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.totalApplication }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hired" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hired }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Reject" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timeToHired || 0 }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchCandidateStatus } from '@/api/report'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'TimeToHire',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Published: 'success',
        Draft: 'info',
        Closed: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      // listLoading: true
      listLoading: false
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCandidateStatus(this.accountId).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.title {
  color: #182642;
  line-height: 1.25;
  text-decoration: none;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 300;
}
</style>
