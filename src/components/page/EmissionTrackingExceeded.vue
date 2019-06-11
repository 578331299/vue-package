<template>
  <div class="content_box" style="width:100%;height:95%;">
    <div class="button-div">
      <el-button type="primary" @click="dataAdd">新建黑名单规则</el-button>
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
          <el-table-column prop="gzmc" label="黑名单规则名称" align="center" width="110px"></el-table-column>
          <el-table-column prop="bnncbcs" label="半年内超标次数" align="center" width="110px"></el-table-column>
          <el-table-column prop="zgsftg" label="整改是否未通过" align="center" width="90px">
            <template scope="scope">
              <span>{{scope.row.zgsftg==1 ? "是":"否"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qxnsfzg" label="期限内是否未整改" align="center">
            <template scope="scope">
              <span>{{scope.row.qxnsfzg==1 ? "是" : "否"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ynxxwzcs" label="30日内限行违章次数" align="center"></el-table-column>
          <el-table-column prop="ynhbcwzcs" label="30日内黄标车违章次数" align="center"></el-table-column>
          <el-table-column prop="sfljtjmd" label="是否路检推荐名单" align="center">
            <template scope="scope">
              <span>{{scope.row.sfljtjmd==1 ? "是" : "否"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column prop="cjsj" label="创建时间" align="center" width="160px"></el-table-column>
          <el-table-column prop="cjr" label="创建人" align="center"></el-table-column>
          <el-table-column prop="scqysj" label="最后启用时间" align="center" width="160px"></el-table-column>
          <el-table-column prop="sfqy" label="是否启用" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.sfqy == 1 ? '#909399' : 'red'}"
              >{{scope.row.sfqy==1 ? "是" : "否"}}</a>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="160px">
            <template scope="scope">
              <el-button
                @click="SubmitPolice(scope.row)" 
                :disabled="scope.row.sfqy == 1"
                type="text"
                size="small"
              >启用</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
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
    <table-add
      @dialogClose="closeAdd('add')"
      :diaSta="tableAdd"
      :title="tableAddTitle"
      :updata="tableTitle"
      @btnAdd="btnAddSubmit"
      :names="logName"
    ></table-add>
    <table-edit
      :diaSta="tableEdit"
      :title="tableEditTitle"
      @dialogClose="closeAdd('edit')"
      :editData="tableEditList"
      @btnEdit="btnEditSubmit"
      :names="logName"
    ></table-edit>
  </div>
</template>

<script>
import tableAdd from "../common/EmissionTrackingExceededAdd.vue";
import tableEdit from "../common/blacklistEdit.vue";
export default {
  name: "LimitRule",
  components: {tableAdd,tableEdit},
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
      },
      tableEditId: "",
      tableEditList: [],
      tableAdd: false,
      tableEdit: false,
      tableEditTitle: "黑名单规则维护编辑",
      tableAddTitle:'黑名单规则维护新增',
      logName: "",
      tableTitle: [
        {
          model: "",
          show: true,
          error_message: false,
          title: "gzmc",
          title_cn: "黑名单规则名称",
          showMark:true,
          rules: "/^[a-zA-Z0-9\u4e00-\u9fa5]{1,16}$/",
          error_info: "请输入1~16位字符"
        },
        {
          title: "bnncbcs",
          title_cn: "半年内超标次数",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{1,3}$/",
          error_info: "最多输入3位数字",
          placeholder: "最多输入3位数字",
          showMark:true
        },
        {
          specialType: true,
          title: "zgsftg",
          title_cn: "整改是否未通过",
          model: "",
          show: true,
          showMark:true,
          error_message: false,
          error_info:"请选择期限内整改是否未通过",
          rules: "/^[0-9]{1}$/",
          // rules: "/^[0-9]{0,4}$/",
          data: [
            {
              xmnr: "是",
              sz: "1"
            },
            {
              xmnr: "否",
              sz: "0"
            }
          ]
        },
        {
          specialType: true,
          title: "qxnsfzg",
          title_cn: "期限内是否未整改",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          error_info: "",
          showMark:true,
          error_info:"请选择期限内是否未整改",
          rules: "/^[0-9]{1}$/",
          data: [
            {
              xmnr: "是",
              sz: "1"
            },
            {
              xmnr: "否",
              sz: "0"
            }
          ]
        },
        {
          title: "ynxxwzcs",
          title_cn: "30日内限行违章次数",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{1,2}$/",
          showMark:true,
          error_info: "最多输入2位数字",
          placeholder: "最多输入2位数字"
        },
        {
          title: "ynhbcwzcs",
          title_cn: "30天内容黄标车违章次数",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{1,2}$/",
          showMark:true,
          error_info: "最多输入2位数字",
          placeholder: "最多输入2位数字"
        },
        {
          specialType: true,
          title: "sfljtjmd",
          title_cn: "是否路检推荐名单",
          model: "",
          types: "text",
          show: true,
          showMark:true,
          error_message: false,
          error_info:"请选择是否路检推荐名单",
          rules: "/^[0-9]{1}$/",
          // rules: "/^[0-9]{0,4}$/",
          data: [
            {
              xmnr: "是",
              sz: "1"
            },
            {
              xmnr: "否",
              sz: "0"
            }
          ]
          // error_info: "最多输入4位数字",
          // placeholder: "最多输入4位数字"
        },
        {
          title: "bz",
          title_cn: "备注",
          model: "",
          types: "textarea",
          show: true,
          error_message: false
        }
      ]
    };
  },
  mounted() {
    this.axiosGetData();
    //this.carCalorfun("XXGZ");
  },
  methods: {
     btnAddSubmit(data) {
      //新增提交按钮
      let obj = {};
      let that = this;
      data.forEach(element => {
        obj[element.title] = element.model;
      });
      obj.cjr=localStorage.getItem("ms_username");
      this.$axios({
        //删除接口
        method: "post",
        url: "/serveApi/hbj/blackRule/add",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: { siderbar: "黑名单规则管理" }
      }).then(function(data) {
        if (data.data.code == 1) {
          that.$message({
            message: "添加成功",
            type: "success"
          });
          that.axiosGetData();
          that.tableAdd = false;
        } else {
          that.$message({
            //出错提示
            message: data.data.msg,
            type: "warning"
          });
        }
      });
      // .catch(function(err) {
      //   // alert(err)
      //   that.$message({
      //     type: "error",
      //     message: JSON.stringify(err),
      //     duration: 4000
      //   });
      // });
    },
     dataAdd() {
      //打开新增模态框
      this.tableTitle.forEach(ele => {
        ele.model = "";
      });
      this.tableAdd = true;
    },
    closeAdd(data) {
      //关闭新增模态框
      if (data == "add") {
        this.tableAdd = false;
      } else if (data == "edit") {
        this.tableEdit = false;
      }
    },
    btnEditSubmit(data) {
      //编辑修改后提交
      let obj = {};
      let that = this;
      data.forEach(element => {
        obj[element.title] = element.model;
      });
      obj.id = this.tableEditId;
      // console.log(obj);
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/blackRule/update",
        // url: "http://192.168.1.99:8081/hbj/blackRule/update",
        headers: {
          "Content-Type": "application/json"
        },
        params: { siderbar: "黑名单规则维护" },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          if (res.data.code == 1) {
            that.$message({
              type: "success",
              message: "修改成功"
            });
            that.axiosGetData();
            that.tableEdit = false;
          } else {
            that.tableEdit = false;
            that.axiosGetData();
            that.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          // alert(err)
          that.$message({
            type: "error",
            message: JSON.stringify(err),
            duration: 4000
          });
        });
    },
    handleClick(row) {
      //点击编辑按钮
      this.tableEditId = row.id;
      let tableTitle2 = JSON.parse(JSON.stringify(this.tableTitle));
      tableTitle2.forEach(ele => {
        if (row[ele.title] != null) {
          ele.model = row[ele.title].toString();
        } else {
          ele.model = "";
        }
      });
      // console.log(tableTitle2)
      this.tableEditList = tableTitle2;

      this.tableEdit = true;
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
    SubmitPolice(row) {
      let that = this;
      let obj = {};
      obj.id = row.id;
      obj.sidebar = this.sidebar;
      this.$confirm("是否启用此条规则?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
          this.$axios({
        method: "post",
        url: "/serveApi/hbj/blackRule/trunOn",
        // url: "/serveApi/hbj/restrictRule/trunOn",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          console.log(res);
          that.axiosGetData();
        })
      })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    axiosGetData() {
      let that = this;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let obj = {};
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/blackRule/findByPage",
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
          loadingObj.close();
          if (res.data.data.list) {
            that.tableData = res.data.data.list;
            //console.log(res.data.data.data);
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
    resetData() {
      let keys_ = Object.keys(this.SmokyCarManagement);
      for (let i = 0; i < keys_.length; i++) {
        this.SmokyCarManagement[keys_[i]] = "";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.updataID = [];
      for (let i = 0; i < val.length; i++) {
        this.updataID.push(val[i].id);
      }
    },
    formDataMuchShow() {
      //alert()
      this.title = "新增限行";
      this.$refs.formDataMuchShowDom.handleClose();
    },
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
            url: "/serveApi/hbj/blackRule/delete",
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

