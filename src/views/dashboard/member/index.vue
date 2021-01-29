<template>
  <div class="dashboard-editor-container">
    <el-row>
      <div class="banner-wrapper">
        <banner />
      </div>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px; margin: auto; margin-bottom:30px;">
        <open-job-list />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OpenJobList from './components/OpenJobList'
import Banner from './components/Banner'

export default {
  name: 'DashboardAdmin',
  components: {
    OpenJobList,
    Banner
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

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
