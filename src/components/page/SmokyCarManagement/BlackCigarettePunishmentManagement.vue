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
            <!-- <el-form-item label="车牌颜色">
              <el-select v-model="inputList.cpys" placeholder="选择车牌颜色" style="width:150px">
              <template v-for="item in HPYS">
               <el-option :label="item.xmnr" :value="item.sz"></el-option>
              </template>
              </el-select>
            </el-form-item>-->
            <el-form-item label="车牌号码">
              <el-input v-model="inputList.hphm" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="处罚状态：">
              <el-select v-model="inputList.cfzt" placeholder="状态" style="width:150px">
                <template v-for="item in CFZT">
                  <el-option :label="item.xmnr" :value="item.sz"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="审批时间起：" style="margin-right:15px">
              <el-date-picker
                @change="timeCheck('startTime')"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="inputList.startTime"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 审批时间止：">
              <el-date-picker
                @change="timeCheck('endTime')"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="inputList.endTime"
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
      <el-button type="primary" @click="showTable">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 220px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
        >
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column prop="hphm" align="center" label="车牌号码"></el-table-column>
          <el-table-column prop="spsj" align="center" label="审批时间"></el-table-column>
          <el-table-column prop="sfjzcf" align="center" label="是否加重处罚">
            <template scope="scope">
              <a>{{scope.row.sfjzcf=="1"?"是":"否"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="cfdh" align="center" label="处罚单号"></el-table-column>
          <el-table-column prop="cfje" align="center" label="处罚金额"></el-table-column>
          <el-table-column prop="cfjzrq" align="center" label="处罚截止日期"></el-table-column>
          <el-table-column prop="cfzt" align="center" label="处罚状态">
            <template scope="scope">{{cfztObj[scope.row.cfzt]}}</template>
          </el-table-column>
          <el-table-column prop="gzsjs" align="center" label="告知书寄送">
            <template scope="scope">{{scope.row.gzsjs=="1"?"已寄出":"未寄出"}}</template>
          </el-table-column>
          <el-table-column prop="gzsjssj" align="center" label="告知书寄送时间"></el-table-column>
          <el-table-column prop="jdsjs" align="center" label="决定书寄送">
            <template scope="scope">{{scope.row.jdsjs=="1"?"已寄出":"未寄出"}}</template>
          </el-table-column>
          <el-table-column prop="jdsjssj" align="center" label="决定书寄送时间"></el-table-column>
          <el-table-column prop="jkdjs" align="center" label="缴款单寄送">
            <template scope="scope">{{scope.row.jkdjs=="1"?"已寄出":"未寄出"}}</template>
          </el-table-column>
          <el-table-column prop="jkdjssj" align="center" label="缴款单寄送时间"></el-table-column>
          <el-table-column prop="zgjzrq" align="center" label="整改截止日期"></el-table-column>
          <el-table-column prop="jclsh" align="center" label="检测流水号"></el-table-column>
          <el-table-column prop="jcwcsj" align="center" label="检测完成时间"></el-table-column>
          <el-table-column prop="jcjg" align="center" label="检测结果">
            <template scope="scope">{{jcjgObj[scope.row.jcjg]}}</template>
          </el-table-column>
          <el-table-column prop="yxjzrq" align="center" label="有效截至日期"></el-table-column>
          <el-table-column prop="zgzt" align="center" label="整改状态">
            <template scope="scope">{{zgztObj[scope.row.zgzt]}}</template>
          </el-table-column>
          <el-table-column prop="sfyfb" align="center" label="是否已发布">
            <template scope="scope">
              <a>{{scope.row.sfyfb=="1"?"是":"否"}}</a>
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
    <v-videosrc ref="vVideosrc"></v-videosrc>
    <v-compile ref="vCompile"></v-compile>
    <black-information ref="blackInformation"></black-information>
    <!--<img src="../../../assets/img/smokeAlert.png">
    <img src="../../../assets/img/BlackSmokeDataLead.png">-->
    <!--<img src="../../../assets/img/SmokyCarDataImport.png">-->
  </div>
</template>

<script>
import vVideosrc from "../../common/videosrc.vue";
import vCompile from "../../common/smokyCar/vCompile.vue";
import bus from "../../common/bus.js";
import blackInformation from "../../common/blackSmokeInformation.vue";
export default {
  name: "SmokyCarManagement",

  methods: {
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.inputList.endTime == "" ||
              this.inputList.endTime == "null" ||
              this.inputList.endTime == null
            )
          ) {
            let timeBegin = this.inputList.startTime.toString();
            let timeEnd = this.inputList.endTime.toString();

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
              this.inputList.startTime == "" ||
              this.inputList.startTime == "null" ||
              this.inputList.startTime == null
            )
          ) {
            let timeBegin = this.inputList.startTime.toString();
            let timeEnd = this.inputList.endTime.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.inputList.endTime = "";
            }
          }
          break;
      }
    },
    showTable() {
      this.pagnationList.pageNum = 1;
      this.search();
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

      this.$axios({
        //删除接口
        method: "post",
        url: "/serveApi/hbj/blackSmokeVechicle/findSmokeTrackByPage",
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          pageNum: this.pagnationList.pageNum,
          pageSize: this.pagnationList.pageSize,
          sidebar: "黑烟车处罚管理"
        },
        data: {
          hphm: this.inputList.hphm,
          cfzt: this.inputList.cfzt,
          kssj: this.inputList.startTime,
          jssj: this.inputList.endTime
        }
      })
        .then(function(data) {
          loadingObj.close();
          // console.log(data.data.data.list)
          that.tableData = data.data.data.list;
          that.pagnationList.total = data.data.data.total;
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
      inputList: {
        hpys: "",
        hphm: "",
        startTime: "",
        endTime: "",
        sfsh: "",
        cfzt: ""
      },
      pagnationList: { total: 0, pageSize: 10, pageNum: 1 },
      tableData: [],
      hideVideo: false,
      CFZT: [],
      cfztObj: {},
      jcjgObj: {},
      zgztObj: {}
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
      data: { lx: "CFZT" },
      params: { sidebar: "黑烟车处罚管理" }
    }).then(function(res) {
      that.CFZT = res.data.data;
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.cfztObj = obj;
    });
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",

      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "JCJG" },
      params: { sidebar: "黑烟车处罚管理" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.jcjgObj = obj;
    });
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      params: { sidebar: "黑烟车处罚管理" },
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "ZGZT" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.zgztObj = obj;
    });
  },
  components: {
    vVideosrc,
    vCompile,
    blackInformation
  }
};
</script>

<style scoped>
.button-div {
  display: flex;
  justify-content: center;
}
</style>

