<template>
  <div class="big_scring">
    <img src="image/bigPicture.png" class="bgimg">
    <div class="content_box">
      <h3 class="title_top">咸阳机动车尾气遥感监测系统</h3>
      <div class="nav_top">
        <div
          class="nav_y y_pr"
          :style="{color:typeColor == 1?'#FF9618':'#fff'}"
          @click="ygDataAll()"
        >遥测</div>
        <div
          class="nav_y y_pr"
          :style="{color:typeColor == 2?'#FF9618':'#fff'}"
          @click="ljDataAll('lj')"
        >路检</div>
        <div
          class="nav_y y_pr"
          :style="{color:typeColor == 3?'#FF9618':'#fff'}"
          @click="ljDataAll('hj')"
        >环检</div>
        <div
          class="nav_y"
          :style="{color:typeColor == 4?'#FF9618':'#fff'}"
          @click="hycDataAll()"
        >黑烟车</div>
        <div
          class="nav_y y_pl"
          :style="{color:typeColor == 5?'#FF9618':'#fff'}"
          @click="hbcDataAll()"
        >黄标车</div>
        <div class="nav_y y_pls" @click="clouse">
          <span>关闭</span>
        </div>
      </div>
      <div class="box_top">
        <div class="box_top_left">
          <div id="map_box" style="height:100%;width:100%"></div>
        </div>
        <div class="box_top_right">
          <h5 class="little_title">{{title1}}</h5>
          <v-line :lineData="vline1Data" :styleData="vline1Style" :lineId="vline1Id" ref="vline1"></v-line>
          <v-line :lineData="vline1Datas" :styleData="vline1Style" :lineId="vline1Ids" ref="vline1"></v-line>
        </div>
      </div>
      <div class="box_bottom">
        <div class="box_bottom_left every_box">
          <h5 class="little_title">{{title2}}</h5>
          <div class="click_but_box">
            <button :style="{background:(but1) ? '#0a6485':'none'}" @click="monthOrDay(1)">按日统计</button>
            <button :style="{background:(but2) ? '#0a6485':'none'}" @click="monthOrDay(2)">按月统计</button>
          </div>
          <v-line :lineData="vline2Data" :styleData="vline2Style" :lineId="vline2Id" ref="vline1"></v-line>
        </div>
        <div class="box_bottom_center every_box">
          <h5 class="little_title">{{title3}}</h5>
          <div class="click_but_box">
            <button :style="{background:(but3) ? '#0a6485':'none'}" @click="monthOrDays(1)">24小时统计</button>
            <button :style="{background:(but4) ? '#0a6485':'none'}" @click="monthOrDays(2)">48小时统计</button>
          </div>
          <v-line :lineData="vline3Data" :styleData="vline2Style" :lineId="vline3Id" ref="vline1"></v-line>
        </div>
        <div class="box_bottom_right every_box">
          <h5 class="little_title">{{title4}}</h5>
          <div class="table_left">
            <div class="juzhong">
              <div
                class="table_box"
                v-for="(item,index) in vline4DataNow.tableData"
                :key="item.index"
                :style="{background:(index%2 == 1) ? '#187fbb':'#0a539b'}"
              >
                <div class="table_box1">{{item.name}}</div>
                <div class="table_box2">{{item.value}}</div>
              </div>
            </div>
          </div>
          <v-line :lineData="vline4Data" :styleData="vline1Style" :lineId="vline4Id" ref="vline1"></v-line>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as $jquery from "jquery";
import vLine from "../common/charts/line.vue";
export default {
  name: "largeScreen",
  components: { vLine },
  computed: {
    //图表一
    vline1Data() {
      return {
        title: {
          text: this.vline1DataNow.title1,
          textStyle: { color: "#fff", fontSize: 14 },
          bottom: 100,
          x: "center"
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },

        series: [
          {
            name: this.vline1DataNow.name,
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: this.vline1DataNow["hgcl"] }],
            itemStyle: {
              borderWidth: 4
            },
            axisTick: {
              //刻度线样式（及短线样式）
              length: 10
            },
            axisLabel: {
              //文字样式（及“10”、“20”等文字样式）
              color: "#fff",
              distance: 0 //文字离表盘的距离
            },
            detail: {
              // 仪表盘详情，用于显示数据。
              show: true, // 是否显示详情,默认 true。
              offsetCenter: [0, "50%"], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "auto", // 文字的颜色,默认 auto。
              fontSize: 20, // 文字的字体大小,默认 15。
              formatter: "{value}%", // 格式化函数或者字符串
              padding: [35, 0, 0, 0]
            },
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  //表盘颜色
                  [0.2, "#DA462C"],
                  [0.5, "#FF9618"],
                  [0.8, "#FFED44"],
                  [1, "#20AE51"]
                ],
                width: 20 //表盘宽度
              }
            }
          }
        ]
      };
    },
    //图表一/一
    vline1Datas() {
      return {
        title: {
          text: this.vline1DataNow.title2,
          textStyle: { color: "#fff", fontSize: 14 },
          bottom: 100,
          x: "center"
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },

        series: [
          {
            name: this.vline1DataNow.name,
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: this.vline1DataNow["bhgcl"], name: "" }],
            itemStyle: {
              borderWidth: 4
            },
            axisTick: {
              //刻度线样式（及短线样式）
              length: 10
            },
            axisLabel: {
              //文字样式（及“10”、“20”等文字样式）
              color: "#fff",
              distance: 0 //文字离表盘的距离
            },
            detail: {
              // 仪表盘详情，用于显示数据。
              show: true, // 是否显示详情,默认 true。
              offsetCenter: [0, "50%"], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "auto", // 文字的颜色,默认 auto。
              fontSize: 20, // 文字的字体大小,默认 15。
              formatter: "{value}%", // 格式化函数或者字符串
              padding: [35, 0, 0, 0]
            },
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  //表盘颜色
                  [0.2, "#20AE51"], //0-50%处的颜色
                  [0.5, "#FFED44"], //51%-70%处的颜色
                  [0.8, "#FF9618"], //70%-90%处的颜色
                  [1, "#DA462C"] //90%-100%处的颜色
                ],
                width: 20 //表盘宽度
              }
            }
          }
        ]
      };
    },
    //图表二
    vline2Data() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.vline2DataNow.xAxisData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 20
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff", //左边线的颜色
                width: "2" //坐标线的宽度
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff", //左边线的颜色
                width: "2" //坐标线的宽度
              }
            }
          }
        ],
        series: [
          {
            symbol: "triangle",
            name: this.vline2DataNow.name,
            type: "bar",
            barWidth: "60%",
            data: this.vline2DataNow.value,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#489ffa" },
                  { offset: 0.5, color: "#62a3e7" },
                  { offset: 1, color: "#b9d9fb" }
                ])
              }
            }
          }
        ]
      };
    },
    //图表三
    vline3Data() {
      return {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            type: "category",
            data: this.vline3DataNow.xAxisData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 20
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff", //左边线的颜色
                width: "2" //坐标线的宽度
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff", //左边线的颜色
                width: "2" //坐标线的宽度
              }
            }
          }
        ],

        series: [
          {
            data: this.vline3DataNow.value,
            type: "line",
            areaStyle: {},

            itemStyle: {
              normal: {
                color: "#14e7e9",
                lineStyle: {
                  color: "#14e7e9"
                }
              }
            }
          }
        ]
      };
    },
    //图表四
    vline4Data() {
      let objArraw = [];
      let legendData = [];
      for (let i = 0; i < this.vline4DataNow.name.length; i++) {
        let obj = {
          value: this.vline4DataNow.value[i],
          name: this.vline4DataNow.name[i]
        };
        objArraw.push(JSON.parse(JSON.stringify(obj)));
        legendData.push(this.vline4DataNow.name[i]);
      }
      this.vline4DataNow.tableData = objArraw;
      return {
        color: ["#b0809a", "#03b79e", "#00a2cc", "#0b529a"],

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          data: legendData,
          bottom: 0,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: this.vline4DataNow.nameTex,
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: objArraw
          }
        ]
      };
    }
  },
  data() {
    return {
      mapdata: [],
      title1: "",
      title2: "",
      title3: "",
      title4: "",
      but1: true,
      but2: false,
      but3: true,
      but4: false,
      typeDay: "yc",
      //环检车辆合格率数据
      vline1DataNow: {
        title: "遥测合格率分析",
        title1: "合格车辆",
        title2: "超标车辆",
        name: "遥测合格率分析",
        hgcl: 0,
        bhgcl: 0
      },
      vline1Style: {
        width: "50%",
        height: "17vw"
      },
      vline1Id: "vline1Id",
      vline1Ids: "vline1Ids",
      vline2Style: {
        width: "100%",
        height: "17vw"
      },
      //图表2
      vline2DataNow: {
        title: "遥测超标数据各超标因子超标个数统计",
        xAxisData: ["CO", "CO2", "CH", "NH"],
        name: "超标因子",
        value: [13, 54, 23, 33]
      },
      //图表3
      vline3DataNow: {
        title: "遥测检出率统计",
        xAxisData: [
          "k(客车)",
          "H(货车)",
          "Q(牵引车)",
          "Z(坐业车)",
          "M(摩托车)",
          "T(拖拉机)",
          "G(全挂)",
          "B(半挂)"
        ],
        name: "检出率",
        value: []
      },
      //图表4
      vline4DataNow: {
        title: "遥测超标数据各项比例",
        nameTex: "遥测超标数据",
        name: ["CO", "NO", "CH", "NH"],
        value: [13, 54, 23, 33],
        tableData: []
      },
      vline2Id: "vline2Id",
      vline3Id: "vline3Id",
      vline4Id: "vline4Id",
      typeColor: 1
    };
  },
  mounted() {
    this.axiosGetData();
    this.ygDataAll();
  },
  methods: {
    /**
     * @description 当天，当月查询按钮函数
     * @author lifei
     * @version 2019.5.30
     */
    monthOrDay(num) {
      if (num == 1) {
        this.but1 = true;
        this.but2 = false;
        switch (this.typeDay) {
          case "yc":
            this.ygData2(
              "/serveApihbj/gis/gisDataByDay?type=yc&time=day&siderbar=大屏综合展示"
            );
            break;
          case "lj":
            this.ljData2(
              "/serveApi/hbj/gis/gisDataByDay?type=road&time=day&sidebar=大屏综合展示"
            );

            break;
          case "hj":
            this.ljData2(
              "/serveApi/hbj/gis/gisDataByDay?type=hj&time=day&sidebar=大屏综合展示"
            );
            break;
          case "hyc":
            this.hycData2(
              "/serveApi/hbj/blackSmokeVechicle/getSmokeByDay?time=day"
            );
            break;
          case "hbc":
            this.hbcData2(
              "/serveApi/hbj/gis/gisDataByDay?type=hbc&time=day&sidebar=大屏综合展示"
            );
            break;
        }
      } else {
        this.but2 = true;
        this.but1 = false;
        switch (this.typeDay) {
          case "yc":
            this.ygData2(
              "/serveApihbj/gis/gisDataByDay?type=yc&time=month&siderbar=大屏综合展示"
            );
            break;
          case "lj":
            this.ljData2(
              "/serveApi/hbj/gis/gisDataByDay?type=road&time=month&sidebar=大屏综合展示"
            );

            break;
          case "hj":
            this.ljData2(
              "/serveApi/hbj/gis/gisDataByDay?type=hj&time=month&sidebar=大屏综合展示"
            );
            break;
          case "hyc":
            this.hycData2(
              "/serveApi/hbj/blackSmokeVechicle/getSmokeByDay?time=month"
            );
            break;
          case "hbc":
            this.hbcData2(
              "/serveApi/hbj/gis/gisDataByDay?type=hbc&time=month&sidebar=大屏综合展示"
            );
            break;
        }
      }
    },
    /**
     * @description 关闭大屏
     * @author lifei
     * @version 2019.6.05
     */
    clouse() {
      this.$router.go(-1);
    },
    /**
     * @description 24-48小时分批查询按钮函数
     * @author lifei
     * @version 2019.5.30
     */
    monthOrDays(num) {
      if (num == 1) {
        this.but3 = true;
        this.but4 = false;
        switch (this.typeDay) {
          case "yc":
            this.ygData3("/serveApi/hbj/gis/gisDataBytime?type=yc&time=24");
            break;
          case "lj":
            this.ljData3(
              "/serveApi/hbj/gis/gisDataBytime?type=road&time=24&sidebar=大屏综合展示"
            );

            break;
          case "hj":
            this.ljData3(
              "/serveApi/hbj/gis/gisDataBytime?type=hj&time=24&sidebar=大屏综合展示"
            );
            break;
          case "hyc":
            this.hycData3(
              "/serveApi/hbj/blackSmokeVechicle/getSmokeByTime?time=24"
            );
            break;
          case "hbc":
            this.hbcData3(
              "/serveApi/hbj/gis/gisDataBytime?type=hbc&time=24&sidebar=大屏综合展示"
            );
            break;
        }
      } else {
        this.but4 = true;
        this.but3 = false;
        switch (this.typeDay) {
          case "yc":
            this.ygData3("/serveApi/hbj/gis/gisDataBytime?type=yc&time=48");
            break;
          case "lj":
            this.ljData3(
              "/serveApi/hbj/gis/gisDataBytime?type=road&time=48&sidebar=大屏综合展示"
            );

            break;
          case "hj":
            this.ljData3(
              "/serveApi/hbj/gis/gisDataBytime?type=hj&time=48&sidebar=大屏综合展示"
            );
            break;
          case "hyc":
            this.hycData3(
              "/serveApi/hbj/blackSmokeVechicle/getSmokeByTime?time=48"
            );
            break;
          case "hbc":
            this.hbcData3(
              "/serveApi/hbj/gis/gisDataBytime?type=hbc&time=48&sidebar=大屏综合展示"
            );
            break;
        }
      }
    },
    /**
     * @description 遥测数据方法同一调用
     * @author lifei
     * @version 2019.5.30
     */
    ygDataAll() {
      this.typeDay = "yc";
      this.typeColor = 1;
      this.title1 = "遥测合格率分析";
      this.title2 = "遥测检出率统计";
      this.title3 = "遥测车型CO排放分析";
      this.title4 = "遥测超标数据各项比例";
      this.ygData1();
      this.ygData2(
        "/serveApi/hbj/gis/gisDataByDay?type=yc&time=day&siderbar=大屏综合展示"
      );
      this.ygData3("/serveApi/hbj/gis/gisDataBytime?type=yc&time=24");
      this.ygData4();
    },
    /**
     * @description 路检方法统一调用
     * @author lifei
     * @version 2019.5.30
     */
    ljDataAll(type) {
      if (type == "lj") {
        this.typeDay = "lj";
        this.typeColor = 2;
        this.title1 = "路检车辆合格率";
        this.title2 = "路检因子排放水平";
        this.title3 = "车型与路检因子CO排放水平";
        this.title4 = "路检车辆合格数与不合格数分析";
        this.ljData1(
          "/serveApi/hbj/roadInspect/RoadResultAnalysis?sidebar=大屏综合展示",
          "lj"
        );
        this.ljData2(
          "/serveApi/hbj/gis/gisDataByDay?type=road&time=day&sidebar=大屏综合展示"
        );
        this.ljData3(
          "/serveApi/hbj/gis/gisDataBytime?type=road&time=48&sidebar=大屏综合展示"
        );
      } else {
        this.typeDay = "hj";
        this.typeColor = 3;
        this.title1 = "环检车辆合格率";
        this.title2 = "环检因子排放水平";
        this.title3 = "车型与环检因子CO排放水平";
        this.title4 = "环检车辆合格数与不合格数分析";
        this.ljData1(
          "/serveApi/hbj/hj/HjResultAnalysis?sidebar=大屏综合展示",
          "hj"
        );
        this.ljData2(
          "/serveApihbj/gis/gisDataByDay?type=hj&time=day&sidebar=大屏综合展示"
        );
        this.ljData3(
          "/serveApi/hbj/gis/gisDataBytime?type=hj&time=48&sidebar=大屏综合展示"
        );
      }
    },
    /**
     * @description 遥测合格率分析数据请求
     * @author lifei
     * @version 2019.5.30
     */
    ygData1() {
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/gis/gisYCHeGeDuiBi?siderbar= 大屏综合展示"
      }).then(res => {
        this.title1 = "遥测合格率分析";
        //debugger;
        let hgcl = res.data.data[1];
        let bhgcl = res.data.data[0];
        let total = hgcl + bhgcl;
        this.vline1DataNow.hgcl = Math.floor((hgcl / total) * 100);
        this.vline1DataNow.bhgcl = Math.floor((bhgcl / total) * 100);
      });
    },
    /**
     * @description 遥测超标数据各超标因子超标个数统计
     * @author lifei
     * @version 2019.6.03
     */
    ygData2(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      }).then(res => {
        let co = 0;
        let co2 = 0;
        let hc = 0;
        let no = 0;
        if (res.data.data[0]) {
          co = res.data.data[0].co;
          co2 = res.data.data[0].co2;
          hc = res.data.data[0].hc;
          no = res.data.data[0].no;
        }

        that.vline2DataNow.xAxisData = ["CO", "CO2", "HC", "NO"];
        that.vline2DataNow.value = [co, co2, hc, no];
        that.vline2DataNow.name = "遥测超标数据";
      });
    },
    /**
     * @description 遥测CO检出率
     * @author lifei
     * @version 2019.6.04
     */
    ygData3(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      }).then(res => {
        let keys_ = ["K", "H", "Q", "Z", "M", "T", "G", "B"];
        let dataArraw = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < keys_.length; i++) {
          if (res.data.data[keys_[i]]) {
            dataArraw[i] = res.data.data[keys_[i]]["co"];
          }
        }

        that.vline3DataNow.xAxisData = [
          "k(客车)",
          "H(货车)",
          "Q(牵引车)",
          "Z(坐业车)",
          "M(摩托车)",
          "T(拖拉机)",
          "G(全挂)",
          "B(半挂)"
        ];
        that.vline3DataNow.name = "遥测车型CO排放分析";
        that.vline3DataNow.value = dataArraw;
      });
    },
    /**
     * @description 遥测超标数据各超标因子超标个数统计
     * @author lifei
     * @version 2019.6.03
     */
    ygData4() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/remoteSensing/getYcCBDuiBi"
      }).then(res => {
        //.log(res.data);

        let co = 0;
        let co2 = 0;
        let hc = 0;
        let no = 0;
        if (res.data.data[0]) {
          co = res.data.data[0].co;
          co2 = res.data.data[0].co2;
          hc = res.data.data[0].hc;
          no = res.data.data[0].no;
        }

        that.vline4DataNow.name = ["CO(%)", "CO2(%)", "HC(ppm)", "NO(ppm)"];
        that.vline4DataNow.value = [co, co2, hc, no];
        that.vline4DataNow.nameTex = "遥测超标数据";
      });
    },
    /**
     * @description 路检车辆合格率
     * @author lifei
     * @version 2019.5.30
     */
    bianliReturnAll(dataObj) {
      let totleNum = 0;
      for (let keys in dataObj) {
        totleNum += parseInt(dataObj[keys]);
      }
      return totleNum;
    },
    /**
     * @description 路检车辆合格率
     * @author lifei
     * @version 2019.5.30
     */
    ljData1(url, type) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {
          let bhgs = that.bianliReturnAll(res.data.data["0"]);
          let hgs = that.bianliReturnAll(res.data.data["1"]);

          that.vline1DataNow.title1 = "合格率";
          that.vline1DataNow.title2 = "不合格率";
          that.vline1DataNow.name = "车辆合格率分析";
          that.vline1DataNow.hgcl = Math.round((hgs / (bhgs + hgs)) * 100);
          that.vline1DataNow.bhgcl = Math.round((bhgs / (bhgs + hgs)) * 100);
          if (type == "lj") {
            that.vline4DataNow.name = ["路检合格车辆(%)", "路检不合格车辆(%)"];
            that.vline4DataNow.value = [hgs, bhgs];
            that.vline4DataNow.nameTex = "路检车辆数据";
          } else {
            that.vline4DataNow.name = ["环检合格车辆(%)", "环检不合格车辆(%)"];
            that.vline4DataNow.value = [hgs, bhgs];
            that.vline4DataNow.nameTex = "环检车辆数据";
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 路环检因子平均排放水平
     * @author lifei
     * @version 2019.5.30
     */
    ljData2(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {
          let dataArraw = [0, 0, 0];
          let key_ = ["co", "hc", "no"];
          if (res.data.data[0]) {
            //debugger;
            for (let i = 0; i < key_.length; i++) {
              dataArraw[i] = res.data.data[0][key_[i]];
            }
          }
          that.vline2DataNow.xAxisData = ["CO", "HC", "NO"];
          that.vline2DataNow.name = "路检因子平均排放水平";
          that.vline2DataNow.value = dataArraw;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 车型与路检因子CO排放水平
     * @author lifei
     * @version 2019.5.30
     */
    ljData3(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {
          let keys_ = ["K", "H", "Q", "Z", "M", "T", "G", "B"];
          let dataArraw = [0, 0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < keys_.length; i++) {
            if (res.data.data[keys_[i]]) {
              dataArraw[i] = res.data.data[keys_[i]]["co"];
            }
          }

          that.vline3DataNow.xAxisData = [
            "k(客车)",
            "H(货车)",
            "Q(牵引车)",
            "Z(坐业车)",
            "M(摩托车)",
            "T(拖拉机)",
            "G(全挂)",
            "B(半挂)"
          ];
          that.vline3DataNow.name = "车型与路检因子CO排放水平";
          that.vline3DataNow.value = dataArraw;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 黑烟车车模块数据请求方法
     * @author lifei
     * @version 2019.5.31
     */
    hycDataAll() {
      this.typeColor = 4;
      this.typeDay = "hyc";
      this.title1 = "黑烟车数量占比分析";
      this.title2 = "各车型对应黑烟车数量分析";
      this.title3 = "各车型对应处罚次数分析";
      this.title4 = "黑烟车与非黑烟车数量对比分析";
      this.hycData1();
      this.hycData2("/serveApi/hbj/blackSmokeVechicle/getSmokeByDay?time=day");
      this.hycData3("/serveApi/hbj/blackSmokeVechicle/getSmokeByTime?time=24");
    },
    /**
     * @description 黑烟车处罚与数量对应车型数据查询
     * @author lifei
     * @version 2019.5.31
     */
    hycData1() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/blackSmokeVechicle/getSmokeNumber"
      })
        .then(function(res) {
          let bhgs = 0;
          let hgs = 0;
          let sum = 0;
          if (res.data.data) {
            bhgs = res.data.data["0"];
            hgs = res.data.data["1"];
            if (bhgs + hgs == 0) {
              sum = 1;
            }
          } else {
            sum = 1;
          }
          that.vline1DataNow.title1 = "黑烟车";
          that.vline1DataNow.title2 = "非黑烟车";
          that.vline1DataNow.name = "黑烟车车分析";
          that.vline1DataNow.hgcl = Math.round((hgs / (bhgs + hgs)) * 100);
          that.vline1DataNow.bhgcl = Math.round((bhgs / (bhgs + hgs)) * 100);

          that.vline4DataNow.name = ["黑烟车(辆)", "非黑烟车(辆)"];
          that.vline4DataNow.value = [hgs, bhgs];
          that.vline4DataNow.nameTex = "黑烟车数据分析";
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 黑烟车处罚与数量对应车型数据查询
     * @author lifei
     * @version 2019.5.31
     */
    hycData2(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {
          let keys_ = ["K", "H", "Q", "Z", "M", "T", "G", "B"];
          let dataArraw = [0, 0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < keys_.length; i++) {
            if (res.data.data[keys_[i]]) {
              dataArraw[i] = res.data.data[keys_[i]];
            }
          }
          that.vline2DataNow.xAxisData = [
            "k(客车)",
            "H(货车)",
            "Q(牵引车)",
            "Z(坐业车)",
            "M(摩托车)",
            "T(拖拉机)",
            "G(全挂)",
            "B(半挂)"
          ];

          that.vline2DataNow.name = "车型对应黑烟车数量";
          that.vline2DataNow.value = dataArraw;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 黑烟车处罚与数量对应车型数据查询
     * @author lifei
     * @version 2019.5.31
     */
    hycData3(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {
          let keys_ = ["K", "H", "Q", "Z", "M", "T", "G", "B"];
          let dataArraw = [0, 0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < keys_.length; i++) {
            if (res.data.data[keys_[i]]) {
              dataArraw[i] = res.data.data[keys_[i]];
            }
          }
          that.vline3DataNow.xAxisData = [
            "k(客车)",
            "H(货车)",
            "Q(牵引车)",
            "Z(坐业车)",
            "M(摩托车)",
            "T(拖拉机)",
            "G(全挂)",
            "B(半挂)"
          ];

          that.vline3DataNow.name = "车型对应处罚次数";
          that.vline3DataNow.value = dataArraw;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 黄标车模块数据请求方法
     * @author lifei
     * @version 2019.5.31
     */
    hbcDataAll() {
      this.typeDay = "hbc";
      this.typeColor = 5;
      this.title1 = "黄标车遥测违规数占比分析";
      this.title2 = "遥测数与黄标车、单双号数量统计分析";
      this.title3 = "黄标车各时段违规数量分析";
      this.title4 = "黄标车遥测违规数与遥测不违规数量统计分析";
      this.hbcData1("/serveApi/hbj/gis/gisHBCSum");
      this.hbcData2(
        "/serveApi/hbj/gis/gisDataByDay?type=hbc&time=day&sidebar=大屏综合展示"
      );
      this.hbcData3(
        "/serveApi/hbj/gis/gisDataBytime?type=hbc&time=28&sidebar=大屏综合展示"
      );
    },
    /**
     * @description 黄标车遥测违规数占比分析
     * @author lifei
     * @version 2019.5.30
     */
    hbcData1(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {

          let bhgs = res.data.data["hbcsl"];
          let hgs = res.data.data["jczs"] - res.data.data["hbcsl"];
          that.vline1DataNow.title1 = "非黄标车";
          that.vline1DataNow.title2 = "黄标车";
          that.vline1DataNow.name = "数量";
          that.vline1DataNow.hgcl = Math.round((hgs / (bhgs + hgs)) * 100);
          that.vline1DataNow.bhgcl = Math.round((bhgs / (bhgs + hgs)) * 100);

          that.vline4DataNow.name = ["非黄标车", "黄标车"];
          that.vline4DataNow.value = [hgs, bhgs];
          that.vline4DataNow.nameTex = "黄标车数据分析";
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 遥测数与黄标车、单双号数量统计分析
     * @author lifei
     * @version 2019.5.30
     */
    hbcData2(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {
          let dataArraw = [0, 0, 0];
          let key_ = ["jczs", "hbcsl", "xxsl"];
          if (res.data.data) {
            //debugger;
            for (let i = 0; i < key_.length; i++) {
              dataArraw[i] = res.data.data[key_[i]];
            }
          }
          that.vline2DataNow.xAxisData = ["检测总数", "黄标车", "单双号限行"];
          that.vline2DataNow.name = "路检因子平均排放水平";
          that.vline2DataNow.value = dataArraw;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 黄标车各时段违规数量分析
     * @author lifei
     * @version 2019.5.30
     */
    hbcData3(url) {
      let that = this;
      this.$axios({
        method: "get",
        url: url
      })
        .then(function(res) {
          let keys_ = ["0-4", "4-8", "8-12", "12-16", "16-20", "20-24"];
          let dataArraw = [0, 0, 0, 0, 0, 0];
          for (let i = 0; i < keys_.length; i++) {
            if (res.data.data) {
              dataArraw[i] = res.data.data[keys_[i]];
            }
          }

          that.vline3DataNow.xAxisData = JSON.parse(JSON.stringify(keys_));
          that.vline3DataNow.name = "各时段黄标车数量分析";
          that.vline3DataNow.value = dataArraw;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 地图参数获取
     * @author lifei
     * @version 2019.5.30
     */
    axiosGetData() {
      let that = this;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/gis/findGisData",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          siderbar: "大屏綜合展示"
        }
      })
        .then(function(res) {
          let arrObj = [];
          if (res.data.data) {
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = {
                point: [res.data.data[i]["jd"], res.data.data[i]["wd"]],
                cll: res.data.data[i]["cll"],
                bhgcls: res.data.data[i]["bhgcls"],
                hgcls: res.data.data[i]["hgcls"],
                hyczs: res.data.data[i]["hyczs"],
                hycycfs: res.data.data[i]["hycycfs"],
                hycwcfs: res.data.data[i]["hycwcfs"],
                mc: res.data.data[i]["mc"],
                type: res.data.data[i]["type"]
              };
              arrObj.push(JSON.parse(JSON.stringify(obj)));
            }
          }
          that.mapdata = arrObj;
          that.mapFun();
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 地图渲染
     * @author lifei
     * @version 2019.5.30
     */
    mapFun() {
      let map = new BMap.Map("map_box", { enableMapClick: false }); // 创建Map实例

      map.centerAndZoom(new BMap.Point(108.715154, 34.335737), 14); // 初始化地图,设置中心点坐标和地图级别

      map.setMapStyle({
        styleJson: [
          {
            featureType: "poilabel",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          }
        ]
      });
      map.setMapStyle({ style: "midnight" });

      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      map.setZoom(14);
      map.setCurrentCity("西安"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      let that = this;
      let cityId = null;
      // 复杂的自定义覆盖物
      //参数 point 坐标 , backImg 图片,oneparameter 周边设备数,twoparameter 上网人数 ,threeparameter 车牌号码 ,fourparameter 设备MAC,fiveparameter 时间
      function ComplexCustomOverlay(point, backImg, num, mapdata, backImg2) {
        this._point = point;
        this._backImg = backImg;
        this._backImg2 = backImg2;
        this._num = num;
        this._mapdata = mapdata;
      }
      ComplexCustomOverlay.prototype = new BMap.Overlay();
      ComplexCustomOverlay.prototype.initialize = function(map) {
        //console.log($jquery("#divwer")[0]);
        this._map = map;
        let div = (this._div = document.createElement("div"));
        //console.log(this._point.lat);
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        //console.log(this._backImg);
        if (this._mapdata.type == 1) {
          div.style.background =
            "url('" + this._backImg + "') no-repeat center center";
        } else {
          div.style.background =
            "url('" + this._backImg2 + "') no-repeat center center";
        }

        div.style.MozUserSelect = "none";
        div.style.zIndex = 99;
        // div.setAttribute("className","abc");
        $jquery(div).css({
          position: "absolute",
          "z-index": this._num,
          cursor: "pointer",
          height: "30",
          width: "30",
          margin: "0",
          padding: "0",
          color: "#fff",
          "font-size": "14px"
        });
        $jquery(div).attr({ num: this._num, class: "pointD" });
        //  滑过显示盒子
        let onediv = document.createElement("div");
        $jquery(onediv).css({
          height: "30",
          width: "30",
          "white-space": "nowrap",
          margin: "0",
          padding: "0",
          color: "#fff",
          //background:"red",
          "text-align": "center",
          "line-height": "30px"
        });
        //onediv.innerHTML = this._num;
        $jquery(div)
          .append(`<div class="disNCz" style="display:none; position:absolute;padding:10px;left: -160px; top: -214px;  width: 320px;height:200px;z-index: 3; ">
    <div style="width:320px;height: 200px;border: 2px solid #5eb5f8;border-radius: 7px;background-color: #fff">
      <div
        style="line-height:45px;overflow: hidden;text-align: center;background: #5eb5f8;font-weight: 700;font-size: 14px;">
        <a style="color:#fff;text-decoration: none;" onmouseover="this.style.fontSize='15px';"
          onmouseout="this.style.fontSize='14px';" onclick="reset_map('PointManagement')">站点名称：${
            this._mapdata.mc
          }</a></div>
      <div style="line-height:25px;padding:5px 20px 5px 45px;position: relative;"><a
          style="color: #000;text-decoration: none;" onmouseover="this.style.color='#5eb5f8';"
          onmouseout="this.style.color='#000';" onclick="reset_map('TrafficFlowMonitoringStatistics')"><span style="position: absolute;left:11px;font-size: 25px;"
            class="icon-liuliang"></span>车流量：${
              this._mapdata.cll
            }辆/h</a></div>
      <div style="line-height:25px;padding:5px 20px 5px 45px;position: relative;"><a
          style="color: #000;text-decoration: none;" onmouseover="this.style.color='#5eb5f8';"
          onmouseout="this.style.color='#000';" onclick="reset_map('ExhaustTelemetryManagement')"><span style="position: absolute;left:11px;font-size: 25px;"
            class="icon-jiance"></span>监测信息：合格车辆${
              this._mapdata.hgcls
            }辆,不合格车辆${this._mapdata.bhgcls}辆</a></div>
      <div style="line-height:25px;"></div>
      <div style="line-height:25px;padding:5px 20px 5px 45px;position: relative;"><a
          style="color: #000;text-decoration: none;" onmouseover="this.style.color='#5eb5f8';"
          onmouseout="this.style.color='#000';" onclick="reset_map('SmokyCarManagement')"><span style="position: absolute;left:11px;font-size: 25px;"
            class="icon-cheliangxinxi"></span>黑烟车处理情况：黑烟车总数${
              this._mapdata.hyczs
            }辆,已处罚${this._mapdata.hycycfs}辆，未处罚${
          this._mapdata.hycwcfs
        }辆</a></div>
      <div style="line-height:25px;"></div>
    </div>
  </div>`);
        $jquery(div)
          .append(`<div class="zhuzhuangtu" style=" width: 90px; height: 50px; display: flex;align-items: flex-end;position:absolute;z-index: 1;color: #fff;font-size: 10px;text-align: center;left: -32px; top: -50px;">
        <div style="width: 30px;height: ${Math.floor(
          this._mapdata.cll <= 100
            ? this._mapdata.cll * 5
            : this._mapdata.cll / 3
        )}px;background-color: #5b9bd5;">${this._mapdata.cll}</div>
        <div style="width: 30px;height: ${Math.floor(
          this._mapdata.bhgcls <= 100
            ? this._mapdata.bhgcls * 5
            : this._mapdata.bhgcls / 3
        )}px;background-color: #ed7d31;">${this._mapdata.bhgcls}</div>
        <div style="width: 30px;height: ${Math.floor(
          this._mapdata.hgcls <= 100
            ? this._mapdata.hgcls * 5
            : this._mapdata.hgcls / 3
        )}px;background-color: #ffc000;">${this._mapdata.hgcls}</div>
    </div>`);
        div.appendChild(onediv);
        //  滑到显示
        $jquery(div).mousemove(function() {
          $jquery(this).css("z-index", "999999");
          $jquery(this)
            .children(".disNCz")
            .css("display", "block");
        });
        //  滑过隐藏
        $jquery(div).mouseout(function() {
          $jquery(this).css("z-index", $jquery(this).attr("num"));
          $jquery(this)
            .children(".disNCz")
            .css("display", "none");
        });
        map.getPanes().labelPane.appendChild(div);
        map.addEventListener("zoomend", function(div) {
          var ZoomNum = map.getZoom();
          if (ZoomNum < 14) {
            $jquery(".zhuzhuangtu").css("display", "none");
          } else {
            $jquery(".zhuzhuangtu").css("display", "flex");
          }
          //console.log(ZoomNum);
        });
        return div;
      };
      ComplexCustomOverlay.prototype.draw = function() {
        let map = this._map;
        let pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 15 + "px";
        this._div.style.top = pixel.y - 15 + "px";
      };

      // 把定位点添加到地图中
      let o = 1;
      let timeOut = null;
      function posiPoint() {
        let backImg = "image/xinhao.png";
        let backImg2 = "image/red.gif";
        //console.log(that.mapdata);
        //debugger;
        let pointd = new BMap.Point(
          that.mapdata[o - 1].point[0],
          that.mapdata[o - 1].point[1]
        );
        //console.log(that.mapdata[o - 1].point[0], that.mapdata[o - 1].point[1]);
        //debugger;
        let myCompOverlayveh = new ComplexCustomOverlay(
          pointd,
          backImg,
          o,
          that.mapdata[o - 1],
          backImg2
        );
        map.addOverlay(myCompOverlayveh);
        o++;
        if (o - 1 < that.mapdata.length) {
          timeOut = setTimeout(posiPoint, 500);
        }
      }
      posiPoint();
    }
  }
};
</script>
<style scoped>
.big_scring {
  background: #0f2f6e;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  overflow: auto;
}
.bgimg {
  width: 100%;
}
.content_box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
}
.title_top {
  position: relative;
  text-align: center;
  top: 1.5vw;
  font-size: 2vw;
}
.nav_top {
  display: flex;
  position: relative;
  text-align: center;
  top: 3vw;
  justify-content: center;
}
.nav_y {
  width: 7vw;
  box-sizing: border-box;
  cursor: pointer;
}
.y_pr {
  padding-right: 1vw;
}
.y_pl {
  padding-left: 1vw;
}
.y_pls {
  padding-left: 0.6vw;
}
.box_top {
  display: flex;
  position: relative;
  top: 6.5vw;
  left: -0.4vw;
}
.box_top_left {
  width: 64vw;
  height: 21.8vw;
  overflow: hidden;
  position: relative;
  overflow: hidden;
  border-radius: 3vw 0 3vw 0;
}
.box_top_right {
  display: flex;
  width: 30.5vw;
  height: 17vw;
  position: relative;
  left: 2.5vw;
  top: 2vw;
}
.box_bottom {
  display: flex;
  position: relative;
  top: 11vw;
  left: -0.4vw;
  height: 17vw;
}
.every_box {
  width: 30vw;
  height: 17vw;
  position: relative;
}
.box_bottom_center {
  left: 3vw;
}
.box_bottom_right {
  display: flex;
  left: 6vw;
}
.little_title {
  position: absolute;
  font-size: 16px;
  top: -2vw;
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding-right: 10vw;
}
.table_left {
  width: 50%;
  height: 17vw;
  padding: 2vw 0 0 2vw;
  box-sizing: border-box;
  position: relative;
}
.juzhong {
  /* position: absolute;
    box-sizing: border-box;
    height: 8vw;
    padding: 0 0 0 2vw;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;*/
}
.table_box {
  display: flex;
  line-height: 2vw;
  width: 100%;
}
.table_box1 {
  width: 60%;
  text-align: center;
}
.table_box2 {
  width: 40%;
  text-align: center;
}
.click_but_box {
  position: absolute;
  right: 1.5vw;
  top: 0.5vw;
  z-index: 99;
}
.click_but_box > button {
  background: none;
  border: 1px solid #00ebff;
  padding: 0.5vw 1vw;
  color: #fff;
  margin-left: 1vw;
  cursor: pointer;
}
</style>


