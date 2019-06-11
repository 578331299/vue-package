<template>
   <!--处罚统计分析-月处罚金额和处罚量-->
  <div class="content_box">
    <div class="chare_box" style="height:auto;padding-bottom:2px;padding-left:20px;">
      <el-form red="FormWeekFinePenaltyAmount" :model="FormWeekFinePenaltyAmount" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: flex-end;">
            <el-form-item label="站点：">
              <el-input v-model="FormWeekFinePenaltyAmount.site"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary">统计</el-button>
              <el-button type="primary">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:640px">
      <v-line :lineData="lineData" :styleData="styleData" :lineId="lineId"></v-line>
    </div>
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
export default {
  name:"WeekFinePenaltyAmount",
  data() {
    return {
      FormWeekFinePenaltyAmount: {
        site: ""
      },
      lineId: "test",
      lineData: {
        title: {
          text: "",
          left: "20px",
          textStyle: {
            color: "#436EEE",
            fontSize: 17
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["罚金", "处罚量"],
          y:"bottom"
        },
        xAxis: {
          data: ["1", "2", "3", "4","5","6","7", "8", "9", "10","11","12"],
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: "value",
            name: "罚金",
            min: 0,
            max: 6000,
            interval: 1000,
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
               show: false
            }
          },
          {
            type: "value",
            name: "处罚量",
            min: 0,
            max: 600,
            interval: 20,
            splitLine: { show: false },
            axisLabel: {
              formatter: "{value}"
            },
            axisLine: {
               show: false
            }
          }
        ],
        series: [
          {
            name: "罚金",
            type: "bar",
            data: [2000, 3000, 5300, 4300,4300,3000,5000,4330,25400,3250,5800,4700],
            itemStyle: {
              color: "#3f76b8" 
            }
          },
          {
            name: "处罚量",
            type: "line",
            yAxisIndex: 1,
            data: [300, 230,400, 510,420,350,230,200,300,450,202,510],
            itemStyle: { 
                color: "#b22924" 
            }
          }
        ]
      },
      styleData: {
        width: "100%",
        height: "600px"
      }
    };
  },
  components: {
    vLine
  }
};
</script>
<style>
</style>
