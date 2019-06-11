<template>
  <div class="content_box" style="width:100%;height:95%;">
    <div class="button-div">
      <el-button type="primary" @click="formDataMuchShow">新增</el-button>
      <el-button type="primary" @click="lookNumber">查看限行尾号规则</el-button>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 60px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed prop="qsxxrq" label="起始限行日期" align="center"></el-table-column>
          <el-table-column prop="jzxxrq" label="截止限行日期" align="center"></el-table-column>
          <el-table-column prop="ksxxsj" label="开始限行时间" align="center" width="150px"></el-table-column>
          <el-table-column prop="jsxxsj" label="结束限行时间" align="center"></el-table-column>
          <el-table-column prop="xxqy" label="限行区域" align="center"></el-table-column>
          <el-table-column prop="xxgzmc" label="限行规则" align="center"></el-table-column>
          <el-table-column prop="pwcl" label="排外车辆" align="center"></el-table-column>
          <el-table-column prop="fbrq" label="发布日期" align="center"></el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column prop="whr" label="维护人" align="center"></el-table-column>
          <el-table-column prop="sfqy" label="是否启用" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.sfqy == 1 ? '#909399' : 'red'}"
              >{{scope.row.sfqy==1 ? "是" : "否"}}</a>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template scope="scope">
              <el-button
                @click="SubmitPolice(scope.row)"
                :disabled="scope.row.sfqy == 1"
                type="text"
                size="small"
              >启用</el-button>
              <el-button type="text" size="small" @click="delateData(scope.row)">刪除</el-button>
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
    <form-data-much
      ref="formDataMuchShowDom"
      :title="title"
      :sidebar="sidebar"
      :rowData="rowData"
      :saveDataForm="saveDataForm"
    ></form-data-much>
    <look-car-number ref="lookCarNumber"></look-car-number>
    <!--<add-look-car-number ref="addLookCarNumber" :addLookCarNumberShow="addLookCarNumberShow"></add-look-car-number>-->
  </div>
</template>


<script>
import formDataMuch from "../../common/formDataMuch.vue";
import lookCarNumber from "../../common/lookCarNumber.vue";
import addLookCarNumber from "../../common/addLookCarNumber.vue";
export default {
  name: "LimitRule",
  components: {},
  data() {
    return {
      addLookCarNumberShow: true,
      SmokyCarManagement: {
        number: "",
        type: "",
        startTime: "",
        endTime: ""
      },
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "限行规则",
      tableData: [],
      multipleSelection: [],
      updataID: [],
      title: "",
      rowData: [
        {
          type: "input",
          lable: "厂商",
          val: "",
          keys: "name",
          alertText: "输入汉字或字母或数字",
          check: true,
          textShow: false,
          nameRef: "nameRef",
          placeholder: "",
          ref: "end",
          regular: /^[\w\u4E00-\u9FA5]{1,30}$/
        },
        {
          type: "date",
          lable: "选择开始日期",
          val: "",
          keys: "name",
          alertText: "输入汉字或字母或数字",
          check: false,
          textShow: false,
          nameRef: "nameRef",
          ref: "end",
          placeholder: "",
          regular: /^[\w\u4E00-\u9FA5]{1,30}$/
        }
      ],
      saveDataForm: {
        url: "/serveApi/hbj/interface/addFirm"
      }
    };
  },
  components: {
    formDataMuch,
    lookCarNumber
  },
  mounted() {
    this.axiosGetData();
    //this.carCalorfun("XXGZ");
  },
  methods: {
    /**
     * @description 当页数据显示条数
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
     * @description 启用调用函数
     * @author lifei
     * @version 2019.5.28
     */
    SubmitPolice(row) {
      let that = this;
      let obj = {};
      obj.id = row.id;
      obj.sidebar = this.sidebar;

      this.$confirm("此操作将启用此限行规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/serveApi/hbj/restrictRule/trunOn",
            headers: {
              "Content-Type": "application/json"
            },
            data: JSON.stringify(obj)
          })
            .then(function(res) {
              that.axiosGetData();
            })
            .catch(function(err) {
              that.$message({
                type: "warning",
                message: "数据加载失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    /**
     * @description 搜索与初始化数据显示
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData() {
      let that = this;
      let obj = {};
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/restrictRule/findRuleByPage",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: {
          siderbar: "限行规则",
          pageSize: this.pageSize,
          pageNum: this.currentPage4
        }
      })
        .then(function(res) {
          //console.log(res);
          if (res.data.data.list) {
            that.tableData = res.data.data.list;
            //console.log(res.data.data.data);
            that.total = res.data.data.total;
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 重置
     * @author lifei
     * @version 2019.5.28
     */
    resetData() {
      let keys_ = Object.keys(this.SmokyCarManagement);
      for (let i = 0; i < keys_.length; i++) {
        this.SmokyCarManagement[keys_[i]] = "";
      }
    },
    /**
     * @description 多选功能
     * @author lifei
     * @version 2019.5.28
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.updataID = [];
      for (let i = 0; i < val.length; i++) {
        this.updataID.push(val[i].id);
      }
    },
    /**
     * @description 新增限行规则
     * @author lifei
     * @version 2019.5.28
     */
    formDataMuchShow() {
      //alert()
      this.title = "新增限行";
      this.$refs.formDataMuchShowDom.handleClose();
    },
    /**
     * @description 删除调用
     * @author lifei
     * @version 2019.5.28
     */
    delateData(rowData) {
      let that = this;
      let obj = {};
      obj.id = rowData.id;
      obj.sidebar = this.sidebar;

      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/serveApi/hbj/restrictRule/delete",
            headers: {
              "Content-Type": "application/json"
            },
            data: JSON.stringify(obj)
          })
            .then(function(res) {
              that.$message({
                type: "success",
                message: "数据刪除成功!"
              });
              that.axiosGetData();
            })
            .catch(function(err) {
              that.$message({
                type: "warning",
                message: "数据刪除失败!"
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
     * @description 查看限行尾号规则
     * @author lifei
     * @version 2019.5.28
     */
    lookNumber() {
      this.$refs.lookCarNumber.handleClose();
      //this.$refs.addLookCarNumber.clouseLook();
    }
  }
};
</script>

<style scoped>
.button-div {
  text-align: right;
  padding: 20px 20px 0 0;
}
.head_pic {
  width: 100%;
  height: 30px;
}
</style>

