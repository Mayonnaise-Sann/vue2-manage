<template>
  <header>
    <div>
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
        class="menu-btn"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/" style="display: inline-block">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" alt="user" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("tab/collapseMenu");
    },
    // 退出登录
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("tab/clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>


<style scoped>
.breadcrumb {
  color: #fff;
  font-weight: 800;
}
.menu-btn {
  /* float: left; */
  display: inline-block;
  margin-right: 2em;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 {
  display: inline-block;
  margin: 0 1.15em;
}
.r-content {
  display: flex;
  align-items: center;
}

.user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  cursor: pointer;
}
</style>