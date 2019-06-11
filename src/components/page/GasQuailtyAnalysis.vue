<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form ref="formGasQuailtyAnalysis" :model="formGasQuailtyAnalysis" :inline="true">
        <el-form-item label="月份">
          <el-col :span="11">
            <el-date-picker
              type="month"
              placeholder="选择月份"
              v-model="formGasQuailtyAnalysis.month"
              style="width: 250px;"
            ></el-date-picker>
          </el-col>
          
        </el-form-item>
        <el-form-item style="margin-left:100px;">
          <el-button
            type="primary"
            @click="onSubmitGasQuailtyAnalysis"
            style="margin-right:20px;"
          >查看</el-button>
          <el-button>导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="chare_box" style="height:640px">
      <v-line :lineData="GasQuailtyAnalysisData" :styleData="styleGasQuailtyAnalysis" :lineId="GasQuailtyAnalysisId"></v-line>
    </div>

    <!--<img src="../../assets/img/17.尾气排放与道路空气质量数据影响性分析.png">-->
  </div>
</template>


<script>
import vLine from "../common/charts/line.vue";
export default {
  name:"GasQuailtyAnalysis",
  data() {
    return {
      formGasQuailtyAnalysis: {
        month: ""
      },
      GasQuailtyAnalysisData: {
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
          data: ["空气质量", "尾气排放量"]
        },
        xAxis: [
          {
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
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "空气质量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "尾气排放量",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "尾气排放量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              22
            ]
          },
          {
            name: "空气质量",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2,
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2,
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              2.5
            ]
          }
        ]
      },
      styleGasQuailtyAnalysis: {
        width: "100%",
        height: "600px"
      },
      GasQuailtyAnalysisId:"GasQuailtyAnalysis_id"
    };
  },
  methods: {
    onSubmitGasQuailtyAnalysis() {}
  },
  components: {
    vLinecy
  }
};
</script>

<style scoped>
.content_box {
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
}
.chare_box {
  width: 100%;
  height: 440px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 30px;
}
</style>