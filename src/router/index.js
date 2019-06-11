import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homePage1'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/homePage1',
                    component: resolve => require(['../components/page/homePage1.vue'], resolve),
                    meta: { title: 'gis展现' }
                },
                {
                    path: '/homePage',
                    component: resolve => require(['../components/page/homePage.vue'], resolve),
                    meta: { title: '流程分析' }
                },
                {
                    path: '/VehicleTelemetryRecord',
                    component: resolve => require(['../components/page/VehicleTelemetryRecord.vue'], resolve),
                    meta: { title: '一车一档' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }, {
                    path: '/JointControl',
                    component: resolve => require(['../components/page/JointControl.vue'], resolve),
                    meta: { title: '联合布控' }
                }, {
                    path: '/UserManagement',
                    component: resolve => require(['../components/page/UserManagement.vue'], resolve),
                    meta: { title: '用户管理' }
                }, {
                    path: '/RoleManagement',
                    component: resolve => require(['../components/page/RoleManagement.vue'], resolve),
                    meta: { title: '角色管理' }
                }, {
                    path: '/StatisticalAnalysisOfRoadInspectionData',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/StatisticalAnalysisOfRoadInspectionData.vue'], resolve),
                    meta: { title: '路检数据统计分析' }
                }, {
                    path: '/TelemetryPunishmentManagement',
                    component: resolve => require(['../components/page/TelemetryPunishmentManagement.vue'], resolve),
                    meta: { title: '遥测处罚管理' }
                },
                , {
                    path: '/BlackCigarettePunishmentManagement',
                    component: resolve => require(['../components/page/SmokyCarManagement/BlackCigarettePunishmentManagement.vue'], resolve),
                    meta: { title: '黑烟车处罚管理' }
                }
                , {
                    path: '/RoadInspectionPunishmentManagement',
                    component: resolve => require(['../components/page/RoadInspectionManagement/RoadInspectionPunishmentManagement.vue'], resolve),
                    meta: { title: '路检处罚管理' }
                }, {
                    path: '/SmokyCarManagement',
                    component: resolve => require(['../components/page/SmokyCarManagement/SmokyCarManagement.vue'], resolve),
                    meta: { title: '黑烟车审批' }
                }, {
                    path: '/SmokyCarDataQuery',
                    component: resolve => require(['../components/page/SmokyCarManagement/SmokyCarDataQuery.vue'], resolve),
                    meta: { title: '黑烟车数据查询' }
                }, {
                    path: '/SmokeCarApproval',
                    component: resolve => require(['../components/page/SmokyCarManagement/SmokeCarApproval.vue'], resolve),
                    meta: { title: '黑烟车审批' }
                }, {
                    path: '/YellowLabelCarLine',
                    component: resolve => require(['../components/page/TelemetryBlacklist/YellowLabelCarLine.vue'], resolve),
                    meta: { title: '黄标车限行' }
                }, {
                    path: '/SingleAndDoubleNumberLimit',
                    component: resolve => require(['../components/page/TelemetryBlacklist/SingleAndDoubleNumberLimit.vue'], resolve),
                    meta: { title: '单双号限行' }
                }, {
                    path: '/UserRightsManagement',
                    component: resolve => require(['../components/page/UserRightsManagement.vue'], resolve),
                    meta: { title: '用户权限管理' }
                }, {
                    path: '/LogManagement',
                    component: resolve => require(['../components/page/LogManagement.vue'], resolve),
                    meta: { title: '日志管理' }
                }, {
                    path: '/DataDictionaryManagement', 
                    component: resolve => require(['../components/page/DataDictionaryManagement.vue'], resolve),
                    meta: { title: '数据字典管理' }
                }, {
                    path: '/PointOperationManagement',
                    component: resolve => require(['../components/page/TelemetryBlacklist/PointOperationManagement.vue'], resolve),
                    meta: { title: '点位运行管理' }
                }, {
                    path: '/MovingPointTrackQuery',
                    component: resolve => require(['../components/page/TelemetryBlacklist/MovingPointTrackQuery.vue'], resolve),
                    meta: { title: '移动点位轨迹查询' }
                },{
                    path: '/FixedExhaustTelemetryManagement',
                    component: resolve => require(['../components/page/FixedExhaustTelemetryManagement.vue'], resolve),
                    meta: { title: '固定式遥感检测查询', keepAlive: false }
                },{
                    path: '/MovedExhaustTelemetryManagement',
                    component: resolve => require(['../components/page/MovedExhaustTelemetryManagement.vue'], resolve),
                    meta: { title: '移动式式遥感检测查询', keepAlive: false }
                },  {
                    path: '/ExhaustTelemetryManagement',
                    component: resolve => require(['../components/page/ExhaustTelemetryManagement.vue'], resolve),
                    meta: { title: '遥感检测查询', keepAlive: false }
                },{
                    path: '/ExhaustTelemetryQuery',
                    component: resolve => require(['../components/page/ExhaustTelemetryQuery.vue'], resolve),
                    meta: { title: '遥测超标黑名单' }
                }, {
                    path: '/TrafficFlowMonitoringStatistics',
                    component: resolve => require(['../components/page/TelemetryBlacklist/TrafficFlowMonitoringStatistics.vue'], resolve),
                    meta: { title: '交通流量监测统计' }
                }, {
                    path: '/RoadInspectionDataQuery',
                    component: resolve => require(['../components/page/RoadInspectionManagement/RoadInspectionDataQuery.vue'], resolve),
                    meta: { title: '路检数据查询' }
                }, {
                    path: '/StatisticalAnalysisOfTelemetryData',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/StatisticalAnalysisOfTelemetryData.vue'], resolve),
                    meta: { title: '遥测数据统计分析' }
                }
                , {
                    path: '/TelemetryDataQualityStatistics',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/TelemetryDataQualityStatistics.vue'], resolve),
                    meta: { title: '遥测数据质量统计' }
                }, {
                    path: '/SmokyCarStatistics',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/SmokyCarStatistics.vue'], resolve),
                    meta: { title: '黑烟车数据统计' }
                }, {
                    path: '/PenaltyProcessTracking',
                    component: resolve => require(['../components/page/PenaltyTrackingManagement/PenaltyProcessTracking.vue'], resolve),
                    meta: { title: '处罚过程跟踪' }
                }, {
                    path: '/PenaltyControl',
                    component: resolve => require(['../components/page/PenaltyTrackingManagement/PenaltyControl.vue'], resolve),
                    meta: { title: '处罚规则维护' }
                }, {
                    path: '/TrafficFlowAnalysis',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/TrafficFlowAnalysis.vue'], resolve),
                    meta: { title: '车流量及归属分析' }
                }, {
                    path: '/VehicleAttributionAnalysis',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/VehicleAttributionAnalysis.vue'], resolve),
                    meta: { title: '车辆归属分析' }
                }, {
                    path: '/StatisticalAnalysisOfEnvironmentalInspectionData',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/StatisticalAnalysisOfEnvironmentalInspectionData.vue'], resolve),
                    meta: { title: '环检数据统计分析' }
                }, {
                    path: '/JointComparativeAnalysis',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/JointComparativeAnalysis.vue'], resolve),
                    meta: { title: '遥测与路检联合对比分析' }
                }, {
                    path: '/JointComparativeAnalysis2',
                    component: resolve => require(['../components/page/ComprehensiveAnalysisOfData/JointComparativeAnalysis2.vue'], resolve),
                    meta: { title: '遥测与环检数据对比分析' }
                }, {
                    path: '/RecheckPaymentStatistics',
                    component: resolve => require(['../components/page/StatisticalAnalysisPenalties/RecheckPaymentStatistics.vue'], resolve),
                    meta: { title: '复检率与缴费率统计' }
                }, {
                    path: '/RoadFineViolationStatistics',
                    component: resolve => require(['../components/page/StatisticalAnalysisPenalties/RoadFineViolationStatistics.vue'], resolve),
                    meta: { title: '路段罚金额与违章数统计' }
                }, {
                    path: '/TimeFineViolationStatistics',
                    component: resolve => require(['../components/page/StatisticalAnalysisPenalties/TimeFineViolationStatistics.vue'], resolve),
                    meta: { title: '时段罚金和违章数统计' }
                }, {
                    path: '/SameCarFineAndTimesStatistics',
                    component: resolve => require(['../components/page/StatisticalAnalysisPenalties/SameCarFineAndTimesStatistics.vue'], resolve),
                    meta: { title: '同辆车处罚金与次数统计' }
                }, {
                    path: '/MonthFinePenaltyAmount',
                    component: resolve => require(['../components/page/StatisticalAnalysisPenalties/MonthFinePenaltyAmount.vue'], resolve),
                    meta: { title: '月处罚金额和处罚量统计' }
                }, {
                    path: '/WeekFinePenaltyAmount',
                    component: resolve => require(['../components/page/StatisticalAnalysisPenalties/WeekFinePenaltyAmount.vue'], resolve),
                    meta: { title: '周期处罚金额和处罚量统计' }
                }, {
                    path: '/TelemetryGISDisplay',
                    component: resolve => require(['../components/page/TelemetryGISDisplay.vue'], resolve),
                    meta: { title: '遥测GIS展现' }
                }, {
                    path: '/VideoSurveillanceAndStreamingServices',
                    component: resolve => require(['../components/page/VideoSurveillanceAndStreamingServices.vue'], resolve),
                    meta: { title: '视频监控及流媒体服务' }
                }, {
                    path: '/FixedTelemetryDataQuery',
                    component: resolve => require(['../components/page/FixedTelemetryDataQuery.vue'], resolve),
                    meta: { title: '固定式遥测数据查询' }
                }, {
                    path: '/TelemetryDataQuery',
                    component: resolve => require(['../components/page/TelemetryDataQuery.vue'], resolve),
                    meta: { title: '遥测数据查询' }
                }, {
                    path: '/RoadAirQualityDataQuery',
                    component: resolve => require(['../components/page/ExhaustEmissionAndRoadAirQualityAnalysis/RoadAirQualityDataQuery.vue'], resolve),
                    meta: { title: '道路空气质量数据查询' }
                }, {
                    path: '/GasQuailtyAnalysis',
                    component: resolve => require(['../components/page/ExhaustEmissionAndRoadAirQualityAnalysis/GasQuailtyAnalysis.vue'], resolve),
                    meta: { title: '尾气排放与空气质量影响性分析' }
                },
                , {
                    path: '/CheckpointDataQuery',
                    component: resolve => require(['../components/page/CheckDataQuery/CheckpointDataQuery.vue'], resolve),
                    meta: { title: '环检站数据查询' }
                },
                , {
                    path: '/PointManagement',
                    component: resolve => require(['../components/page/TelemetryBlacklist/PointManagement.vue'], resolve),
                    meta: { title: '点位管理' }
                },
                , {
                    path: '/DataMaintenanceManagement',
                    component: resolve => require(['../components/page/DataMaintenanceManagement.vue'], resolve),
                    meta: { title: '数据维护管理' }
                }, {
                    path: '/SpecialPlate',
                    component: resolve => require(['../components/page/SpecialPlate.vue'], resolve),
                    meta: { title: '特殊车牌登记' }
                }
                , {
                    path: '/VehicleDataLibrary',
                    component: resolve => require(['../components/page/VehicleDataLibrary.vue'], resolve),
                    meta: { title: '车辆数据专题库' }
                }, {
                    path: '/DataValidityAnalysis',
                    component: resolve => require(['../components/page/TelemetryBlacklist/DataValidityAnalysis.vue'], resolve),
                    meta: { title: '数据有效性分析' }
                }, {
                    path: '/DataAnalysisOfTheInspectionStation',
                    component: resolve => require(['../components/page/CheckDataQuery/DataAnalysisOfTheInspectionStation.vue'], resolve),
                    meta: { title: '环检站数据分析' }
                }, {
                    path: '/BlackSmokeDataLead',
                    component: resolve => require(['../components/page/SmokyCarManagement/BlackSmokeDataLead.vue'], resolve),
                    meta: { title: '黑烟车数据导入' }
                }, {
                    path: '/SmokyCarReview',
                    component: resolve => require(['../components/page/SmokyCarManagement/SmokyCarReview.vue'], resolve),
                    meta: { title: '黑烟车审核' }
                },
                {
                    path: '/StatisticalAnalysisPenalties',
                    component: resolve => require(['../components/page/StatisticalAnalysisPenalties'], resolve),
                    meta: { title: '处罚统计分析' }
                },
                {
                    path: '/homePage1',
                    component: resolve => require(['../components/page/homePage1.vue'], resolve),
                    meta: { title: 'gis展现' }
                }, {
                    path: '/TelemetryEquipmentCalibration',
                    component: resolve => require(['../components/page/TelemetryEquipmentCalibration.vue'], resolve),
                    meta: { title: '遥测设备自检' }
                },
                {
                    path: '/TelemetryEquipmentInspection',
                    component: resolve => require(['../components/page/TelemetryEquipmentInspection.vue'], resolve),
                    meta: { title: '遥测设备检查' }
                },
                {
                    path: '/EffectiveLimit',
                    component: resolve => require(['../components/page/userManagement/EffectiveLimit.vue'], resolve),
                    meta: { title: '有效性限值维护' }
                },
                {
                    path: '/SmokeCarVideoImport',
                    component: resolve => require(['../components/page/SmokyCarManagement/SmokeCarVideoImport.vue'], resolve),
                    meta: { title: '黑烟车数据导入' }
                },
                {
                    path: '/SmokyCarInformationRelease',
                    component: resolve => require(['../components/page/SmokyCarManagement/SmokyCarInformationRelease.vue'], resolve),
                    meta: { title: '黑烟车信息发布' }
                },
                {
                    path: '/VideoStreamingManagement',
                    component: resolve => require(['../components/page/VideoStreamingManagement.vue'], resolve),
                    meta: { title: '视频监控及流媒体服务管理' }
                },
                {
                    path: '/Interfacemanagement',
                    component: resolve => require(['../components/page/userManagement/Interfacemanagement.vue'], resolve),
                    meta: { title: '接口管理' }
                },
                {
                    path: '/SystemOperationMonitoring',
                    component: resolve => require(['../components/page/userManagement/SystemOperationMonitoring.vue'], resolve),
                    meta: { title: '系统运行监控' }

                }, {
                    path: '/PointCheckTracking',
                    component: resolve => require(['../components/page/CheckDataQuery/PointCheckTracking.vue'], resolve),
                    meta: { title: '点位检查跟踪' }
                },
                , {
                    path: '/LimitRule',
                    component: resolve => require(['../components/page/userManagement/LimitRule.vue'], resolve),
                    meta: { title: '限行规则' }
                },
                , {
                    path: '/EmissionLimitMaintenance',
                    component: resolve => require(['../components/page/userManagement/EmissionLimitMaintenance.vue'], resolve),
                    meta: { title: '排放限值维护' }
                },
                , {
                    path: '/EmissionTrackingExceeded',
                    component: resolve => require(['../components/page/EmissionTrackingExceeded.vue'], resolve),
                    meta: { title: '黑名单规则管理' }
                },
                , {
                    path: '/PointWarningQuery',
                    component: resolve => require(['../components/page/TelemetryBlacklist/PointWarningQuery.vue'], resolve),
                    meta: { title: '点位警告查询' }
                },
                , {
                    path: '/DateWeatherQuery',
                    component: resolve => require(['../components/page/userManagement/DateWeatherQuery.vue'], resolve),
                    meta: { title: '日期' }
                }, {
                    path: '/AutomaticAuditRuleManagement',
                    component: resolve => require(['../components/page/userManagement/AutomaticAuditRuleManagement.vue'], resolve),
                    meta: { title: '自动审核规则管理' }
                }, {
                    path: '/NewDetectionMethod',
                    component: resolve => require(['../components/page/CheckDataQuery/NewDetectionMethod.vue'], resolve),
                    meta: { title: '检测方法新增' }
                },
                , {
                    path: '/NewDetectionMethod',
                    component: resolve => require(['../components/page/CheckDataQuery/NewDetectionMethod.vue'], resolve),
                    meta: { title: '检测方法新增' }
                }, {
                    path: '/InstitutionalInquiry',
                    component: resolve => require(['../components/page/userManagement/InstitutionalInquiry.vue'], resolve),
                    meta: { title: '单位组织管理' }
                },
                {
                    path: '/TrackQuery',
                    component: resolve => require(['../components/page/TrackQuery.vue'], resolve),
                    meta: { title: '轨迹查询' }
                },
                {
                    path: '/largeScreen',
                    component: resolve => require(['../components/page/largeScreen.vue'], resolve),
                    meta: { title: '大屏展示' }
                }, {
                    path: '/gis',
                    component: resolve => require(['../components/page/gis.vue'], resolve),
                    meta: { title: 'gis展现' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }, {
            path: "/pdfShow",
            component: resolve => require(['../components/common/PdfShow.vue'], resolve)
        },
        // {
        //     path: '/sider2',
        //     component: resolve => require(['../components/page/sider2.vue'], resolve),
        // }
    ]
})
