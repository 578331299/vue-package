<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;align-item:center">
            <el-form-item label="姓名">
              <el-input
                v-model="formTrafficFlowAnalysis.xm"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-end;align-item:center">
            <el-form-item label="用户名">
              <el-input
                v-model="formTrafficFlowAnalysis.yhm"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-end;align-item:center">
            <el-form-item label="手机号码">
              <el-input
                v-model="formTrafficFlowAnalysis.dhhm"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;align-item:center">
            <el-form-item>
              <el-button type="primary" @click="axiosGetData(1)">查询</el-button>

              <el-button type="primary" @click="handleadd">新增</el-button>
              <el-button type="primary" @click="resetData">重置</el-button>
              <el-button type="primary" @click="delateData(null)">批量删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 114px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column fixed prop="yhm" label="用户名" align="center"></el-table-column>
          <!--<el-table-column prop="name" label="用户昵称" align="center"></el-table-column>-->
          <el-table-column prop="xm" label="姓名" align="center"></el-table-column>
          <el-table-column prop="xb" label="性别" align="center"></el-table-column>
          <el-table-column prop="sjhm" label="手机号码" align="center"></el-table-column>
          <el-table-column prop="dzyx" label="电子邮箱" align="center"></el-table-column>
          <el-table-column prop="cjsj" label="更新时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <!--<el-button type="text" size="small">新增</el-button>-->
              <el-button @click="delateData(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="position: absolute; bottom:10px;right: 20px;"
        ></el-pagination>
      </div>
    </div>
    <user :title="title" :rowData="rowData" :sidebar="sidebar"></user>
  </div>
</template>

<script>
import user from "../common/user.vue";
export default {
  name: "UserManagement",
  components: {
    user
  },
  computed: {
    userShow() {
      return this.$store.state.userShow;
    }
  },
  data() {
    return {
      formTrafficFlowAnalysis: { xm: "", yhm: "", dhhm: "" },
      total: 10,
      title: "",
      routeText: "",
      sidebar: "",
      pageSize: 10,
      currentPage4: 1,
      tableData: [],
      rowData: {},
      multipleSelection: [],
      delateID: []
    };
  },
  created() {
    this.sidebar = this.$route.meta.title;
    //console.log(this.$route.meta.title);
    this.axiosGetData();
  },

  watch: {
    userShow(newVal, oldVal) {
      if (!newVal) {
        this.axiosGetData();
      }
    }
  },
  methods: {
    /**
     * @description 用户信息编辑
     * @author lifei
     * @version 2019.5.28
     */
    handleClick(row) {
      //this.$refs.adminNav.axiosGetData(row);
      this.title = "编辑用户信息";
      this.rowData = row;
      this.$store.commit("changeUserShow");
    },
    /**
     * @description 用户新增模块调用
     * @author lifei
     * @version 2019.5.28
     */
    handleadd() {
      this.title = "新增用户信息";
      this.$store.commit("changeUserShow");
    },
    /**
     * @description 每页数据显示条数
     * @author lifei
     * @version 2019.5.28
     */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 跳转分页
     * @author lifei
     * @version 2019.5.28
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 搜索与初始化数据显示接口
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData(num) {
      if (num === 1) {
        this.currentPage4 = 1;
      }
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/user/getPage",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          xm: that.formTrafficFlowAnalysis.xm,
          yhm: that.formTrafficFlowAnalysis.yhm,
          sjhm: that.formTrafficFlowAnalysis.dhhm
        }
      })
        .then(function(res) {
          loadingObj.close();
          //console.log(res);
          if (res.data.data.list) {
            for (let i = 0; i < res.data.data.list.length; i++) {
              if (res.data.data.list[i].xb == 0) {
                res.data.data.list[i].xb = "男";
              } else {
                res.data.data.list[i].xb = "女";
              }
            }
            that.tableData = res.data.data.list;
            that.total = res.data.data.total;
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 删除数据
     * @author lifei
     * @version 2019.5.28
     */
    delate(row) {
      let that = this;
      let formdata = new FormData();
      formdata.append("userIds", row);
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "POST",
            url: "/serveApi/hbj/user/deleteUserById",
            data: formdata
          })
            .then(function(res) {
              console.log(res);
              if (res.data.data === "error") {
                that.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              } else {
                that.axiosGetData();
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(function(err) {
              that.$message({
                type: "warning",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * @description 多选设置ID
     * @author lifei
     * @version 2019.5.28
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delateID = [];
      for (let i = 0; i < val.length; i++) {
        this.delateID.push(val[i].id);
      }
    },
    /**
     * @description 删除数据调用
     * @author lifei
     * @version 2019.5.28
     */
    delateData(rowdata) {
      if (rowdata === null) {
        this.delate(this.delateID);
      } else {
        let arr = [rowdata.id];
        this.delate(arr);
      }
    },
    /**
     * @description 重置功能
     * @author lifei
     * @version 2019.5.28
     */
    resetData() {
      let keys_ = Object.keys(this.formTrafficFlowAnalysis);
      for (let i = 0; i < keys_.length; i++) {
        this.formTrafficFlowAnalysis[keys_[i]] = "";
      }
    }
  }
};
</script>

<style scoped>
.user-content-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
}
.label-div {
  margin-right: 5px;
}
</style>

