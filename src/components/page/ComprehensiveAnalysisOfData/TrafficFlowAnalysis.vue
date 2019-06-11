<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                @change="timeCheck('startTime')"
                v-model="formTrafficFlowAnalysis.startTime"
                class="time-input"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="- 结束时间：">
              <el-date-picker
                @change="timeCheck('endTime')"
                v-model="formTrafficFlowAnalysis.endTime"
                class="time-input"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary" @click="btnSearch">查询</el-button>
              <el-button type="primary" @click="btnReset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:660px;">
      <el-row>
        <el-col :span="12" class="posttion-relative">
          <!-- <div class="download-div"></div> -->
           <img src="../../../assets/img/download.png" class="download_img" alt @click="downExcel('left')">
          <v-line :lineData="linedataClone" :styleData="styleData" :lineId="lineId"></v-line>
        </el-col>
        <el-col :span="12">
          <img src="../../../assets/img/download.png" class="download_img" alt @click="downExcel('right')">
          <v-line :lineData="linedataClone2" :styleData="styleData" :lineId="lineId2" ></v-line>
        </el-col>
      </el-row>
    </div>

    <!--<img src="../../../assets/img/车流量分析.png">-->
  </div>
</template>

<script>
import vLine from "../../common/charts/line.vue";
import * as JSON_ from "../../common/json/line";
import XLSX from 'xlsx'; 
export default {
  name: "TrafficFlowAnalysis",
  data() {
    return {
      colors: [
        "#4472c4",
        "#70ad47",
        "#255e91",
        "#9e480e",
        "#5b9bd5",
        "#a5a5a5",
        "#ffc000"
      ],
      lineId: "test",
      lineId2: "test2",
      formTrafficFlowAnalysis: {
        site: "",
        startTime: "",
        endTime: ""
      },
      linedataClone: {},
      linedataClone2: {},
      lineData: {
        title: {
          text: "各点位不同归属车辆的通过情况分析",
          x: "center",
          top: 10
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          y: "top",
          top: "50"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          top: "90",
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              optionToContent: function(opt) {},
               readOnly: true,
              lang: ["", "关闭"]
            }
          },
          right: 20
        },
        xAxis: {
          splitLine: { show: false },
          //type: "category",
          //boundaryGap: true,
          data: []
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: "value"
        },
        series: []
      },
      lineData2: {
        title: {
          text: "各点位不同归属车辆的超标情况分析",
          x: "center",
          top: 10
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          y: "top",
          top: "50"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          top: "100",
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              readOnly: true,
              lang: ["", "关闭"]
            }
          },
          right: 20
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: []
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: "value"
        },
        series: []
      },

      styleData: {
        width: "100%",
        height: "620px"
      }
    };
  },
  created() {
    this.btnSearch();
  },
  methods: {
    downExcel(name){//导出excel
      if(name=="left"){
        let downData=JSON.parse(JSON.stringify(this.linedataClone));
        let arr=[];
        downData.legend.data.unshift("车辆");
        arr.push(downData.legend.data);
        downData.series.forEach(ele=>{
          let arr1=[];
         arr1.push(ele.name);
         arr1=arr1.concat(ele.data);
         arr.push(arr1);
        })
      let wb = XLSX.utils.book_new();//创建book对象
      let ws = XLSX.utils.aoa_to_sheet(arr); //插入二维数组
      XLSX.utils.book_append_sheet(wb, ws, "sheet1");  //将数据添加到工作薄
      XLSX.writeFile(wb, "各点位不同归属车辆的通过情况分析.xlsx"); //导出Excel
      }else{
         let downData=JSON.parse(JSON.stringify(this.linedataClone2));
        let arr=[];
        downData.legend.data.unshift("车辆");
        arr.push(downData.legend.data);
        downData.series.forEach(ele=>{
          let arr1=[];
         arr1.push(ele.name);
         arr1=arr1.concat(ele.data);
         arr.push(arr1);
        })
      let wb = XLSX.utils.book_new();//创建book对象
      let ws = XLSX.utils.aoa_to_sheet(arr); //插入二维数组
      XLSX.utils.book_append_sheet(wb, ws, "sheet1");  //将数据添加到工作薄
      XLSX.writeFile(wb, "各点位不同归属车辆的超标情况分析.xlsx"); //导出Excel
      }
    },
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.formTrafficFlowAnalysis.endTime == "" ||
              this.formTrafficFlowAnalysis.endTime == "null" ||
              this.formTrafficFlowAnalysis.endTime == null
            )
          ) {
            let timeBegin = this.formTrafficFlowAnalysis.startTime.toString();
            let timeEnd = this.formTrafficFlowAnalysis.endTime.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.formTrafficFlowAnalysis.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.formTrafficFlowAnalysis.startTime == "" ||
              this.formTrafficFlowAnalysis.startTime == "null" ||
              this.formTrafficFlowAnalysis.startTime == null
            )
          ) {
            let timeBegin = this.formTrafficFlowAnalysis.startTime.toString();
            let timeEnd = this.formTrafficFlowAnalysis.endTime.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.formTrafficFlowAnalysis.endTime = "";
            }
          }
          break;
      }
    },
    onSubmitTrafficFlowAnalysis() {},

     /**
     * @description 渲染echarts图表
     * @author B51733
     * @param {*}
     * @version 2019.5.29
     */
    btnSearch() {
      //点击查询
      let that = this;
      let lengendData = [];
      let lengendData2 = [];
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/vehicleTrajectory/analyse",
        headers: {
          "Content-Type": "application/json"
        },
        params: { siderbar: "车流量及归属" },
        data: {
          kssj:
            this.formTrafficFlowAnalysis.startTime == null
              ? (this.formTrafficFlowAnalysis.startTime = "")
              : this.formTrafficFlowAnalysis.startTime,
          jssj:
            this.formTrafficFlowAnalysis.endTime == null
              ? (this.formTrafficFlowAnalysis.endTime = "")
              : this.formTrafficFlowAnalysis.endTime
        }
      }).then(function(res) { 
        let lineFlag = JSON.parse(JSON.stringify(that.lineData));
        lineFlag.xAxis.data = res.data.data[0];
        res.data.data[1].forEach((ele, index) => {
          lengendData.push(ele.name);
          let obj = {};
          obj.name = ele.name;
          obj.type = ele.type;
          obj.data = ele.data;
          obj.stack = "使用情况";
          obj.itemStyle = {
            normal: { color: that.colors[index] }
          };
          lineFlag.series.push(obj);
        });
        lineFlag.legend.data = lengendData;
        lineFlag.toolbox.feature.dataView.optionToContent = function(opt) {
          //拼表格
          // console.log(opt)
          var tr = "";
          var thead = "";
          let xValue = opt.xAxis[0].data;
          xValue.forEach(ele => {
            thead += "<td class='tdClass' >" + ele + "</td>";
          });
          tr = "<tr><td class='tdClass'>车辆</td>" + thead + "</tr>";
          for (var i in opt.series) {
            var td = "";
            opt.series[i].data.forEach(ele => {
              td += "<td class='tdClass'>" + ele + "</td>";
            });
            tr +=
              "<tr><td class='tdClass'>" +
              opt.series[i].name +
              "</td>" +
              td +
              "</tr>";
          }
          var table =
            '<table id="tableLeft" style="width:100%;text-align:center;border-collapse:collapse" class="table_border">' +
            tr +
            "</table>";
          return table;
        };

        that.linedataClone = lineFlag;
      });

      this.$axios({
        method: "post",
        url: "/serveApi/hbj/remoteSensing/analyseWithPoint",
        headers: {
          "Content-Type": "application/json"
        },
        params: { siderbar: "车流量及归属" },
        data: {
          kssj:
            this.formTrafficFlowAnalysis.startTime == null
              ? (this.formTrafficFlowAnalysis.startTime = "")
              : this.formTrafficFlowAnalysis.startTime,
          jssj:
            this.formTrafficFlowAnalysis.endTime == null
              ? (this.formTrafficFlowAnalysis.endTime = "")
              : this.formTrafficFlowAnalysis.endTime
        }
      }).then(function(res) {
        loadingObj.close(); 
        let lineFlag = JSON.parse(JSON.stringify(that.lineData2));
        lineFlag.xAxis.data = res.data.data[0];
        res.data.data[1].forEach((ele, index) => {
          lengendData2.push(ele.name);
          let obj = {};
          obj.name = ele.name;
          obj.type = ele.type;
          obj.data = ele.data;
          obj.stack = "使用情况";
          obj.itemStyle = {
            normal: { color: that.colors[index] }
          };
          lineFlag.series.push(obj);
        });
        lineFlag.legend.data = lengendData2;
         lineFlag.toolbox.feature.dataView.optionToContent = function(opt) {
          //拼表格
          // console.log(opt)
          var tr = "";
          var thead = "";
          let xValue = opt.xAxis[0].data;
          xValue.forEach(ele => {
            thead += "<td class='tdClass'>" + ele + "</td>";
          });
          tr = "<tr><td class='tdClass'>车辆</td>" + thead + "</tr>";
          for (var i in opt.series) {
            var td = "";
            opt.series[i].data.forEach(ele => {
              td += "<td class='tdClass'>" + ele + "</td>";
            });
            tr +=
              "<tr><td class='tdClass'>" +
              opt.series[i].name +
              "</td>" +
              td +
              "</tr>";
          }
          var table =
            '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border">' +
            tr +
            "</table>";
          return table;
        };
        that.linedataClone2 = lineFlag;
      });
    },
    btnReset() {
      //重置按钮
      this.formTrafficFlowAnalysis.site = "";
      this.formTrafficFlowAnalysis.startTime = "";
      this.formTrafficFlowAnalysis.endTime = "";
    },
   
  },
  components: {
    vLine
  },
 
};
</script>
<style>
.tdClass {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #909399;
}
</style>

<style scoped>
.echart-table {
  border-right: 1px solid #f00;
  border-bottom: 1px solid #f00;
}
.echart-table td {
  border-left: 1px solid #f00;
  border-top: 1px solid #f00;
}
.download-div {
  width: 20px;
  height: 20px;
  background: #f00;
  position: absolute;
  right: 50px;
  z-index: 1;
  top: 7px;
}
.posttion-relative {
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

