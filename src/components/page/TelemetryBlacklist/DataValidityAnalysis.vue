<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="formExhaustTelemetryManagement"
        :model="formExhaustTelemetryManagement"
        :inline="true"
      >
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="车牌号码：">
              <el-input
                v-model="formExhaustTelemetryManagement.site"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
                onkeyup="value=value.replace(/[!@#$%^&*()_+,./]/g,'') "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="是否有效：">
              <el-select
                v-model="formExhaustTelemetryManagement.type"
                @keyup.enter.native="axiosGetData(1)"
                placeholder="选择是否有效"
                style="width:150px"
              >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-start;">
            <el-form-item label="检查日期起：" style="margin-right:15px">
              <el-date-picker
                v-model="formExhaustTelemetryManagement.startTime"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
                value-format="yyyy-MM-dd"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 检查日期止：">
              <el-date-picker
                v-model="formExhaustTelemetryManagement.endTime"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
                value-format="yyyy-MM-dd"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
      <el-button type="primary" @click="resetData">重置</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 195px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="formExhaustTelemetryManagementTable"
          border
          style="margin-top:20px;"
          height="calc(100% - 20px)"
        >
          <el-table-column prop="jlbh" label="记录编号" align="center"></el-table-column>
          <el-table-column prop="ycxbh" label="遥测线编号" align="center"></el-table-column>
          <el-table-column prop="cdxh" label="车道序号" align="center"></el-table-column>
          <el-table-column prop="jcrq" label="检查日期" align="center" width="150px"></el-table-column>
          <el-table-column prop="hphm" label="车牌号码" align="center" width="120px"></el-table-column>
          <el-table-column prop="cpys" label="车牌颜色" align="center"></el-table-column>
          <!--<el-table-column prop="clsd" label="车辆速度(m/s)" align="center"></el-table-column>
          <el-table-column prop="cljsd" align="center" label="车辆加速度(m/s2)"></el-table-column>
          <el-table-column prop="fs" label="风速(m/s)" align="center"></el-table-column>
          <el-table-column prop="fx" label="风向(0)" align="center"></el-table-column>
          <el-table-column prop="hjwd" label="气温(0C)" align="center"></el-table-column>
          <el-table-column prop="sd" label="湿度(%)" align="center">
            <template scope="scope">
              <a :style="{color:scope.row.sd>85 ? 'red' : '#909399'}">{{scope.row.sd}}</a>
            </template>
          </el-table-column>-->
          <!--<el-table-column prop="dqy" label="气压(hPa)" align="center"></el-table-column>
          <el-table-column prop="dwzt" label="点位状态" align="center"></el-table-column>
          <el-table-column prop="vsp" label="VSP" align="center"></el-table-column>-->
          <el-table-column prop="sbzjjg" label="设备自检结果" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.sbzjjg ==0 ? 'red' : '#909399'}"
              >{{scope.row.sbzjjg ==0 ? "不通过" : "通过"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="clzjhjsj" label="车辆最近环检时间" align="center"></el-table-column>
          <el-table-column prop="pdjg" label="检测结果" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.pdjg ==0 ? 'red' : '#909399'}"
              >{{scope.row.pdjg ==0 ? "不通过" : "通过"}}</a>
            </template>
          </el-table-column>
          <!--<el-table-column prop="co2jg" label="CO2" align="center"></el-table-column>
          <el-table-column prop="cojg" label="CO" align="center"></el-table-column>
          <el-table-column prop="nojg" label="NO" align="center"></el-table-column>
          <el-table-column prop="hcjg" label="HC" align="center"></el-table-column>
          <el-table-column prop="btgdjg" label="不透光度结果(%)" align="center">
           
          </el-table-column>-->
          <el-table-column prop="lgmhd" label="林格曼黑度(级)" align="center"></el-table-column>
          <el-table-column prop="sxyx" label="失效原因" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData.sxyy[scope.row.sxyy]}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="sfyx" label="是否有效" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.sfyx ==0 ? 'red' : '#909399'}"
              >{{scope.row.sfyx ==1 ? "是" : "否"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="sfyx" label="是否启用" align="center">
            <template scope="scope">
              <el-button
                @click="isTrueOrFalse(scope.row)"
                class="point-hand"
                type="text"
                size="small"
              >是否有效</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                class="point-hand"
                type="text"
                size="small"
              >显示详情</el-button>
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
    <information-much :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information-much>
    <form-validity :title="title" ref="formValidityDom" :rowId="rowId"></form-validity>
  </div>
</template>

<script>
import informationMuch from "../../common/informationMuch.vue";
import formValidity from "../../common/formValidity.vue";
export default {
  name: "DataValidityAnalysis",
  components: {
    informationMuch,
    formValidity
  },
  data() {
    return {
      sidebar: "数据有效性分析",
      currentPage4: 1,
      total: 10,
      pageSize: 10,
      title: "",
      diaSta: false,
      updataData: [],
      formExhaustTelemetryManagement: {
        site: "",
        type: "",
        startTime: "",
        endTime: ""
      },
      formExhaustTelemetryManagementTable: [],
      table_yc: {
        fs: "风速(m/s)",
        fx: "风向",
        hjwd: "气温(℃)",
        sd: "湿度(%)",
        dqy: "气压(kPa)",
        co2jg: "CO2(%)",
        cojg: "CO(%)",
        nojg: "NO(ppm)",
        hcjg: "HC(ppm)",
        vsp: "VSP(kw/t)",
        jlbh: "记录编号",
        sxyy: "失效原因",
        dwmc: "点位名称",
        ycxbh: "遥测线编号",
        cdxh: "车道序号",
        jcrq: "检查日期",
        hphm: "车牌号码",
        cpys: "车牌颜色",
        clsd: "车辆速度(m/s)",
        pdjg: "检测结果",
        sfyx: "是否有效",
        dwzt: "点位状态",
        cljsd: "车辆加速度(m/s²)",
        lgmhd: "林格曼黑度(级)",
        sbzjjg: "设备自检结果",
        clzjhjsj: "车辆最近环检时间",

        btgdjg: "不透光度结果(%)"
      },
      rowId: ""
    };
  },
  mounted() {
    this.axiosGetData();
    //console.log(this.$store.state.enumData)
  },
  methods: {
    /**
     * @description 每页显示数据条数
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
     * @description 跳转分页
     * @author lifei
     * @version 2019.5.28
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 初始化，搜索数据
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
      let obj = {};
      obj.hphm = this.formExhaustTelemetryManagement.site;
      obj.sfyx = this.formExhaustTelemetryManagement.type;
      if (
        this.formExhaustTelemetryManagement.startTime == "null" ||
        this.formExhaustTelemetryManagement.startTime == "" ||
        this.formExhaustTelemetryManagement.startTime == null
      ) {
        obj.startTime = "";
      } else {
        obj.startTime =
          this.formExhaustTelemetryManagement.startTime + " 00:00:00";
      }

      if (
        this.formExhaustTelemetryManagement.endTime == null ||
        this.formExhaustTelemetryManagement.endTime == "" ||
        this.formExhaustTelemetryManagement.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.formExhaustTelemetryManagement.endTime + " 24:59:59";
      }

      this.$axios({
        method: "post",
        url: "/serveApi/hbj/remoteSensing/findEffectiveWithPage",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: {
          siderbar: "数据有效性分析",
          pageSize: this.pageSize,
          pageNum: this.currentPage4
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.list) {
            that.formExhaustTelemetryManagementTable = res.data.data.list;
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
     * @description 关闭详情
     * @author lifei
     * @version 2019.5.28
     */
    close() {
      this.diaSta = !this.diaSta;
    },
    /**
     * @description 详情显示
     * @author lifei
     * @version 2019.5.28
     */
    handleClick(row) {
      console.log(this.$store.state.enumData["dwzt"]["1"]);
      this.diaSta = true;
      let keys_ = Object.keys(this.table_yc);
      let arr = [];
      let that = this;
      keys_.forEach(function(item, index) {
        let obj = {};
        obj.key = that.table_yc[item];
        if (item == "pdjg" || item == "sbzjjg") {
          obj.values = row[item] == "1" ? "通过" : "不通过";
        } else if (item == "sfyx") {
          obj.values = row[item] == "1" ? "是" : "否";
        } else if (item == "dwzt") {
          obj.values = that.$store.state.enumData["dwzt"][row[item]];
        } else {
          obj.values = row[item];
        }

        arr.push(obj);
      });
      this.title = "数据详情";
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
     * @description 重置
     * @author lifei
     * @version 2019.5.28
     */
    resetData() {
      let keys_ = Object.keys(this.formExhaustTelemetryManagement);
      for (let i = 0; i < keys_.length; i++) {
        this.formExhaustTelemetryManagement[keys_[i]] = "";
      }
    },
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
              this.formExhaustTelemetryManagement.endTime == "" ||
              this.formExhaustTelemetryManagement.endTime == "null" ||
              this.formExhaustTelemetryManagement.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formExhaustTelemetryManagement.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formExhaustTelemetryManagement.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "起始时间不能大于结束时间!"
              });
              this.formExhaustTelemetryManagement.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.formExhaustTelemetryManagement.startTime == "" ||
              this.formExhaustTelemetryManagement.startTime == "null" ||
              this.formExhaustTelemetryManagement.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formExhaustTelemetryManagement.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formExhaustTelemetryManagement.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "结束时间不能小于起始时间!"
              });
              this.formExhaustTelemetryManagement.endTime = "";
            }
          }
          break;
      }
    },
    /**
     * @description 是否有效调用接口
     * @author lifei
     * @version 2019.5.28
     * @param {rowData} 当前行数据
     */
    isTrueOrFalse(rowData) {
      this.rowId = rowData.id;
      if (rowData.sfyx == 0) {
        let obj = {
          id: rowData.id,
          sfyx: 1,
          sxyy: 99
        };
        this.$confirm("此操作将会启动数据状态为有效, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axiosTrueFalseFun(obj);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.$refs.formValidityDom.handleClose();
        //this.$refs.formValidityDom.handleClose();
      }
    },
    /**
     * @description 是否有效请求接口
     * @author lifei
     * @version 2019.5.28
     * @param {formData} 传给后台的值
     */
    axiosTrueFalseFun(formData) {
      let that = this;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/remoteSensing/updateJudge",
        headers: {
          "Content-Type": "application/json"
        },
        data: formData
      })
        .then(function(res) {
          //console.log(res);
          that.$message({
            type: "success",
            message: "是否有效启用成功!"
          });
          that.axiosGetData();
          that.$refs.formValidityDom.handleCloseMust();
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "是否有效启用失败!"
          });
        });
    }
  }
};
</script>
<style scoped>
.button-div {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.point-hand {
  cursor: pointer;
}
</style>