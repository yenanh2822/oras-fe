<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <div class="title-container">
          <strong style="font-size: 36px">{{ $t('package.title') }}</strong><br>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
        <div class="filter-container">
          <el-input v-model="listQuery.name" :maxlength="fmaxLength.nameLength" :placeholder="$t('package.fullname')" style="width: 250px; margin-right: 10px" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-select v-model="listQuery.package" :placeholder="$t('package.plPackage')" clearable class="filter-item" style="width: 130px; margin-right: 10px" @change="handleFilter">
            <el-option v-for="item in packOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select v-model="listQuery.status" :placeholder="$t('package.status')" clearable class="filter-item" style="width: 130px; margin-right: 10px" @change="handleFilter">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-right: 10px" @click="handleFilter">
            {{ $t('btn.search') }}
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @sort-change="sortChange">
      <el-table-column align="center" :label="$t('package.no')" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (listQuery.page - 1)*listQuery.limit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.account')" prop="fullname" sortable="custom" :class-name="getSortClass('fullname')" min-width="200px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.accountById.fullname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.company')" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.accountById.companyById.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.name')" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.packageById.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.rmPost')" prop="numOfPost" sortable="custom" :class-name="getSortClass('numOfPost')" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.numOfPost }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.price')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.packageById.currency | currencyFilter }}{{ row.packageById.price }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.purchaseDate')" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.purchaseById && new Date(row.purchaseById.purchaseDate).toLocaleString('en-GB') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.validTo')" prop="validTo" sortable="custom" :class-name="getSortClass('validTo')" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ new Date(row.validTo).toLocaleString('en-GB') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.status')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.expired | statusFilter">
            {{ row.expired ? $t('package.expired') : $t('package.valid') }}
          </el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column align="center" :label="Actions" width="150px" class-name="small-padding fixed-width">-->
      <!--        <template slot-scope="scope">-->
      <!--          <router-link :to="'/purchase/detail/'+scope.row.id">-->
      <!--            <el-button type="primary" size="small" icon="el-icon-s-order">-->
      <!--              &lt;!&ndash; View purchase detail &ndash;&gt;-->
      <!--            </el-button>-->
      <!--          </router-link>-->
      <!--        </template>-->
      <!-- <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='open'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!='closed'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template> -->
      <!--      </el-table-column>-->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
// import { fetchJobList } from '@/api/job'
import Pagination from '@/components/Pagination'
import { fetchAccountPackageWithPagination } from '@/api/package'
import { maxLength } from '../../store' // Secondary package based on el-pagination

export default {
  name: 'PackageList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        false: 'success',
        true: 'danger'
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
        package: '',
        sort: '-validTo'
      },
      sortNameTemp: 'descending',
      sortPostTemp: 'descending',
      sortDateTemp: 'descending',
      statusOptions: ['Valid', 'Expired'],
      packOptions: ['START', 'LITE', 'STANDARD', 'PRO']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchAccountPackageWithPagination(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
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
      } else if (prop === 'validTo') {
        if (this.sortDateTemp === 'ascending') {
          this.sortDateTemp = 'descending'
        } else {
          this.sortDateTemp = 'ascending'
        }
        console.log(order, this.sortDateTemp)
        this.sortByDate(this.sortDateTemp)
      } else if (prop === 'numOfPost') {
        if (this.sortPostTemp === 'ascending') {
          this.sortPostTemp = 'descending'
        } else {
          this.sortPostTemp = 'ascending'
        }
        console.log(order, this.sortPostTemp)
        this.sortByPost(this.sortPostTemp)
      }
    },
    sortByName(order) {
      console.log('sortByName')
      if (order === 'ascending') {
        this.listQuery.sort = '+accountById.fullname'
      } else {
        this.listQuery.sort = '-accountById.fullname'
      }
      this.handleFilter()
    },
    sortByDate(order) {
      console.log('sortByDate')
      if (order === 'ascending') {
        this.listQuery.sort = '+validTo'
      } else {
        this.listQuery.sort = '-validTo'
      }
      this.handleFilter()
    },
    sortByPost(order) {
      console.log('sortByPost')
      if (order === 'ascending') {
        this.listQuery.sort = '+numOfPost'
      } else {
        this.listQuery.sort = '-numOfPost'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      if (key === 'fullname') {
        key = 'accountById.fullname'
      }
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
</style>
