<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="formRoadAirQualityDataQuery"
        :model="formRoadAirQualityDataQuery"
        :inline="true"
      >
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="站点：">
              <el-input v-model="formRoadAirQualityDataQuery.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker v-model="formRoadAirQualityDataQuery.startTime" class="time-input"></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 结束时间：">
              <el-date-picker v-model="formRoadAirQualityDataQuery.endTime" class="time-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary" @click="queryFn">查询</el-button>
              <el-button type="primary">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;"
    >
      <el-table :data="tabels" border style="width: 100%">
        <el-table-column prop="site" label="PM2.5 日平均浓度" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="0～35" width="180" align="center"></el-table-column>
        <el-table-column prop="PrimaryPollutants" label="35～75" align="center"></el-table-column>
        <el-table-column prop="pm25" label="75～115" align="center"></el-table-column>
        <el-table-column prop="O3" label="115～150" align="center"></el-table-column>
        <el-table-column prop="SO2" label="150～250" align="center"></el-table-column>
        <el-table-column prop="PM10" label="＞250" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="chare_box" style="padding:30px 20px;height:auto;">
      <div style="display:flex">
        <div style="width:40%">
          <v-line
            :lineData="RoadAirQualityDataQueryFn"
            :styleData="RoadAirQualityDataQueryStyle"
            :lineId="RoadAirQualityDataQueryId"
          ></v-line>
        </div>
        <div style="width:60%">
          <v-line
            :lineData="RoadAirQualityDataQueryZhuFn"
            :styleData="RoadAirQualityDataQueryZhuStyle"
            :lineId="RoadAirQualityDataQueryZhuId"
          ></v-line>

          <v-line
            :lineData="RoadAirQualityDataQueryLineFn"
            :styleData="RoadAirQualityDataQueryLineStyle"
            :lineId="RoadAirQualityDataQueryLineId"
          ></v-line>
        </div>
      </div>
    </div>
    <!-- <img src="../../../assets/img/空气质量影响性2.jpg"> -->
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
export default {
  name: "RoadAirQualityDataQuery",
  data() {
    return {
      formRoadAirQualityDataQuery: {
        site: "",
        startTime: "",
        endTime: ""
      },
      tableData: [
        {
          site: "监测站点1",
          status: "良好",
          PrimaryPollutants: "PM2.5",
          pm25: "37",
          O3: "11",
          SO2: "4",
          PM10: "63",
          NO2: "22",
          CO: "9"
        }
      ],
      tabels: [
        {
          site: "空气质量级别",
          status: "一级",
          PrimaryPollutants: "二级",
          pm25: "三级",
          O3: "四级",
          SO2: "五级",
          PM10: "六级"
        },
        {
          site: "空气质量类型",
          status: "优",
          PrimaryPollutants: "良",
          pm25: "轻度污染",
          O3: "中度污染",
          SO2: "重度污染",
          PM10: "严重污染"
        },
        {
          site: "颜色标识",
          status: "绿色",
          PrimaryPollutants: "黄色",
          pm25: "橙色",
          O3: "红色",
          SO2: "紫色",
          PM10: "褐红色"
        }
      ],
      RoadAirQualityDataQueryId: "RoadAirQualityDataQuery_id",
      RoadAirQualityDataQueryZhuId: "RoadAirQualityDataQueryZhu_id",
      RoadAirQualityDataQueryLineId: "RoadAirQualityDataQueryLine_id",
      RoadAirQualityDataQueryStyle: {
        width: "100%",
        height: "600px"
      },
      RoadAirQualityDataQueryZhuStyle: {
        width: "100%",
        height: "300px"
      },
      RoadAirQualityDataQueryLineStyle: {
        width: "100%",
        height: "300px"
      }
    };
  },
  components: {
    vLine
  },
  computed: {
    RoadAirQualityDataQueryFn() {
      return {
        title: {
          text: "空气污染因子占比",
          x: "center",
          y: 60
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          x: 20,
          x2: 20
        },
        legend: {
          // orient: "vertical",
          left: "center",
          bottom: "0",
          data: ["pm2.5", "O3", "SO2", "PM10", "NO2", "CO"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "75%",
            center: ["50%", "60%"],
            data: [
              {
                value: this.tableData[0].pm25,
                name: "pm2.5",
                itemStyle: {
                  color: "#5b9bd5"
                }
              },
              {
                value: this.tableData[0].O3,
                name: "O3",
                itemStyle: {
                  color: "#ed7d31"
                }
              },
              {
                value: this.tableData[0].SO2,
                name: "SO2",
                itemStyle: {
                  color: "#a5a5a5"
                }
              },
              {
                value: this.tableData[0].PM10,
                name: "PM10",
                itemStyle: {
                  color: "#ffc000"
                }
              },
              {
                value: this.tableData[0].NO2,
                name: "NO2",
                itemStyle: {
                  color: "#4472c4"
                }
              },
              {
                value: this.tableData[0].CO,
                name: "CO",
                itemStyle: {
                  color: "#70ad47"
                }
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    },
    RoadAirQualityDataQueryZhuFn() {
      return {
        title: {
          text: "污染物空气质量分指数",
          x: "center",
          y: 20
        },
        xAxis: {
          splitLine: { show: false },
          type: "category",
          data: ["pm2.5", "O3", "SO2", "PM10", "NO2", "CO"]
        },
        yAxis: {
          splitLine: { show: false },
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: [37, 11, 4, 63, 22, 9],
            type: "bar",
            itemStyle: {
              color: "#5b9bd5"
            }
          }
        ]
      };
    },
    RoadAirQualityDataQueryLineFn() {
      return {
        title: {
          text: "AQI折线图",
          x: "center",
          y: 20
        },
        xAxis: {
          splitLine: { show: false },
          type: "category",
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24"
          ]
        },
        yAxis: {
          splitLine: { show: false },
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: [
              30,
              25,
              40,
              50,
              45,
              30,
              40,
              35,
              35,
              40,
              30,
              30,
              25,
              40,
              50,
              45,
              30,
              40,
              35,
              35,
              40,
              30,
              35,
              40
            ],
            type: "line",
            itemStyle: {
              color: "#5b9bd5"
            }
          }
        ]
      };
    }
  },
  methods: {
    queryFn() {
      this.tableData[0].pm25 = 11;
      this.tableData[0].O3 = 11;
      this.tableData[0].SO2 = 11;
      this.tableData[0].PM10 = 11;
      this.tableData[0].NO2 = 11;
      this.tableData[0].CO = 11;
    }
  }
};
</script>
