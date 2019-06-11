<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="formEnvironmentalInspection"
        :model="formEnvironmentalInspection"
        :inline="true"
      >
        <el-row>
          <el-col :span="18" style="display:flex;justify-content: center;">
            <el-form-item label="月份：" style="margin-right:15px">
              <el-date-picker v-model="formEnvironmentalInspection.startTime" class="time-input"></el-date-picker>
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
    <div class="chare_box" style="height:600px">
      <v-line :lineData="lineData" :styleData="styleData" :lineId="lineId"></v-line>
      <!-- <img src="../../../assets/img/空气质量影响性1.jpg"> -->
    </div>
    <div class="chare_box" style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;">
      <h5>尾气排放量是否改为具体的尾气排放</h5>
      <el-table :data="tableList" border style="width: 100%;margin-top:20px;" max-height="500px">
        <el-table-column fixed prop="尾气排放检测项" label="名称" align="center"></el-table-column>
        <el-table-column prop="prop2" label="CO" align="center"></el-table-column>
        <el-table-column prop="prop3" label="CO2" align="center"></el-table-column>
        <el-table-column prop="prop4" label="HC" align="center"></el-table-column>
        <el-table-column prop="prop5" label="NO" align="center"></el-table-column>
        <el-table-column prop="prop6" label="不透光度" align="center"></el-table-column>
        <el-table-column prop="prop7" label="PM10" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import vLine from "../../common/charts/line.vue";
export default {
  data() {
    return {
      formEnvironmentalInspection: {
        site: "",
        beginTime: "",
        endTime: ""
      },
      tableList: [
        {
          prop1: "空气质量",
          prop2: "CO",
          prop3: "CO2",
          prop4: "PM2.5",
          prop5: "NO2",
          prop6: "O3",
          prop7: "PM10"
        }
      ],
      lineId: "line",
      styleData: { width: "100%", height: "600px" },
      lineData: {
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
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["尾气中CO排放量", "尾气中CO2排放量", "空气AQI质量分"]
        },
        xAxis: [
          
          {
             splitLine:{show:false},
            type: "category",
            data: [
              "01:00",
              "02:00",
              "03:00",
              "04:00",
              "05:00",
              "06:00",
              "07:00",
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
              "24:00"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            splitLine:{show:false},
            type: "value",
            name: "排放量",
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: "{value}%"
            }
          },
          {
             splitLine:{show:false},
            type: "value",
            name: "AQI空气质量分指数",
            min: 0,
            max: 500,
            interval: 100,
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            name: "尾气中CO排放量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              2.2,
              5.6,
              6.7,
              5.6,
              2.2,
              2.6,
              2.0,
              6.4,
              3.3,
              2.0,
              4.9,
              7.0,
              3.2,
              5.6,
              6.7,
              5.6,
              2.2,
              2.6,
              2.0,
              6.4,
              3.3
            ]
          },
          {
            name: "尾气中CO2排放量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              6.4,
              8.7,
              7.7,
              5.6,
              2.2,
              8.7,
              8.8,
              6.0,
              2.3,
              2.6,
              5.9,
              9.0,
              6.4,
              8.7,
              7.7,
              5.6,
              2.2,
              8.7,
              8.8,
              6.0,
              2.3
            ]
          },
          {
            name: "空气AQI质量分",
            type: "line",
            yAxisIndex: 1,
            data: [
              40,
              40,
              45,
              48,
              53,
              55,
              60,
              68,
              75,
              78,
              75,
              70,
              68,
              65,
              62,
              65,
              70,
              75,
              80,
              75,
              68,
              60,
              55,
              48
            ]
          }
        ]
      }
    };
  },
  components: {
    vLine
  }
};
</script>
