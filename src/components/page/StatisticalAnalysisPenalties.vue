<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <!-- <el-col :span="6" style="display:flex;justify-content: flex-end;align-item:center">
            <el-form-item label="站点：">
              <el-input v-model="formTrafficFlowAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="16" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="formTrafficFlowAnalysis.startTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @change="timeCheck('startTime')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="- 结束时间：">
              <el-date-picker
                v-model="formTrafficFlowAnalysis.endTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @change="timeCheck('endTime')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary" @click="axiosGetData">查询</el-button>
              <el-button type="primary" @click="btn_reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:auto;">
      <el-row>
        <el-col :span="12" style="position: relative;">
          <img src="../../assets/img/download.png" class="download_img" alt>
          <v-line :lineData="lineData" :styleData="styleData" :lineId="lineId" ref="line1"></v-line>
        </el-col>
        <el-col :span="12" style="position: relative;">
          <img src="../../assets/img/download.png" class="download_img" alt>
          <v-line :lineData="lineData2" :styleData="styleData" :lineId="lineId2" ref="line2"></v-line>
        </el-col>

        <el-col :span="24" style="margin-top:50px;position: relative;">
          <img src="../../assets/img/download.png" class="download_img" alt>
          <v-line :lineData="lineData3" :styleData="styleData2" :lineId="lineId3" ref="line3"></v-line>
        </el-col>
      </el-row>
    </div>

    <!--<img src="../../../assets/img/车流量分析.png">-->
  </div>
</template>

<script>
import vLine from "../common/charts/line.vue";

export default {
  name: "TrafficFlowAnalysis",
  computed: {
    lineData() {
      return {
        title: {
          text: "按照时间查询各点位违章数",
          left: "center",
          top: "5"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              optionToContent: function(opt) {
                let series = opt.series;
                let td =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "类型" +
                  "</td>";

                for (let i = 0; i < opt.xAxis[0].data.length; i++) {
                  td +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    opt.xAxis[0].data[i] +
                    "</td>";
                }
                let table =
                  '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border"><tbody><tr>' +
                  td +
                  "</tr>";
                let trTd1 =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  series[0].name +
                  "</td>";
                for (let i = 0; i < series[0].data.length; i++) {
                  trTd1 +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[0].data[i] +
                    "</td>";
                }
                let trTd2 =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  series[1].name +
                  "</td>";
                for (let i = 0; i < series[1].data.length; i++) {
                  trTd2 +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[1].data[i] +
                    "</td>";
                }
                table +=
                  "<tr>" +
                  trTd1 +
                  "</tr>" +
                  "<tr>" +
                  trTd2 +
                  "</tr>" +
                  "</tbody></table>";
                let div =
                  "<div style='width: 100%;overflow: auto'>" + table + "</div>";
                return div;
              },
              readOnly: true,
              lang: ["", "关闭"]
            }
          },
          right: 20
        },
        legend: {
          //left: 'left',

          data: ["黄标车", "单双号限行"],
          x: "center",
          y: "top",
          top: "30"
        },
        xAxis: {
          type: "category",
          name: "",
          splitLine: { show: false },
          data: this.lineDataValue.tuli
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "40",
          containLabel: true
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: "",
          name: ""
        },
        dataZoom: {
          id: "dataZoomX",
          type: "slider",
          xAxisIndex: [0],
          filterMode: "filter"
        },
        series: [
          {
            name: "黄标车",
            type: "line",
            data: this.lineDataValue.val1,
            itemStyle: { normal: { label: { show: true } } }
          },
          {
            name: "单双号限行",
            type: "line",
            data: this.lineDataValue.val2,
            itemStyle: { normal: { label: { show: true } } }
          }
        ]
      };
    },
    lineData2() {
      return {
        title: {
          text: "按照时间查询各点位遥测超标数与处罚数对比",
          x: "center",
          top: "5"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              optionToContent: function(opt) {
                let series = opt.series;
                let td =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "类型" +
                  "</td>";

                for (let i = 0; i < opt.yAxis[0].data.length; i++) {
                  td +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    opt.yAxis[0].data[i] +
                    "</td>";
                }
                let table =
                  '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border"><tbody><tr>' +
                  td +
                  "</tr>";
                let trTd1 =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  series[0].name +
                  "</td>";
                for (let i = 0; i < series[0].data.length; i++) {
                  trTd1 +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[0].data[i] +
                    "</td>";
                }
                let trTd2 =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  series[1].name +
                  "</td>";
                for (let i = 0; i < series[1].data.length; i++) {
                  trTd2 +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[1].data[i] +
                    "</td>";
                }
                table +=
                  "<tr>" +
                  trTd1 +
                  "</tr>" +
                  "<tr>" +
                  trTd2 +
                  "</tr>" +
                  "</tbody></table>";
                let div =
                  "<div style='width: 100%;overflow: auto'>" + table + "</div>";
                return div;
              },
              readOnly: true,
              lang: ["", "关闭"]
            }
          },
          right: 20
        },
        legend: {
          data: ["遥测超标数", "遥测处罚数"],
          x: "center",
          y: "top",
          top: "30"
        },
        dataZoom: {
          id: "dataZoomY",
          type: "slider",
          yAxisIndex: [0],
          filterMode: "filter"
        },
        grid: {
          left: "3%",
          right: "40",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          splitLine: {
            show: false
          },
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: "category",
          data: this.lineData2Value.tuli
        },
        series: [
          {
            name: "遥测超标数",
            type: "bar",
            data: this.lineData2Value.val1
          },
          {
            name: "遥测处罚数",
            type: "bar",
            data: this.lineData2Value.val2
          }
        ]
      };
    },
    lineData3() {
      return {
        title: {
          text: "检查、复检、处罚月数据分析",
          x: "center",
          top: "5"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              optionToContent: function(opt) {
                let series = opt.series;
                let td =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "类型" +
                  "</td>";

                for (let i = 0; i < opt.xAxis[0].data.length; i++) {
                  td +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    opt.xAxis[0].data[i] +
                    "</td>";
                }
                let table =
                  '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border"><tbody><tr>' +
                  td +
                  "</tr>";
                let trTd1 =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  series[0].name +
                  "</td>";
                for (let i = 0; i < series[0].data.length; i++) {
                  trTd1 +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[0].data[i] +
                    "</td>";
                }
                let trTd2 =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  series[1].name +
                  "</td>";
                for (let i = 0; i < series[1].data.length; i++) {
                  trTd2 +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[1].data[i] +
                    "</td>";
                }

                let trTd3 =
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  series[2].name +
                  "</td>";
                for (let i = 0; i < series[2].data.length; i++) {
                  trTd3 +=
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[2].data[i] +
                    "</td>";
                }
                table +=
                  "<tr>" +
                  trTd1 +
                  "</tr>" +
                  "<tr>" +
                  trTd2 +
                  "</tr>" +
                  "<tr>" +
                  trTd3 +
                  "</tr>" +
                  "</tbody></table>";
                let div =
                  "<div style='width: 100%;overflow: auto'>" + table + "</div>";
                return div;
              },
              readOnly: true,
              lang: ["", "关闭"]
            }
          },
          right: 20
        },
        legend: {
          data: ["月检查数", "月复检数", "月处罚量"],
          x: "center",
          y: "bottom"
        },
        xAxis: [
          {
            splitLine: {
              show: false
            },
            type: "category",
            data: this.lineData3Value.tuli,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: false
            },
            type: "value",
            name: "检查、复检数量",

            interval: 20,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            splitLine: {
              show: false
            },
            type: "value",
            name: "处罚数量",

            interval: 20,
            splitLine: { show: false },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "月检查数",
            type: "bar",
            data: this.lineData3Value.val1
          },
          {
            name: "月复检数",
            type: "bar",
            data: this.lineData3Value.val2
          },
          {
            name: "月处罚量",
            type: "line",
            yAxisIndex: 1,
            data: this.lineData3Value.val3
          } /*,
          {
            name: "月缴费量",
            type: "line",
            yAxisIndex: 1,
            data: [10, 12, 15, 10, 11, 13, 15, 20, 5, 20, 10, 20]
          }*/
        ]
      };
    }
  },
  data() {
    return {
      lineId: "test",
      lineId2: "test2",
      lineId3: "test3",
      sidebar: "处罚统计分析",
      formTrafficFlowAnalysis: {
        startTime: "",
        endTime: ""
      },
      lineDataValue: {
        tuli: ["点位1", "点位2", "点位3", "点位4", "点位D"],
        val1: [10, 8, 6, 12, 10],
        val2: [15, 16, 12, 20, 10]
      },
      lineData2Value: {
        tuli: ["点位A", "点位B", "点位C", "点位D"],
        val1: [10, 8, 6, 12],
        val2: [15, 16, 12, 20]
      },
      lineData3Value: {
        tuli: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
        val1: [30, 28, 29, 16, 18, 28, 27, 30, 29, 22, 12, 60],
        val2: [15, 12, 18, 10, 9, 20, 10, 6, 9, 2, 5, 30],
        val3: [15, 16, 17, 15, 16, 19, 20, 22, 10, 20, 11, 30]
      },
      styleData: {
        width: "100%",
        height: "360px"
      },
      styleData2: {
        width: "100%",
        height: "450px"
      }
    };
  },
  components: {
    vLine
  },
  mounted() {
    this.axiosGetData();
  },
  methods: {
    /**
     * @description 重置
     * @author lifei
     * @version 2019.5.28
     */
    btn_reset() {
      //重置按钮
      this.formTrafficFlowAnalysis.startTime = "";
      this.formTrafficFlowAnalysis.endTime = "";
    },
    /**
     * @description 初始化、搜索图表数据展示
     * @author lifei
     * @version 2019.5.28
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
        url: "/serveApi/hbj/remoteSensing/getPunishAnalys",
        params: {
          sidebar: "处罚统计分析",
          startTime: obj.startTime,
          endTime: obj.endTime
        }
      })
        .then(function(res) {
          loadingObj.close();
          console.log(res.data.data);
          //图表一
          if (res.data.data.data1) {
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            for (let i = 0; i < res.data.data.data1.length; i++) {
              arr1.push(res.data.data.data1[i].dwmc);
              arr2.push(res.data.data.data1[i].hbcsl);
              arr3.push(res.data.data.data1[i].xxsl);
            }
            that.lineDataValue.tuli = arr1;
            that.lineDataValue.val1 = arr2;
            that.lineDataValue.val2 = arr3;
            that.$refs.line1.line();
          }
          //图表二
          if (res.data.data.data2) {
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            for (let i = 0; i < res.data.data.data2.length; i++) {
              arr1.push(res.data.data.data2[i].dwmc);
              arr2.push(res.data.data.data2[i].cbsl);
              arr3.push(res.data.data.data2[i].cfsl);
            }
            that.lineData2Value.tuli = arr1;
            that.lineData2Value.val1 = arr2;
            that.lineData2Value.val2 = arr3;
            that.$refs.line2.line();
          }
          //图表3
          if (res.data.data.data3) {
            let arr1 = Object.keys(res.data.data.data3.ycfl);
            for (let i = 0; i < arr1.length; i++) {
              for (let j = i; j < arr1.length; j++) {
                if (new Date(arr1[i]) > new Date(arr1[j])) {
                  let temporaryData = arr1[i];
                  arr1[i] = arr1[j];
                  arr1[j] = temporaryData;
                }
              }
            }
            let arr2 = [];
            let arr3 = [];
            let arr4 = [];

            for (let i = 0; i < arr1.length; i++) {
              arr2.push(res.data.data.data3.yjcs[arr1[i]]);
              arr3.push(res.data.data.data3.yfjs[arr1[i]]);
              arr4.push(res.data.data.data3.ycfl[arr1[i]]);
            }
            that.lineData3Value.tuli = arr1;
            that.lineData3Value.val1 = arr2;
            that.lineData3Value.val2 = arr3;
            that.lineData3Value.val3 = arr4;
            console.log();
            that.$refs.line3.line();
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
    /**
     * @description 时间校验
     * @author lifei
     * @version 2019.5.28
     */
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
.download_img {
  position: absolute;
  right: 50px;
  top: 7px;
  z-index: 1;
  cursor: pointer;
}
</style>

