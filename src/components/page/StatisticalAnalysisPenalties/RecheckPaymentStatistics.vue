<template>
   <!--处罚统计分析-复检率与缴费率统计-->
  <div class="content_box">
    <div class="chare_box" style="height:auto;padding-bottom:2px;padding-left:20px;">
      <el-form red="FormRecheckPaymentStatistics" :model="FormRecheckPaymentStatistics" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: flex-end;">
            <el-form-item label="站点：">
              <el-input v-model="FormRecheckPaymentStatistics.site"></el-input>
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
      <v-line :lineData="lineData" :styleData="styleData" :lineId="lineId" ref="lineName"></v-line>
    </div>
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
export default {
  name:"RecheckPaymentStatistics",
  data() {
    return {
      FormRecheckPaymentStatistics: {
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
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 2,
          data: ["复检率", "缴费率"],
          y:"bottom"
        },
        xAxis: {
          data: ["1", "2", "3", "4","5","6","7", "8", "9", "10","11","12"],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          name:"复检率/缴费率",
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: "复检率",
            type: "bar",
            data: [0.1, 0.12, 0.11, 0.05,0.2,0.14,0.21,0.11,0.21,0.31,0.44,0.65],
            itemStyle: {
              color: "#4f81bd" 
            }
          },
          {
            name: "缴费率",
            type: "bar",
            data: [0.31, 0.12, 0.21, 0.15,0.12,0.34,0.26,0.21,0.31,0.38,0.24,0.75],
            itemStyle: { 
                color: "#c0504d" 
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
  mounted(){
    //console.log(this.$refs.lineName.$el)
  }
  ,
  components: {
    vLine
  }
};
</script>
<style>
</style>
