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
            <el-form-item label="车牌颜色">
              <el-select v-model="inputList.hpys" placeholder="选择车牌颜色" style="width:150px">
                <template v-for="item in HPYS">
                  <el-option :label="item.xmnr" :value="item.sz"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input v-model="inputList.hphm" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="是否审核：">
              <el-select v-model="inputList.pdjg" placeholder="状态" style="width:150px">
                <el-option label="已审核" value="1"></el-option>
                <el-option label="未审核" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="取证时间起：" style="margin-right:15px">
              <el-date-picker
               @change="timeCheck('startTime')"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="inputList.startTime"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 取证时间止：">
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
      <!-- <el-button type="primary">审核</el-button> -->
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 210px);margin-bottom:0;"
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
          <el-table-column prop="hpys" align="center" label="车牌颜色">
            <template scope="scope">{{hpysObj[scope.row.hpys]}}</template>
          </el-table-column>
          <el-table-column prop="hpzl" align="center" label="车牌种类">
            <template scope="scope">{{hpzlObj[scope.row.hpzl]}}</template>
          </el-table-column>
          <el-table-column prop="scnf" align="center" label="生产年份"></el-table-column>
          <el-table-column prop="czxm" align="center" label="车主姓名"></el-table-column>
          <el-table-column prop="cyzz" align="center" label="常用地址"></el-table-column>
          <el-table-column prop="sjhm" align="center" label="手机号码"></el-table-column>
          <el-table-column prop="qzsj" align="center" label="取证时间"></el-table-column>
          <el-table-column prop="qzdd" align="center" label="取证地点"></el-table-column>
          <el-table-column prop="sfsh" align="center" label="是否审核">
             <template scope="scope">{{scope.row.sfsh.toString()=="0"?"未审核":"已审核"}}</template>
          </el-table-column>
          <!-- <el-table-column prop="sfsc" align="center" label="是否删除">
            <template scope="scope">{{scope.row.sfsc.toString()=="0"?"已删除":"未删除"}}</template>
          </el-table-column> -->
          <el-table-column prop="amountPenalty" align="center" label="视频">
            <template scope="scope">
              <img
                src="../../../assets/img/video.png"
                width="20"
                height="20"
                style="margin-top:10px; cursor: pointer;"
                @click="showPage(scope.row)"
                class="head_pic"
              >
            </template>
          </el-table-column>
          <el-table-column prop="lgmhd" label="林格曼黑度" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <el-button type="text" size="small" @click="showInfor(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,20,30]"
        :page-size="pagnationList.pageSize"
         :current-page="pagnationList.pageNum"
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
            let timeBegin = this.inputList.startTime.toString()
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
          let timeBegin = this.inputList.startTime.toString()
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
    showTable(){
      this.pagnationList.pageNum="1";
      this.search();
    },
    reset() {
      for (let i in this.inputList) {
        this.inputList[i] = "";
      }
    },
    showInfor(val) {
      let showVal=JSON.parse(JSON.stringify(val));
      showVal["sfsc"] == "1" ? (showVal["sfsc"] = "是") : (showVal["sfsc"] = "否");
      showVal["sfsh"] == "1" ? (showVal["sfsh"] = "是") : (showVal["sfsh"] = "否");
      showVal["hpzl"] = this.hpzlObj[showVal["hpzl"]];
      showVal["hpys"] = this.hpysObj[showVal["hpys"]];
      //console.log(val)
      this.$refs.blackInformation.returnAlert(showVal);
    },
    handleClick(row) {
      console.log(row);
    },
    showPage(data) {
      if (data.sp1.substring(data.sp1.lastIndexOf("/") + 1) == "null"||data.sp1.substring(data.sp1.lastIndexOf("/")+1).length<=0) {
        this.$message({
          type: "warning",
          message: "此视频不存在"
        });
      } else {
        this.$refs.vVideosrc.showPage(data);
      }
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
      let that = this;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios("/serveApi/hbj/blackSmokeVechicle/getPage", {
        params: {
          hphm: this.inputList.hphm,
          hpys: this.inputList.hpys,
          sfsh: this.inputList.pdjg,
          startTime: this.inputList.startTime,
          endTime: this.inputList.endTime,
          pageNum: this.pagnationList.pageNum,
          pageSize: this.pagnationList.pageSize,
          sidebar: "黑烟车审批"
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
        pdjg: ""
      },
      pagnationList: { total: 0, pageSize: 10, pageNum: 1 },
      tableData: [],
      hideVideo: false,
      HPYS: [],
      hpzlObj: {},
      hpysObj: {}
    };
  },
  created() {
    console.log(this.$store.state.enumData)
    this.search();
    let that = this;
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      params: { sidebar: "黑烟车审批" },
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "HPYS" }
    }).then(function(data) {
      that.HPYS = data.data.data;
    });
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      params: { sidebar: "黑烟车审批" },
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "HPZL" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.hpzlObj = obj;
    });
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      params: { sidebar: "黑烟车审批" },
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "HPYS" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.hpysObj = obj;
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

