<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="SmokyCarManagement" :model="SmokyCarManagement" :inline="true">
        <el-row>
          <!-- <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="点位名称：">
              <el-input v-model="SmokyCarManagement.dwmc" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="遥感线名称：">
              <el-input v-model="SmokyCarManagement.ygxmc" style="width:150px"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="检查单位：">
              <el-input
                v-model="SmokyCarManagement.jcdw"
                style="width:150px"
                @keyup.enter.native="showAll"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="检查人员：">
              <el-input
                v-model="SmokyCarManagement.jcry"
                style="width:150px"
                @keyup.enter.native="showAll"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                @keyup.enter.native="showAll"
                @change="timeCheck('startTime')"
                v-model="SmokyCarManagement.startTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label=" - 结束时间：">
              <el-date-picker
                @keyup.enter.native="showAll"
                @change="timeCheck('endTime')"
                v-model="SmokyCarManagement.endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="检查类型：">
              <el-select
                v-model="SmokyCarManagement.jclx"
                placeholder="检测类型"
                style="width:150px"
                @keyup.enter.native="showAll"
              >
                <template v-for="item in JCLX">
                  <el-option :label="item.xmnr" :value="item.sz"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="是否通过:">
              <el-select
                v-model="SmokyCarManagement.sftg"
                placeholder="是否通过"
                style="width:150px"
                @keyup.enter.native="showAll"
              >
                <template v-for="item in SFTG">
                  <el-option :label="item.xmnr" :value="item.sz"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button-div" style="text-align: center;">
      <el-button type="primary" @click="showAll">查询</el-button>
      <el-button type="primary" @click="resetData">重置</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 250px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tablePoint"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
        >
          <el-table-column prop="dwbh" label="点位编号" align="center"></el-table-column>
          <el-table-column prop="ycxbh" label="遥测线编号" align="center"></el-table-column>
          <el-table-column prop="jclx" label="检查类型" align="center">
            <template scope="scope">
              <a>{{scope.row.jclx.toString()=="1"?"静态":"动态"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="jckssj" label="检查开始时间" align="center"></el-table-column>
          <el-table-column prop="sftg" label="是否通过" align="center">
            <template scope="scope">
              <a>{{scope.row.sftg.toString()=="1"?"通过":"未通过"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column prop="jcdw" label="检查单位" align="center"></el-table-column>
          <el-table-column prop="jcry" label="检查人员" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showInformation(scope.row)">详细信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-sizes="[10, 20, 30]"
        :page-size="zjPage.pageSize"
        :current-page="zjPage.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="zjPage.total"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
    <information :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information>
  </div>
</template>


<script>
import information from "../../common/informationMuch.vue";
export default {
  components: {
    information
  },
  name: "RoadInspectionPunishmentManagement",
  methods: {
    showAll() { 
      this.zjPage.pageNum = 1;
      this.showTable();
    },
    /**
     * @description 日期选择器阻拦
     * @author B51733
     * @version 2019.5.27
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
            let timeBegin = this.SmokyCarManagement.startTime.toString();
            let timeEnd = this.SmokyCarManagement.endTime.toString();

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
            let timeBegin = this.SmokyCarManagement.startTime.toString();
            let timeEnd = this.SmokyCarManagement.endTime.toString();

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
    resetData() {
      for (let i in this.SmokyCarManagement) {
        this.SmokyCarManagement[i] = "";
      }
    },
    close() {
      this.diaSta = false;
    },
    /**
     * @description 显示详情
     * @params row 当前行数据
     * @author B51733
     * @version 2019.5.27
     */
    showInformation(row) {
      let that = this;
      row.sftg.toString() == "0" ? "未通过" : "通过";
      if (Number(row.jclx) == 1) {
        this.$axios
          .get("/serveApi/hbj/deviceStaticCheckData/getOne", {
            params: { jcjlbh: row.jcjlbh, sidebar: "点位检查跟踪" }
          })
          .then(function(data) {
            that.diaSta = true;
            let row = data.data.data;
            console.log(that.$store.state.enumData)
            row.bqlb=that.$store.state.enumData.bqlb[row.bqlb]
            let keys_ = Object.keys(that.table_jz);
            let arr = [];
            keys_.forEach(function(item, index) {
              let obj = {};
              obj.key = that.table_jz[item];
              obj.values = row[item];
              arr.push(obj);
            });
            let arrTwo = [];
            let arrlittle = [];
            for (let i = 0; i < arr.length; i++) {
              arrlittle.push(arr[i]);
              if (arrlittle.length == 2 && i < arr.length - 1) {
                arrTwo.push(arrlittle);
                arrlittle = [];
              }
              if (i == arr.length - 1) {
                arrTwo.push(arrlittle);
                arrlittle = [];
              }
            }
            that.title = "遥测设备检查";
            that.updataData = arrTwo;
          });
      } else if (Number(row.jclx) == 2) {
        this.$axios
          .get("/serveApi/hbj/deviceDynamicCheckData/getOne", {
            params: { jcjlbh: row.jcjlbh, sidebar: "点位检查跟踪" }
          })
          .then(function(data) {
            that.diaSta = true;
            let row = data.data.data;
            let keys_ = Object.keys(that.table_jz);
            let arr = [];
            keys_.forEach(function(item, index) {
              let obj = {};
              obj.key = that.table_jz[item];
              obj.values = row[item];
              arr.push(obj);
            });
            let arrTwo = [];
            let arrlittle = [];
            for (let i = 0; i < arr.length; i++) {
              arrlittle.push(arr[i]);
              if (arrlittle.length == 2 && i < arr.length - 1) {
                arrTwo.push(arrlittle);
                arrlittle = [];
              }
              if (i == arr.length - 1) {
                arrTwo.push(arrlittle);
                arrlittle = [];
              }
            }

            that.title = "遥测设备检查";
            that.updataData = arrTwo;
          });
      }
    },
    /**
     * @description 加载表格
     * @author B51733
     * @version 2019.5.27
     */
    showTable() {
      let that = this;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios
        .get("/serveApi/hbj/deviceCheck/getPage", {
          params: {
            jcdw: this.SmokyCarManagement.jcdw,
            jcry: this.SmokyCarManagement.jcry,
            qssj: this.SmokyCarManagement.startTime,
            jssj: this.SmokyCarManagement.endTime,
            jclx: this.SmokyCarManagement.jclx,
            sftg: this.SmokyCarManagement.sftg,
            pageSize: this.zjPage.pageSize,
            pageNum: this.zjPage.pageNum,
            sidebar: "点位检查跟踪"
          }
        })
        .then(data => {
          loadingObj.close();
          that.tablePoint = data.data.data.list;
          that.zjPage.total = data.data.data.total;
        });
    },
    sizeChange(val) {
      this.zjPage.pageSize = val;
      this.showTable();
    },
    currentChange(val) {
      this.zjPage.pageNum = val;
      this.showTable();
    }
  },

  data() {
    return {
      JCLX: "",
      SFTG: "",
      SmokyCarManagement: {
        dwmc: "",
        ygxmc: "",
        jcdw: "",
        jcry: "",
        jclx: "",
        jcjg: "",
        startTime: "",
        endTime: "",
        sftg: ""
      },
      title: "",
      diaSta: false,
      zjPage: { pageSize: 10, total: 0, pageNum: 1 },
      tablePoint: [],
      updataData: [],
      table_jz: {
        dwbh: "点位编号",
        ycxbh: "遥测线编号",
        jckssj: "检查开始时间",
        bqlb: "标气类别",
        co2bzz: "CO2标准值(%)",
        co2clz: "CO2测量值(%)",
        cobzz: "CO标准值(%)",
        coclz: "CO测量值(%)",
        nobzz: "NO标准值(ppm)",
        noclz: "NO测量值(ppm)"
      },
      table_jz_1: {
        dwbh: "点位编号",
        ycxbh: "遥测线编号",
        jckssj: "检查开始时间",
        bqlb: "标气类别",
        xssd: "行驶速度",
        co2bzz: "CO2标准值(%)",
        co2clz: "CO2测量值(%)",
        cobzz: "CO标准值(%)",
        coclz: "CO测量值(%)",
        nobzz: "NO标准值(ppm)",
        noclz: "NO测量值(ppm)"
      }
    };
  },
  created() {
    this.showTable();
    let that = this;
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      params: { sidebar: "点位检查跟踪" },
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "JCLX" }
    }).then(function(data) {
      that.JCLX = data.data.data;
    });
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      params: { sidebar: "点位检查跟踪" },
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "SFTG" }
    }).then(function(data) {
      that.SFTG = data.data.data;
    });
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
</style>

