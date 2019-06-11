<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true">
        <el-row>
          <!-- <el-col :span="8" style="display:flex;justify-content: flex-star;"></el-col>
          <el-col :span="8" style="display:flex;justify-content: center;"></el-col>-->
          <!-- <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="状态：">
              <el-input v-model="SmokyCarManagement.number" style="width:250px"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="24" style="display:flex;justify-content: center;">
            <el-form-item label="发布平台">
              <el-select v-model="inputList.fbpt" placeholder="选择发布平台" style="width:150px">
                <template v-for="item in FBPT">
                  <el-option :label="item.xmnr" :value="item.sz"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input v-model="inputList.hphm" style="width:150px"></el-input>
            </el-form-item>

            <el-form-item label="审批时间起：" style="margin-right:15px">
              <el-date-picker
               @change="timeCheck('startTime')"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="inputList.spsjq"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 审批时间止：">
              <el-date-picker
               @change="timeCheck('endTime')"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="inputList.spsjz"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" style="display:flex;justify-content: center;">
            <el-button type="primary" round>查询</el-button>
            <el-button type="primary" round>重置</el-button>
          </el-col>-->
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary"  @click="showTable">查询</el-button>
      <el-button type="primary"  @click="reset">重置</el-button>
      <el-button type="primary"  @click="release">发布</el-button>
    </div>
    <div
      class="chare_box"
       style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 220px);margin-bottom:0;"
    >
     <div style="height:calc(100% - 45px);overflow: auto">
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top:20px;" height="calc(100% - 20px)"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="bh" align="center" label="编号"></el-table-column>
        <el-table-column prop="hphm" align="center" label="车牌号"></el-table-column>
        <el-table-column prop="qzsj" align="center" label="取证时间"></el-table-column>
        <el-table-column prop="qzdd" align="center" label="取证地点"></el-table-column>
        <el-table-column prop="spsj" align="center" label="审批时间"></el-table-column>
        <el-table-column prop="fbpt" align="center" label="发布平台">
          <template scope="scope">
            {{fbptObj[scope.row.fbpt]}}
          </template>
        </el-table-column>
        <el-table-column prop="fbnr" align="center" label="发布内容"></el-table-column>
        <el-table-column prop="fbsj" align="center" label="发布时间"></el-table-column>
         <el-table-column prop="fbcs" align="center" label="发布次数"></el-table-column>
        <el-table-column prop="sfyfb" align="center" label="状态">
          <template scope="scope">
             {{scope.row.sfyfb=="1"?"已发布":"未发布"}}
          </template>
        </el-table-column>
      </el-table>
    </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagnationList.pageNum"
        :page-sizes="[10,20,30]"
        :page-size="pagnationList.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagnationList.total"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
    <table-edit
      :diaSta="tableEditDialog"
      :title="tableEditTitle"
      @dialogClose="closeEdit()"
      :editData="tableEditList"
      @btnEdit="btnEditSubmit"
    ></table-edit>
    <smoke-release
      :diaSta="smokeReleaseDialog"
      @dialogClose="closeRelease()"
      :title="smokeReleaseTitle"
      :updataData="releaseNumber2"
    ></smoke-release>
  </div>
</template>

<script>
import smokeRelease from "../../common/smokeRelease.vue";
import tableEdit from "../../common/tableEdit.vue";
export default {
  name: "SmokyCarManagement",

  methods: {
      timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.inputList.spsjz == "" ||
              this.inputList.spsjz == "null" ||
              this.inputList.spsjz == null
            )
          ) {
            let timeBegin = this.inputList.spsjq.toString()
            let timeEnd = this.inputList.spsjz.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.inputList.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.inputList.spsjq == "" ||
              this.inputList.spsjq == "null" ||
              this.inputList.spsjq == null
            )
          ) {
          let timeBegin = this.inputList.spsjq.toString()
          let timeEnd = this.inputList.spsjz.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.inputList.spsjz = "";
            }
          }
          break;
      }
    },

    showTable(){
      this.pagnationList.pageNum=1;
      this.search();
    },
    btnEditSubmit() {},
    edit() {
      this.tableEditList = this.tableEditListTotal;
      this.tableEditDialog = true;
    },
    closeEdit() {
      this.tableEditDialog = false;
    },
    closeRelease() {
      console.log("关闭")
      this.smokeReleaseDialog = false;
    },
    release() {
      if (this.releaseNumber.length <= 0) {
        this.$message({ type: "warning", message: "请先选择发布内容" });
      } else {
        this.smokeReleaseDialog = true;
        this.releaseNumber2=this.releaseNumber;
      }
    },
    selectChange(data) {
      this.releaseNumber = data;
    },
    reset() {
      for (let i in this.inputList) {
        this.inputList[i] = "";
      }
    },
    showInfor(val) {
      val["sfsc"] == "1" ? (val["sfsc"] = "是") : (val["sfsc"] = "否");
      val["sfsh"] == "1" ? (val["sfsh"] = "是") : (val["sfsh"] = "否");
      this.$refs.blackInformation.returnAlert(val);
    },
    handleClick(row) {
      console.log(row);
    },
    showPage(data) {
      this.$refs.vVideosrc.showPage(data);
    },
    showvCompile() {
      this.$refs.vCompile.showvCompile();
    },
    handleSizeChange(val) {
      this.pagnationList.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pagnationList.pageNum = val;
      this.search();
    },
    search() {
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      this.$axios.get(
        "/serveApi/hbj/blackSmokeVechiclePublish/getPage",
        {
          params: {
            fbpt: that.inputList.fbpt,
            hphm: that.inputList.hphm,
            spsjq: that.inputList.spsjq,
            spsjz: that.inputList.spsjz,
            pageSize: that.pagnationList.pageSize,
            pageNum: that.pagnationList.pageNum,
            sidebar:"黑烟车发布"
          }
        }
      )
        .then(function(data) {
           console.log(data.data.data.list)
          loadingObj.close();
          that.pagnationList.total=Number(data.data.data.total);
          that.tableData=data.data.data.list;
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    }
  },

  data() {
    return {
      smokeReleaseTitle: "黑烟车信息发布",
      tableEditTitle: "黑烟车信息发布编辑",
      tableEditDialog: false,
      smokeReleaseDialog: false,
      loading: true,
      inputList: { hphm: "", fbpt: "", spsjq: "", spsjz: "" },
      pagnationList: { total: 0, pageSize: 10, pageNum: 1 },
      FBPT: "",
      tableData: [
     
      ],
      tableEditList: [],
      tableEditListTotal: [
        {
          title: "dwbh",
          title_cn: "编号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "dwmc",
          title_cn: "车牌号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "dwlx",
          title_cn: "取证时间",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "dwmc",
          title_cn: "取证地点",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "dwmc",
          title_cn: "车牌号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        }
      ],
      hideVideo: false,
      fileList: [],
      releaseNumber: [],
      releaseNumber2:[],
      fbptObj:{},
      ztObj:{}
      
    };
  },
  created() {
    this.search();
    let that = this;
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",

      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "FBPT" },
      params:{sidebar:"黑烟车发布"}
    }).then(function(data) {
      that.FBPT = data.data.data;
    });

     this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",

      headers: {
        "Content-Type": "application/json"
      },
       params:{sidebar:"黑烟车发布"},
      data: { lx: "FBPT" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.fbptObj = obj;
    });

    // this.$axios({
    //   method: "post",
    //   url: "/serveApi/hbj/enum/select",

    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data: { lx: "ZT" }
    // }).then(function(res) {
    //   let obj = {};
    //   for (let i = 0; i < res.data.data.length; i++) {
    //     obj[res.data.data[i].sz] = res.data.data[i].xmnr;
    //   }
    //   that.ztObj = obj;
    // });
  },
  components: {
    tableEdit,
    smokeRelease
  }
};
</script>

<style scoped>
.button-div {
  display: flex;
  justify-content: center;
}
</style>

