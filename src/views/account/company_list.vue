<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <div class="title-container">
          <strong style="font-size: 36px">{{ $t('account.cTitle') }}</strong><br>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
        <div class="filter-container">
          <el-input v-model="listQuery.name" :maxlength="fmaxLength.compNameLength" :placeholder="$t('account.compName')" style="width: 250px; margin-right: 10px" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-select v-model="listQuery.status" :placeholder="$t('account.status')" clearable class="filter-item" style="width: 130px; margin-right: 10px" @change="handleFilter">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-right: 10px" @click="handleFilter">
            {{ $t('btn.search') }}
          </el-button>
          <!-- <router-link :to="'/job/create'">
            <el-button class="filter-item" type="primary" icon="el-icon-edit">
              New
            </el-button>
          </router-link> -->
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @sort-change="sortChange">
      <el-table-column align="center" :label="$t('account.no')" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (listQuery.page - 1)*listQuery.limit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="250px" :label="$t('account.compName')" align="left" prop="name" sortable="custom" :class-name="getSortClass('name')">
        <template slot-scope="{row}">
          <div class="link-type" @click="viewDetail(row)">
            <span>{{ row && row.companyById.name }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" :label="$t('account.registrant')">
        <template slot-scope="{row}">
          <div class="link-type" @click="viewAccountDetail(row)">
            <span>{{ row && row.fullname }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" :label="$t('account.location')">
        <template slot-scope="{row}">
          <span>{{ row && row.companyById.location }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" :label="$t('account.compEmail')">
        <template slot-scope="{row}">
          <span>{{ row && row.companyById.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" :label="$t('account.phoneNo')">
        <template slot-scope="{row}">
          <span>{{ row && row.companyById.phoneNo }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" :label="$t('account.tax')">
        <template slot-scope="{row}">
          <span>{{ row && row.companyById.taxCode }}</span>
        </template>
      </el-table-column>

      <el-table-column width="170px" align="center" :label="$t('account.modifyDate')" prop="modifyDate" sortable="custom" :class-name="getSortClass('modifyDate')">
        <template slot-scope="{row}">
          <span>{{ (new Date(row.companyById.modifyDate)).toLocaleString('en-GB') }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('account.status')" width="120">
        <template slot-scope="{row}">
          <el-tag :type="row.buffCompany ? 'warning' : row.companyById.verified | statusFilter">
            {{ row.buffCompany ? 'Modified' : row.companyById.verified ? 'Verified' : 'Unverified' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('account.actions')" width="100px">
        <template slot-scope="scope">
          <router-link :to="'/account/company/edit/'+ (scope.row && scope.row.companyById.id)">
            <el-button type="primary" size="small" icon="el-icon-edit">
              <!-- Edit -->
            </el-button>
          </router-link>
          <!-- <router-link :to="'/account/edit/'+scope.row.id">
            <el-button v-if="scope.row.verified===false" type="success" size="small" icon="el-icon-check">
              Edit
            </el-button>
          </router-link> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Company Detail" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <h2 v-if="temp.buffCompany" style="margin-left: 50px">Current information</h2>
          <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 90%; margin-left:50px;">
            <el-form-item :label="$t('account.compName') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.companyById.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.location') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.companyById.location }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.compEmail') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.companyById.email }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.phoneNo') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.companyById.phoneNo }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.tax') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.companyById.taxCode }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.desc') + ':'" label-width="150px" style="margin-bottom: 0px;">
              <span v-html="temp.companyById.description" />
            </el-form-item>
            <el-form-item :label="$t('account.createDate') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ (new Date(temp.createDate)).toLocaleString('en-GB') }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.status') + ':'" label-width="150px" style="margin-bottom: 0px">
              <el-tag :type="temp.buffCompany ? 'warning' : temp.companyById.verified | statusFilter">
                {{ temp.buffCompany ? 'Modified' : temp.companyById.verified ? 'Verified' : 'Unverified' }}
              </el-tag>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col v-if="temp.buffCompany" :span="12">
          <h2>Modified information</h2>
          <el-form ref="dataForm" label-position="left" style="width: 100%;">
            <el-form-item style="margin-bottom: 0px">
              <span :class="temp.companyById.name !== temp.buffCompany.name && 'modified'">{{ temp.buffCompany.name }}</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px">
              <span :class="temp.companyById.location !== temp.buffCompany.location && 'modified'">{{ temp.buffCompany.location }}</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px">
              <span :class="temp.companyById.email !== temp.buffCompany.email && 'modified'">{{ temp.buffCompany.email }}</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px">
              <span :class="temp.companyById.phoneNo !== temp.buffCompany.phoneNo && 'modified'">{{ temp.buffCompany.phoneNo }}</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px">
              <span :class="temp.companyById.taxCode !== temp.buffCompany.taxCode && 'modified'">{{ temp.buffCompany.taxCode }}</span>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
              <span :class="temp.companyById.description !== temp.buffCompany.description && 'modified'" v-html="temp.buffCompany.description" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('btn.close') }}
        </el-button>
        <el-button v-if="temp.buffCompany" type="danger" :loading="listLoading" @click="handleReject(temp.companyById.id, temp.email)">
          {{ $t('btn.reject') }}
        </el-button>
        <el-button v-if="!temp.companyById.verified" type="success" :loading="listLoading" @click="handleVerifyCompany(temp.companyById.id, temp.email)">
          {{ $t('btn.verify') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Account Detail" :visible.sync="dialogAccountVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 90%; margin-left:50px;">
            <el-form-item :label="$t('account.fullname') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.fullname }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.email') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.email }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.phoneNo') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ temp.phoneNo }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.createDate') + ':'" label-width="150px" style="margin-bottom: 0px">
              <span>{{ (new Date(temp.createDate)).toLocaleString('en-GB') }}</span>
            </el-form-item>
            <el-form-item :label="$t('account.status') + ':'" label-width="150px" style="margin-bottom: 0px">
              <el-tag :type="temp.active | statusFilter">
                {{ temp.active ? 'Active' : 'Inactive' }}
              </el-tag>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAccountVisible = false">
          {{ $t('btn.close') }}
        </el-button>
      </div>
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCompanyList" />
  </div>
</template>

<script>
import { fetchCompanyListWithPagination, rejectCompany } from '@/api/account'
import Pagination from '@/components/Pagination'
import { verifyCompany } from '../../api/account'
import { maxLength } from '../../store' // Secondary package based on el-pagination

export default {
  name: 'AccountList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger',
        'warning': 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      fmaxLength: maxLength,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        status: '',
        role: '',
        sort: '-modifyDate'
      },
      sortNameTemp: 'ascending',
      sortDateTemp: 'descending',
      statusOptions: ['Verified', 'Unverified'],
      temp: {
        id: undefined,
        buffCompany: null,
        active: false,
        companyById: {},
        confirmMail: 0,
        createDate: '',
        email: '',
        fullname: '',
        phoneNo: '',
        role: ''
      },
      dialogFormVisible: false,
      dialogAccountVisible: false
    }
  },
  computed: {
    email() {
      return this.$store.state.user.username
    }
  },
  created() {
    this.getCompanyList()
  },
  methods: {
    getCompanyList() {
      this.listLoading = true
      fetchCompanyListWithPagination(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    viewDetail(temp) {
      this.temp = Object.assign({}, temp) // copy obj
      this.dialogFormVisible = true
    },
    viewAccountDetail(temp) {
      this.temp = Object.assign({}, temp) // copy obj
      this.dialogAccountVisible = true
    },
    handleVerifyCompany(id, email) {
      this.listLoading = true
      verifyCompany(id, email).then(() => {
        this.listLoading = false
        this.dialogFormVisible = false
        this.getCompanyList()
        this.$notify({
          title: 'Success',
          message: 'Verify company successfully!',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleReject(id, email) {
      this.listLoading = true
      rejectCompany(id, email).then(() => {
        this.listLoading = false
        this.dialogFormVisible = false
        this.getCompanyList()
      })
    },
    sortChange(data) {
      var { prop, order } = data
      if (prop === 'name') {
        if (this.sortNameTemp === 'ascending') {
          this.sortNameTemp = 'descending'
        } else {
          this.sortNameTemp = 'ascending'
        }
        console.log(order, this.sortNameTemp)
        this.sortByName(this.sortNameTemp)
      } else if (prop === 'modifyDate') {
        if (this.sortDateTemp === 'ascending') {
          this.sortDateTemp = 'descending'
        } else {
          this.sortDateTemp = 'ascending'
        }
        console.log(order, this.sortDateTemp)
        this.sortByDate(this.sortDateTemp)
      }
    },
    sortByName(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+name'
      } else {
        this.listQuery.sort = '-name'
      }
      this.handleFilter()
    },
    sortByDate(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+modifyDate'
      } else {
        this.listQuery.sort = '-modifyDate'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getCompanyList()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
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
.modified {
  color: red;
}
</style>
