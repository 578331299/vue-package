<template>
  <div class="content_box" style="width:100%;height:100%">
    <!-- <img src="../../assets/img/车辆专题数据库.jpg"> -->
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="车牌号码">
              <el-input v-model="formTrafficFlowAnalysis.number" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="车牌颜色">
              <el-select
                v-model="formTrafficFlowAnalysis.color"
                placeholder="选择燃料种类"
                style="width:150px"
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
          <el-col :span="6" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="燃料种类">
              <el-select
                v-model="formTrafficFlowAnalysis.fuel"
                placeholder="选择燃料种类"
                style="width:150px"
              >
                <el-option
                  v-for="item in $store.state.enumSelection['rlzl']"
                  :key="item.index"
                  :label="item.xmnr"
                  :value="item.sz"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="display:flex;justify-content: center;align-item:center">
            <el-button type="primary" @click="axiosGetData">查询</el-button>
            <el-button type="primary" @click="repeatData">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 114px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table border style="width:100%" height="calc(100% - 0px)" :data="tableList">
          <el-table-column prop="xzqhdm" label="行政区划代码" align="center" width="110px"></el-table-column>
          <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="cpys" label="车牌颜色" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData.hpys[scope.row.cpys]}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="hpzl" label="车牌种类" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData.hpzl[scope.row.hpzl]}}</a>
            </template>
          </el-table-column>
          <!--<el-table-column prop="cllx" label="车辆类型" align="center"></el-table-column>-->
          <!--<el-table-column prop="scqy" label="生产企业" align="center"></el-table-column>-->
          <el-table-column prop="rlzl" label="燃料种类" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData.rlzl[scope.row.rlzl]}}</a>
            </template>
          </el-table-column>
          <!--<el-table-column prop="clsyxz" label="车辆使用性质" align="center" width="110px"></el-table-column>-->
          <el-table-column prop="ccdjrq" label="初次登记日期" align="center" width="130px"></el-table-column>
          <!--<el-table-column prop="clsbdh" label="车辆识别代号" align="center" width="130px"></el-table-column>-->
          <el-table-column prop="pfjd" label="排放标准阶段" align="center" width="130px">
            <template scope="scope">
              <a>{{$store.state.enumData.pfjd[scope.row.pfjd]}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="schbdqjyrq" label="上次环保定期检验日期" align="center" width="150px"></el-table-column>
          <el-table-column prop="schbdqjyjg" label="上次环保定期检验机构" align="center" width="150px"></el-table-column>
          <!--<el-table-column prop="czmc" label="车主姓名/单位" align="center" width="120px"></el-table-column>
          <el-table-column prop="sjhm" label="手机号码" align="center" width="100px"></el-table-column>-->
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <!--<el-button type="text" size="small">编辑</el-button>-->
              <el-button @click="handleClick(scope.row)" type="text" size="small">显示详情</el-button>
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
    <information-much :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information-much>
  </div>
</template>
<script>
import informationMuch from "../common/informationMuch.vue";
export default {
  name: "VehicleDataLibrary",
  components: {
    informationMuch
  },
  data() {
    return {
      formTrafficFlowAnalysis: {
        number: "",
        color: "",
        fuel: ""
      },
      rlzlData: [],
      rlzlObj: {},
      cpysData: [],
      cpysObj: {},
      hpzlObj: {},
      pfjdObj: {},
      tableList: [],
      sidebar: "车辆数据专题库",
      currentPage4: 1,
      total: 10,
      pageSize: 10,
      title: "",
      diaSta: false,
      updataData: [],
      table_yc: {
        hphm: "车牌号码",
        cpys: "车牌颜色",
        hpzl: "车牌种类",
        cllxdh: "车辆类型",
        scqy: "生产企业",
        rlzl: "燃料种类",
        sjhm: "手机号码",
        clsyxz: "车辆使用性质",
        xzqhdm: "行政区划代码",
        ccdjrq: "初次登记日期",
        pfjd: "排放标准阶段",
        schbdqjyrq: "上次环保定期检验日期",
        schbdqjyjg: "上次环保定期检验机构",
        czmc: "车主姓名/单位"
      }
    };
  },
  mounted() {
    this.axiosGetData();
    /*this.carCalorfun("HPYS");
    this.carCalorfun("RLZL");
    this.carCalorfun("HPZL");
    this.carCalorfun("PFJD");*/
  },
  methods: {
    /**
     * @description 设置每页显示数据条数
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
     * @description 搜索与初始化数据显示
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData() {
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
        url: "/serveApi/hbj/ygCar/getYgCars",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          hphm: this.formTrafficFlowAnalysis.number,
          cpys: this.formTrafficFlowAnalysis.color,
          rlzl: this.formTrafficFlowAnalysis.fuel
        }
      })
        .then(function(res) {
          loadingObj.close();
          //console.log(res);
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
     * @description 查看详情
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
        if (item == "hpzl") {
          obj.values = that.$store.state.enumData["hpzl"][row[item]];
        } else if (item == "rlzl") {
          obj.values = that.$store.state.enumData["rlzl"][row[item]];
        } else if (item == "pfjd") {
          obj.values = that.$store.state.enumData["pfjd"][row[item]];
        } else if (item == "cllxdh") {
          obj.values = that.$store.state.enumData["cllx"][row[item]];
        } else if (item == "cpys") {
          obj.values = that.$store.state.enumData["hpys"][row[item]];
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
    repeatData() {
      let keyArraw = Object.keys(this.formTrafficFlowAnalysis);
      for (let i = 0; i < keyArraw.length; i++) {
        this.formTrafficFlowAnalysis[keyArraw[i]] = "";
      }
    },
    /**
     * @description 关闭详情
     * @author lifei
     * @version 2019.5.28
     */
    close() {
      this.diaSta = !this.diaSta;
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
          //console.log(res.data.data);
          if (res.data) {
            if (type === "HPYS") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.cpysObj = obj;
              that.cpysData = res.data.data;
            } else if (type === "RLZL") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.rlzlObj = obj;
              that.rlzlData = res.data.data;
            } else if (type === "HPZL") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.hpzlObj = obj;
            } else if (type === "PFJD") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.pfjdObj = obj;
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
<style scoped>
</style>
