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
              <el-button type="primary" @click="open">查询</el-button>
              <el-button type="primary">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:540px">
      <v-line :lineData="lineData" :styleData="styleData" :lineId="lineId"></v-line>
      <edit-dialog :title="title" :diaSta="diaSta" @dialogClose="close"></edit-dialog>
    </div>
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
import editDialog from "../../common/edit-dialog.vue"
export default {
    methods:{
        open(){
            this.diaSta=true;
        },
        close(){
            this.diaSta=false;
        }
    },
  data() {
    return {
        title:"黑烟车信息编辑",
        diaSta:false,
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
          data: ["金额", "处罚次数"],
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
          
            data: [300,200,350,400,300,200,350,450,200,350,500,250],
            itemStyle: {
              normal: { color: "#4f81bd" }
            }
          },
          {
            name: "处罚次数",
            type: "bar",
           
            data: [20,13,24,15,16,13,23,33,41,26,26,26],
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
    editDialog,
    vLine
  }
};
</script>
<style>
</style>
