<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="SmokyCarManagement" :model="SmokyCarManagement" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-star;">
            <el-form-item label="点位名称：">
              <el-select
                v-model="SmokyCarManagement.number"
                style="width:150px"
                placeholder="选择点位名称"
                @keyup.enter.native="axiosGetData(1)"
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
          <el-col :span="12" style="display:flex;justify-content: flex-start;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="SmokyCarManagement.startTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 结束时间：">
              <el-date-picker
                v-model="SmokyCarManagement.endTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
            <el-button type="primary" @click="resetData">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;position:relative;height:calc(100% - 114px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData3"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column fixed prop="jlbh" label="记录编号" align="center"></el-table-column>
          <el-table-column prop="dwmc" label="点位名称" align="center"></el-table-column>
          <el-table-column prop="cdxh" label="车道序号" align="center"></el-table-column>
          <el-table-column prop="jcrq" label="检查日期" align="center" width="150px;"></el-table-column>
          <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="cpys" label="车牌颜色" align="center"></el-table-column>
          <el-table-column prop="sbzxd" label="识别置信度" align="center"></el-table-column>
          <el-table-column prop="sfhbc" label="是否违反黄标限行" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.sfhbc == 0 ? '#909399' : 'red'}"
              >{{scope.row.sfhbc==1 ? "是" : "否"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="sfxx" label="是否违反单双号限行" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.sfxx == 0 ? '#909399' : 'red'}"
              >{{scope.row.sfxx==1 ? "是" : "否"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="tp1" label="车牌图片" align="center">
            <template slot-scope="scope">
              <el-button
                @click="pictureFun(scope.row,'image/car.png')"
                type="text"
                size="small"
              >查看图片</el-button>
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
      <picture-big ref="pictureDOM" :pictureData="pictureData"></picture-big>
    </div>
  </div>
</template>

<script>
import pictureBig from "../common/pictureBig.vue";
export default {
  name: "JointControl",
  components: {
    pictureBig
  },
  data() {
    return {
      SmokyCarManagement: {
        number: "",
        startTime: "",
        endTime: ""
      },
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "联合布控",
      tableData3: [],
      xxdwData: [],
      pictureData: {
        url: ""
      }
    };
  },
  mounted() {
    this.axiosGetData();
    this.dwcxfun();
  },
  methods: {
    /**
     * @description 当前页显示数据条数
     * @author lifei
     * @version 2019.6.04
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
     * @version 2019.6.04
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 初始化、搜索数据展示
     * @author lifei
     * @version 2019.6.04
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
      obj.type = 3;
      obj.dwmc = this.SmokyCarManagement.number;
      if (
        this.SmokyCarManagement.startTime == "" ||
        this.SmokyCarManagement.startTime == null ||
        this.SmokyCarManagement.startTime == "null"
      ) {
        obj.startTime = "";
      } else {
        obj.startTime = this.SmokyCarManagement.startTime + " 00:00:00";
      }

      if (
        this.SmokyCarManagement.endTime == "" ||
        this.SmokyCarManagement.endTime == null ||
        this.SmokyCarManagement.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.SmokyCarManagement.endTime + "24:59:59";
      }
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/remoteSensing/findJudgeWithPage",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: {
          siderbar: "单双号限行",
          pageSize: this.pageSize,
          pageNum: this.currentPage4
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.list) {
            that.tableData3 = res.data.data.list;
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
     * @version 2019.6.04
     */
    resetData() {
      let keys_ = Object.keys(this.SmokyCarManagement);
      for (let i = 0; i < keys_.length; i++) {
        this.SmokyCarManagement[keys_[i]] = "";
      }
    },
    /**
     * @description 时间校验
     * @author lifei
     * @version 2019.6.04
     */
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.SmokyCarManagement.endTime == "" ||
              this.SmokyCarManagement.endTime == "null" ||
              this.SmokyCarManagement.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.SmokyCarManagement.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.SmokyCarManagement.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.SmokyCarManagement.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.SmokyCarManagement.startTime == "" ||
              this.SmokyCarManagement.startTime == "null" ||
              this.SmokyCarManagement.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.SmokyCarManagement.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.SmokyCarManagement.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.SmokyCarManagement.endTime = "";
            }
          }
          break;
      }
    },
    /**
     * @description 点位查询
     * @author lifei
     * @version 2019.6.04
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
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "点位查询失败!"
          });
        });
    },
    /**
     * @description 图片查看
     * @author lifei
     * @version 2019.6.04
     */
    pictureFun(rowData, url) {
      this.pictureData.url = rowData.tp1.split(",");
      this.$refs.pictureDOM.handleClose();
    }
  }
};
</script>

<style scoped>
.button-div {
  display: flex;
  justify-content: center;
}
</style>
