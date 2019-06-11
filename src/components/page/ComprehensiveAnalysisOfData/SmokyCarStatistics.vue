<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="dataQuailty" :model="dataQuailty" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="站点：">
              <el-input v-model="dataQuailty.site" style="width:150px"></el-input>
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
    <div class="chare_box" style="display:flex;height:600px">
      <v-line :lineId="idchart" :lineData="chartDataLeft" :styleData="chartData"></v-line>
    </div>
  </div>
</template>
<script>
import vLine from "../../common/charts/line.vue";
export default {
  name:"SmokyCarStatistics",
  components: { vLine },
  data() {
    return {
      idchart: "chart-bar",
      chartData: { width: "100%", height: "600px" },
      dataQuailty: {
        site: "",
        startTime: "",
        endTime: ""
      },
      chartDataLeft: {
        title: {
          text: "",
          left: "center",
          textStyle: {
            fontSize: 17
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: "right",
          top: "center",
          orient: "vertical"
    
        },
        xAxis: {
          data: [
            "类型1",
            "类型2",
            "类型3",
            "类型4",
            "类型5"
          ],
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
            name: "黑烟车",
            type: "bar",
        
            data: [52,66,92,35,88],
            itemStyle: {
              normal: { color: "#5b9bd5" }
            },
            label: {
              normal: {
                show: true,
                color: "black"
              }
            }
          },
          {
            name: "处罚次数",
            type: "bar",

            data: [40,55,86,30,78],
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
        
         
        ]
      }
    };
  },
  mounted() {}
};
</script>

<style scoped>
</style>


