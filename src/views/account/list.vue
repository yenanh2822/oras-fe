<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <div class="title-container">
          <strong style="font-size: 36px">{{ $t('account.title') }}</strong><br>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
        <div class="filter-container">
          <el-input v-model="listQuery.name" :maxlength="fmaxLength.nameLength" :placeholder="$t('account.fullname')" style="width: 250px; margin-right: 10px" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-select v-model="listQuery.status" :placeholder="$t('account.status')" clearable class="filter-item" style="width: 130px; margin-right: 10px" @change="handleFilter">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select v-model="listQuery.role" :placeholder="$t('account.role')" clearable class="filter-item" style="width: 130px; margin-right: 10px" @change="handleFilter">
            <el-option v-for="item in roleOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-right: 10px" @click="handleFilter">
            {{ $t('btn.search') }}
          </el-button>
          <router-link :to="'/account/create'">
            <el-button class="filter-item" type="primary" icon="el-icon-edit">
              {{ $t('btn.new') }}
            </el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @sort-change="sortChange">
      <el-table-column align="center" :label="$t('account.no')" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (listQuery.page - 1)*listQuery.limit }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="180px" align="center" :label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->

      <el-table-column min-width="300px" prop="fullname" sortable="custom" :class-name="getSortClass('fullname')" :label="$t('account.fullname')" align="left">
        <template slot-scope="{row}">
          <router-link :to="'/account/edit/'+row.id" class="link-type">
            <span>{{ row.fullname }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="left" :label="$t('account.email')">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" :label="$t('account.phoneNo')">
        <template slot-scope="{row}">
          <span>{{ row.phoneNo }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" :label="$t('account.role')">
        <template slot-scope="{row}">
          <span>{{ row.role }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" :label="$t('account.createDate')" prop="createDate" sortable="custom" :class-name="getSortClass('createDate')">
        <template slot-scope="{row}">
          <span>{{ (new Date(row.createDate)).toLocaleString('en-GB') }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('account.status')" width="150">
        <template slot-scope="{row}">
          <el-tag :type="row.active | statusFilter">
            {{ row.active ? 'Active' : 'Inactive' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="left" width="120">
        <template slot-scope="scope">
          <!-- <router-link :to="'/account/edit/'+scope.row.id">
            <el-tooltip content="Edit account" placement="top" style="margin-right: 10px">
              <el-button type="primary" size="small" icon="el-icon-edit">
                Edit
              </el-button>
            </el-tooltip>
          </router-link> -->
          <el-tooltip :content="$t('account.ttDeactivate')" placement="top">
            <el-button v-if="scope.row.active" type="danger" size="small" icon="el-icon-remove-outline" @click="confirmDialog = true; action = 'deactivate'; rowId = scope.row.id">
            <!-- Deactivate account -->
            </el-button>
          </el-tooltip>
          <el-tooltip :content="$t('account.ttActivate')" placement="top">
            <el-button v-if="!scope.row.active" type="success" size="small" icon="el-icon-circle-check" @click="handleActivateAccount(scope.row.id)">
            <!-- Activate account -->
            </el-button>
          </el-tooltip>
          <el-tooltip :content="$t('account.ttReset')" placement="top" style="margin-right: 0px">
            <el-button v-if="scope.row.active" type="info" size="small" icon="el-icon-refresh-left" @click="confirmDialog = true; action = 'reset'; rowId = scope.row.email">
            <!-- Reset password -->
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="confirmDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="'warning'" /> {{ $t('account.dlTitle') }}</span>
      <p v-if="action === 'deactivate'" class="message">{{ $t('account.msgDeactivate') }}</p>
      <p v-if="action === 'reset'" class="message">{{ $t('account.msgReset') }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false; btnLoading = false">
          {{ $t('btn.cancel') }}
        </el-button>
        <el-button type="danger" :loading="btnLoading" @click="action === 'deactivate' ? handleDeactivateAccount(rowId) : handleResetPassword(rowId)">
          {{ $t('btn.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="hasError ? 'failed' : 'success'" /> {{ dialogTitle }}</span>
      <p class="message" v-html="message" />
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAccountList" />
  </div>
</template>

<script>
import { fetchAccountListWithPagination } from '@/api/account'
import { resetPassword, activateAccount, deactivateAccount } from '@/api/user'
import Pagination from '@/components/Pagination'
import { maxLength } from '../../store' // Secondary package based on el-pagination

export default {
  name: 'AccountList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
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
        sort: '-createDate'
      },
      sortCreateTemp: 'descending',
      sortNameTemp: 'descending',
      statusOptions: ['Active', 'Inactive'],
      roleOptions: ['admin', 'user'],
      dialogTitle: '',
      message: '',
      showDialog: false,
      hasError: false,
      action: undefined,
      btnLoading: false,
      rowId: undefined,
      confirmDialog: false
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    }
  },
  created() {
    this.getAccountList()
  },
  methods: {
    getAccountList() {
      this.listLoading = true
      fetchAccountListWithPagination(this.listQuery).then(response => {
        this.list = response.data.data.filter(acc => acc.id !== this.accountId)
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleResetPassword(email) {
      this.btnLoading = true
      resetPassword(email)
        .then(() => {
          this.$notify({
            title: 'Success',
            message: 'Reset the password successfully',
            type: 'success',
            duration: 2000
          })
          this.confirmDialog = false
          this.btnLoading = false
          this.getAccountList()
        })
        .catch(err => {
          this.dialogTitle = 'Something went wrong!'
          this.hasError = true
          if (err.response.data.status === 400) {
            this.message = 'The email you entered is not registered in our system.<br>Please try again!'
          }
          this.showDialog = true
          this.loading = false
        })
    },
    handleDeactivateAccount(id) {
      this.btnLoading = true
      deactivateAccount(id)
        .then(response => {
          this.$notify({
            title: 'Success',
            message: 'Deactivate account successfully',
            type: 'success',
            duration: 2000
          })
          this.confirmDialog = false
          this.btnLoading = false
          this.getAccountList()
        })
        .catch(err => {
          this.dialogTitle = 'Something went wrong!'
          this.hasError = true
          if (err.response.data.status === 400) {
            this.message = 'The email you entered is not registered in our system.<br>Please try again!'
          }
          this.showDialog = true
          this.loading = false
        })
    },
    handleActivateAccount(id) {
      this.btnLoading = true
      activateAccount(id)
        .then(response => {
          this.$notify({
            title: 'Success',
            message: 'Activate account successfully',
            type: 'success',
            duration: 2000
          })
          this.btnLoading = false
          this.getAccountList()
        })
        .catch(err => {
          this.dialogTitle = 'Something went wrong!'
          this.hasError = true
          if (err.response.data.status === 400) {
            this.message = 'The email you entered is not registered in our system.<br>Please try again!'
          }
          this.showDialog = true
          this.loading = false
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
      } else if (prop === 'createDate') {
        if (this.sortCreateTemp === 'ascending') {
          this.sortCreateTemp = 'descending'
        } else {
          this.sortCreateTemp = 'ascending'
        }
        console.log(order, this.sortCreateTemp)
        this.sortByCreate(this.sortCreateTemp)
      }
    },
    sortByCreate(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+createDate'
      } else {
        this.listQuery.sort = '-createDate'
      }
      this.handleFilter()
    },
    sortByName(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+fullname'
      } else {
        this.listQuery.sort = '-fullname'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getAccountList()
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

.message {
  margin-left: 10px;
  font-size: 1.15em;
}
</style>
