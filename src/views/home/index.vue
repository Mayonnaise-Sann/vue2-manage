<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧列 -->
    <el-col :span="8" style="magin-top: 20px">
      <!-- 1. 用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="user" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-4-19</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>

      <!-- 2. 销售表格 -->
      <el-card style="margin-top: 2em">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- 右侧列 -->
    <el-col :span="16">
      <!-- 3. 款项汇总 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!-- 4. 图表区域 -->
      <el-card style="height: 280px">
        <echart :chartData="echartData.order" style="height: 280px"></echart>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <echart :chartData="echartData.user" style="height: 260px"></echart>
        </el-card>
        <el-card style="height: 260px">
          <echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 260px"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// 引入封装的Echarts组件
import Echart from "../../components/Echarts.vue";

// 引入表格数据
import { getData } from "../../api/data.js";

export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      // 表格数据--传给组件
      echartData: {
        // 折线图
        order: {
          xData: [],
          series: [],
        },
        // 用户--柱状图
        user: {
          xData: [],
          series: [],
        },
        // 饼状图
        video: {
          series: [],
        },
      },
      // 左侧表格数据
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      // 右侧汇总表项速览数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code == 20000) {
        this.tableData = data.tableData;

        // 图表数据
        const order = data.orderData;
        // 图表的日期，就是折线图的横坐标
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];

        // 遍历配置echarts的series参数
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        // 1. 折线图
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        // 2. 用户图

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        // 3.饼状图
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
    });
  },
};
</script>


<style >

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>