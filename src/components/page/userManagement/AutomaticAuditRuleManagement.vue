<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="限行点位组合">
              <el-select
                v-model="formTrafficFlowAnalysis.xxdw"
                multiple
                placeholder="选择点位组合"
                @keyup.enter.native="axiosGetData(1)"
                class="widCom"
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
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="车牌颜色组合">
              <el-select
                v-model="formTrafficFlowAnalysis.hpys"
                multiple
                placeholder="选择车牌颜色组合"
                @keyup.enter.native="axiosGetData(1)"
                class="widCom"
              >
                <el-option
                  v-for="item in this.$store.state.enumSelection['hpys']"
                  :key="item.id"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="车牌类型组合">
              <el-select
                v-model="formTrafficFlowAnalysis.hplx"
                multiple
                placeholder="选择车牌类型组合"
                @keyup.enter.native="axiosGetData(1)"
                class="widCom"
              >
                <el-option
                  v-for="item in this.$store.state.enumSelection['hpzl']"
                  :key="item.id"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="车辆类型组合">
              <el-select
                v-model="formTrafficFlowAnalysis.cllx"
                multiple
                placeholder="选择车辆类型组合"
                @keyup.enter.native="axiosGetData(1)"
                class="widCom"
              >
                <el-option
                  v-for="item in this.$store.state.enumSelection['cllx']"
                  :key="item.id"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="燃料类型组合">
              <el-select
                v-model="formTrafficFlowAnalysis.rllx"
                multiple
                placeholder="选择燃料类型组合"
                @keyup.enter.native="axiosGetData(1)"
                class="widCom"
              >
                <el-option
                  v-for="item in this.$store.state.enumSelection['rlzl']"
                  :key="item.id"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="排放阶段组合">
              <el-select
                v-model="formTrafficFlowAnalysis.pfjd"
                multiple
                placeholder="选择排放阶段组合"
                @keyup.enter.native="axiosGetData(1)"
                class="widCom"
              >
                <el-option
                  v-for="item in this.$store.state.enumSelection['pfjd']"
                  :key="item.id"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="起始检测时间">
              <el-time-select
                style="width:197px"
                v-model="formTrafficFlowAnalysis.startTime"
                :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '24:00'
                        }"
                value-format="hh:ss"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
              ></el-time-select>
            </el-form-item>
            <el-form-item label="结束检测时间">
              <el-time-select
                style="width:197px"
                v-model="formTrafficFlowAnalysis.endTime"
                :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '24:00'
                        }"
                value-format="hh:ss"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;align-item:center"></el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
      <el-button type="primary" @click="resetData">重置</el-button>
      <el-button type="primary" @click="add(null)">新建自动审核规则</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 350px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          height="calc(100% - 20px)"
          border
          style="width: 100%;margin-top:20px;"
        >
          <el-table-column prop="zdshgzmc" label="自动审核规则名称" align="center"></el-table-column>
          <el-table-column prop="qsjcsj" label="起始检测时间" align="center"></el-table-column>
          <el-table-column prop="jzjcsj" label="结束检测时间" align="center"></el-table-column>
          <el-table-column prop="dwbh" label="限行点位" align="center"></el-table-column>
          <el-table-column prop="hpzlmc" label="车牌类型" align="center"></el-table-column>
          <el-table-column prop="hpysmc" label="车牌颜色" align="center"></el-table-column>
          <el-table-column prop="cllxmc" label="车辆类型" align="center"></el-table-column>
          <el-table-column prop="rllxmc" label="燃料类型" align="center"></el-table-column>
          <el-table-column prop="pfjdmc" label="排放阶段" align="center"></el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column prop="cjsj" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="cjr" label="创建人" align="center"></el-table-column>
          <el-table-column prop="zjqysj" label="最近启用时间" align="center"></el-table-column>
          <el-table-column prop="sfqy" label="状态" align="center">
            <template slot-scope="scope">
              <span
                :style="{color:scope.row.sfqy == 1 ? '#909399' : 'red'}"
              >{{scope.row.sfqy == 0? '未启用':'启用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="useOrNot(scope.row)"
                style="padding-left:10px;"
              >启用</el-button>
              <el-button type="text" @click="add(scope.row)" size="small">修改</el-button>
              <el-button type="text" @click="delateRow(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
    <form-data-automatic
      :title="title"
      :sidebar="sidebar"
      :formDataAutomaticType="formDataAutomaticType"
      :rowData="rowData"
      ref="formDataAutomaticDom"
    ></form-data-automatic>
    <!--formDataAutomatic <img src="../../../assets/img/环检数据查询.jpg"> -->
  </div>
</template>


<script>
import formDataAutomatic from "../../common/formDataAutomatic.vue";
export default {
  name: "AutomaticAuditRuleManagement",
  components: { formDataAutomatic },
  data() {
    return {
      formDataAutomaticType: "add",
      formTrafficFlowAnalysis: {
        xxdw: [],
        hpys: [],
        hplx: [],
        cllx: [],
        rllx: [],
        pfjd: [],
        startTime: "",
        endTime: ""
      },
      tableData: [],
      xxdwData: [],
      title: "",
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "自动审核规则",
      rowData: {}
    };
  },

  created() {},
  mounted() {
    //this.axiosGetData();
    //console.log(this.$store.state.enumSelection);
    this.dwcxfun();
    this.axiosGetData();
  },
  methods: {
    /**
     * @description 分页控制每页数据条数
     * @author lifei
     * @version 2019.6.03
     * @param {val} val 每页传入的条数（10,20，30）
     */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 分页显示第几页数据
     * @author lifei
     * @version 2019.6.03
     * @param {val} val 页签编号
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 页面显示的数据请求
     * @author lifei
     * @version 2019.6.03
     * @param {num} num 页签编号
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
      let obj = {
        pageNum: that.currentPage4,
        pageSize: that.pageSize,
        starTime: that.formTrafficFlowAnalysis.startTime,
        endTime: that.formTrafficFlowAnalysis.endTime,

        dwbh: that.formTrafficFlowAnalysis.xxdw.join(),
        hpzl: that.formTrafficFlowAnalysis.hplx.join(),
        rllx: that.formTrafficFlowAnalysis.rllx.join(),
        hpys: that.formTrafficFlowAnalysis.hpys.join(),
        cllx: that.formTrafficFlowAnalysis.cllx.join(),
        pfjd: that.formTrafficFlowAnalysis.pfjd.join()
      };
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/automaticVerify/findVerifyByPage",
        data: obj
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.list) {
            that.tableData = res.data.data.list;
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
     * @description 重置
     * @author lifei
     * @version 2019.6.03
     */
    resetData() {
      let keys_ = Object.keys(this.formTrafficFlowAnalysis);
      for (let i = 0; i < keys_.length; i++) {
        if (keys_[i] == "startTime" || keys_[i] == "endTime") {
          this.formTrafficFlowAnalysis[keys_[i]] = "";
        } else {
          this.formTrafficFlowAnalysis[keys_[i]] = [];
        }
      }
    },
    /**
     * @description 开始结束时间校验函数
     * @author lifei
     * @version 2019.6.03
     */
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
            let timeBegin = parseInt(
              this.formTrafficFlowAnalysis.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formTrafficFlowAnalysis.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "起始时间不能大于结束时间!"
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
            let timeBegin = parseInt(
              this.formTrafficFlowAnalysis.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formTrafficFlowAnalysis.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "结束时间不能小于起始时间!"
              });
              this.formTrafficFlowAnalysis.endTime = "";
            }
          }
          break;
      }
    },
    /**
     * @description 点位查询
     * @author lifei
     * @version 2019.6.03
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
          //console.log(res.data.data);
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
            that.xxdwData = result;
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "点位查询失败!"
          });
        });
    },
    /**
     * @description 添加和修改自动审核
     * @author lifei
     * @version 2019.5.28
     */
    add(rowData) {
      //this.rowData = rowData;
      if (rowData == null) {
        this.formDataAutomaticType = "add";
      } else {
        this.formDataAutomaticType = "change";
      }
      this.$refs.formDataAutomaticDom.handleClose(rowData);
    },
    /**
     * @description 添加和修改自动审核
     * @author lifei
     * @version 2019.5.28
     */
    delateRow(rowData) {
      let that = this;
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url:
              "/serveApi/hbj/automaticVerify/deleteModify?sidebar=" +
              that.sidebar,
            data: { id: rowData.id }
          })
            .then(function(res) {
              that.axiosGetData();
              that.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(function(err) {
              that.$message({
                type: "warning",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * @description 启用
     * @author lifei
     * @version 2019.5.28
     */
    useOrNot(rowData) {
      let that = this;

      this.$confirm("此操作将启用此审核规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/serveApi/hbj/automaticVerify/open?sidebar=" + that.sidebar,
            data: { id: rowData.id }
          })
            .then(function(res) {
              that.axiosGetData();
              that.$message({
                type: "success",
                message: "启用成功!"
              });
            })
            .catch(function(err) {
              that.$message({
                type: "warning",
                message: "启用失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style scoped>
.user-content-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
}
.label-div {
  margin-right: 5px;
}
.button-div {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.widCom {
  width: 500px;
  height: 32px;
  overflow: auto;
}
</style>

