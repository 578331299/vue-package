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
            <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
            <el-button type="primary" @click="resetData">重置</el-button>

            <el-button type="primary" @click="delateData(null)">批量删除</el-button>
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
          <el-table-column fixed prop="username" label="用户名" align="center"></el-table-column>
          <!--<el-table-column prop="name" label="用户昵称" align="center"></el-table-column>-->
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center"></el-table-column>
          <el-table-column prop="rolename" label="角色" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
          <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑角色</el-button>
              <el-button type="text" @click="delateData(scope.row)" size="small">删除</el-button>
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
    <!--<user-information :title="title" :diaSta="diaSta" @dialogClose="close"></user-information>-->
    <role ref="role" :rowData="rowData" @axiosGetData="axiosGetData"></role>
  </div>
</template>

<script>
import userInformation from "../common/UserRightInformation.vue";
import role from "../common/role.vue";
export default {
  name: "UserRightsManagement",
  methods: {
    handleClick(row) {
      //console.log(row);
      // this.diaSta=true;
      this.rowData = row;
      this.$refs.role.handleClose();
      this.$refs.role.getUserRoleByUser(row);
    },
    close(data) {
      this.diaSta = data;
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
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
        url:
          "/serveApi/hbj/role/getAllUserRole?pageSize=" +
          that.pageSize +
          "&pageNum=" +
          that.currentPage4 +
          "&sidebar=" +
          that.sidebar +
          "&name=" +
          that.formTrafficFlowAnalysis.xm +
          "&username=" +
          that.formTrafficFlowAnalysis.yhm +
          "&phone=" +
          that.formTrafficFlowAnalysis.dhhm
      })
        .then(function(res) {
          if (res.data.data.list) {
            that.tableData = res.data.data.list;
            that.total = res.data.data.total;
          }
          loadingObj.close();
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            message: "很遗憾，数据加载失败！",
            type: "warning"
          });
        });
    },
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delateID = [];
      for (let i = 0; i < val.length; i++) {
        this.delateID.push(val[i].userid);
      }
    },
    delateData(rowdata) {
      if (rowdata === null) {
        this.delate(this.delateID);
      } else {
        let arr = [rowdata.userid];
        this.delate(arr);
      }
    },
    resetData() {
      let keys_ = Object.keys(this.formTrafficFlowAnalysis);
      for (let i = 0; i < keys_.length; i++) {
        this.formTrafficFlowAnalysis[keys_[i]] = "";
      }
    }
  },
  components: { userInformation, role },

  data() {
    return {
      title: "用户权限编辑修改",
      diaSta: false,
      pageSize: 10,
      total: 10,
      formTrafficFlowAnalysis: { xm: "", yhm: "", dhhm: "" },
      currentPage4: 1,
      sidebar: "用户权限管理",
      rowData: {},
      tableData: [
        {
          js: "管理员"
        }
      ]
    };
  },
  mounted() {
    this.axiosGetData();
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

