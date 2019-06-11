<template>
  <div class="content_box">
    <!--<img src="../../../assets/img/车辆归属分析.png">-->
    <div class="chare_box" style="height:auto;padding-bottom:2px;padding-left:20px;">
      <el-form red="FormVehicleAttributionAnalysis" :model="FormVehicleAttributionAnalysis" :inline="true">
        <el-row>
          <el-col :span="8" style="display:flex;justify-content: flex-end;">
            <el-form-item label="路段">
              <el-input v-model="FormVehicleAttributionAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="路段">
              <el-input v-model="FormVehicleAttributionAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
        
          <el-col :span="8" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary">查询</el-button>
              <el-button type="primary">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:540px">
      <v-line :lineData="lineData" :styleData="styleData" :lineId="lineId"></v-line>
    </div>
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
export default {
  name:"RoadFineViolationStatistics",
  data() {
    return {
      FormVehicleAttributionAnalysis: {
        site: "",
        startime: "",
        endTime: ""
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
          data: ["金额", "违章数"],
          y:"bottom"
        },
        xAxis: {
          data: [1,2,3,4,5,6,7,8,9,10,11,12],
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
            name: "金额",
            type: "bar",
          
            data: [3000,2000,3500,4000,3000,2000,3500,4500,2000,3500,5000,2500],
            itemStyle: {
              normal: { color: "#4f81bd" }
            }
          },
          {
            name: "违章数",
            type: "bar",
           
            data: [200,130,240,150,160,130,230,330,410,260,260,260],
            itemStyle: {
              normal: { color: "#c0504d" }
            }
          }
        ]
      },
      styleData: {
        width: "100%",
        height: "500px"
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
