<template>
  <div class="content_box" style="width:100%;height:100%">
    <!-- <img src="../../../assets/img/处罚过程跟踪.png"> -->
    <div class="chare_box" style="height:auto;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="FormVehicleAttributionAnalysis"
        :model="FormVehicleAttributionAnalysis"
        :inline="true"
      >
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="车牌号码:">
              <el-input
                @keyup.enter.native="axiosGetData(1)"
                v-model="FormVehicleAttributionAnalysis.site"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="车牌颜色:">
              <el-select
                @keyup.enter.native="axiosGetData(1)"
                v-model="FormVehicleAttributionAnalysis.hpys"
                placeholder="选择车牌颜色"
              >
                <el-option
                  v-for="item in $store.state.enumSelection['hpys']"
                  :key="item.index"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="整改状态:">
              <el-select
                v-model="FormVehicleAttributionAnalysis.state"
                @keyup.enter.native="axiosGetData(1)"
              >
                <el-option
                  v-for="item in $store.state.enumSelection['zgzt']"
                  :key="item.value"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="处罚类型:">
              <el-select v-model="FormVehicleAttributionAnalysis.punishment">
                <el-option
                  v-for="item in cflxData"
                  :key="item.value"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="6" style="display:flex;justify-content: center;">
            <div class="button_box">
              <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
              <el-button type="primary" @click="repeatData">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 114px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 10px);overflow: auto">
        <el-table :data="tableList" height="calc(100% - 20px)" border>
          <el-table-column label="检测流水号" prop="jclsh" align="center"></el-table-column>
          <el-table-column label="业务种类" prop="ywzl" align="center" width="140px"></el-table-column>
          <el-table-column label="审批时间" prop="spsj" align="center" width="140px"></el-table-column>
          <el-table-column label="车牌号码" prop="hphm" align="center" width="140px"></el-table-column>
          <el-table-column label="车牌颜色" prop="hpys" align="center" width="140px">
            <template scope="scope">{{$store.state.enumData.hpys[scope.row.hpys]}}</template>
          </el-table-column>
          <el-table-column label="整改截止日期" prop="zgjzrq" align="center"></el-table-column>
          <el-table-column label="检测完成时间" prop="jcwcsj" align="center"></el-table-column>
          <el-table-column label="检测结果" prop="jcjg" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.jcjg == 1 ? '#909399' : 'red'}"
              >{{$store.state.enumData.jcjg[scope.row.jcjg]}}</a>
            </template>
          </el-table-column>
          <el-table-column label="有效截止日期" prop="yxjzrq" align="center"></el-table-column>
          <el-table-column label="整改状态" prop="zgzt" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData.zgzt[scope.row.zgzt]}}</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10,20,30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="position: absolute; bottom:10px;right: 20px;"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PenaltyProcessTracking",

  data() {
    return {
      FormVehicleAttributionAnalysis: {
        site: "",
        state: "",
        hpys: "",
        punishment: ""
      },
      tableList: [],
      sidebar: "处罚过程跟踪",
      currentPage4: 1,
      total: 10,
      pageSize: 10,
      title: "",
      zgztData: [],
      jcjgData: [],
      zgztObj: {},
      jcjgObj: {}
    };
  },
  mounted() {
    console.log(this.$store.state.enumData.hpys);
    this.axiosGetData();
    //this.carCalorfun("ZGZT");
    //this.carCalorfun("JCJG");
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
     * @description 初始化、搜索数据展示
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData(num) {
      if (num == 1) {
        this.currentPage4 = 1;
      }
      const loadingObj = this.$loading({
        lock: true,
        text: "查询中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });

      let that = this;
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/remoteSensingTrack/getRemoteTrack",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          hphm: this.FormVehicleAttributionAnalysis.site,
          hpys: this.FormVehicleAttributionAnalysis.hpys,
          zgzt: this.FormVehicleAttributionAnalysis.state,
          cflx: this.FormVehicleAttributionAnalysis.punishment
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.data) {
            that.tableList = res.data.data.data;
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
     * @version 2019.5.28
     */
    repeatData() {
      let keyArraw = Object.keys(this.FormVehicleAttributionAnalysis);
      for (let i = 0; i < keyArraw.length; i++) {
        this.FormVehicleAttributionAnalysis[keyArraw[i]] = "";
      }
    }
    /*carCalorfun(type) {
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
            if (type === "ZGZT") {
              that.zgztData = res.data.data;
              let obj = {};
              for (let i = 0; i < that.zgztData.length; i++) {
                obj[that.zgztData[i].sz] = that.zgztData[i].xmnr;
              }
              that.zgztObj = obj;
            } else {
              that.jcjgData = res.data.data;
              let obj = {};
              for (let i = 0; i < that.jcjgData.length; i++) {
                obj[that.jcjgData[i].sz] = that.jcjgData[i].xmnr;
              }
              that.jcjgObj = obj;
              console.log(res.data.data);
            }
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    }*/
  }
};
</script>
