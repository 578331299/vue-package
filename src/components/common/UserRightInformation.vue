<template>
  <div class="detailedInformation_box" @click="handleClose()" v-if="diaSta">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <span>{{title}}</span>
        <div class="clouse_box">
          <img src="image/clouse.png" @click="handleClose" alt>
          <!--<span class="spanclick" ></span>-->
        </div>
      </div>
      <div class="cont_xi">
        <div class="cont_parent">
          <div class="cont_left">
            <div style="text-align:center">用户已有权限</div>
            <div class="cont_left_son">
              <template v-for="itemA in items">
                <template v-if="itemA.subs">
                  <div class="cont_left_son_items">
                    <el-checkbox
                      v-model="itemA.checked"
                      @click.native="checkAll(itemA,itemA.checked)"
                    >
                      <i :class="itemA.icon" style="color:#01c8b3;margin-right:10px"></i>
                      <el-select :placeholder="itemA.title" multiple>
                        <el-option v-for="itemB in itemA.subs" value>
                          <el-checkbox
                            multiple
                            v-model="itemB.checked"
                            @click.native="check_single(itemA,itemB,itemB.checked)"
                          >{{itemB.title}}</el-checkbox>
                        </el-option>
                      </el-select>
                    </el-checkbox>
                  </div>
                </template>
                <template v-else>
                  <div class="cont_left_son_items">
                    <el-checkbox v-model="itemA.checked">
                      <i :class="itemA.icon" style="color:#01c8b3;margin-right:10px"></i>
                      <span>{{itemA.title}}</span>
                    </el-checkbox>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <!-- <div class="cont_center">
            <div style="margin-top:150px;text-align:center;cursor:pointer">
              <img src="../../assets/img/add.png" alt>
              <div style="width:100%;">添加</div>
            </div>
            <div style="margin-top:50px;text-align:center;cursor:pointer">
              <img src="../../assets/img/delete.png" alt>
              <div>删除</div>
            </div>
          </div>-->
          <!-- <div class="cont_right">
            <div style="text-align:center">用户已有权限</div>
            <div class="cont_right_son"></div>
          </div>-->
        </div>
        <div style="text-align:center;">
          <el-button type="primary" size="medium">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "information",
  methods: {
    openDialog() {},
    handleClose() {
      this.diaSta2 = false;
      this.$emit("dialogClose", false);
    },
    checkAll(data, checked) {
      //全选事件
      let check = !checked;
      this.items.forEach(element => {
        if (element.index == data.index) {
          element.subs.forEach(ele => {
            ele.checked = check;
          });
        }
      });
    },
    check_single(dataA, dataB, checked) {
      let check = !checked;
      let flag = true;
      this.items.forEach(element => {
        if (element.index == dataA.index) {
          //当为父节点 开始判断状态

          element.subs.forEach(ele => {
            if (ele.title != dataB.title) {
              if (ele.checked == false) {
                flag = false;
              }
            }
           
          });
          if(flag){ //如果其他子节点为true 则和当前这个对比
            flag=check;
          }
            // alert(element.checked)
           element.checked = flag
        }
        // console.log(flag)

        //element.checked = flag;
      });
      console.log(flag);
    }
  },
  data() {
    return {
      checked: false,
      diaSta: false,
      dataList: [1, 2],
      items: [
        {
          icon: "icon-fangzicopy",
          index: "homePage1",
          title: "系统首页",
          checked: true
        },
        {
          icon: "el-icon-view",
          index: "VehicleTelemetryRecord",
          title: "车辆遥测记录",
          checked: true
        },
        {
          icon: "icon-zuoyeqianqitijiance",
          index: "ExhaustTelemetryManagement",
          title: "尾气遥测管理",
          subs: [
            {
              icon: "icon-zuoyeqianqitijiance",
              index: "ExhaustTelemetryManagement",
              title: "尾气遥测管理",
              checked: true
            },
            {
              icon: "icon-zuoyeqianqitijiance",
              index: "ExhaustTelemetryQuery",
              title: "尾气遥测查询",
              checked: false
            },
            {
              index: "YellowLabelCarLine",
              title: "黄标车限行",
              checked: false
            },
            {
              index: "SingleAndDoubleNumberLimit",
              title: "单双号限行",
              checked: false
            },
            { index: "JointControl", title: "联合布控", checked: false },
            {
              index: "DataValidityAnalysis",
              title: "数据有效性分析",
              checked: false
            },
            { index: "PointManagement", title: "点位管理", checked: false },
            {
              index: "PointOperationManagement",
              title: "点位运行管理",
              checked: false
            },
            {
              index: "TrafficFlowMonitoringStatistics",
              title: "交通流量监测统计"
            }
          ],
          checked: false
        },
        {
          icon: "icon-cheliangxinxi",
          index: "SmokyCarManagement",
          title: "黑烟车管理",
          subs: [
            {
              index: "SmokyCarDataQuery",
              title: "黑烟车数据查询",
              checked: false
            },
            { index: "SmokeCarApproval", title: "黑烟车审批", checked: false },
            {
              index: "SmokyCarManagement",
              title: "黑烟车管理",
              checked: false
            },
            {
              index: "BlackCigarettePunishmentManagement",
              title: "黑烟车处罚管理",
              checked: false
            }
          ],
          checked: false
        },
        {
          icon: "icon-chouchajiancha",
          index: "RoadInspectionManagement",
          title: "路检管理",
          subs: [
            {
              index: "RoadInspectionDataQuery",
              title: "路检数据查询",
              checked: false
            },
            {
              index: "RoadInspectionPunishmentManagement",
              title: "路检处罚管理",
              checked: false
            }
          ],
          checked: false
        },
        {
          icon: "icon-cz-jcdj",
          index: "CheckDataQuery",
          title: "环检数据查询",
          subs: [
            {
              index: "CheckpointDataQuery",
              title: "环检站数据查询",
              checked: false
            },
            {
              index: "DataAnalysisOfTheInspectionStation",
              title: "环检站数据分析",
              checked: false
            }
          ],
          checked: false
        },
        {
          icon: "icon-ditugenzong",
          index: "PenaltyTrackingManagement",
          title: "处罚跟踪管理",
          subs: [
            {
              index: "PenaltyProcessTracking",
              title: "处罚过程跟踪",
              checked: false
            },
            { index: "PenaltyControl", title: "处罚控制", checked: false }
          ],
          checked: false
        },
        {
          icon: "icon-fenxi",
          index: "ComprehensiveAnalysisOfData",
          title: "数据综合分析展现",
          subs: [
            {
              index: "TrafficFlowAnalysis",
              title: "车流量及归属分析",
              checked: false
            },
            {
              index: "TelemetryDataQualityStatistics",
              title: "遥测数据质量统计",
              checked: false
            },
            {
              index: "StatisticalAnalysisOfTelemetryData",
              title: "遥测数据统计分析",
              checked: false
            },
            {
              index: "StatisticalAnalysisOfRoadInspectionData",
              title: "路检数据统计分析",
              checked: false
            },
            {
              index: "StatisticalAnalysisOfEnvironmentalInspectionData",
              title: "环检数据统计分析",
              checked: false
            },
            {
              index: "StatisticalAnalysisPenalties",
              title: "处罚统计分析",
              checked: false
            },
            {
              index: "JointComparativeAnalysis",
              title: "遥测与路检联合对比分析",
              checked: false
            },
            {
              index: "JointComparativeAnalysis2",
              title: "遥测与环检数据对比分析",
              checked: false
            }
          ],
          checked: false
        },
        {
          icon: "icon-cheliang",
          index: "VehicleDataLibrary",
          title: "车辆数据专题库",
          checked: false
        },
        {
          icon: "icon-jiankong",
          index: "VideoSurveillanceAndStreamingServices",
          title: "视频监控及流媒体服务",
          checked: false
        },
        {
          icon: "icon-dianpu",
          index: "upload37",
          title: "系统管理",
          subs: [
            {
              index: "DataMaintenanceManagement",
              title: "数据维护管理",
              checked: false
            },
            { index: "SpecialPlate", title: "特殊车牌登记", checked: false },
            { index: "UserManagement", title: "用户管理", checked: false },
            {
              index: "UserRightsManagement",
              title: "用户权限管理",
              checked: false
            },
            { index: "RoleManagement", title: "角色管理", checked: false },
            { index: "LogManagement", title: "日志管理", checked: false },
            {
              index: "DataDictionaryManagement",
              title: "数据字典管理",
              checked: false
            }
          ],
          checked: false
        }
      ]
    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    updataData: Array
  },
  watch: {
    updataData(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        //this.dataList=newVal;
        this.dataList = JSON.parse(JSON.stringify(newVal));
      }
    }
  },
  mounted() {
    //console.log(this.updataData);
  }
};
</script>
<style scoped>
.cont_left_son_items {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.cont_left_son_items:nth-child(odd) {
  background-color: white;
  /* border: solid 1px #ddd; */
}
.cont_left_son {
  overflow-y: auto;
  height: 500px;
  width: 100%;
  background-color: #f2f6f9;
}
.cont_right_son {
  overflow-y: auto;
  height: 500px;
  width: 100%;
  background-color: #f2f6f9;
}
.cont_parent {
  display: flex;
  width: 100%;
}

.cont_left {
  width: 100%;
  /* text-align: center; */
}
.cont_center {
  width: 10%;
}
.cont_right {
  width: 45%;
  /* text-align: center; */
}
.detailedInformation_box {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(52, 52, 52, 0.5);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content1_box {
  width: 500px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.title_box {
  width: 100%;
  height: 60px;
  background: #01c8b3;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  font-weight: 700;
  position: relative;
}
/*.clouse_box{
  
  border: 1px solid #fff;
  border-radius: 50%;
 
  
  color: #fff;
}*/
.clouse_box > img {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 101;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.cont_xi {
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  max-height: 600px;
  overflow: auto;
}
.evbox {
  display: flex;
  line-height: 40px;
}
.baitiao {
  width: 5px;
  height: 100%;
  background-color: #fff;
  color: #fff;
}
</style>


