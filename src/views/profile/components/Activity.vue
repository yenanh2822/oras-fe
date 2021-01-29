<template>
  <div class="block timeline-container">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of listActivity" :key="index" :timestamp="(new Date(item.time)).toLocaleDateString('en-GB')" placement="top">
        <el-card>
          <h3>{{ item.title }}</h3>
          <p style="font-style: italic">By {{ item.accountById.fullname }} at {{ (new Date(item.time)).toLocaleString('en-GB') }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { fetchActivities } from '@/api/user'
export default {
  data() {
    return {
      listActivity: null
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    }
  },
  created() {
    this.getActivities()
  },
  methods: {
    getActivities() {
      fetchActivities(this.accountId).then(response => {
        this.listActivity = response.data.sort((a, b) => b.timestamp - a.timestamp)
      })
    }
  }
}
</script>
<style scoped>
.timeline-container{
  max-height: 700px;
  overflow-y: scroll;
}
</style>
