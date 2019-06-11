<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="formEnvironmentalInspection"
        :model="formEnvironmentalInspection"
        :inline="true"
      >
        <el-row>
          <el-col :span="6" style="display:flex;justify-content:flex-end;">
            <el-form-item label="点位名称：">
              <el-select
                @keyup.enter.native="axiosGetData(1)"
                v-model="formEnvironmentalInspection.site"
                placeholder="选择点位名称"
              >
                <el-option
                  v-for="item in xxdwData"
                  :key="item.dwbh"
                  :label="item.dwmc"
                  :value="item.dwmc"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="formEnvironmentalInspection.startTime"
                value-format="yyyy-MM-dd"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" 结束时间：">
              <el-date-picker
                v-model="formEnvironmentalInspection.endTime"
                value-format="yyyy-MM-dd"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-star;">
            <div class="button_box">
              <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
              <el-button type="primary" @click="resetData" style="margin-left:15px;">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 114px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table border="border" height="calc(100% - 0px)" :data="tableList">
          <el-table-column label="点位名称" prop="dwmc" align="center"></el-table-column>
          <el-table-column label="监测点位日志号" prop="jcdwrzh" align="center"></el-table-column>
          <el-table-column label="所属道路" prop="ssdl" align="center"></el-table-column>
          <el-table-column label="流量分类" prop="llfl" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData.llfl[scope.row.llfl]}}</a>
            </template>
          </el-table-column>
          <el-table-column label="统计时长" prop="tjsc" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData.tjsc[scope.row.tjsc]}}</a>
            </template>
          </el-table-column>
          <el-table-column label="统计日期" prop="tjrq" align="center"></el-table-column>
          <el-table-column label="车道序号" prop="cdxh" align="center"></el-table-column>
          <!--<el-table-column label="微小型客车数" prop="WXXKCS" align="center"></el-table-column>
          <el-table-column label="中型客车数" prop="ZXKCS" align="center"></el-table-column>
          <el-table-column label="大型客车数" prop="DXKCS" align="center"></el-table-column>
          <el-table-column label="小型货车数" prop="XXHCS" align="center"></el-table-column>
          <el-table-column label="中型货车数" prop="ZXHCS" align="center"></el-table-column>
          <el-table-column label="重型货车数" prop="ZXHCS1" align="center"></el-table-column>-->
          <el-table-column label="通行车辆数" prop="txcls" align="center"></el-table-column>
          <el-table-column label="平均速度(m/s)" prop="pjsd" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.pjsd}}</span>
            </template>
          </el-table-column>
          <el-table-column label="平均排队长度(m)" prop="pjpdcd" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.pjpdcd}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">详细信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
    <!--<information :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information>-->
    <information-much :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information-much>
  </div>
</template>
<script>
//import information from "../../common/information.vue";
import informationMuch from "../../common/informationMuch.vue";
export default {
  name: "TrafficFlowMonitoringStatistics",

  components: {
    informationMuch
  },
  data() {
    return {
      title: "",
      formEnvironmentalInspection: {
        site: "",
        startTime: "",
        endTime: ""
      },
      table_yc: {
        dwmc: "点位名称",
        jcdwrzh: "监测点位日志号",
        ssdl: "所属道路",
        llfl: "流量分类",
        tjsc: "统计时长",
        cjsd: "采集时段",
        tjrq: "统计日期",
        cdxh: "车道序号",
        wxxkcs: "微小型客车数",
        zxkcs: "中型客车数",
        dxkcs: "大型客车数",
        xxhcs: "小型货车数",
        zxhcs: "中型货车数",
        zxhcs1: "重型货车数",
        txcls: "通行车辆数",
        pjsd: "平均速度(m/s)",
        pjpdcd: "平均排队长度(m)"
      },
      tableList: [],
      diaSta: false,
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      title: "",
      sidebar: "交通流量监测统计",
      updataData: [],
      llflObj: {},
      tjscObj: {},
      xxdwData: []
    };
  },
  created() {
    //this.carCalorfun("LLFL");
    //this.carCalorfun("TJSC");
    this.dwcxfun();
  },
  mounted() {
    this.axiosGetData();
    console.log(this.$store.state.enumSelection);
  },

  methods: {
    /**
     * @description 分页中每页显示数据条数
     * @author lifei
     * @version 2019.5.28
     */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 分页跳转
     * @author lifei
     * @version 2019.5.28
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 初始化、查询数据展示
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData(num) {
      if (num === 1) {
        this.currentPage4 = 1;
      }
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/traffic/getTrafficFlow",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          dwmc: that.formEnvironmentalInspection.site,
          startTime: that.formEnvironmentalInspection.startTime,
          endTime: that.formEnvironmentalInspection.endTime
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.data) {
            that.tableList = res.data.data.data;
            //console.log(res.data.data.data);
            that.total = res.data.data.total;
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 显示详情
     * @author lifei
     * @version 2019.5.28
     */
    handleClick(row) {
      this.diaSta = true;
      let keys_ = Object.keys(this.table_yc);
      let arr = [];
      let that = this;
      let rowNew = {};
      for (let item in row) {
        if (item == "llfl") {
          rowNew[item] = that.$store.state.enumData.llfl[row[item]];
        } else if (item == "tjsc") {
          rowNew[item] = that.$store.state.enumData.tjsc[row[item]];
        } else {
          rowNew[item] = row[item];
        }
      }
      keys_.forEach(function(item, index) {
        let obj = {};
        obj.key = that.table_yc[item];
        obj.values = rowNew[item];
        arr.push(obj);
      });
      this.title = "交通流量监测统计详情";
      let arrTwo = [];
      let arrlittle = [];
      for (let i = 0; i < arr.length; i++) {
        arrlittle.push(arr[i]);
        if (arrlittle.length == 2 && i < arr.length - 1) {
          arrTwo.push(arrlittle);
          arrlittle = [];
          //debugger;
        }
        if (i == arr.length - 1) {
          arrTwo.push(arrlittle);
          arrlittle = [];
        }
      }
      //console.log(arrTwo);
      this.updataData = arrTwo;
    },
    /**
     * @description 关闭详情
     * @author lifei
     * @version 2019.5.28
     */
    close() {
      this.diaSta = false;
    },
    /**
     * @description 重置
     * @author lifei
     * @version 2019.5.28
     */
    resetData() {
      let keys_ = Object.keys(this.formEnvironmentalInspection);
      for (let i = 0; i < keys_.length; i++) {
        this.formEnvironmentalInspection[keys_[i]] = "";
      }
    },

    /* carCalorfun(type) {
      let that = this;
      let obj = {};
      obj.lx = type;
      obj.sidebar = this.sidebar;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/enum/select",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          if (res.data) {
            if (type === "LLFL") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.llflObj = obj;
            } else if (type === "TJSC") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.tjscObj = obj;
              //console.log(res.data.data);
            }
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },*/
    /**
     * @description 时间校验
     * @author lifei
     * @version 2019.5.28
     */
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.formEnvironmentalInspection.endTime == "" ||
              this.formEnvironmentalInspection.endTime == "null" ||
              this.formEnvironmentalInspection.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formEnvironmentalInspection.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formEnvironmentalInspection.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "起始时间不能大于结束时间!"
              });
              this.formEnvironmentalInspection.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.formEnvironmentalInspection.startTime == "" ||
              this.formEnvironmentalInspection.startTime == "null" ||
              this.formEnvironmentalInspection.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formEnvironmentalInspection.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formEnvironmentalInspection.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "结束时间不能小于起始时间!"
              });
              this.formEnvironmentalInspection.endTime = "";
            }
          }
          break;
      }
    },
    /**
     * @description 查询点位
     * @author lifei
     * @version 2019.5.28
     */
    dwcxfun() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/point/getAll",
        params: {
          sidebar: that.sidebar
        }
      })
        .then(function(res) {
          console.log(res.data.data);
          if (res.data) {
            console.log(res.data.data);

            let obj = [];
            let result = [];
            if (res.data) {
              for (let i = 0; i < res.data.data.length; i++) {
                if (
                  obj.indexOf(res.data.data[i].dwmc) > 0 ||
                  res.data.data[i].dwmc == ""
                ) {
                  continue;
                } else {
                  result.push(res.data.data[i]);
                  obj.push(res.data.data[i].dwmc);
                }
              }
            }
            that.xxdwData = result;
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "点位查询失败!"
          });
        });
    }
  }
};
</script>

