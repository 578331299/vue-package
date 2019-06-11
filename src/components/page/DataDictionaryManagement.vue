<template>
  <div class="content_box"  @keyup.enter.native="showAll">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true" @submit.native.prevent>
        <el-row>
          <el-col :span="16" style="display:flex;justify-content: flex-start;align-item:center">
            <el-form-item label="创建时间起" style="margin">
              <el-date-picker
                @keyup.enter.native="showAll"
                @change="timeCheck('startTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="inputList.cjsjq"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="--创建时间止">
              <el-date-picker
               @keyup.enter.native="showAll"
                @change="timeCheck('endTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="inputList.cjsjz"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="项目内容">
              <el-input v-model="inputList.xmnr"   @keyup.enter.native="showAll" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" style="display:flex;justify-content: flex-start;align-item:center">
            <el-form-item label="修改时间起">
              <el-date-picker
                 @keyup.enter.native="showAll"
                @change="timeCheck2('startTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="inputList.xgsjq"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="--修改时间止">
              <el-date-picker
               @keyup.enter.native="showAll"
                @change="timeCheck2('endTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="inputList.xgsjz"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
    <div class="button_box">
      <el-button type="primary" @click="showAll">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <!-- <el-button type="primary">重置</el-button> -->
      <el-button type="primary" @click="dataAdd">新增</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 164px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
        >
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column fixed prop="id" label="编号" align="center"></el-table-column>
          <el-table-column prop="xmnr" label="项目内容" align="center"></el-table-column>
          <el-table-column prop="sm" label="说明" align="center"></el-table-column>
          <el-table-column prop="ejzz" label="二进制值" align="center"></el-table-column>
          <el-table-column prop="lx" label="类型" align="center"></el-table-column>
          <el-table-column prop="sz" label="数值" align="center"></el-table-column>
          <el-table-column prop="xgsj" label="修改时间" align="center"></el-table-column>
          <el-table-column prop="cjsj" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="xgz" label="修改者" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" align="center">
            <template slot-scope="scope" >
              <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="scope.row.sfkbj==0?true:false">编辑</el-button>
              <el-button type="text" size="small" @click="removeData(scope.row)" :disabled="scope.row.sfkbj==0?true:false">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
         :current-page="logPag.pageNum"
        :page-sizes="[10,20,30]"
        :page-size="logPag.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logPag.total"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
  </div>
</template>
  
  </div>
</template>

<script>
import tableAdd from "../common/dataDictionary/add.vue";
import tableEdit from "../common/dataDictionary/edit.vue";
import vueScroll from "vuescroll";
export default {
  name: "DataDictionaryManagement",
  data() {
    return {
      loading: false,
      inputList: { xmnr: "", cjsjq: "", cjsjz: "", xgsjq: "", xgsjz: "" },
      logPag: { pageNum: 1, total: 0, pagesize: 10 },
      logName: "",
      tableData: [],
      tableAdd: false,
      tableEdit: false,
      tableEditTitle: "数据字典管编辑",
      tableAddTitle: "数据字典管理新增",
      tableTitle: [
        {
          title: "xmnr",
          title_cn: "项目内容",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9\u4e00-\u9fa5]{1,16}$/",
          error_info: "非空且只能输入16位字符",
          placeholder: "只能输入16位字符",
          showMark:true
        },
        {
          title: "sm",
          title_cn: "说明",
          model: "",
          types: "textarea",
          show: true,
          error_message: false
        },
        {
          title: "ejzz",
          title_cn: "二进制值",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "lx",
          title_cn: "类型",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9]{1,30}$/",
          error_info: "*只能输入30位字符",
          placeholder: "非空且只能输入30位字符",
          showMark:true
        },
        {
          title: "sz",
          title_cn: "数值",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\d{1,2}$/",
          error_info: "*只能输入2位数字",
          placeholder: "非空只能输入两位数字",
          showMark:true
        },
        {
          title: "xgsj",
          title_cn: "修改时间",
          model: "",
          types: "text",
          show: false,
          error_message: ""
        },
        {
          model: "",
          show: true,
          error_message: false,
          select_name: "sfkbj",
          title: "sfkbj",
          title_cn: "是否可编辑",
          specialType: true,
          data: [{ xmnr: "是", sz: "1" }, { xmnr: "否", sz: "0" }]
        }
      ],
      tableEditList: [],
      tableEditId: ""
    };
  },
  components: {
    tableAdd,
    tableEdit,
    vueScroll
  },
  created() {
    this.log_search();
    //console.log(this.$store.state.enumSelection.sfkbj)
  },
  methods: {
    showAll(){
      this.logPag.pageNum=1;
      this.log_search();
    },
    reset() {
      for (let i in this.inputList) {
        this.inputList[i]=""
      }
    },
    timeCheck2(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.inputList.xgsjz == "" ||
              this.inputList.xgsjz == "null" ||
              this.inputList.xgsjz == null
            )
          ) {
            let timeBegin = this.inputList.xgsjq.toString();
            let timeEnd = this.inputList.xgsjq.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.inputList.xgsjq = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.inputList.xgsjq == "" ||
              this.inputList.xgsjq == "null" ||
              this.inputList.xgsjq == null
            )
          ) {
            let timeBegin = this.inputList.xgsjq.toString();
            let timeEnd = this.inputList.xgsjz.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.inputList.xgsjz = "";
            }
          }
          break;
      }
    },
    btnEditSubmit(data) {
      //修改提交
      let obj = {};
      let that = this;
      data.forEach(element => {
        obj[element.title] = element.model;
      });
      obj.id = this.tableEditId;
      this.$axios({
        //删除接口
        method: "post",
        url: "/serveApi/hbj/enum/update",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: { siderbar: "数据字典管理" }
      })
        .then(function(data) {
          if (data.data.code == 1) {
            that.$message({
              type: "success",
              message: "修改成功"
            });
            that.log_search();
            that.tableEdit = false;
          } else {
            that.$message({
              message: data.data.msg,
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
    btnAddSubmit(data) {
      //新增提交按钮
      let obj = {};
      let that = this;
      data.forEach(element => {
        obj[element.title] = element.model;
      });
      this.$axios({
        //删除接口
        method: "post",
        url: "/serveApi/hbj/enum/add",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: { siderbar: "数据字典管理" }
      }).then(function(data) {
        //console.log(data.data.code);
        if (data.data.code == 1) {
          that.$message({
            message: "添加成功",
            type: "success"
          });
          that.log_search();
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
    log_search() {
      //分页
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/enum/findByPage",
         headers: {
          "Content-Type": "application/json"
        },
        params: {
          pageNum: this.logPag.pageNum,
          pageSize: this.logPag.pagesize
        },
        data:{
          xmnr: this.inputList.xmnr,
          cjsjq: this.inputList.cjsjq,
          cjsjz: this.inputList.cjsjz,
          xgsjq: this.inputList.xgsjq,
          xgsjz: this.inputList.xgsjz,
          sidebar: "数据字典管理"
        },
       
      })
        .then(function(data) {
          // console.log(data.data.data.list)
          loadingObj.close();
          that.tableData = data.data.data.list;
          that.logPag.total = data.data.data.total;
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },

    handleCurrentChange(val) {
      this.logPag.pageNum = val;
      this.log_search();
    },
    handleSizeChange(val) {
      //改变每页条数
      this.logPag.pagesize = val;
      this.log_search();
    },
    handleClick(row) {
      //点击编辑按钮
      let that = this;
      this.tableEditId = row.id;
      let arr = [];
      let tableTitle2 = JSON.parse(JSON.stringify(this.tableTitle));
      tableTitle2.forEach(ele => {
        if(row[ele["title"]]){
          ele.model = row[ele["title"]].toString();
        }else{
           ele.model='';
        }
        
      });
      this.tableEditList = tableTitle2;

      this.tableEdit = true;
    },
    removeData(data) {
      let that = this;
      //删除字典
      this.$confirm("是否删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          //点击确定
          that
            .$axios({
              //删除接口
              method: "post",
              url: "/serveApi/hbj/enum/delete",
               data:{id:data.id},
              params: {
                sidebar: "数据字典管理"
              },
             
            })
            .then(function(data) {
              if (data.data.code == 1) {
                that.$message({
                  type: "success",
                  message: "删除成功"
                });
                that.log_search();
              }
            })
            .catch(function(err) {
              that.$message("删除失败");
            });
        })
        .catch(() => {
          //取消删除
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.inputList.cjsjz == "" ||
              this.inputList.cjsjz == "null" ||
              this.inputList.cjsjz == null
            )
          ) {
            let timeBegin = this.inputList.cjsjq.toString();
            let timeEnd = this.inputList.cjsjz.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.inputList.cjsjq = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.inputList.cjsjq == "" ||
              this.inputList.cjsjq == "null" ||
              this.inputList.cjsjq == null
            )
          ) {
            let timeBegin = this.inputList.cjsjq.toString();
            let timeEnd = this.inputList.cjsjz.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.inputList.cjsjz = "";
            }
          }
          break;
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

