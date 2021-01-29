<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ category, userData, systemData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          left: 'center',
          bottom: '5',
          data: ['User', 'ORAS']
          // data: category
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: category,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          // type: '',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'User',
          type: 'bar',
          barWidth: '35%',
          data: userData,
          animationDuration
        }, {
          name: 'ORAS',
          type: 'bar',
          barWidth: '35%',
          data: systemData,
          animationDuration
        }]
      })
    }
  }
}
</script>
