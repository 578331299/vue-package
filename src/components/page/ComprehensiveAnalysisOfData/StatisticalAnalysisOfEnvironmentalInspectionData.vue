
<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="formEnvironmentalInspection"
        :model="formEnvironmentalInspection"
        :inline="true"
      >
        <el-row>
          <!--<el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="站点：">
              <el-input v-model="formEnvironmentalInspection.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="18" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="formEnvironmentalInspection.startTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData()"
                @change="timeCheck('startTime')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="- 结束时间：">
              <el-date-picker
                v-model="formEnvironmentalInspection.endTime"
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
    <div class="chare_box" style="height:640px;display:flex">
      <div style="width:50%;" class="position_relative">
        <img src="../../../assets/img/download.png" class="download_img" alt>
        <v-line
          :lineData="RingInspectionVehicledata"
          :styleData="RingInspectionVehicleStyle"
          :lineId="RingInspectionVehicleId"
          ref="vline1"
        ></v-line>
      </div>
      <div style="width:50%;" class="position_relative" id="wid">
        <img src="../../../assets/img/download.png" class="download_img" alt>
        <v-line
          :lineData="LoopCheckFactorData"
          :styleData="LoopCheckFactorStyle"
          :lineId="LoopCheckFactorId"
          ref="vline2"
        ></v-line>
        <!--<v-table :styleDiv="styleDiv"></v-table>
        <div class="ico_cont">
          <div v-for="items in LegendColor" :key="items.index">
            <span class="span1 span" :style="{borderTop:items.border }"></span>
            <span class="span2 span" :style="{background:items.color}"></span>
            <span class="span3 span">{{items.name}}</span>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
import vTable from "../../common/table.vue";
export default {
  name: "StatisticalAnalysisOfEnvironmentalInspectionData",
  data() {
    return {
      formEnvironmentalInspection: {
        site: "",
        startTime: "",
        endTime: ""
      },
      monthdata: [],
      RingInspectionVehicleId: "RingInspectionVehicle_id",
      RingInspectionVehicleStyle: {
        width: "100%",
        height: "600px"
      },
      LoopCheckFactorId: "LoopCheckFactor_id",
      LoopCheckFactorStyle: {
        width: "100%",
        height: "600px"
      },
      styleDiv: {
        position: "absolute",
        left: "50px",
        bottom: "32px"
      },
      LegendColor: [
        { color: "#5597d3", name: "CO", border: "3px solid #5597d3" },
        { color: "#ed7d31", name: "CO2", border: "3px solid #ed7d31" },
        { color: "#a5a5a5", name: "NO", border: "3px solid #a5a5a5" },
        { color: "#ffc000", name: "SO2", border: "3px solid #ffc000" }
      ],
      listEight: ["K", "H", "Q", "Z", "M", "T", "G", "B"],
      valueData1: {
        "0": [0, 0, 0, 0, 0, 0, 0, 0],
        "1": [0, 0, 0, 0, 0, 0, 0, 0]
      },
      valueData2: {
        CO: [0, 0, 0, 0, 0, 0, 0, 0],
        HC: [0, 0, 0, 0, 0, 0, 0, 0],
        NO: [0, 0, 0, 0, 0, 0, 0, 0]
      }
    };
  },

  components: {
    vLine,
    vTable
  },
  computed: {
    //环检车辆合格率数据
    RingInspectionVehicledata() {
      return {
        title: {
          text: "环检车辆合格率",
          left: "center",
          top: 5,
          textStyle: {
            //color: "#436EEE",
            //fontSize: 17
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>" +
              params[0].seriesName +
              "：" +
              params[0].data +
              "" +
              "<br/>" +
              params[1].seriesName +
              "：" +
              params[1].data +
              ""
            );
          }
        },
        toolbox: {
          feature: {
            dataView: {
              optionToContent: function(opt) {
                var series = opt.series;
                var table =
                  '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border"><tbody><tr>' +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>类型</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "k(客车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "H(货车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "Q(牵引车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "Z(坐业车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "M(摩托车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "T(拖拉机)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "G(全挂)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "B(半挂)" +
                  "</td>" +
                  "</tr>";
                for (var i = 0, l = series.length; i < l; i++) {
                  table +=
                    "<tr>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].name +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[0] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[1] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[2] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[3] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[4] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[5] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[6] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[7] +
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
        legend: {
          itemWidth: 15,
          itemHeight: 15,
          data: ["环检合格车辆", "环检不合格车辆"],
          y: "bottom"
        },
        xAxis: {
          data: [
            "k(客车)",
            "H(货车)",
            "Q(牵引车)",
            "Z(坐业车)",
            "M(摩托车)",
            "T(拖拉机)",
            "G(全挂)",
            "B(半挂)"
          ],
          axisLabel: {
            interval: 0,
            rotate: 20
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            interval: "auto",
            formatter: "{value} %"
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "环检合格车辆(%)",
            type: "bar",
            stack: "使用情况",
            data: this.valueData1["1"],
            itemStyle: {
              normal: { color: "#5b9bd5" }
            }
          },
          {
            name: "环检不合格车辆(%)",
            type: "bar",
            stack: "使用情况",
            data: this.valueData1["0"],
            itemStyle: {
              normal: { color: "#ed7d31" }
            }
          }
        ]
      };
    },
    //车型与环检因子排放水平数据
    LoopCheckFactorData() {
      return {
        title: {
          text: "车型与环检因子排放水平",
          x: "center",
          top: 5
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["CO", "HC", "NO"],
          y: "bottom"
        },

        grid: {
          //left: "1%",
          //right: "7%",
          //containLabel: true
          //x: "50px",
          //x2: "20px"
        },
        toolbox: {
          feature: {
            dataView: {
              optionToContent: function(opt) {
                var series = opt.series;
                var table =
                  '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border"><tbody><tr>' +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>类型</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "k(客车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "H(货车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "Q(牵引车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "Z(坐业车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "M(摩托车)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "T(拖拉机)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "G(全挂)" +
                  "</td>" +
                  "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                  "B(半挂)" +
                  "</td>" +
                  "</tr>";
                for (var i = 0, l = series.length; i < l; i++) {
                  table +=
                    "<tr>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].name +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[0] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[1] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[2] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[3] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[4] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[5] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[6] +
                    "</td>" +
                    "<td style='line-height: 30px;border: 1px solid #909399;'>" +
                    series[i].data[7] +
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
        xAxis: {
          type: "category",
          //boundaryGap: false,
          data: [
            "k(客车)",
            "H(货车)",
            "Q(牵引车)",
            "Z(坐业车)",
            "M(摩托车)",
            "T(拖拉机)",
            "G(全挂)",
            "B(半挂)"
          ],
          axisLabel: {
            interval: 0,
            rotate: 20
          },
          axisLine: {
            //y轴
            //show: false
          },
          splitLine: {
            //网格线
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: false
          }
        },
        series: [
          {
            name: "CO(%)",
            type: "line",
            data: this.valueData2["CO"],
            itemStyle: {
              normal: { color: "#5597d3" }
            }
          },
          {
            name: "HC(ppm)",
            type: "line",
            data: this.valueData2["HC"],
            itemStyle: {
              normal: { color: "#ed7d31" }
            }
          },
          {
            name: "NO(ppm)",
            type: "line",
            data: this.valueData2["NO"],
            itemStyle: {
              normal: { color: "#a5a5a5" }
            }
          }
        ]
      };
    }
  },
  created() {
    this.axiosGetData();
  },
  mounted() {},
  methods: {
    /**
     * @description 初始化、搜索图表数据展示
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData() {
      let that = this;
      let obj = {};
      if (
        this.formEnvironmentalInspection.startTime == "" ||
        this.formEnvironmentalInspection.startTime == null ||
        this.formEnvironmentalInspection.startTime == "null"
      ) {
        obj.startTime = "";
      } else {
        obj.startTime =
          this.formEnvironmentalInspection.startTime + " 00:00:00";
      }

      if (
        this.formEnvironmentalInspection.endTime == "" ||
        this.formEnvironmentalInspection.endTime == null ||
        this.formEnvironmentalInspection.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.formEnvironmentalInspection.endTime + "24:59:59";
      }
      this.$axios({
        method: "get",
        url: "/serveApi/hbj//hj/HjResultAnalysis",
        params: {
          sidebar: "环检数据统计分析",
          startTime: obj.startTime,
          endTime: obj.endTime
        }
      })
        .then(function(res) {
          console.log(res.data.data);
          if (res.data) {
            let obj0 = [0, 0, 0, 0, 0, 0, 0, 0];
            let obj1 = [0, 0, 0, 0, 0, 0, 0, 0];
            let objCO = [0, 0, 0, 0, 0, 0, 0, 0];
            let objHC = [0, 0, 0, 0, 0, 0, 0, 0];
            let objNO = [0, 0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < that.listEight.length; i++) {
              let numall = 0;
              let num0 = 0;
              let num1 = 0;
              if (res.data.data["0"][that.listEight[i]]) {
                num0 = parseInt(res.data.data["0"][that.listEight[i]]);
              }
              if (res.data.data["1"][that.listEight[i]]) {
                num1 = parseInt(res.data.data["1"][that.listEight[i]]);
              }
              if (res.data.data["data"][that.listEight[i]]) {
                console.log(res.data.data.data[that.listEight[i]]);
                objCO[i] = res.data.data.data[that.listEight[i]].co;
                objHC[i] = res.data.data.data[that.listEight[i]].hc;
                objNO[i] = res.data.data.data[that.listEight[i]].no;
              }
              numall = num0 + num1;
              if (numall > 0) {
                obj0[i] = Math.round((num0 / numall) * 100);
                obj1[i] = Math.round((num1 / numall) * 100);
              }
            }

            that.valueData1["0"] = obj0;
            that.valueData1["1"] = obj1;
            that.valueData2["CO"] = objCO;
            that.valueData2["NO"] = objNO;
            that.valueData2["HC"] = objHC;
          }
          console.log(that.valueData1);
          //debugger;
          that.$refs.vline1.line();
          that.$refs.vline2.line();
        })
        .catch(function(err) {
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
              this.formEnvironmentalInspection.endTime == "" ||
              this.formEnvironmentalInspection.endTime == "null" ||
              this.formEnvironmentalInspection.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formEnvironmentalInspection.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formEnvironmentalInspection.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.formEnvironmentalInspection.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.formEnvironmentalInspection.startTime == "" ||
              this.formEnvironmentalInspection.startTime == "null" ||
              this.formEnvironmentalInspection.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formEnvironmentalInspection.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formEnvironmentalInspection.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.formEnvironmentalInspection.endTime = "";
            }
          }
          break;
      }
    },
    /**
     * @description 重置
     * @author lifei
     * @version 2019.5.28
     */
    resetData() {
      let keys_ = Object.keys(this.formEnvironmentalInspection);
      for (let i = 0; i < keys_.length; i++) {
        this.formEnvironmentalInspection[keys_[i]] = "";
      }
    }
  }
};
</script>
<style scoped>
.ico_cont {
  border: 1px solid #ebeef5;
  width: 48px;
  font-size: 0;
  position: absolute;
  left: 1px;
  bottom: 32px;
}
.ico_cont > div {
  border-bottom: 1px solid #ebeef5;
  height: 14px;
  position: relative;
  font-size: 12px;
}
.ico_cont > div:last-child {
  border-bottom: none;
}
.span {
  display: inline-block;
}
.span1 {
  width: 20px;
  position: relative;
  top: -2px;
}
.span2 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: absolute;
  left: 7px;
  top: 3px;
}
.position_relative {
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
