<template>
  <div class="">
    <!-- 弹窗 -->
    <el-dialog
      :title="operateType == 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
      ></common-form>
      <div slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 控件横栏 -->
    <div class="manage-header">
      <el-button class="add" type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <!-- 表格  -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="deltUser"
      style="height: 600px"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonFrom.vue";
import CommonTable from "../../components/CommonTable.vue";

// 引入请求方法
import {
  sendAddData,
  sendEditData,
  getUser,
  sendDeleteID,
} from "../../api/data.js";

export default {
  name: "user",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      // 是否显示弹窗
      isShow: false,
      // 表单组件中的输入框类型
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      // 输入框数据
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      // 搜索框
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      // 表格表头标签
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      // 表格数据
      tableData: ["546"],
      // 表格配置
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        sendEditData(this.operateForm).then(() => {
          // console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        // this.$http.post("/user/add", this.operateForm).then((res) => {
        //   console.log(res);
        //   this.isShow = false;
        // });
        sendAddData(this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },

    addUser() {
      this.isShow = true;
      (this.operateType = "add"),
        (this.operateForm = {
          name: "",
          addr: "",
          age: "",
          birth: "",
          sex: "",
        });
    },
    // 每次点击分页的页码，或者添加和编辑数据，请求一次table里面的数据进行渲染
    getList(name = "") {
      this.config.loading = true;
      name ? this.config.page : "";

      // 请求数据
      getUser({
        name,
        page: this.config.page,
      }).then(({ data: res }) => {
        // console.log(res);
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        // this.tableData = res.list;
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    // 修改表格数据项
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      //   this.operateForm = row; // 数据回传，弹窗中渲染选中的数据项
      this.operateForm = JSON.parse(JSON.stringify(row));
    },
    // 删除表格数据项
    deltUser(row) {
      // 调用element - ui的$confirm 弹窗
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认回调 -- 调用api
          // const id = row.id;

          // 调用删除api，发送请求
          sendDeleteID(row).then(() => {
            // 删除成功回调-- 弹窗
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
        })
        .catch((err) => err);
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
}
.add {
  margin-bottom: 22px;
}
</style>
