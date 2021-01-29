<template>
  <div class="">
    <h2 class="title">Time To Hire</h2>
    <el-table v-if="!list" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="No." width="80" />
      <el-table-column label="Job Title" width="300px" />
      <el-table-column label="Hired Candidate" min-width="300px" />
      <el-table-column label="Apply date" width="200px" align="center" />
      <el-table-column label="Hired date" width="200px" align="center" />
      <el-table-column label="Time To Hire" width="250px" align="center" />
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
      <el-table-column label="No." prop="id" type="index" align="center" width="80">
        <template slot-scope="{scope}">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Job Title" width="300px">
        <template slot-scope="{row}">
          <span>{{ row.jobTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hired Candidate" min-width="300px">
        <template slot-scope="{row}">
          <span>{{ row.hiredCandidate.fullname }} ({{ row.hiredCandidate.email }})</span>
        </template>
      </el-table-column>
      <el-table-column label="Apply Date" width="200px" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{ row.applyDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ (new Date(row.applyDate)).toLocaleString('en-GB') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hired Date" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ (new Date(row.hiredDate)).toLocaleString('en-GB') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time To Hire" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timeToHired }} days</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchHiredList } from '@/api/report'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'TimeToHire',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
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
      fetchHiredList(this.accountId).then(response => {
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
