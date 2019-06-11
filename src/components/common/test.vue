<template>
  <div
    id="nav_box"
    style="background-color:black;position: fixed;right: 0;top: 0;width: 290px;height: 100%;z-index:999;"
  >
    <div id="left" @wheel="details">
      <div class="first_box" v-for="(item1,index) in navData" :key="item1.index">
        <div class="first_box_next" @click="naver(item1.index,item1.subs,index)">
          <span class="line_lf"></span>
          <span :class="item1.icon" style="font-size:30px;color:#fff;padding-bottom:5px;"></span>
        </div>
      </div>
    </div>

    <div
      class="second_box"
      v-for="items1 in navData"
      :key="items1.index"
      v-show="showHide == items1.index"
    >
      <div class="subsCtyle" v-if="items1.subs">
        <div class="second_style" v-for="(items2,index) in items1.subs" :key="items2.index">
          <div
            @click="naverSecond(items2.index,items2.subs,items2.show,index,$event)"
            class="naversecond_box"
          >
            <span class="round"></span>
            <span>{{items2.title}}</span>
            <span class="arrowStyle" :class="items2.subs ? 'icon-jiantou1':''"></span>
          </div>
          <div v-if="items2.subs" class="third_style">
            <div v-for="items3 in items2.subs" @click="naverThired($event)" :key="items3.index">
              <span class="round"></span>
              <span>{{items3.title}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vTest",
  data() {
    return {
      height_scroll: 0,
      roted: -90,
      showHide: "",
      navData: [
        {
          icon: "icon-fangzicopy",
          index: "homePage",
          title: "系统首页"
        },
        {
          icon: "icon-zuoyeqianqitijiance",
          index: "ExhaustTelemetryManagement",
          title: "尾气遥测管理"
        },
        {
          icon: "icon-heimingdan",
          index: "TelemetryBlacklist",
          title: "遥测超标黑名单",
          subs: [
            {
              index: "YellowLabelCarLine",
              title: "黄标车限行"
            },
            {
              index: "SingleAndDoubleNumberLimit",
              title: "单双号限行"
            },
            {
              index: "JointControl",
              title: "联合布控"
            },
            {
              index: "DataValidityAnalysis",
              title: "数据有效性分析"
            },
            {
              index: "PointManagement",
              title: "点位管理"
            },
            {
              index: "PointOperationManagement",
              title: "点位运行管理"
            },
            {
              index: "TrafficFlowMonitoringStatistics",
              title: "交通流量监测统计"
            }
          ]
        },
        {
          icon: "icon-cheliangxinxi",
          index: "SmokyCarManagement",
          title: "黑烟车管理"
        },
        {
          icon: "icon-chouchajiancha",
          index: "RoadInspectionManagement",
          title: "路检管理",
          subs: [
            {
              index: "RoadInspectionDataQuery",
              title: "路检数据查询"
            },
            {
              index: "RoadInspectionPunishmentManagement",
              title: "路检处罚管理"
            }
          ]
        },
        {
          icon: "icon-cz-jcdj",
          index: "CheckDataQuery",
          title: "环检数据查询",
          subs: [
            {
              index: "CheckpointDataQuery",
              title: "环检站数据查询"
            },
            {
              index: "DataAnalysisOfTheInspectionStation",
              title: "环检站数据分析"
            }
          ]
        },
        {
          icon: "icon-ditugenzong",
          index: "PenaltyTrackingManagement",
          title: "处罚跟踪管理",
          subs: [
            {
              index: "TelemetryPunishmentManagement",
              title: "遥测处罚管理"
            },

            {
              index: "PenaltyProcessTracking",
              title: "处罚过程跟踪"
            },
            {
              index: "PenaltyControl",
              title: "处罚控制"
            }
          ]
        },
        {
          icon: "icon-fenxi",
          index: "ComprehensiveAnalysisOfData",
          title: "数据综合分析展现",
          subs: [
            {
              index: "TrafficFlowAnalysis",
              title: "车流量分析"
            },
            {
              index: "VehicleAttributionAnalysis",
              title: "车辆归属分析"
            },
            {
              index: "TelemetryDataQualityStatistics",
              title: "遥测数据质量统计"
            },
            {
              index: "StatisticalAnalysisOfTelemetryData",
              title: "遥测数据统计分析"
            },
            {
              index: "SmokyCarStatistics",
              title: "黑烟车数据统计"
            },
            {
              index: "StatisticalAnalysisOfRoadInspectionData",
              title: "路检数据统计分析"
            },
            {
              index: "StatisticalAnalysisOfEnvironmentalInspectionData",
              title: "环检数据统计分析"
            },
            {
              index: "StatisticalAnalysisPenalties",
              title: "处罚统计分析",
              show: false,
              subs: [
                {
                  index: "RecheckPaymentStatistics",
                  title: "复检率与缴费率统计"
                },
                {
                  index: "RoadFineViolationStatistics",
                  title: "路段罚金额与违章数统计"
                },
                {
                  index: "TimeFineViolationStatistics",
                  title: "时段罚金和违章数统计"
                },
                {
                  index: "SameCarFineAndTimesStatistics",
                  title: "同辆车处罚金与次数统计"
                },
                {
                  index: "MonthFinePenaltyAmount",
                  title: "月处罚金额和处罚量统计"
                },
                {
                  index: "WeekFinePenaltyAmount",
                  title: "周期处罚金额和处罚量统计"
                }
              ]
            }
          ]
        },
        {
          icon: "icon-ditugenzong",
          index: "TelemetryGISDisplay",
          title: "遥测GIS展现"
        },
        {
          icon: "icon-cheliang",
          index: "VehicleDataLibrary",
          title: "车辆数据专题库"
        },
        {
          icon: "icon-jiankong",
          index: "VideoSurveillanceAndStreamingServices",
          title: "视频监控及流媒体服务"
        },
        {
          icon: "icon-fenxi1",
          index: "ExhaustEmissionAndRoadAirQualityAnalysis",
          title: "尾气排放与道路空气质量分析",
          subs: [
            {
              index: "RoadAirQualityDataQuery",
              title: "道路空气质量数据查询"
            },
            {
              index: "GasQuailtyAnalysis",
              title: "尾气排放与空气质量影响性分析"
            }
          ]
        },
        {
          icon: "icon-dianpu",
          index: "upload37",
          title: "系统管理",
          subs: [
            {
              index: "DataMaintenanceManagement",
              title: "数据维护管理"
            },
            {
              index: "UserManagement",
              title: "用户管理"
            },
            {
              index: "UserRightsManagement",
              title: "用户权限管理"
            },
            {
              index: "RoleManagement",
              title: "角色管理"
            },
            {
              index: "LogManagement",
              title: "日志管理"
            },
            {
              index: "DataDictionaryManagement",
              title: "数据字典管理"
            }
          ]
        }
      ],
      seconddata: []
    };
  },
  methods: {
    handle(delta) {
      let _nav_box = document.getElementById("nav_box");
      let _left = document.getElementById("left");
      let _nav_box_hei = _nav_box.clientHeight;
      let _left_hei = _left.clientHeight;
      let hei = _left_hei - _nav_box_hei;
      if (hei > 0) {
        if (delta < 0) {
          //向下滚动
          if (hei - this.height_scroll >= 4) {
            this.height_scroll = this.height_scroll + 4;
          } else if (hei - this.height_scroll < 4) {
            this.height_scroll =
              this.height_scroll + (hei - this.height_scroll);
          }
          _left.style.top = -this.height_scroll + "px";
        } else {
          //向上滚动
          if (this.height_scroll >= 4) {
            this.height_scroll = this.height_scroll - 4;
          }
          _left.style.top = -this.height_scroll + "px";
        }
      }
    },
    details(event) {
      let delta = 0;
      if (event.deltaY) {
        if (event.deltaY > 0) {
          delta = -1;
        } else {
          delta = 1;
        }
      } else if (event.wheelDelta) {
        if (event.wheelDelta < 0) {
          delta = -1;
        } else {
          delta = 1;
        }
      }
      if (delta) {
        console.log(6);
        this.handle(delta);
      }

      //console.log(document.getElementById("left").clientHeight)
      //console.log(window.innerHeight);
      //console.log(event);
    },
    naver(index, subs, num) {
      let first_box = document.getElementsByClassName("first_box");
      let round = document.getElementsByClassName("round");
      for (let i = 0; i < first_box.length; i++) {
        first_box[i].style.background = "#1d2437";
        first_box[i].firstChild.firstChild.style.background = "#1d2437";
        first_box[i].firstChild.childNodes[1].style.color = "#fff";
      }
      first_box[num].style.background = "#32374a";
      first_box[num].firstChild.firstChild.style.background = "#01c8b3";
      first_box[num].firstChild.childNodes[1].style.color = "#01c8b3";

      if (subs === undefined) {
        //location.hash="#/"+index;
        this.showHide = index;
      } else {
        this.showHide = index;
      }
    },
    naverSecond(index, subs, show, num, event) {
      let subsCtyle = document.getElementsByClassName("subsCtyle");
      for (let i = 0; i < subsCtyle.length; i++) {
        for (let j = 0; j < subsCtyle[i].childNodes.length; j++) {
          subsCtyle[i].childNodes[j].firstChild.style.color = "#fff";
          subsCtyle[i].childNodes[j].firstChild.firstChild.style.border =
            "1px solid #fff";
        }
      }
      event.currentTarget.style.color = "#01c8b3";
      event.currentTarget.firstChild.style.border = "1px solid #01c8b3";
      console.log(num);
      if (subs === undefined) {
        //location.hash="#/"+index;
      } else {
        let a = event.parentNode;
        console.log(a);
      }
    },
    naverThired(event) {
      let a = event.style.display;
      console.log(a);
      event.style.display = "none";
    }
  }
};
</script>
<style>
.first_box {
  background-color: #1d2437;
  width: 65px;
  text-align: center;
  height: 65px;
  line-height: 65px;
}
#left {
  width: 65px;
  position: absolute;
  cursor: pointer;
}
.second_box {
  background: #32374a;
  width: 190px;
  height: 100%;
  position: absolute;
  left: 65px;
  top: 0;
  padding: 10px 10px 10px 30px;
}
.second_style {
  line-height: 50px;
  color: #fff;
  font-size: 14px;
  position: relative;
  cursor: pointer;
}
.round {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 1px solid #fff;
  position: relative;
  left: -13px;
  top: -2px;
}
.arrowStyle {
  display: inline-block;
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg); /* IE 9 */
  -webkit-transform: rotate(-90deg); /* Safari and Chrome */
  position: absolute;
  left: 170px;
  top: 18px;
}
.third_style {
  padding-left: 10px;
}
.line_lf {
  display: inline-block;
  width: 2px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}
.lineStyle1 {
  background-color: #1d2437;
}
.lineStyle2 {
  background-color: #01c8b3;
}
.first_box_next {
  position: relative;
}
</style>
