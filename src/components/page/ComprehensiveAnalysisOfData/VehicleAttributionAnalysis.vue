<template>
  <div class="content_box">
    <!--<img src="../../../assets/img/车辆归属分析.png">-->
    <div class="chare_box" style="height:auto;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="FormVehicleAttributionAnalysis"
        :model="FormVehicleAttributionAnalysis"
        :inline="true"
      >
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="站点：">
              <el-input v-model="FormVehicleAttributionAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：">
              <el-date-picker v-model="FormVehicleAttributionAnalysis.startTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="- 结束时间：">
              <el-date-picker v-model="FormVehicleAttributionAnalysis.startTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary" @click="btn_search">查询</el-button>
              <el-button type="primary" @click="btn_reset">重置</el-button>
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
import * as JSON_ from "../../common/json/line";
export default {
  name: "VehicleAttributionAnalysis",
  data() {
    return {
      FormVehicleAttributionAnalysis: {
        site: "",
        startime: "",
        endTime: ""
      },
      lineId: "test",
      exampleJson: [
        {
          name: "车流量",
          type: "bar",
          stack: "使用情况",
          data: [5, 20, 36, 10],
          itemStyle: {
            normal: { color: "#5b9bd5" }
          }
        },
        {
          name: "黑烟车",
          type: "bar",
          stack: "使用情况",
          data: [22, 31, 21, 26],
          itemStyle: {
            normal: { color: "#ed7d31" }
          }
        },
        {
          name: "黄标车",
          type: "bar",
          stack: "使用情况",
          data: [10, 12, 38, 24],
          itemStyle: {
            normal: { color: "#a5a5a5" }
          }
        },
        {
          name: "违规车",
          type: "bar",
          stack: "使用情况",
          data: [20, 12, 11, 25],
          itemStyle: {
            normal: { color: "#ffc000" }
          }
        },
        ["本地车", "外地车", "军警车", "黄牌车"]
      ],
      lineData: {},
      styleData: {
        width: "100%",
        height: "500px"
      }
    };
  },
  components: {
    vLine
  },
  methods: {
    btn_search() {  //点击查询按钮
      // let site=this.site;
      // let startTime=this.startTime;
      // let endTime=this.endTime;
      // this.$axios.get("",function(data){
      //   console.log(data)
      // })
      let bar = JSON_.bar();
      for (var i = 0; i < this.exampleJson.length - 1; i++) {
        bar.legend.data.push(this.exampleJson[i].name);
        let obj = {};
        obj.type = this.exampleJson[i].type;
        obj.stack = this.exampleJson[i].stack;
        obj.data = this.exampleJson[i].data;
        obj.itemStyle = this.exampleJson[i].itemStyle;
        bar.series.push(obj);
      }
      bar.xAxis.data = this.exampleJson[this.exampleJson.length - 1];
      console.log(bar);
      this.lineData = bar;
    },
    btn_reset() {}
  },
  mounted() {
    this.btn_search()
  }
};
</script>
<style>
</style>
