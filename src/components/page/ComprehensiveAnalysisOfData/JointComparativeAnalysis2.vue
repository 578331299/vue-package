<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="dataQuailty" :model="dataQuailty" :inline="true">
        <el-row>
          <el-col :span="18" style="display:flex;justify-content: center;">
            <el-form-item label="遥测起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="dataQuailty.startTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData()"
                @change="timeCheck('startTime')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="-遥测结束时间：">
              <el-date-picker
                v-model="dataQuailty.endTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData()"
                @change="timeCheck('endTime')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary" @click="axiosGetData">查询</el-button>
              <el-button type="primary" @click="resetData">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:510px;width:100%;padding-bottom:2px;padding-left:20px;">
      <div class="div_box_two">
        <div class="div_box_chind1" style="position:relative;height:100%">
          <el-table
            border
            style="width: 100%;height:440px;overflow-y:auto;"
            height="440px"
            :data="tableList"
          >
            <el-table-column label="编号" prop="jclsh"></el-table-column>
            <el-table-column label="车牌号码" prop="hphm"></el-table-column>
            <el-table-column label="车牌颜色" prop="cpys">
              <template scope="scope">
                <a>{{$store.state.enumData.hpys[scope.row.cpys]}}</a>
              </template>
            </el-table-column>
            <el-table-column label="环检时间" prop="bjsj"></el-table-column>
            <el-table-column label="环监站名称" prop="jczmc"></el-table-column>
            <el-table-column label="环检结果" prop="jcjg">
              <template scope="scope">
                <a
                  :style="{color:scope.row.jcjg == 1 ? '#909399' : 'red'}"
                >{{$store.state.enumData.jcjg[scope.row.jcjg]}}</a>
              </template>
            </el-table-column>
            <el-table-column label="遥测时间" prop="jcrq"></el-table-column>
            <el-table-column label="遥测结果" prop="pdjg">
              <template scope="scope">
                <a
                  :style="{color:scope.row.pdjg == 1 ? '#909399' : 'red'}"
                >{{scope.row.pdjg === 1 ? "通过":"不通过"}}</a>
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
        <div class="div_box_chind2" style="text-align:center">
          <img
            src="../../../assets/img/download.png"
            @click="tableToExcel()"
            class="download_img"
            alt
          >
          <v-line :lineId="lineId" ref="vLineName" :lineData="lineData" :styleData="styleData"></v-line>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vLine from "../../common/charts/line.vue";
export default {
  name: "JointComparativeAnalysis2",
  components: { vLine },
  computed: {
    lineData() {
      return {
        title: {
          text: "遥测合格率",
          subtext: "",
          x: "center",
          y: "top",
          top: 5
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              optionToContent: function(opt) {
                var series = opt.series;
                var table =
                  '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border"><tbody><tr>' +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>合格</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "不合格" +
                  "</td>" +
                  "</tr>";
                for (var i = 0, l = series.length; i < l; i++) {
                  table +=
                    "<tr>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[0].value +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[1].value +
                    "</td>" +
                    "</tr>";
                }
                table += "</tbody></table>";
                return table;
              },
              readOnly: true,
              lang: ["", "关闭"]
            }
          },
          right: 20
        },
        color: ["#ed7d31", "#5b9bd5"],
        legend: {
          // orient: "vertical",
          x: "center",
          y: "85%",

          data: ["合格", "不合格"]
        },
        grid: {
          bottom: ""
        },
        series: [
          {
            name: "遥测合格率",
            type: "pie",
            radius: "55%",
            data: this.lineDataUsed
          }
        ]
      };
    }
  },
  data() {
    return {
      lineId: "chartA",
      lineId2: "chartB",
      styleData: { width: "100%", height: "490px" },
      dataQuailty: {
        startTime: "",
        endTime: ""
      },
      tableList: [],
      lineDataUsed: [{ value: 0, name: "不合格" }, { value: 0, name: "合格" }],
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "遥测与环检数据对比分析",
      cpysObj: {},
      jcjgObj: {}
    };
  },
  created() {
    //this.carCalorfun("HPYS");
    //this.carCalorfun("JCJG");
  },
  mounted() {
    this.axiosGetData();
  },
  methods: {
    /**
     * @description 分页每页条数设置
     * @author lifei
     * @version 2019.6.04
     */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 分页跳转页签
     * @author lifei
     * @version 2019.6.04
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 搜索，初始化数据
     * @author lifei
     * @version 2019.6.04
     */
    axiosGetData() {
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
        this.dataQuailty.startTime == "" ||
        this.dataQuailty.startTime == null ||
        this.dataQuailty.startTime == "null"
      ) {
        obj.startTime = "";
      } else {
        obj.startTime = this.dataQuailty.startTime + " 00:00:00";
      }

      if (
        this.dataQuailty.endTime == "" ||
        this.dataQuailty.endTime == null ||
        this.dataQuailty.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.dataQuailty.endTime + "24:59:59";
      }
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/hj/getAnalysis",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          startTime: obj.startTime,
          endTime: obj.endTime
        }
      })
        .then(function(res) {
          loadingObj.close();
          //console.log(res.data.data);
          if (res.data.data.data) {
            that.tableList = res.data.data.data;
            that.total = res.data.data.total;
            that.lineDataUsed[0].value = parseInt(res.data.data["0"]);
            that.lineDataUsed[1].value = parseInt(res.data.data["1"]);
            that.$refs.vLineName.line();
            //console.log(that.lineDataUsed);
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            message: "很遗憾，数据加载失败！",
            type: "warning"
          });
        });
    },
    /**
     * @description 重置
     * @author lifei
     * @version 2019.6.04
     */
    resetData() {
      let keys_ = Object.keys(this.dataQuailty);
      for (let i = 0; i < keys_.length; i++) {
        this.dataQuailty[keys_[i]] = "";
      }
    },
    /**
     * @description 搜索时间开始结束校验
     * @author lifei
     * @version 2019.6.04
     */
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.dataQuailty.endTime == "" ||
              this.dataQuailty.endTime == "null" ||
              this.dataQuailty.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.dataQuailty.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(this.dataQuailty.endTime.replace(/-/g, ""));

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "起始时间不能大于结束时间!"
              });
              this.dataQuailty.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.dataQuailty.startTime == "" ||
              this.dataQuailty.startTime == "null" ||
              this.dataQuailty.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.dataQuailty.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(this.dataQuailty.endTime.replace(/-/g, ""));

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "结束时间不能小于起始时间!"
              });
              this.dataQuailty.endTime = "";
            }
          }
          break;
      }
    },
    tableToExcel() {
      //列标题
      let str = "<tr><td>合格</td><td>不合格</td></tr>";
      //列数据
      str += `<tr><td>${this.lineDataUsed[1].value}</td><td>${
        this.lineDataUsed[0].value
      }</td></tr>`;
      //Worksheet名
      let worksheet = "Sheet1";
      let uri = "data:application/vnd.ms-excel;base64,";

      //下载的表格模板数据
      let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      //下载模板
      window.location.href = uri + this.base64(template);
    },
    base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    }
  }
};
</script>

<style  scoped>
.div_box_two {
  display: flex;
  height: 100%;
}
.div_box_chind1 {
  width: 66.66%;
  position: relative;
}
.div_box_chind2 {
  width: 33.33%;
  position: relative;
}
.download_img {
  position: absolute;
  right: 50px;
  top: 7px;
  z-index: 1;
  cursor: pointer;
}
</style>

