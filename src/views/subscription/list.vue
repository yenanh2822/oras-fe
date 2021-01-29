<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" :label="$t('package.no')" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (listQuery.page - 1)*listQuery.limit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.name')" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
          <!-- <el-tag>{{ row.title }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.tag')" width="150px" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{ row.name }}</span> -->
          <el-tag v-if="row.tag">{{ row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.desc')" min-width="150px">
        <template slot-scope="{row}">
          <span style="white-space: nowrap">{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.numOfPost')" align="center" width="135px">
        <template slot-scope="{row}">
          <span>{{ row.numOfPost }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.duration')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.duration }} days</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.price')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.currency | currencyFilter }} {{ row.price | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('package.status')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.active | statusFilter">
            {{ row.active ? 'Active' : 'Inactive' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('package.actions')" width="150px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/subscription/edit/'+scope.row.id">
            <el-tooltip :content="$t('package.ttEdit')" placement="top">
              <el-button type="primary" size="small" icon="el-icon-edit" style="margin-right: 10px">
                <!-- Edit -->
              </el-button>
            </el-tooltip>
          </router-link>
          <el-tooltip :content="$t('package.ttDeactivate')" placement="top">
            <el-button v-if="scope.row.active" type="danger" size="small" icon="el-icon-remove-outline" @click="confirmDialog = true; rowId = scope.row.id">
              <!-- Deactivate -->
            </el-button>
          </el-tooltip>
          <el-tooltip :content="$t('package.ttActivate')" placement="top">
            <el-button v-if="!scope.row.active" type="success" size="small" icon="el-icon-circle-check" @click="handleActivatePackage(scope.row.id)">
              <!-- Activate -->
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="confirmDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="'warning'" /> Confirmation</span>
      <p class="message">Do you really want to deactivate this package?</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false; listLoading = false">
          Cancel
        </el-button>
        <el-button type="danger" :loading="listLoading" @click="handleDeactivatePackage(rowId)">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
// import { fetchJobList } from '@/api/job'
import Pagination from '@/components/Pagination'
import { fetchPackageList } from '@/api/package'
import { deactivatePackage, activatePackage } from '../../api/package' // Secondary package based on el-pagination

export default {
  name: 'PackageList',
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      rowId: undefined,
      confirmDialog: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchPackageList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleDeactivatePackage(id) {
      this.listLoading = true
      deactivatePackage(id).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deactivate package successfully',
          type: 'success',
          duration: 2000
        })
        this.listLoading = false
        this.confirmDialog = false
        this.getList()
      })
    },
    handleActivatePackage(id) {
      activatePackage(id).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deactivate package successfully',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
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
