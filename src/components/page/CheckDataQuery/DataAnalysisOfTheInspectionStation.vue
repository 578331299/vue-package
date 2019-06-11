
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
                @change="timeCheck('startTime')"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="- 结束时间：">
              <el-date-picker
                v-model="formEnvironmentalInspection.endTime"
                value-format="yyyy-MM-dd"
                @change="timeCheck('endTime')"
                class="time-input"
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
      <div class="every_line" style="width:50%">
        <img src="../../../assets/img/download.png" class="download_img" alt>
        <v-line
          :lineData="RingInspectionVehicledata"
          :styleData="RingInspectionVehicleStyle"
          :lineId="RingInspectionVehicleId"
          ref="vline1"
        ></v-line>
      </div>
      <div class="every_line" style="width:50%;position:relative" id="wid">
        <img src="../../../assets/img/download.png" class="download_img" alt>
        <v-line
          :lineData="LoopCheckFactorData"
          :styleData="LoopCheckFactorStyle"
          :lineId="LoopCheckFactorId"
          ref="vline2"
        ></v-line>
      </div>
      <div class="every_line" style="width:50%">
        <img src="../../../assets/img/download.png" class="download_img" alt>
        <v-line
          :styleData="RingInspectionVehicleStyle"
          :lineId="lastId"
          :lineData="lastData"
          ref="vline3"
        ></v-line>
      </div>
    </div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-table :data="tableList1">
        <el-table-column label="数据类型" prop="type" width="120" align="center"></el-table-column>
        <el-table-column label="k(客车)" prop="K" align="center"></el-table-column>
        <el-table-column label="H(货车)" prop="H" align="center"></el-table-column>
        <el-table-column label="Q(牵引车)" prop="Q" align="center"></el-table-column>
        <el-table-column label="Z(坐业车)" prop="Z" align="center"></el-table-column>
        <el-table-column label="M(摩托车)" prop="M" align="center"></el-table-column>
        <el-table-column label="T(拖拉机)" prop="T" align="center"></el-table-column>
        <el-table-column label="G(全挂)" prop="G" align="center"></el-table-column>
        <el-table-column label="B(半挂)" prop="B" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-table :data="tableList2">
        <el-table-column label="数据类型" prop="type" width="120" align="center"></el-table-column>
        <el-table-column label="k(客车)" prop="K" align="center"></el-table-column>
        <el-table-column label="H(货车)" prop="H" align="center"></el-table-column>
        <el-table-column label="Q(牵引车)" prop="Q" align="center"></el-table-column>
        <el-table-column label="Z(坐业车)" prop="Z" align="center"></el-table-column>
        <el-table-column label="M(摩托车)" prop="M" align="center"></el-table-column>
        <el-table-column label="T(拖拉机)" prop="T" align="center"></el-table-column>
        <el-table-column label="G(全挂)" prop="G" align="center"></el-table-column>
        <el-table-column label="B(半挂)" prop="B" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-table :data="tableListData3">
        <el-table-column label="数据类型" prop="type" width="120" align="center"></el-table-column>
        <el-table-column label="遥测复检" prop="yc" align="center"></el-table-column>
        <el-table-column label="黑烟车复检" prop="hyc" align="center"></el-table-column>
        <el-table-column label="路检复检" prop="lj" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
import vTable from "../../common/table.vue";
export default {
  name: "StatisticalAnalysisOfEnvironmentalInspectionData",
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
              "%" +
              "<br/>" +
              params[1].seriesName +
              "：" +
              params[1].data +
              "%"
            );
          }
        },
        legend: {
          itemWidth: 15,
          itemHeight: 15,
          data: ["环检合格车辆", "环检不合格车辆"],
          y: "top",
          top: "30"
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
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: -40
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
            name: "环检合格车辆",
            type: "bar",
            stack: "使用情况",
            data: this.valueData1["0"],
            itemStyle: {
              normal: { color: "#5b9bd5" }
            }
          },
          {
            name: "环检不合格车辆",
            type: "bar",
            stack: "使用情况",
            data: this.valueData1["1"],
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
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["CO", "HC", "NO"],
          y: "top",
          top: "30"
        },

        grid: {
          //left: "1%",
          //right: "7%",
          //containLabel: true
          x: "50px",

          x2: "20px"
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
          dataZoom: {
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "filter"
          },

          splitLine: {
            //网格线
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: -40
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
            name: "CO",
            type: "line",
            data: this.valueData2["CO"],
            itemStyle: {
              normal: { color: "#5597d3" }
            }
          },
          {
            name: "HC",
            type: "line",
            data: this.valueData2["HC"],
            itemStyle: {
              normal: { color: "#ed7d31" }
            }
          },
          {
            name: "NO",
            type: "line",
            data: this.valueData2["NO"],
            itemStyle: {
              normal: { color: "#a5a5a5" }
            }
          }
        ]
      };
    },
    lastData() {
      return {
        title: {
          text: "各类型复检总数及合格数统计",
          left: "center",
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
        legend: {
          itemWidth: 15,
          itemHeight: 15,
          data: ["复检合格数", "复检不合格数"],
          y: "top",
          top: "30"
        },
        xAxis: {
          data: ["黑烟车复检", "路检复检", "遥测复检"],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          /*axisLabel: {
            show: true,
            interval: "auto",
            formatter: "{value}"
          },*/
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "复检合格数",
            type: "bar",
            stack: "使用情况",
            data: this.tableList3.hgs,
            itemStyle: {
              normal: { color: "#5b9bd5" }
            }
          },
          {
            name: "复检不合格数",
            type: "bar",
            stack: "使用情况",
            data: this.tableList3.bhgs,
            itemStyle: {
              normal: { color: "#ed7d31" }
            }
          }
        ]
      };
    }
  },
  data() {
    return {
      listEight: ["K", "H", "Q", "Z", "M", "T", "G", "B"],
      valueData1: {
        "0": [0, 0, 0, 0, 0, 0, 0, 0],
        "1": [0, 0, 0, 0, 0, 0, 0, 0]
      },
      tableList1: [
        {
          K: 0,
          H: 0,
          Q: 0,
          Z: 0,
          M: 0,
          T: 0,
          G: 0,
          B: 0,
          type: "环检合格车辆"
        },
        {
          K: 0,
          H: 0,
          Q: 0,
          Z: 0,
          M: 0,
          T: 0,
          G: 0,
          B: 0,
          type: "环检不合格车辆"
        }
      ],
      valueData2: {
        CO: [0, 0, 0, 0, 0, 0, 0, 0],
        HC: [0, 0, 0, 0, 0, 0, 0, 0],
        NO: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      tableList2: [
        {
          K: 0,
          H: 0,
          Q: 0,
          Z: 0,
          M: 0,
          T: 0,
          G: 0,
          B: 0,
          type: "CO"
        },
        { K: 0, H: 0, Q: 0, Z: 0, M: 0, T: 0, G: 0, B: 0, type: "HC" },
        { K: 0, H: 0, Q: 0, Z: 0, M: 0, T: 0, G: 0, B: 0, type: "NO" }
      ],
      tableList3: {
        title: ["hyc", "lj", "yc"],
        hgs: [0, 0, 0],
        bhgs: [0, 0, 0]
      },
      tableListData3: [
        { type: "复检合格数", hyc: "", lj: "", yc: "" },
        { type: "复检不合格数", hyc: "", lj: "", yc: "" }
      ],
      formEnvironmentalInspection: {
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
      lastId: "lastId",
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
      sidebar: "环检站数据分析",
      tableData: []
    };
  },
  mounted() {
    this.axiosGetData();
  },
  methods: {
    /**
     * @description 环检合格率与环检因子排放水平两图数据请求
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData1() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj//hj/HjResultAnalysis",
        params: {
          sidebar: "环检站数据分析",
          startTime: that.formEnvironmentalInspection.startTime,
          endTime: that.formEnvironmentalInspection.endTime
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

              //环检车辆合格率-不合格
              if (res.data.data["0"][that.listEight[i]]) {
                num0 = parseInt(res.data.data["0"][that.listEight[i]]);
                that.tableList1[0][that.listEight[i]] = parseInt(
                  res.data.data["0"][that.listEight[i]]
                );
              } else {
                that.tableList1[0][that.listEight[i]] = 0;
              }
              //环检车辆合格率-合格
              if (res.data.data["1"][that.listEight[i]]) {
                num1 = parseInt(res.data.data["1"][that.listEight[i]]);
                that.tableList1[1][that.listEight[i]] = parseInt(
                  res.data.data["1"][that.listEight[i]]
                );
              } else {
                that.tableList1[1][that.listEight[i]] = 0;
              }
              //车型与环检因子排放水平
              if (res.data.data["data"][that.listEight[i]]) {
                objCO[i] = res.data.data.data[that.listEight[i]].co;
                objHC[i] = res.data.data.data[that.listEight[i]].hc;
                objNO[i] = res.data.data.data[that.listEight[i]].no;
                that.tableList2[0][that.listEight[i]] =
                  res.data.data.data[that.listEight[i]].co;
                that.tableList2[1][that.listEight[i]] =
                  res.data.data.data[that.listEight[i]].hc;
                that.tableList2[2][that.listEight[i]] =
                  res.data.data.data[that.listEight[i]].no;
              } else {
                that.tableList2[0][that.listEight[i]] = 0;
                that.tableList2[1][that.listEight[i]] = 0;
                that.tableList2[2][that.listEight[i]] = 0;
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
            console.log(that.tableList1);
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
     * @description 复检总数与合格数数据请求
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData2() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/remoteSensingTrack/getFuJianDB",
        params: {
          sidebar: "环检站数据分析",
          startTime: that.formEnvironmentalInspection.startTime,
          endTime: that.formEnvironmentalInspection.endTime
        }
      })
        .then(res => {
          console.log(res.data);
          let hgs = [0, 0, 0];
          let bhgs = [0, 0, 0];
          let objHgs = { type: "复检合格数", hyc: 0, lj: 0, yc: 0 };
          let objBhgs = { type: "复检不合格数", hyc: 0, lj: 0, yc: 0 };
          for (let i = 0; i < that.tableList3.title.length; i++) {
            hgs[i] = res.data.data[that.tableList3.title[i]]["1"];
            bhgs[i] = res.data.data[that.tableList3.title[i]]["0"];
            objHgs[that.tableList3.title[i]] = hgs[i];
            objBhgs[that.tableList3.title[i]] = bhgs[i];
          }

          that.tableList3.hgs = hgs;
          that.tableList3.bhgs = bhgs;
          that.tableListData3 = [objHgs, objBhgs];
          that.$refs.vline3.line();
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "下载失败!"
          });
        });
    },
    /**
     * @description 搜索与初始化数据展示调用方法
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData() {
      this.axiosGetData1();
      this.axiosGetData2();
    },
    /**
     * @description 重置功能
     * @author lifei
     * @version 2019.5.28
     */
    resetData() {
      let keys_ = Object.keys(this.formEnvironmentalInspection);
      for (let i = 0; i < keys_.length; i++) {
        this.formEnvironmentalInspection[keys_[i]] = "";
      }
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
                message: "起始时间不能大于结束时间!"
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
                message: "结束时间不能小于起始时间!"
              });
              this.formEnvironmentalInspection.endTime = "";
            }
          }
          break;
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
.every_line {
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
