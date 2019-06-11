<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="dataQuailty" :model="dataQuailty" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="站点：">
              <el-input v-model="dataQuailty.zd" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker v-model="dataQuailty.startTime" class="time-input"></el-date-picker>
            </el-form-item>
            <el-form-item label="-结束时间：">
              <el-date-picker v-model="dataQuailty.endTime" class="time-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary">查询</el-button>
              <el-button type="primary">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:800px">
      <div style="display:flex">
        <div style="width:50%;marginLeft:150px">
          <v-line :lineId="idLeft" :lineData="chartDataLeft" :styleData="chartDataLeftStyle"></v-line>
        </div>
        <div style="width:50%">
          <v-line
            :lineId="idRightTop"
            :lineData="chartDataRightTop"
            :styleData="chartDataRightTopStyle"
          ></v-line>
        </div>
      </div>
      <div style="marginTop:20px">
          <v-line
            :lineId="idRightBottom"
            :lineData="chartDataRightBottom"
            :styleData="chartDataRIghtBottomStyle"
          ></v-line>
      </div>
    </div>
    <!-- <v-line :lineId="idchart" :lineData="SmokyCarStatisticsClone" :styleData="chartData"></v-line> -->
  </div>
  <!-- </div> -->
</template>
<script>
import vLine from "../../common/charts/line.vue";
export default {
  name: "StatisticalAnalysisOfTelemetryData",
  components: { vLine },
  data() {
    return {
      colorList: ["#5b9bd5", "#ed7d31", "#a5a5a5"],
      idLeft: "chart-left",
      idchart: "chart-bar",
      idRightTop: "chart-right-top",
      idRightBottom: "chart-right-bottom",
      chartDataLeftStyle: { width:"50%", height:"300px" },
      chartDataRightTopStyle: { width:"100%", height: "300px" },
      chartDataRIghtBottomStyle: { width: "100%", height:"300px"},
      chartData: { width: "100%", height: "300px" },
      dataQuailty: {
        site: "",
        startTime: "",
        endTime: ""
      },
      chartDataLeftClone: {},
      chartDataLeft: {
        title: {
          text: "超标因子在全部超标车中的占比",
          left: "center"
        },
        tooltip: {
          trigger: "item"
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          left: "right",
          top: "center",
          orient: "vertical"
          /*show: true,
          orient: "horizontal",
           left: "right",
          top: "center",
          data: ["Co", "Co2", "NO", "So2"]*/
          // top: "bottom"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: "inner",
                formatter: function(val) {
                  // console.log(name)
                  return "" + val.data.name + "\n" + val.data.value + "%";
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {
                value: 16,
                name: "Co",
                itemStyle: { normal: { color: "#5b9bd5" } }
              },
              {
                value: 15,
                name: "Co2",
                itemStyle: { normal: { color: "#ed7d31" } }
              },
              {
                value: 46,
                name: "No",
                itemStyle: { normal: { color: "#a5a5a5" } }
              },
              {
                value: 23,
                name: "So2",
                itemStyle: { normal: { color: "#ffc000" } }
              }
            ]
          }
        ]
      },
      SmokyCarStatisticsClone: {},
      chartDataRightTop: {
        title: {
          text: "超标率与合格率",
          left: "center",
          textStyle: {
            fontSize: 17
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: "90",
          top: "30"
          //data: ["超标", "合格", "总和"]
        },
        xAxis: {
          data: ["N1", "N2", "N3", "M1", "M2"],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "超标",
            type: "line",
            data: [25, 60, 16, 25, 34],
            stack: "1",
            itemStyle: {
              normal: { color: "#4c92d2" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          },
          {
            name: "合格",
            type: "line",
            data: [65, 58, 52, 77, 66],
            stack: "1",
            itemStyle: {
              normal: { color: "#e96f1b" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          },
          {
            name: "总和",
            type: "line",
            data: [90, 118, 68, 102, 100],
            stack: "1",
            itemStyle: {
              normal: { color: "#a5a5a5" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          }
        ]
      },
      chartDataRightBottom: {
        title: {
          text: "超标因子在各类车型中的占比",
          left: "center",
          textStyle: {
            fontSize: 17
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: "90",
          top: "30"
          // data: ["Co", "Co2", "No", "So2"]
        },
        xAxis: {
          data: ["N1", "N2", "N3", "M1", "M2"],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "So2",
            type: "bar",
            stack: "1",
            data: [34, 35, 39, 40, 28],
            itemStyle: {
              normal: { color: "#ffc000" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          },
          {
            name: "N0",
            type: "bar",
            stack: "1",
            data: [90, 52, 68, 75, 74],
            itemStyle: {
              normal: { color: "#a5a5a5" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          },
          {
            name: "C02",
            type: "bar",
            stack: "1",
            data: [28, 18, 35, 22, 15],
            itemStyle: {
              normal: { color: "#ed7d31" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          },
          {
            name: "C0",
            type: "bar",
            stack: "1",
            data: [35, 26, 27, 19, 22],
            itemStyle: {
              normal: { color: "#5b9bd5" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          }
        ]
      }
    };
  },
  mounted() {},
  created() {
    this.smokeCarCharts();
  },
  methods: {
    smokeCarCharts() {
      let that = this;
      this.$axios
        .get("/serveApi/hbj/blackSmokeVechicle/getAnalysResult")
        .then(function(res) {
          let clone = that.$utils.deepClone(that.SmokyCarStatistics);
          clone.xAxis.data = res.data.data[0];
          let arr = [];
          res.data.data[1].forEach((ele, index) => {
            let obj = {};
            obj.name = ele.name;
            obj.type = ele.type;
            obj.data = ele.data;
            obj.itemStyle = {
              normal: {color: that.colorList[index]}
            };
            arr.push(obj);
          });
          clone.series = arr;
          clone.toolbox.feature.dataView.optionToContent = function(opt) {
            //拼表格
            // console.log(opt)
            var tr = "";
            var thead = "";
            let xValue = opt.xAxis[0].data;
            xValue.forEach(ele => {
              thead += "<td class='tdClass'>" + ele + "</td>";
            });
            tr = "<tr><td class='tdClass'>车辆</td>" + thead + "</tr>";
            for (var i in opt.series) {
              var td = "";
              opt.series[i].data.forEach(ele => {
                td += "<td class='tdClass'>" + ele + "</td>";
              });
              tr +=
                "<tr><td class='tdClass'>" +
                opt.series[i].name +
                "</td>" +
                td +
                "</tr>";
            }
            var table =
              '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border">' +
              tr +
              "</table>";
            return table;
          };
          that.SmokyCarStatisticsClone = clone;
        });
    },
    proportionCharts() {
      this.$axios({});
    }
  }
};
</script>

<style>
.tdClass {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #909399;
}
</style>
<style scoped>
</style>


