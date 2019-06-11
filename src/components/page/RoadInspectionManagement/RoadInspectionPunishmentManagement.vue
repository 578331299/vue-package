<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="20" style="display:flex;justify-content: flex-end;align-item:center">
            <el-form-item label="车牌号码">
              <el-input
                v-model="formTrafficFlowAnalysis.numbers"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              ></el-input>
            </el-form-item>
            <el-form-item label="整改状态">
              <el-select
                v-model="formTrafficFlowAnalysis.type"
                placeholder="选择状态"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              >
                <el-option
                  v-for="item in jcjgData"
                  :key="item.index"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检测时间起：" style="margin-right:15px">
              <el-date-picker
                v-model="formTrafficFlowAnalysis.startTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="- 检测时间止：">
              <el-date-picker
                v-model="formTrafficFlowAnalysis.endTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
            <el-button type="primary" @click="resetData">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 154px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          height="calc(100% - 20px)"
          style="width: 100%;margin-top:20px;"
        >
          <!--<el-table-column type="selection"></el-table-column>-->
          <el-table-column prop="jclsh" label="检测流水号" align="center"></el-table-column>
          <el-table-column prop="spsj" label="审批时间" align="center"></el-table-column>
          <el-table-column prop="jcwcsj" label="检测时间" align="center"></el-table-column>
          <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
          <!--<el-table-column prop="cpys" label="车牌颜色" align="center"></el-table-column>
          <el-table-column prop="ccrq" label="年份" align="center"></el-table-column>-->
          <el-table-column prop="czmc" label="车主名称" align="center"></el-table-column>
          <el-table-column prop="sjhm" label="联系号码" align="center"></el-table-column>
          <el-table-column prop="jcjg" label="检测结果" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.jcjg == 1 ? '#909399' : 'red'}"
              >{{jcjgObj[scope.row.jcjg]}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="cfje" label="处罚金额(元)" align="center">
            <template scope="scope">
              <a>{{scope.row.cfje}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="zgzt" label="整改状态" align="center">
            <template scope="scope">
              <a>{{zgztObj[scope.row.zgzt]}}</a>
            </template>
          </el-table-column>
          <!--<el-table-column prop="prop11" label="不透光烟度自由加速检测结果" width="120" align="center"></el-table-column>
          <el-table-column prop="prop12" label="加载减速工况法检测结果" width="120" align="center"></el-table-column>
          <el-table-column prop="prop13" label="罚款金额" width="120" align="center"></el-table-column>
          <el-table-column prop="prop15" label="状态" width="120" align="center"></el-table-column>
          -->
          <el-table-column label="打印预览" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="pdfPrint(scope.row)" size="small">处罚单</el-button>
              <el-button type="text" @click="pdfPrint2(scope.row)" size="small">缴款通知书</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row)">显示详情</el-button>
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
    <information-much :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information-much>
    <pdf-print :diaSta="showPdf" @dialogClose="pdfClose()" :title="pdfTitle" :src="pdfSrc"></pdf-print>
  </div>
</template>


<script>
import informationMuch from "../../common/informationMuch.vue";
import information from "../../common/information.vue";
import pdfPrint from "../../common/pdfPrint.vue";
export default {
  name: "RoadInspectionPunishmentManagement",
  components: {
    information,
    pdfPrint,
    informationMuch
  },
  data() {
    return {
      formTrafficFlowAnalysis: {
        numbers: "",
        type: "",
        startTime: "",
        endTime: ""
      },
      tableData: [],
      jcjgData: [],
      jcjgObj: {},
      zgztObj: {},
      cfztObj: {},
      table_yc: {
        jclsh: "检测流水号",
        spsj: "审批时间",
        jcwcsj: "检测时间",
        hphm: "车牌号码",
        czmc: "车主名称",
        jcdd: "地址",
        sjhm: "手机号码",
        jcjg: "检测结果",
        cfje: "处罚金额(元)",
        zgzt: "整改状态",
        sfjzcf: "是否加重处罚",
        cfdh: "处罚单号",
        cfjzrq: "处罚截止日期",
        cfzt: "处罚状态",
        cfdjs: "处罚单是否寄送",
        cfdjssj: "处罚单寄送时间",
        jkdjs: "缴款单是否已寄送",
        jkdjssj: "缴款单寄送时间",
        zgjzrq: "整改截止日期"
      },
      pdfSrc: "",
      diaSta: false,
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      title: "路检处罚管理详情",
      updataData: [],
      sidebar: "路检处罚管理",
      showPdf: false,
      pdfTitle: "黑烟车处罚文书打印"
    };
  },
  mounted() {
    this.axiosGetData();
    this.carCalorfun("ZGZT");
    this.carCalorfun("JCJG");
    this.carCalorfun("CFZT");
  },
  methods: {
    pdfPrint(row) {
      let that = this;
      this.pdfTitle = "路检处罚通知书 ";
      this.pdfSrc =
        "/serveApi/hbj/roadInspect/cfd?sidebar=" +
        that.sidebar +
        "&czmc=" +
        row.czmc +
        "&hphm=" +
        row.hphm +
        "&jcwcsj=" +
        row.jcwcsj +
        "&jcdd=" +
        row.jcdd +
        "&cljg=" +
        that.jcjgObj[row.jcjg] +
        "&cfje=" +
        row.cfje +
        "&spsj=" +
        row.spsj;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios({
        method: "GET",
        url: that.pdfSrc
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.code == "404") {
            that.showPdf = false;
            that.$message({
              type: "warning",
              message: res.data.msg
            });
          } else if (res.data.code == "500") {
            that.$message({
              type: "warning",
              message: res.data.msg
            });
            that.showPdf = false;
          } else {
            that.showPdf = true;
          }
        })
        .catch(function(err) {
          loadingObj.close();
          this.showPdf = false;
          that.$message({
            message: "很遗憾，请求失败！",
            type: "warning"
          });
        });
    },
    pdfPrint2(row) {
      let that = this;
      this.pdfTitle = "缴款通知单";
      this.pdfSrc =
        "/serveApi/hbj/roadInspect/jkd?sidebar=" +
        that.sidebar +
        "&czmc=" +
        row.czmc +
        "&hphm=" +
        row.hphm +
        "&cfjzrq=" +
        row.cfjzrq +
        "&cfje=" +
        row.cfje +
        "&spsj=" +
        row.spsj;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios({
        method: "GET",
        url: that.pdfSrc
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.code == "404") {
            that.showPdf = false;
            that.$message({
              type: "warning",
              message: res.data.msg
            });
          } else if (res.data.code == "500") {
            that.$message({
              type: "warning",
              message: res.data.msg
            });
            that.showPdf = false;
          } else {
            that.showPdf = true;
          }
        })
        .catch(function(err) {
          loadingObj.close();
          this.showPdf = false;
          that.$message({
            message: "很遗憾，请求失败！",
            type: "warning"
          });
        });
    },
    pdfClose() {
      this.showPdf = false;
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
    axiosGetData(num) {
      if (num === 1) {
        this.currentPage4 = 1;
      }
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      let obj = {};
      if (
        this.formTrafficFlowAnalysis.startTime == "" ||
        this.formTrafficFlowAnalysis.startTime == null ||
        this.formTrafficFlowAnalysis.startTime == "null"
      ) {
        obj.startTime = "";
      } else {
        obj.startTime = this.formTrafficFlowAnalysis.startTime + " 00:00:00";
      }

      if (
        this.formTrafficFlowAnalysis.endTime == "" ||
        this.formTrafficFlowAnalysis.endTime == null ||
        this.formTrafficFlowAnalysis.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.formTrafficFlowAnalysis.endTime + "24:59:59";
      }
      this.$axios({
        method: "GET",
        url: "/serveApi//hbj/roadInspect/getRoadTrack",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          hphm: that.formTrafficFlowAnalysis.numbers,
          zgzt: that.formTrafficFlowAnalysis.type,
          startTime: obj.startTime,
          endTime: obj.endTime
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.data) {
            that.tableData = res.data.data.data;
            that.total = res.data.data.total;
          }
          console.log(res);
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            message: "很遗憾，数据加载失败！",
            type: "warning"
          });
        });
    },
    resetData() {
      let keys_ = Object.keys(this.formTrafficFlowAnalysis);
      for (let i = 0; i < keys_.length; i++) {
        this.formTrafficFlowAnalysis[keys_[i]] = "";
      }
    },
    handleClick(row) {
      this.diaSta = true;
      let keys_ = Object.keys(this.table_yc);
      let arr = [];
      let that = this;
      let newObj = {};
      for (let item in row) {
        if (item == "zgzt") {
          newObj.zgzt = that.zgztObj[row[item]];
        } else if (item == "jcjg") {
          newObj.jcjg = that.jcjgObj[row[item]];
        } else if (item == "sfjzcf") {
          newObj.sfjzcf = row[item] == 0 ? "否" : "是";
        } else if (item == "cfdjs") {
          newObj.cfdjs = row[item] == 0 ? "否" : "是";
        } else if (item == "jkdjs") {
          newObj.jkdjs = row[item] == 0 ? "否" : "是";
        } else if (item == "cfzt") {
          newObj.cfzt = that.cfztObj[row[item]];
        } else {
          newObj[item] = row[item];
        }
      }

      keys_.forEach(function(item, index) {
        let obj = {};
        obj["key"] = that.table_yc[item];
        obj["values"] = newObj[item];
        arr.push(JSON.parse(JSON.stringify(obj)));
      });
      let arrTwo = [];
      let arrlittle = [];
      for (let i = 0; i < arr.length; i++) {
        arrlittle.push(arr[i]);
        if (arrlittle.length == 2 && i < arr.length - 1) {
          arrTwo.push(arrlittle);
          arrlittle = [];
        }
        if (i == arr.length - 1) {
          arrTwo.push(arrlittle);
          arrlittle = [];
        }
      }
      //console.log(arrTwo);
      this.updataData = arrTwo;
    },
    close() {
      this.diaSta = false;
    },
    carCalorfun(type) {
      let that = this;
      let obj = {};
      obj.lx = type;
      obj.sidebar = this.sidebar;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/enum/select",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          if (res.data) {
            if (type === "ZGZT") {
              let obj = {};
              that.jcjgData = res.data.data;
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.zgztObj = obj;
            } else if (type === "JCJG") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.jcjgObj = obj;
            } else {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.cfztObj = obj;
            }
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.formTrafficFlowAnalysis.endTime == "" ||
              this.formTrafficFlowAnalysis.endTime == "null" ||
              this.formTrafficFlowAnalysis.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formTrafficFlowAnalysis.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formTrafficFlowAnalysis.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "起始时间不能大于结束时间!"
              });
              this.formTrafficFlowAnalysis.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.formTrafficFlowAnalysis.startTime == "" ||
              this.formTrafficFlowAnalysis.startTime == "null" ||
              this.formTrafficFlowAnalysis.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formTrafficFlowAnalysis.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formTrafficFlowAnalysis.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "结束时间不能小于起始时间!"
              });
              this.formTrafficFlowAnalysis.endTime = "";
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

