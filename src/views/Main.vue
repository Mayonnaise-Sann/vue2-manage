<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tag></common-tag>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader";
import CommonTag from "../components/CommonTag.vue";

export default {
  name: "Main",
  components: { CommonAside, CommonHeader, CommonTag },
};
</script>


<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2268c3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  padding-top: 0;
  /* background-color: skyblue; */
}
</style>