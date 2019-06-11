<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#32374a"
      text-color="#bfcbd9"
      active-text-color="#36cfbd"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon" style="margin-right:5px;font-size:18px"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon" style="margin-right:5px;font-size:18px"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "icon-fangzicopy",
          index: "homePage1",
          title: "系统首页",
          subs: [
            {
              icon: "el-icon-view",
              index: "homePage1",
              title: "gis展示"
            },
            {
              icon: "el-icon-view",
              index: "homePage",
              title: "流程分析"
            },
            {
              icon: "el-icon-view",
              index: "largeScreen",
              title: "大屏综合展示"
            }
          ]
        },
        // {
        //   icon: "icon-ditugenzong",
        //   index: "TrackQuery",
        //   title: "轨迹查询"
        // },
        {
          icon: "el-icon-view",
          index: "xx",
          title: "车辆遥测记录",
          subs: [
            {
              icon: "el-icon-view",
              index: "VehicleTelemetryRecord",
              title: "一车一档"
            }
          ]
        },
        {
          icon: "icon-zuoyeqianqitijiance",
          index: "ExhaustTelemetryManagement",
          title: "尾气遥测管理",
          subs: [
            {
              index: "wqyccx",
              title: "尾气遥测查询",
              subs: [
                {
                  icon: "icon-zuoyeqianqitijiance",
                  index: "FixedExhaustTelemetryManagement",
                  title: "固定式遥感检测查询"
                },
                {
                  icon: "icon-zuoyeqianqitijiance",
                  index: "MovedExhaustTelemetryManagement",
                  title: "移动式遥感检测查询"
                },
                {
                  icon: "icon-zuoyeqianqitijiance",
                  index: "ExhaustTelemetryManagement",
                  title: "遥感检测查询"
                },
                {
                  icon: "icon-zuoyeqianqitijiance",
                  index: "ExhaustTelemetryQuery",
                  title: "遥测超标黑名单"
                }
              ]
            },
            {
              index: "DataValidityAnalysis",
              title: "数据有效性分析"
            },

            {
              index: "wzxxcx",
              title: "限行违章查询",
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
                }
              ]
            },
            {
              index: "dwgl",
              title: "点位管理",
              subs: [
                {
                  index: "PointManagement",
                  title: "点位管理"
                },
                {
                  index: "PointOperationManagement",
                  title: "点位运行管理"
                },
                {
                  index: "PointCheckTracking",
                  title: "点位检查跟踪"
                },
                // {
                //   index: "PointWarningQuery",
                //   title: "点位警告查询"
                // },
                {
                  index: "MovingPointTrackQuery",
                  title: "移动点位轨迹查询"
                }
              ]
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
          title: "黑烟车管理",
          subs: [
            // {
            //   index: "SmokeCarApproval",
            //   title: "黑烟车审批"
            // },
            {
              index: "SmokyCarManagement",
              title: "黑烟车审批"
            },
            {
              index: "BlackCigarettePunishmentManagement",
              title: "黑烟车处罚管理"
            },
            {
              index: "SmokeCarVideoImport",
              title: "黑烟车数据导入"
            },
            {
              index: "SmokyCarInformationRelease",
              title: "黑烟车发布查询"
            }
          ]
          // subs: [
          //   {
          //     index: "SmokyCarManagement",
          //     title: "黑烟车管理"
          //   },
          //   /*{
          //     index: "SmokyCarInformationEditor",
          //     title: "黑烟车信息编辑"
          //   },*/
          //   {
          //     index: "BlackSmokeDataLead",
          //     title: "黑烟车数据导入"
          //   },
          //   {
          //     index: "SmokyCarReview",
          //     title: "黑烟车审核"
          //   },
          //   {
          //     index: "AutoNumbering",
          //     title: "自动编号"
          //   },
          //   {
          //     index: "BlackCigaretteCarPunishmentDocumentPrinting",
          //     title: "黑烟车处罚文书打印"
          //   },
          //   {
          //     index: "SmokyCarDataQuery",
          //     title: "黑烟车数据查询"
          //   },
          //   /*{
          //     index: "SmokyVideoPlayback",
          //     title: "黑烟视频播放"
          //   },*/
          //   {
          //     index: "BlackSmokeCarVideoBulkPackageDownload",
          //     title: "黑烟车视频批量打包下载"
          //   },
          //   {
          //     index: "SmokyCarInformationRelease",
          //     title: "黑烟车信息发布"
          //   }
          // ]
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
            } //,
            //{
            // index: "NewDetectionMethod",
            //title: "检测方法新增"
            //}
          ]
        },
        {
          icon: "icon-ditugenzong",
          index: "PenaltyTrackingManagement",
          title: "处罚跟踪管理",
          subs: [
            // {
            //   index: "TelemetryPunishmentManagement",
            //   title: "遥测处罚管理"
            // },
            // {
            //   index: "BlackCigarettePunishmentManagement",
            //   title: "黑烟车处罚管理"
            // },
            // {
            //   index: "RoadInspectionPunishmentManagement1",
            //   title: "路检处罚管理"
            // },
            {
              index: "PenaltyProcessTracking",
              title: "处罚过程跟踪"
            }
            // {
            //   index: "PenaltyControl",
            //   title: "处罚控制"
            // }
          ]
        },
        {
          icon: "icon-fenxi",
          index: "ComprehensiveAnalysisOfData",
          title: "数据综合分析展现",
          subs: [
            {
              index: "TrafficFlowAnalysis",
              title: "车流量及归属分析"
            },

            // {
            //   index: "VehicleAttributionAnalysis",
            //   title: "车辆归属分析"
            // },
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
              title: "处罚统计分析"
              // subs: [
              //   {
              //     index: "RecheckPaymentStatistics",
              //     title: "复检率与缴费率统计"
              //   },
              //   {
              //     index: "RoadFineViolationStatistics",
              //     title: "路段罚金额与违章数统计"
              //   },
              //   {
              //     index: "TimeFineViolationStatistics",
              //     title: "时段罚金和违章数统计"
              //   },
              //   {
              //     index: "SameCarFineAndTimesStatistics",
              //     title: "同辆车处罚金与次数统计"
              //   },
              //   {
              //     index: "MonthFinePenaltyAmount",
              //     title: "月处罚金额和处罚量统计"
              //   },
              //   {
              //     index: "WeekFinePenaltyAmount",
              //     title: "周期处罚金额和处罚量统计"
              //   }
              // ]
            },
            {
              index: "JointComparativeAnalysis",
              title: "遥测与路检联合对比分析"
            },
            {
              index: "JointComparativeAnalysis2",
              title: "遥测与环检数据对比分析"
            }
            // {
            //   index: "upload29",
            //   title: "联合查询比对"
            // }
          ]
        },
        // {
        //   icon: "icon-ditugenzong",
        //   index: "TelemetryGISDisplay",
        //   title: "遥测GIS展现"
        // },
        {
          icon: "icon-jiankong",
          index: "spjk",
          title: "视频监控及流媒体服务",
          subs: [
            {
              icon: "icon-jiankong",
              index: "VideoSurveillanceAndStreamingServices",
              title: "视频监控播放"
            },
            {
              icon: "icon-jiankong",
              index: "VideoStreamingManagement",
              title: "视频监控管理"
            }
          ]
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
          icon: "icon-qq10",
          index: "Interfacemanagement",
          title: "数据交换接口"
        },
        // {
        //   icon: "icon-fenxi1",
        //   index: "ExhaustEmissionAndRoadAirQualityAnalysis",
        //   title: "尾气排放与道路空气质量分析",
        //   subs: [
        //     {
        //       index: "RoadAirQualityDataQuery",
        //       title: "道路空气质量数据查询"
        //     },
        //     {
        //       index: "GasQuailtyAnalysis",
        //       title: "尾气排放与空气质量影响性分析"
        //     }
        //   ]
        // },
        {
          icon: "icon-dianpu",
          index: "upload37",
          title: "系统管理",
          subs: [
            {
              index: "DataMaintenanceManagement",
              title: "数据维护管理",
              subs: [
                {
                  index: "EffectiveLimit",
                  title: "有效性限值维护"
                },
                {
                  index: "EmissionLimitMaintenance",
                  title: "排放限值维护"
                },
                {
                  index: "PenaltyControl",
                  title: "处罚规则维护"
                },
                // {
                //   index: "DataDictionaryManagement",
                //   title: "枚举值维护"
                // },
                {
                  index: "LimitRule",
                  title: "限行规则"
                },
                {
                  icon: "icon-zuoyeqianqitijiance",
                  index: "EmissionTrackingExceeded",
                  title: "黑名单规则管理"
                },

                {
                  index: "AutomaticAuditRuleManagement",
                  title: "自动审核规则管理"
                }
                // {
                //   index: "SpecialPlate",
                //   title: "特殊车辆登记"
                // }
              ]
            },
            {
              index: "SystemOperationMonitoring",
              title: "系统运行监控"
            },

            // {
            //   index: "UserManagement",
            //   title: "用户管理"
            // },
            {
              index: "UserRightsManagement",
              title: "用户与权限管理",
              subs: [
                {
                  index: "UserManagement",
                  title: "用户管理"
                },
                // {
                //   index: "UserRightsManagement",
                //   title: "用户权限管理"
                // },
                {
                  index: "RoleManagement",
                  title: "角色管理"
                },
                {
                  index: "InstitutionalInquiry",
                  title: "单位组织管理"
                }
              ]
            },

            {
              index: "LogManagement",
              title: "日志管理"
            },
            {
              index: "DataDictionaryManagement",
              title: "数据字典管理",
              subs: [
                {
                  index: "DateWeatherQuery",
                  title: "日历"
                },
                {
                  index: "DataDictionaryManagement",
                  title: "数据字典管理"
                }
              ]
              // subs: [
              //   {
              //     index: "limit1",
              //     title: "排放阶段限值要求"
              //   },
              //   {
              //     index: "limit2",
              //     title: "检测方法限值要求"
              //   },
              //   {
              //     index: "limit3",
              //     title: "其他国标数据要求"
              //   }
              // ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 260px;
}
.sidebar > ul {
  height: 100%;
}
</style>
