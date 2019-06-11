<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="dataQuailty" :model="dataQuailty" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="点位名称:">
              <el-select
                v-model="dataQuailty.dwmc"
                placeholder="点位名称"
                style="width:150px"
                @keyup.enter.native="btnSearch"
              >
                <template v-for="item in DWMC">
                  <el-option :label="item.xmnr" :value="item.xmnr"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-form-item label="开始时间:" style="margin-right:15px">
              <el-date-picker
                @change="timeCheck('startTime')"
                v-model="dataQuailty.kssj"
                class="time-input"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="-结束时间:">
              <el-date-picker
                @change="timeCheck('endTime')"
                v-model="dataQuailty.jssj"
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
    <div class="chare_box" style="display:flex;height:600px;">
     
        <el-col :span="12"  class="posttion-relative">
           <img src="../../../assets/img/download.png" class="download_img" alt @click="downExcel('left')">
          <v-line :lineId="idLeft" :lineData="chartDataLeft" :styleData="chartDataLeftStyle"></v-line>
        </el-col>
        <el-col :span="12" class="posttion-relative">
           <img src="../../../assets/img/download.png" class="download_img" alt @click="downExcel('right')">
          <v-line :lineId="idRight" :lineData="chartDataRight" :styleData="chartDataRightStyle"></v-line>
        </el-col>
      
    </div>
  </div>
</template>
<script>
import vLine from "../../common/charts/line.vue";
import * as utils from "../../../utils/utils";
import * as JSON_ from "../../common/json/line";
export default {
  name: "TelemetryDataQualityStatistics",
  components: { vLine },
  data() {
    return {
      DWMC: [],
      idLeft: "chart-left",
      idRight: "chart-right",
      chartDataLeftStyle: { width: "100%", height: "580px" },
      chartDataRightStyle: { width: "100%", height: "580px" },
      dataQuailty: {
        dwmc: "",
        kssj: "",
        jssj: ""
      },
      color: [
        { normal: { color: "#5b9bd5" } },
        { normal: { color: "#ed7d31" } }
      ],
      exampleJsonA: [
        // {
        //   value: 180,
        //   total: 200,
        //   name: "有效数据",
        //   itemStyle: { normal: { color: "#5b9bd5" } }
        // },
        // {
        //   value: 20,
        //   total: 200,
        //   name: "无效数据",
        //   itemStyle: { normal: { color: "#ed7d31" } }
        // }
      ],
      exampleJsonB: [
        // {
        //   value: 165,
        //   total: 190,
        //   name: "合格车辆",
        //   itemStyle: { normal: { color: "#5b9bd5" } }
        // },
        // {
        //   value: 25,
        //   total: 190,
        //   name: "超标车辆",
        //   itemStyle: { normal: { color: "#ed7d31" } }
        // }
      ],
      chartDataLeft: {},
      chartDataRight: {}
    };
  },
  mounted() {
    //this.btn_search();
  },
  created() {
    let that = this;
    this.searchCharts();
    this.$axios("/serveApi/hbj/point/getAll?sidebar=遥测数据质量统计").then(
      function(res) {
        let arr = [];
        res.data.data.forEach(ele => {
          let obj = {};
          obj.xmnr = ele.dwmc;
          obj.sz = "dwmc";
          arr.push(obj);
        });
        console.log(arr);
        that.DWMC = arr;
      }
    );
  },
  methods: {
     downExcel(name){//导出excel
      if(name=="left"){
        let downData=JSON.parse(JSON.stringify(this.exampleJsonA));
        let arr=[];
        let arr1=[];
        let arr2=[];
        downData.forEach(ele=>{
        arr1.push(ele.name);
        arr2.push(ele.value)

        })
       arr.push(arr1,arr2);
      let wb = this.$xlsx.utils.book_new();//创建book对象
      let ws = this.$xlsx.utils.aoa_to_sheet(arr); //插入二维数组
      this.$xlsx.utils.book_append_sheet(wb, ws, "sheet1");  //将数据添加到工作薄
      this.$xlsx.writeFile(wb, "遥测数据有效性分析.xlsx"); //导出Excel
      }else{
        let downData=JSON.parse(JSON.stringify(this.exampleJsonB));
        let arr=[];
        let arr1=[];
        let arr2=[];
        downData.forEach(ele=>{
        arr1.push(ele.name);
        arr2.push(ele.value)

        })
       arr.push(arr1,arr2);
      let wb = this.$xlsx.utils.book_new();//创建book对象
      let ws = this.$xlsx.utils.aoa_to_sheet(arr); //插入二维数组
      this.$xlsx.utils.book_append_sheet(wb, ws, "sheet1");  //将数据添加到工作薄
      this.$xlsx.writeFile(wb, "遥测合格率分析.xlsx"); //导出Excel
      }
    },
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.dataQuailty.jssj == "" ||
              this.dataQuailty.jssj == "null" ||
              this.dataQuailty.jssj == null
            )
          ) {
            let timeBegin = this.dataQuailty.kssj.toString();
            let timeEnd = this.dataQuailty.jssj.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.dataQuailty.kssj = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.dataQuailty.kssj == "" ||
              this.dataQuailty.kssj == "null" ||
              this.dataQuailty.kssj == null
            )
          ) {
            let timeBegin = this.dataQuailty.kssj.toString();
            let timeEnd = this.dataQuailty.jssj.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.dataQuailty.jssj = "";
            }
          }
          break;
      }
    },
    searchCharts() {
      let that = this;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/remoteSensing/countUsefulOrQualifiedData",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          dwmc: this.dataQuailty.dwmc,
          kssj: this.dataQuailty.kssj,
          jssj: this.dataQuailty.jssj
        }
      }).then(res => {
        that.exampleJsonA = res.data.data.useful;
        that.exampleJsonB = res.data.data.qualified;
        that.exampleJsonA.forEach((ele, index) => {
          ele.itemStyle = that.color[index];
        });
        that.exampleJsonB.forEach((ele, index) => {
          ele.itemStyle = that.color[index];
        });
        that.btn_search();
        loadingObj.close();
      });
      //  this.$axios({
      //   method: "post",
      //   url: "http://192.168.1.99:8081/hbj/remoteSensing/countUsefulOrQualifiedData",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   data: {
      //     dwmc:this.dataQuailty.dwmc,
      //     kssj:this.dataQuailty.kssj,
      //     jssj:this.dataQuailty.jssj,
      //      type:" qualified"
      //   }
      // }).then(res=>{
      //   loadingObj.close();
      //   that.exampleJsonB=res.data.data;
      //   that.exampleJsonB.forEach((ele,index)=>{
      //       ele.itemStyle=that.color[index]
      //   })
      //   that.btn_search();
      // })
    },

    btnSearch() {
      //点击查询按钮
      this.searchCharts();
    },

    btn_search() {
      //生成饼图
      let pieA = JSON_.pie();
      let pieB = JSON_.pie();
      this.exampleJsonA.forEach(function(item) {
        pieA.legend.data.push(item["name"]);
        let obj = {};
        obj.value = item.value;
        obj.total = item.total;
        obj.name = item.name;
        obj.itemStyle = item.itemStyle;
        pieA.series[0].data.push(obj);
      });
      pieA.title.text = "遥测数据有效性分析";
      this.exampleJsonB.forEach(function(item) {
        pieB.legend.data.push(item["name"]);
        let obj = {};
        obj.value = item.value;
        obj.total = item.total;
        obj.name = item.name;
        obj.itemStyle = item.itemStyle;
        pieB.series[0].data.push(obj);
      });
      pieB.title.text = "遥测合格率分析";
      this.chartDataLeft = pieA;
      this.chartDataRight = pieB;
    },
    btnReset() {
      for (let i in this.dataQuailty) {
        this.dataQuailty[i] = "";
      }
    } //重置按钮
  }
};
</script>
<style>
.tdClass {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #909399;
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

<style  scoped>
</style>

