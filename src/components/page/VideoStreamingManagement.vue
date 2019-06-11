<template>
   <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true" @submit.native.prevent>
        <el-row >
          <el-col :span="16" style="display:flex;justify-content: center;align-item:center">
            <el-form-item style="margin-right:50px" label="点位名称">
              <el-input v-model="inputList.dwmc" style="width:150px" @keyup.enter.native="log_search"></el-input>
            </el-form-item>
            <el-form-item  style="margin-right:50px"  label="摄像头厂商">
              <el-input v-model="inputList.sxxtscc" style="width:150px" @keyup.enter.native="log_search"></el-input>
            </el-form-item>
            <el-form-item style="margin-right:50px" label="状态">
              <el-input v-model="inputList.zt" style="width:150px" @keyup.enter.native="log_search"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
      <div class="button-div">
             <el-button style="margin-right:50px" type="primary" @click="log_search">查询</el-button>
              <el-button style="margin-right:50px" @click="reset"  type="primary">重置</el-button>
              <el-button style="margin-right:50px" type="primary" @click="dataAdd">新增</el-button>
      </div>
    <table-add
      @dialogClose="close_add('add')"
      :diaSta="tableAdd"
      :title="tableAddTitle"  
      :updata="tableTitle"
      @btnAdd="btnAddSubmit"
      :names="logName"
      :rules="ruled"
    ></table-add>


    <table-edit
      :diaSta="tableEdit"
      :title="tableEditTitle"
      @dialogClose="close_add('edit')"
      :editData="tableEditList"
      @btnEdit="btnEditSubmit"
      :names="logName"
    ></table-edit>
    <div
      class="chare_box"
       style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 164px);margin-bottom:0;"
    >
      <template>
        <div style="height:calc(100% - 45px);overflow: auto">
          <el-table :data="tableData" border style="width: 100%;margin-top:20px;" height="calc(100% - 20px)">
            <!-- <el-table-column type="selection" align="center"></el-table-column> -->
            <el-table-column  prop="bfbh" label="序号" align="center"></el-table-column>
            <el-table-column  prop="dwbh" label="点位编号" v-if="false" align="center" ></el-table-column>
            <el-table-column prop="dwmc" label="点位名称" align="center"></el-table-column>
            <el-table-column prop="ycxbh" label="遥测线编号" align="center"></el-table-column>           
            <el-table-column prop="sxxtscc" label="摄像头厂商" align="center"></el-table-column>
            <el-table-column prop="sxxtxh" label="摄像头型号" align="center"></el-table-column>
            <el-table-column prop="mtgs" label="媒体格式" align="center"></el-table-column>
            <el-table-column prop="bfdz" label="播放地址" align="center"></el-table-column>
            <el-table-column prop="sydk" label="使用端口" align="center"></el-table-column>
            <el-table-column prop="zjljsj" label="最近连接时间"  align="center"></el-table-column>
             <el-table-column prop="zt" label="状态" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <!-- <el-button type="text" size="small">查看</el-button> -->
                <el-button type="text" size="small" @click="removeData(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="logPage.pageNum"
        :page-sizes="[10,20,30]"
        :page-size="logPage.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logPage.total"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
  </div>
</template>
  
  </div>
</template>

<script>
import tableAdd from "../common/videoStreamingManagement/tableAdd.vue";
import tableEdit from "../common/videoStreamingManagement/tableEdit.vue";
import vueScroll from "vuescroll";
export default {
  name: "DataDictionaryManagement",
    data() {
    return {
      loading: false,
      inputList: { xmnr: "", cjsjq: "", cjsjz: "", xgsjq: "", xgsjz: "" },
      logPage: { pageNum: 1, total: 0, pagesize: 10 },
      logName: "",
      tableData: [],
      tableAdd: false,
      tableEdit: false,
      tableEditTitle: "视频监控管理编辑",
      tableAddTitle: "视频监控管理新增",
      ruled: {
        xmnr: [
          {
            validator: function(rule, value, callback) {
            },
            trigger: "blur"
          }
        ]
      },
      tableTitle: [
        {   
          title: "ycxid",
          title_cn: "遥感线编号",
          model: "",
          show: true,
          error_message: false,
          specialType: true,
          data: []
          
        },
        {
          select: true,
          model: "",
          show: true,
          error_message: false,
          select_name: "mtgs",
          title: "mtgs",
          title_cn: "媒体格式",
          error_message: false,
          error_info: "*请选择媒体格式",
        },
        {
          title: "bfdz",
          title_cn: "播放地址",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          error_info: "*请输入播放地址",
        },
        {
          title: "sydk",
          title_cn: "使用端口",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\d{1,6}$/",
          error_info: "*请输入1-6位数字",
          placeholder: "非空且只能是1-6位数字"
        },
         {
          time:true,
          title: "zjljsj",
          title_cn: "最近连接时间",
          model: "",
          show: true,
          error_message: false,
          error_info: "*请选择最近连接时间",
        },
        {
          select: true,
          model: "",
          show: true,
          error_message: false,
          select_name: "zt",
          title: "zt",
          title_cn: "状态",  //    下拉框  正常  停用
          error_info: "*请选择状态",
        },
        {
          title: "bfbh",
          title_cn: "播放编号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\d{1,2}$/",
          error_info: "*只能输入1-2位数字",
          placeholder: "非空且只能是1-2位数字"
        },
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
    let that = this; //枚举值类型
    this.log_search();
    
       this.$axios({
        method: "post",
        url: "http://192.168.1.39:8080/hbj/telemetryLine/getAll",
        params: {},
        headers: {
          "Content-Type": "application/json"
        },
        data:{}
         
      })
        .then(function(data) {
          that.tableTitle[0].data=data.data.data ;
          for(let i=0;i<data.data.data.length;i++){
            data.data.data[i].ycxid=data.data.data[i].id; 
            delete data.data.data[i].id;
          }   
        })      

  },
  methods: {
    reset() {
      this.inputList.dwmc = "";
      this.inputList.sxxtscc="";
      this.inputList.zt="";
    },

    btnEditSubmit(data) {                               //修改提交
      let obj = {};
      let that = this;
      var data = JSON.parse(JSON.stringify(data));
      data.forEach(element => {
        obj[element.title] = element.model;
      });
       obj.mtgs=parseInt(obj.mtgs);
       obj.sydk=parseInt(obj.sydk);
       obj.bfbh=parseInt(obj.bfbh);
       obj.zt=parseInt(obj.zt);
      obj.id = this.tableEditId;
      console.log (obj);
      this.$axios({
        //删除接口
        method: "post",
           url: "http://192.168.1.39:8080/hbj/ygStreamMediaController/update",
          
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(data) {
          console.log (data.data);
          if (data.data.code == 1) {
           that.$message({
            message: "修改成功",
            type: "success"
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


    btnAddSubmit(data) {                                       //新增页面数据提交后台
      //新增提交按钮
      let obj = {};
      let that = this;
      var data = JSON.parse(JSON.stringify(data));
      data.forEach(element => {
        obj[element.title] = element.model;
      });
       obj.mtgs=parseInt(obj.mtgs);
       obj.sydk=parseInt(obj.sydk);
       obj.bfbh=parseInt(obj.bfbh);
       obj.zt=parseInt(obj.zt);

       console.log(obj);
      // debugger;
      this.$axios({
        //删除接口
        method: "post",    
        url: "http://192.168.1.39:8080/hbj/ygStreamMediaController/add",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)

      }).then(function(data) {
        // console.log ('2'+data);
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
    },
    dataAdd() {//打开新增模态框
      let tableTitle2 = JSON.parse(JSON.stringify(this.tableTitle));   //序列化
      // debugger;
      // console.log(tableTitle2)
      tableTitle2.forEach(ele => { //遥感线编号数据  ????????????
        ele.model = "";
      });
       this.tableTitle = tableTitle2;
       this.tableAdd = true;
    },
    close_add(data) {
      //关闭新增模态框
      if (data == "add") {
        this.tableAdd = false;
      } else if (data == "edit") {
        this.tableEdit = false;
      }
    },
    log_search() {                                                  //搜索查询
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
        method: "get",
        url: "http://192.168.1.39:8080/hbj/ygStreamMediaController/getPage",
        params: {
          dwmc:this.inputList.dwmc,
          sxxtscc:this.inputList.sxxtscc,
          zt:this.inputList.zt,
          pageNum: this.logPage.pageNum,
          pageSize: this.logPage.pagesize,
          sidebar: "视频管理"
        },
        headers: {
          "Content-Type": "application/json"
        },
        data:{}
         
      })
        .then(function(data) {
           that.tableData=data.data.data.list;
            that.logPage.total = data.data.data.total;
           loadingObj.close();

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
       let that = this;
       this.logPage.pageNum = val;
       this.log_search();

       this.$axios
         .get("http://192.168.1.39:8080/hbj/ygStreamMediaController/getPage", {
          //第一个表 点位
          params: {
            // dwbh: this.dwPage.dwbh,
            dwmc:this.inputList.dwmc,
            sxxtscc:this.inputList.sxxtscc,
            zt:this.inputList.zt,
            pageNum: this.logPage.pageNum,
            pageSize: this.logPage.pagesize,
            pageNum: this.logPage.pageNum,
            pageSize: this.logPage.pagesize,          
            sidebar: "视频管理"
          }
        })
        .then(function(data) {
           that.tableData=data.data.data.list;    
           that.logPage.total = data.data.data.total; 
          //  console.log(that.logPage.total); 
          //  debugger;      
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },

    handleSizeChange(val) {                                             //改变每页条数
       let that = this;
       this.logPage.pagesize = val;
       this.log_search();

     this.$axios
         .get("http://192.168.1.39:8080/hbj/ygStreamMediaController/getPage", {
          //第一个表 点位
          params: {
            // dwbh: this.dwPage.dwbh,
            dwmc:this.inputList.dwmc,
            sxxtscc:this.inputList.sxxtscc,
            zt:this.inputList.zt,
            pageNum: this.logPage.pageNum,
            pageSize: this.logPage.pagesize,
            pageNum: this.logPage.pageNum,
            pageSize: this.logPage.pagesize,          
            sidebar: "视频管理"
          }
        })
        .then(function(data) {
           that.tableData=data.data.data.list;    
          that.logPage.total = data.data.data.total;        
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },
    handleClick(row) {                                               //点击编辑按钮
      
      let that = this;
      this.tableEditId = row.id;
      let arr = [];
      let tableTitle2 = JSON.parse(JSON.stringify(this.tableTitle));
      tableTitle2.forEach(ele => {
        for (var i in row) {
          if (ele.title == i) {
            ele.model = row[i];
            arr.push(ele);
          }
        }
      });
      this.tableEditList = arr;
      this.tableEdit = true;
    },
    removeData(data) {                                                   //删除数据
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
              url: "http://192.168.1.39:8080/hbj/ygStreamMediaController/deleteOne",
              params: {
                id: data.id,
                sidebar: "视频管理"
              }
            })
            .then(function(data) {
              // console.log ('4'+data);
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
  },
  // mounted() {
  //   log_search();
  // }
 
};
</script>

<style scoped>
.button-div {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
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
