<template>
  <div>
    <el-dropdown trigger="click">
      <div class="icon">
        <svg-icon class-name="noti-icon" :icon-class="notiList.length !== 0 ? 'notification_new' : 'notification'" />
      </div>
      <el-dropdown-menu v-if="notiList.length !== 0" slot="dropdown">
        <span v-for="(item, index) of notiList" :key="index" @click="updateNotification(item.ids)">
          <router-link :to="item.type ==='Apply' ? '/job/candidates/' + item.jobId : '/account/company'">
            <el-dropdown-item class="dd-item" divided>
              {{ item.type === 'Apply' ? item.numb + ' new applications for the job with title "' + item.jobTitle + '".'
                : item.type === 'Modify' ? item.actor + ' has just changed their company information.'
                  : item.numb + ' new registration(s) to the ORAS.'
              }}<br>- {{ new Date(item.lastModify).toLocaleString('en-GB') }} -
            </el-dropdown-item>
          </router-link>
        </span>
      </el-dropdown-menu>
      <el-dropdown-menu v-if="notiList.length === 0" slot="dropdown">
        <el-dropdown-item class="dd-item">
          No notification.
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getNewNotification, setAsReadNotification } from '@/api/notification'

export default {
  data() {
    return {
      notiList: [],
      timer: ''
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
    console.log('notification created')
    this.fetchNotification()
    this.timer = setInterval(this.fetchNotification, 15000)
  },
  beforeDestroy() {
    console.log('clear timer')
    clearInterval(this.timer)
  },
  methods: {
    fetchNotification() {
      getNewNotification(this.accountId, this.accountRole).then(response => {
        console.log('get notification at ' + new Date())
        this.notiList = response.data
      })
    },
    updateNotification(ids) {
      setAsReadNotification(ids).then(response => {
        console.log(response)
        this.fetchNotification()
      })
    }
  }
}
</script>

<style scoped>
.noti-icon {
  cursor: pointer;
  font-size: 20px;
  vertical-align: middle;
}
.dd-item {
  width: 300px;
}
</style>
