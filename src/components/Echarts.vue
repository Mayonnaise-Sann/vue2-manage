<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from "echarts";

export default {
  props: {
    //   接收两个参数
    //   @isAxisChart参数判断该图表是否为有横坐标类的图表
    isAxisChart: {
      type: Boolean,
      default: true, //默认是折线/柱状图
    },

    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },

  data() {
    return {
      // 有横坐标类图表的option
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      // 无横坐标类图表的option
      noAxisOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      //   接收使用echarts初始化dom元素的变量
      echart: null,
    };
  },
  watch: {
    //   监听图表数据 echartData的变化进行渲染
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true, // 深度监听对象属性
    },
  },
  methods: {
    //   1.初始化图表数据
    initChartData() {
      if (this.isAxisChart) {
        //   有横坐标类
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        //   无横坐标类
        this.noAxisOption.series = this.chartData.series;
      }
    },
    // 2.渲染图表
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.option);
      } else {
        //   未初始化
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.option);
      }
    },
  },
  computed: {
    option() {
      return this.isAxisChart ? this.axisOption : this.noAxisOption;
    },
  },
};
</script>
