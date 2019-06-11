<template>
  <div style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="16" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="角色名称">
              <el-input
                v-model="formTrafficFlowAnalysis.site"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display:flex;justify-content: center;align-item:center">
            <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
            <el-button type="primary" @click="resetData">重置</el-button>

            <el-button type="primary" @click="roleAdd">新增</el-button>
            <!--<el-button type="primary" @click="delateData(null)">删除</el-button>-->
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
          <!--<el-table-column type="selection" align="center"></el-table-column>-->
          <el-table-column prop="jsmc" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="jsms" label="角色描述" align="center"></el-table-column>
          <el-table-column prop="cjsj" label="创建时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">权限修改</el-button>
              <el-button type="text" @click="roleChange(scope.row)" size="small">角色修改</el-button>
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
    <admin-nav ref="adminNav" :sidebar="sidebar" :saveUrl="saveUrl"></admin-nav>
    <role-change :title="title" :rowData="rowData"></role-change>
  </div>
</template>

<script>
import adminNav from "../common/adminNav.vue";
import roleChange from "../common/roleChange.vue";
export default {
  name: "RoleManagement",
  computed: {
    roleChangeShow() {
      return this.$store.state.roleChangeShow;
    }
  },
  components: {
    adminNav,
    roleChange
  },
  data() {
    return {
      currentPage4: 1,
      formTrafficFlowAnalysis: { site: "" },
      diaSta: false,
      sidebar: "角色管理",
      pageSize: 10,
      total: 1,
      title: "",
      rowData: {},
      tableData: [{}],
      saveUrl: "/serveApi/hbj/resource/setRoleRes"
    };
  },

  mounted() {},
  created() {
    this.axiosGetData();
  },

  methods: {
    /**
     * @description 角色权限修改
     * @author lifei
     * @version 2019.5.28
     */
    handleClick(row) {
      let axiosGetDataURL = "/serveApi/hbj/resource/getRoleRes";
      let paramsData = {
        sidebar: "角色管理",
        roleId: row.id
      };
      this.$refs.adminNav.axiosGetData(row, axiosGetDataURL, paramsData);
      this.$store.commit("changeDiaSta");
    },
    /**
     * @description 设置每页显示数据条数
     * @author lifei
     * @version 2019.5.28
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 分页跳转
     * @author lifei
     * @version 2019.5.28
     */
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 搜索与初始化数据显示
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData(num) {
      if (num === 1) {
        this.currentPage4 = 1;
      }
      let that = this;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/role/getPage",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          jsmc: that.formTrafficFlowAnalysis.site
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.list) {
            that.tableData = res.data.data.list.map(function(item) {
              if (item.jsms == null || item.jsms == "null") {
                item.jsms = "";
              }
              return item;
            });
            that.total = res.data.data.total;
            that.$message({
              type: "success",
              message: "恭喜你，数据加载成功!"
            });
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "很遗憾，数据加载失败!"
          });
        });
    },
    /**
     * @description 角色修改
     * @author lifei
     * @version 2019.5.28
     */
    roleChange(rowDataC) {
      this.title = "角色修改";
      this.rowData = rowDataC;
      this.$store.commit("changeRoleChangeShow");
    },
    /**
     * @description 角色添加
     * @author lifei
     * @version 2019.5.28
     */
    roleAdd() {
      this.title = "添加角色";
      this.$store.commit("changeRoleChangeShow");
    },
    /**
     * @description 角色删除
     * @author lifei
     * @version 2019.5.28
     */
    roledelate(row) {
      let that = this;
      let formdata = new FormData();
      formdata.append("roleId", row);
      formdata.append("sidebar", that.sidebar);
      this.$confirm("此操作将永久删除这条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "POST",
            url: "/serveApi/hbj/role/deleteRole",
            data: formdata
          })
            .then(function(res) {
              console.log(res);
              if (res.data.data === "error") {
                that.$message({
                  type: "warning",
                  message: res.data.msg
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
     * @description 多选
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
     * @description 删除调用
     * @author lifei
     * @version 2019.5.28
     */
    delateData(rowdata) {
      if (rowdata === null) {
        let arr = [this.delateID];
        this.roledelate(arr);
      } else {
        let arr = [rowdata.id];
        this.roledelate(arr);
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
    },
    /**
     * @description 角色权限数据组装
     * @author lifei
     * @version 2019.5.28
     */
    adminNavData(idArraw, rowdataId) {
      let formData = {};
      formData.roleId = rowdataId;
      formData.sidebar = this.sidebar;
      formData.resIds = idArraw.join();
      return formData;
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

