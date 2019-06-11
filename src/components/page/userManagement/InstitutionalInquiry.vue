<template>
  <div style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="16" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="机构名称">
              <el-input
                v-model="formTrafficFlowAnalysis.name"
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
          <el-table-column prop="name" label="机构名称" align="center"></el-table-column>
          <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
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
    <add-mechanism ref="addMechanismDom" :title="title" :rowData="rowData" :sidebar="sidebar"></add-mechanism>
    <form-data
      ref="formDataShowDom"
      :title="title"
      :sidebar="sidebar"
      :rowData="rowformdata"
      :saveDataForm="saveDataForm"
    ></form-data>
    <admin-nav ref="adminNav" :sidebar="sidebar" :saveUrl="saveUrl"></admin-nav>
  </div>
</template>

<script>
import adminNav from "../../common/adminNav.vue";
import addMechanism from "../../common/addMechanism.vue";
import formData from "../../common/formData.vue";
export default {
  name: "InstitutionalInquiry",
  computed: {
    roleChangeShow() {
      return this.$store.state.roleChangeShow;
    }
  },
  components: {
    adminNav,
    addMechanism,
    formData
  },
  data() {
    return {
      currentPage4: 1,
      formTrafficFlowAnalysis: { name: "" },
      diaSta: false,
      sidebar: "机构管理",
      pageSize: 10,
      total: 1,
      title: "",
      rowData: {},
      tableData: [{}],
      saveUrl: "/serveApi/hbj/department/edit",
      saveDataForm: {
        url: "/serveApi/hbj/ygRemoteSensingLimit/update",
        id: "",
        sidebar: this.sidebar
      },
      rowformdata: [
        {
          type: "input",
          lable: "机构名称",
          val: "",
          keys: "name",
          alertText: "机构名称只能输入3-30汉字字母！",
          check: true,
          textShow: false,
          nameRef: "nameRef",
          mustInput: true,
          ref: "end",
          regular: /^[A-Za-z\u4E00-\u9FA5]{3,20}$/
        }
      ],
      saveDataForm: {
        url: "/serveApi/hbj/department/add"
      }
    };
  },

  mounted() {},
  created() {
    this.axiosGetData();
  },

  methods: {
    /**
     * @description 权限修改
     * @author lifei
     * @version 2019.6.04
     */
    handleClick(row) {
      let axiosGetDataURL = "/serveApi/hbj/department/getDepartmentResource";
      let paramsData = {
        sidebar: "机构管理",
        id: row.id
      };
      this.$refs.adminNav.axiosGetData(row, axiosGetDataURL,paramsData);
      this.$store.commit("changeDiaSta");
    },
    /**
     * @description 分页设置每页条数
     * @author lifei
     * @version 2019.6.04
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 跳转页签
     * @author lifei
     * @version 2019.6.04
     */
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 初始化、搜索数据展示
     * @author lifei
     * @version 2019.6.04
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
        url: "/serveApi/hbj/department/getPage",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          name: that.formTrafficFlowAnalysis.name
        }
      })
        .then(function(res) {
          loadingObj.close();
          console.log(res.data.data);
          if (res.data.data.list) {
            that.tableData = res.data.data.list;
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
     * @description 权限修改
     * @author lifei
     * @version 2019.6.04
     */
    roleChange(rowDataC) {
      this.title = "机构角色修改";

      //this.$store.commit("changeRoleChangeShow");
      this.rowData = rowDataC;
      this.$refs.addMechanismDom.handleClose();
      this.$refs.addMechanismDom.getUserRoleByUser(rowDataC);
    },
    /**
     * @description 添加机构
     * @author lifei
     * @version 2019.5.28
     */
    roleAdd() {
      this.title = "添加机构";
      //this.$store.commit("changeRoleChangeShow");
      //this.$refs.addMechanismDom.handleClose();
      this.$refs.formDataShowDom.handleClose();
    },
    /**
     * @description 删除数据
     * @author lifei
     * @version 2019.5.28
     */
    roledelate(row) {
      let that = this;
      let formdata = {};
      formdata.id = row;
      formdata.sidebar = that.sidebar;
      //  debugger;
      this.$confirm("此操作将永久删除这条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "POST",
            url: "/serveApi/hbj/department/delete",
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
     * @description 设置全选id
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
     * @description 单删与多删调用函数
     * @author lifei
     * @version 2019.5.28
     */
    delateData(rowdata) {
      if (rowdata === null) {
        let arr = [this.delateID];
        this.roledelate(arr);
      } else {
        let arr = [rowdata.id];
        this.roledelate(arr[0]);
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
     * @description 保存权限的数据
     * @author lifei
     * @version 2019.5.28
     */
    adminNavData(idArraw, rowdataId) {
      let formData = {};
      formData.id = rowdataId;
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

