<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="车牌号码：">
              <el-input   @keyup.enter.native="searchAll" v-model="inputList.hphm" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="车牌颜色：">
              <el-select v-model="inputList.cpys" placeholder="选择车牌颜色" style="width:150px"  @keyup.enter.native="searchAll">
                <el-option
                  v-for="item in cpysData"
                  :key="item.index"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="车道序号：">
              <el-input v-model="inputList.cdxh" style="width:150px"  @keyup.enter.native="searchAll"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="判定结果：">
              <el-select v-model="inputList.pdjg" placeholder="选择判定结果" style="width:150px"  @keyup.enter.native="searchAll">
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-start;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
               @keyup.enter.native="searchAll"
                @change="timeCheck('startTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="inputList.qssj"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 结束时间：">
              <el-date-picker
               @keyup.enter.native="searchAll"
                @change="timeCheck('endTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="inputList.zzsj"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="燃料种类：">
              <el-select v-model="inputList.rlzl" placeholder="燃料种类" style="width:150px"  @keyup.enter.native="searchAll">
                <el-option
                  v-for="item in rlzlData"
                  :key="item.index"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="CO>=">
              <el-input v-model="inputList.cojg" style="width:150px"  @keyup.enter.native="searchAll"></el-input>(%)
            </el-form-item>
          </el-col>
          <!-- <el-col :span="5" style="display:flex;justify-content: flex-start;">
            <el-form-item label="车辆类别：">
              <el-input v-model="formExhaustTelemetryManagement.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="display:flex;justify-content: flex-start;">
            <el-form-item label="入户登记起始时间：" style="margin-right:15px">
              <el-date-picker v-model="formExhaustTelemetryManagement.startTime" class="time-input"></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 入户登记结束时间：">
              <el-date-picker v-model="formExhaustTelemetryManagement.endTime" class="time-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="display:flex;justify-content: flex-start;">
            <el-form-item label="CO>=">
              <el-input v-model="formExhaustTelemetryManagement.site" style="width:150px"></el-input>(%)
            </el-form-item>
          </el-col>-->
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="HC>=">
              <el-input v-model="inputList.hcjg" style="width:150px"  @keyup.enter.native="searchAll"></el-input>(ppm)
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="NO>=">
              <el-input v-model="inputList.nojg" style="width:150px"  @keyup.enter.native="searchAll"></el-input>(ppm)
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="不透光度结果>=">
              <el-input v-model="inputList.btgdjg" style="width:150px"  @keyup.enter.native="searchAll"></el-input>(pmm)
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="湿度>=">
              <el-input v-model="inputList.sd" style="width:150px"  @keyup.enter.native="searchAll"></el-input>(%)
            </el-form-item> -->
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary" @click="searchAll">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="showSelection">导出</el-button>
     
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:auto;height:550px;margin-bottom:0;"
    >
      <el-table
        :data="tableList"
        border
        height="450"
        style="width: 100%;margin-top:20px;overflow-y:auto;height:450px"
      >
        <!-- <el-table-column type="selection" align="center"></el-table-column> -->
        <!-- <el-table-column prop="cpys" label="点位编号" align="center"></el-table-column> -->
        <el-table-column  prop="cpys" label="车牌颜色" align="center">
          <template scope="scope">
             {{$store.state.enumData.hpys[scope.row.cpys]}}
          </template>
        </el-table-column>
         <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
        <el-table-column prop="cdxh" label="车道序号" align="center"></el-table-column>
        <el-table-column prop="jcrq" label="监测时间" align="center"></el-table-column>
        <el-table-column prop="rlzl" label="燃料种类" align="center">
          <template scope="scope">
           {{$store.state.enumData.rlzl[scope.row.rlzl]}}
          </template>
        </el-table-column>
        <el-table-column prop="pdjg" label="判定结果" align="center">
          <template scope="scope">
            <a
              :style="{color:scope.row.pdjg.toString() == '0'? 'red' : '#909399'}"
            >{{scope.row.pdjg.toString() == "0" ? "不通过" : "通过"}}</a>
          </template>
        </el-table-column>
       
        <el-table-column prop="co2jg" align="center" label="CO2结果(%)"></el-table-column>
        <el-table-column prop="cojg" label="CO结果(%)" align="center">
          <template scope="scope">
            <a :style="{color:scope.row.cojg>4 ? 'red' : '#909399'}">{{scope.row.cojg}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="hcjg" label="HC结果(ppm)" align="center"></el-table-column>
        <el-table-column prop="nojg" label="NO结果(ppm)" align="center"></el-table-column>
        <!--<el-table-column prop="BTGDJG" label="不透度结果" align="center"></el-table-column>
        <el-table-column prop="LGMHD" label="林格曼黑度" align="center"></el-table-column>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详细信息</el-button>
            <el-button @click="showPdfDialog(scope.row,'jy')" type="text" size="small">检验结果告知书</el-button>
            <el-button @click="showPdfDialog(scope.row,'zg')" type="text" size="small">整改告知书</el-button>
          </template>
        </el-table-column>
      </el-table>

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
    <detailed-information ref="detailedInformation"></detailed-information>
    <report-testResult ref="reportTestResult"></report-testResult>
    <check-selection :diaSta="checkShow" @dialogClose="closeSelection"  :searchData="inputList"  :type="selectType"></check-selection>
    <pdf-print :diaSta="showPdf" @dialogClose="pdfClose()" :title="pdfTitle" :src="pdfSrc"></pdf-print>
  </div>
</template>

<script>
import pdfPrint from "../common/pdfPrint.vue";
import checkSelection from "../common/checkBoxSelection.vue";
import detailedInformation from "../common/detailedInformation.vue";
import reportTestResult from "../common/reportTestResults.vue";
export default {
  name: "ExhaustTelemetryManagement",
  data() {
    return {
      selectType:1,
      pdfSrc: "",
      pdfTitle: "",
      showPdf: false,
      checkShow: false,
      logPag: { pageNum: 1, total: 0, pagesize: 10 },
      tableList: [],
      cpysData: [],
      rlzlData: [],
      inputList: {
        hphm: "",
        cpys: "",
        cdxh: "",
        pdjg: "",
        qssj: "",
        zzsj: "",
        rlzl: "",
        cojg: "",
        hcjg: "",
        nojg: "",
        btgdjg: "",
        sd: ""
      }
    };
  },
  computed: {},
  components: {
    detailedInformation,
    reportTestResult,
    checkSelection,
    pdfPrint
  },
  created() {
    this.logSearch();
   
  },
  mounted() {
    let that=this;
    this.carCalorfun("HPYS");
    this.carCalorfun("RLZL");
  },
  methods: {
      /**
     * @description 阻止起始时间超过结束时间
     * @author B51733
     * @version 2019.5.29
     */
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.inputList.zzsj == "" ||
              this.inputList.zzsj == "null" ||
              this.inputList.zzsj == null
            )
          ) {
            let timeBegin = this.inputList.qssj.toString()
           let timeEnd = this.inputList.zzsj.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.inputList.qssj = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.inputList.qssj == "" ||
              this.inputList.qssj == "null" ||
              this.inputList.qssj == null
            )
          ) {
             let timeBegin = this.inputList.qssj.toString()
            let timeEnd = this.inputList.zzsj.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.inputList.zzsj = "";
            }
          }
          break;
      }
    },
    pdfClose() {
      this.showPdf = false;
    },
      /**
     * @description 展示pdf文件
     * @params Object  该行所有数据
     * @params string pdf的种类
     * @author B51733
     * @version 2019.5.29
     */
    showPdfDialog(data, name) {
   
      let that=this;
      if (name == "jy") {
        this.pdfTitle = "遥测检验结果告知书";
        this.pdfSrc = `/serveApi/hbj/remoteSensing/jggzs?jcrq=${
          data.jcrq
        }&hphm=${data.hphm}&btgdjg=${data.btgdjg}&cojg=${data.cojg}&co2jg=${
          data.co2jg
        }&nojg=${data.nojg}`;

        this.$axios(this.pdfSrc).then(function(res){  //判断pdf文件是否存在
       
         if (res.data.code == "404") {
              that.$message({
                type: "warning",
                message: res.data.msg
              });
            }else{
         
               that.showPdf = true;
            }
         
        })

      } else if (name == "zg") {
        this.pdfSrc = `/serveApi/hbj/remoteSensing/zggzs?jcrq=${
          data.jcrq
        }&hphm=${data.hphm}&btgdjg=${data.btgdjg}&cojg=${data.cojg}&co2jg=${
          data.co2jg
        }&nojg=${data.nojg}`;
        this.pdfTitle = "遥测整改告知书";

          this.$axios(this.pdfSrc).then(function(res){  //判断pdf文件是否存在
           if (res.data.code == "404") {
              that.$message({
                type: "warning",
                message: res.data.msg
              });
            }else{
              that.showPdf = true;
            }
        
        })
      }
      // this.showPdf = true;
    },
    reset() {
      //重置输入
      for (let i in this.inputList) {
        this.inputList[i] = "";
      }
    },
    searchAll() {
      this.logPag.pageNum=1;
      this.logSearch();
    },
       /**
     * @description 显示详情
     * @params Object  该行所有数据
     * @author B51733
     * @version 2019.5.29
     */
    handleClick(rowVal) {
       let showVal = JSON.parse(JSON.stringify(rowVal));
      showVal.cpys = this.$store.state.enumData.hpys[rowVal.cpys];
      showVal.hpzl = this.$store.state.enumData.hpzl[rowVal.hpzl];
      showVal.rlzl = this.$store.state.enumData.rlzl[rowVal.rlzl];
      showVal.pdjg.toString() == "1"
        ? (showVal.pdjg = "通过")
        : (showVal.pdjg = "不通过");
      this.$refs.detailedInformation.returnAlert(showVal);
    },
    reportTestResultClick(rowVal) {
      this.$refs.reportTestResult.showPage();
    },
    showSelection() {
      //打开选择器
      this.checkShow = true;
    },
    closeSelection() {
      this.checkShow = false;
    },
       /**
     * @description 查询表格数据
     * @author B51733
     * @version 2019.5.29
     */
    logSearch() {
      //分页及查询全部数据
      let that = this;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios
        .get("/serveApi/hbj/remoteSensing/getFixedPage", {
          params: {
            hphm: this.inputList.hphm,
            cpys: this.inputList.cpys,
            cdxh: this.inputList.cdxh,
            pdjg: this.inputList.pdjg,
            qssj: this.inputList.qssj,
            zzsj: this.inputList.zzsj,
            rlzl: this.inputList.rlzl,
            cojg: this.inputList.cojg,
            hcjg: this.inputList.hcjg,
            nojg: this.inputList.nojg,
            btgdjg: this.inputList.btgdjg,
            sd: this.inputList.sd,
            pageNum: this.logPag.pageNum,
            pageSize: this.logPag.pagesize,
            sidebar: "遥测超标黑名单"
          }
        })
        .then(function(data) {
          loadingObj.close();
          that.tableList = data.data.data.list;
          that.logPag.total = data.data.data.total;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },
    handleCurrentChange(val) {
      this.logPag.pageNum = val;
      this.logSearch();
    },
    handleSizeChange(val) {
      //改变每页条数
      this.logPag.pagesize = val;
      this.logSearch();
    },
    carCalorfun(type) {
      let that = this;
      let obj = {};
      obj.lx = type;
      obj.sidebar = this.sidebar;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/enum/select",
        params: { sidebar: "遥感监测查询" },
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          if (res.data) {
            if (type === "HPYS") {
              that.cpysData = res.data.data;
            } else {
              that.rlzlData = res.data.data;
            }
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    }
  }
};
</script>
<style scoped>
.button-div {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.flex_box {
  display: flex;
}
.red {
  color: red;
}
</style>