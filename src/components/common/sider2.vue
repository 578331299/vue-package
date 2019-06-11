<template>
  <div class="parent-menu">
    <div class="outer_one">
      <div class="inner_one" ref="inner_one">
        <template v-for="(item,$index) in itemList">
          <div
            class="one-level show_disappear"
            :class="{active_click:$index==ins}"
            @click="show_two_level(item,$event,$index)"
          >
            <i :class="item.icon" style="margin-right:5px"></i>
            <div style="width:15px;height:15px"></div>
          </div>
        </template>
      </div>
    </div>
    <div class="tow-level show_disappear" style="display:none">
      <el-menu
      @select="selectItems"
        :default-active="$route.path"
        background-color="#32374a"
        text-color="white"
        active-text-color="#36cfbd"
        unique-opened
        :collapse="collapse"
      >
        <template v-if="menu_two.subs">
          <template v-for="item_two in menu_two.subs">
            <template v-if="item_two.subs">
              <el-submenu :index="item_two.index">
                <template slot="title">{{item_two.title}}</template>
                <template v-for="item_three in item_two.subs">
                  <el-menu-item :index="item_three.index">{{item_three.title}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item_two.index">{{item_two.title}}</el-menu-item>
            </template>
          </template>
        </template>
        <template v-else>
          <el-menu-item :index="menu_two.index">{{menu_two.title}}</el-menu-item>
          <!-- 只有一级菜单 -->
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import $Jquery from "jquery";
 import bus from './bus';
export default {
  computed: {
    onRoutes() {
    
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // document.addEventListener("click", function(e) {
    //   //点击消失
    //   var _con = $Jquery(".show_disappear");
    //   if (!_con.is(e.target) && _con.has(e.target).length === 0) {
    //     $Jquery(".tow-level").hide();
    //   }
    // });
  },
  mounted() {
    document.querySelector(".inner_one").style.height =
      document.body.clientHeight + "px";
    document.querySelector(".parent-menu").style.height =
      document.body.clientHeight + "px";

    window.onresize = function() {
      document.querySelector(".inner_one").style.height =
        document.body.clientHeight + "px";
    };
  },
  methods: {
    show_two_level(item, event, index) {
       bus.$emit("collapse", true);//展开右侧菜单
      //点击一级菜单
      this.ins = index;
      let sp = document.querySelector("one-level");
      this.build_two_level(item);
    },
    build_two_level(item) {
      $Jquery(".tow-level").show();
      this.menu_two = item;
    },
    selectItems(index){
   location.hash="/"+index
    }
  },
  data() {
    return {
      ins: "",
      collapse: false,
      menu_two: {},
      isShow: false,
      itemList: [
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
            // {
            //   index: "CheckpointDataAccess",
            //   title: "环检站数据接入"
            // },
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
        // {
        //   icon: "el-icon-lx-copy",
        //   index: "upload32",
        //   title: "数据交换接口服务"
        // },
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
      ]
    };
  }
};
</script>
<style scoped>
.inner_one {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #1d2437;
  /* margin-right: -15px; */
  display: block;
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.outer_one {
  width: 50px;
  overflow: hidden;
}
.one-level {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #1d2437;
  width: 65px;
  color: white;
  height: 65px;
  text-align: center;
  line-height: 100px;
  font-size: 18px;
}
.tow-level {
  display: block;
  position: fixed;
  left: 65px;
  top: 70px;
  bottom: 0;
  text-align: center;
  background-color: #32374a;
  width: 225px;
  color: white;
  word-break: break-all;
}
.parent-menu {
  display: flex;
  width:200px !important;
}
.active_click {
  background-color: #32374a;
  border-left: solid 3px #36cfbd;
}
.el-menu{
  border: none;
}
</style>

