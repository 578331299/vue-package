<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto;padding-bottom:2px;">
      <el-form
        red="formRoadInspectionDataQuery"
        :model="formRoadInspectionDataQuery"
        :inline="true"
      >
        <el-row>
          <el-col :span="8" style="display:flex;justify-content:flex-star;padding-left:20px;">
            <el-form-item label="测量结果:">
              <el-select
                v-model="formRoadInspectionDataQuery.csjg"
                @keyup.enter.native="axiosGetData(1)"
                placeholder="选择测试结果"
                style="width:250px"
              >
                <el-option
                  v-for="item in $store.state.enumSelection['jcjg']"
                  :label="item.xmnr"
                  :value="item.sz"
                  :key="item.index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="车牌号码:">
              <el-input
                v-model="formRoadInspectionDataQuery.cph"
                @keyup.enter.native="axiosGetData(1)"
                style="width:250px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="车牌颜色:">
              <el-select
                v-model="formRoadInspectionDataQuery.cpys"
                placeholder="选择车牌颜色"
                @keyup.enter.native="axiosGetData(1)"
                style="width:250px"
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

          <el-col :span="16" style="display:flex;justify-content: flex-star;padding-left:20px;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="formRoadInspectionDataQuery.startTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 结束时间">
              <el-date-picker
                v-model="formRoadInspectionDataQuery.endTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display:flex;justify-content: center;">
            <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
            <el-button type="primary" @click="resetData">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 164px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
        >
          <el-table-column prop="jclsh" label="检测流水号" align="center"></el-table-column>
          <el-table-column prop="jcsj" label="检测时间" align="center" width="150px"></el-table-column>
          <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="hpys" label="车牌颜色" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData["hpys"][scope.row.hpys]}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="rlzl" label="燃油类型" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData["rlzl"][scope.row.rlzl]}}</a>
            </template>
          </el-table-column>
          <!--<el-table-column prop="ffbh" label="方法编号" align="center"></el-table-column>-->
          <el-table-column prop="glkqxs" label="过量空气系数" align="center"></el-table-column>
          <el-table-column prop="gdssz" label="高怠速数值" align="center"></el-table-column>
          <el-table-column prop="jcff" label="检测方法" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData["jcff"][scope.row.jcff]}}</a>
            </template>
          </el-table-column>
          <!--<el-table-column prop="JZJSGKJCJG" label="加载减速工况检测结果" align="center"></el-table-column>-->
          <el-table-column prop="jcdd" label="监测地点" align="center"></el-table-column>
          <el-table-column prop="cljg" label="测量结果" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.cljg == 0 ? 'red' : '#909399'}"
              >{{$store.state.enumData["jcjg"][scope.row.cljg]}}</a>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
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
    <!--<information :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information>
    <road-inspection-data-query-alert ref="roadInspectionDataQueryAlert"></road-inspection-data-query-alert>-->
    <three-list ref="threeList" :tableYc="tableYc"></three-list>
    <road-information
      :title="title"
      @dialogClose="close"
      :updataData="updataData"
      :headTwo="headTwo"
      ref="roadInformation"
    ></road-information>
  </div>
</template>

<script>
//import roadInspectionDataQueryAlert from "../../common/RoadInspectionDataQueryAlert.vue";
import information from "../../common/information.vue";
import threeList from "../../common/threeList.vue";
import roadInformation from "../../common/roadInformation.vue";
export default {
  name: "RoadInspectionDataQuery",
  components: {
    information,
    threeList,
    roadInformation
  },
  data() {
    return {
      formRoadInspectionDataQuery: {
        csjg: "",
        cph: "",
        cpys: "",
        startTime: "",
        endTime: ""
      },
      updataData: [],
      headTwo: [],
      diaSta: false,
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      title: "",
      cpysData: [],
      updataData: [],
      cpysObj: {},
      jcjgObj: {},
      jcjgData: [],
      jcffObj: {},
      ryzlObj: {},
      sidebar: "路检数据查询",
      tableData: [],
      tableYc: {
        jclsh: "检测流水号",
        jcsj: "检测时间",
        hphm: "车牌号码",
        hpys: "车牌颜色",
        rlzl: "燃油类型",
        glkqxs: "过量空气系数",
        gdssz: "高怠速数值",
        jcff: "检测方法",
        jcdd: "监测地点",
        cljg: "测量结果"
      },
      //稳态工况法检测结果表
      WTGKJCXQ: [
        {
          JCLSH: "检测流水号",
          jcwcsj: "检测完成时间"
        },
        {
          Limit5025CO: "5025工况CO限值(%)",
          Limit5025NO: "5025工况NO限值(ppm)",
          Limit5025HC: "5025工况HC限值(ppm)",
          Limit2540CO: "2540工况CO限值(%)",
          Limit2540NO: "2540工况NO限值(ppm)",
          Limit2540HC: "2540工况HC限值(ppm)"
        },
        {
          CO5025: "5025工况CO值(%)",
          NO5025: "5025工况NO值(ppm)",
          HC5025: "5025工况HC值(ppm)",
          CO2540: "2540工况CO值(%)",
          NO2540: "2540工况NO值(ppm)",
          HC2540: "2540工况HC值(ppm)"
        },
        {
          Judge5025CO: "5025工况CO判定值",
          Judge5025NO: "5025工况NO判定值",
          Judge5025HC: "5025工况HC判定值",
          Judge2540CO: "2540工况CO限判定值",
          Judge2540NO: "2540工况NO限判定值",
          Judge2540HC: "2540工况HC限判定值"
        }
      ],
      //简易瞬态工况法检测结果
      JYSTGKJCXQ: [
        {
          JCLSH: "检测流水号",
          jcwcsj: "检测完成时间"
        },
        {
          LimitCO: "CO限值(%)",
          LimitHC: "HC限值(ppm)",
          LimitNO: "NO限值(ppm)",
          LimitHCNO: "HC+NO限值(ppm)"
        },
        {
          CO: "CO值(%)",
          HC: "HC值(ppm)",
          NO: "NO值(ppm)",
          HCNO: "HC+NO值(ppm)"
        },

        {
          JudgeCO: "CO结果",
          JudgeHC: "HC结果",
          JudgeNO: "NO结果",
          judgeHcNo: "HC+NO结果"
        }
      ],
      //双怠速法检测结果表
      SDSFJCJGXQ: [
        {
          JCLSH: "检测流水号",
          jcwcsj: "检测完成时间"
        },
        {
          DSCOZXZ: "怠速CO值限值(%)",
          DSHCZXZ: "怠速HC值限值(ppm)",
          GDSCOZXZ: "高怠速CO值限值(%)",
          GDSHCZXZ: "高怠速HC值限值(ppm)"
        },
        {
          DSCOZ: "怠速CO值(%)",
          DSHCZ: "怠速HC值(ppm)",
          gdscoz: "高怠速CO值(%)",
          GDSHCZ: "高怠速HC值(ppm)"
        },
        {
          DSCOZPD: "怠速CO值判定",
          DSHCZPD: "怠速HC值判定",
          GDSCOZPD: "高怠速CO值判定",
          GDSHCZPD: "高怠速HC值判定"
        }
      ],
      //滤纸烟度自由加速检测结果
      LZYDZYJSJCJGXQ: [
        {
          jclsh: "检测流水号",
          jcwcsj: "检测完成时间",
          jcsj: "检测时间",
          hphm: "车牌号码",
          hpys: "车牌颜色",
          rlzl: "燃油类型",
          glkqxs: "过量空气系数",
          gdssz: "高怠速数值",
          jcff: "检测方法",
          jcdd: "监测地点",
          cljg: "测量结果"
        },
        {
          dszs: "怠速转速",
          d1CYCLYDZ: "第一次（预）测量烟度值",
          D2CCLYDZ: "第二次测量烟度值",
          D3CCLYDZ: "第三次测量烟度值",
          D4CCLYDZ: "第四次测量烟度值",
          HSCCLJGDPJZ: "后三次测量结果的平均值",
          JCXZ: "检测限值",
          PJZPD: "平均值判定结果"
        }
      ],
      //不透光烟度自由加速检测结果
      BTGYDZYJSJCJGXQ: [
        {
          jclsh: "检测流水号",
          jcwcsj: "检测完成时间",
          jcsj: "检测时间",
          hphm: "车牌号码",
          hpys: "车牌颜色",
          rlzl: "燃油类型",
          glkqxs: "过量空气系数",
          gdssz: "高怠速数值",
          jcff: "检测方法",
          jcdd: "监测地点",
          cljg: "测量结果"
        },
        {
          DSZS: "怠速转速",
          D1CCLYDZ: "第一次测量烟度值",
          D2CCLYDZ: "第二次测量烟度值",
          D3CCLYDZ: "第三次测量烟度值",
          D4CCLYDZ: "第四次测量烟度值",
          CLJGDPJZ: "测量结果的平均值",
          JCXZ: "检测限值",
          PJZPD: "平均值判定结果"
        }
      ],
      //加载减速工况法检测结果
      JZJSGKFJCJGXQ: [
        {
          jclsh: "检测流水号",
          jcjgscsj: "检测完成时间",
          hphm: "车牌号码",
          cpys: "车牌颜色",
          jcbgdbh: "检测报告单编号",
          jcff: "检测方法",
          jccs: "检测次数",
          jcjg: "检测结果"
        },
        {
          P100K: "100%点排放结果(m^-1)",
          P90K: "90%点排放结果(m^-1)",
          P80K: "80%点排放结果(m^-1)",
          ZDLBGL: "最大轮边功率(rpm)",
          SCFDJEDZS: "实测发动机额定转速(rpm)",
          PFXZ: "排放限值(m^-1)",
          FDJEDZSSX: "发动机额定转速上限(rpm)",
          FDJEDZSXX: "发动机额定转速下限(rpm)",
          ZDLBGLXZ: "最大轮边功率限值(kw)",
          PJZPD: "平均值判定结果"
        }
      ],
      otherData: []
    };
  },
  created() {
    /*this.carCalorfun("JCJG");
    this.carCalorfun("HPYS");
    this.carCalorfun("JCFF");
    this.carCalorfun("RLZL");
    */
  },
  mounted() {
    this.axiosGetData();
  },
  methods: {
    /**
     * @description 选择性详模块情展示
     * @author lifei
     * @version 2019.05.24
     * @param {row, rowData} row为取得的当前行数据;rowData为请求接口拿到的数据
     */
    showPage(row, rowData) {
      let that = this;
      let obj = {};
      for (let key in row) {
        if (key == "hpys") {
          obj[key] = this.$store.state.enumData["hpys"][row[key]];
        } else if (key == "rlzl") {
          obj[key] = this.$store.state.enumData["rlzl"][row[key]];
        } else if (key == "jcff") {
          obj[key] = this.$store.state.enumData["jcff"][row[key]];
        } else if (key == "cljg") {
          obj[key] = this.$store.state.enumData["jcjg"][row[key]];
        } else {
          obj[key] = row[key];
        }
      }
      switch (row.jcff) {
        case 6:
          that.$refs.threeList.showPage(
            rowData,
            "稳态工况法",
            that.WTGKJCXQ,
            obj
          );
          break;
        case 1:
          this.$refs.threeList.showPage(
            rowData,
            "简易瞬态工况法",
            this.JYSTGKJCXQ,
            obj
          );
          break;
        case 2:
          this.$refs.threeList.showPage(
            rowData,
            "双怠速法",
            this.SDSFJCJGXQ,
            obj
          );
          break;
        case 3:
          this.informationOpen(
            this.LZYDZYJSJCJGXQ[1],
            "自由加速工况(滤纸烟度)法",
            rowData,
            this.LZYDZYJSJCJGXQ[0],
            obj
          );
          break;
        case 4:
          this.informationOpen(
            this.BTGYDZYJSJCJGXQ[1],
            "自由加速工况(不透光烟度)法",
            rowData,
            this.BTGYDZYJSJCJGXQ[0],
            obj
          );
          break;
        case 5:
          this.informationOpen(
            this.JZJSGKFJCJGXQ[1],
            "加载减速法",
            rowData,
            this.JZJSGKFJCJGXQ[0],
            obj
          );
          break;
        default:
          this.informationSelfOpen("", obj);
      }
    },
    /**
     * @description 选择每页显示多少条数据
     * @author lifei
     * @version 2019.05.24
     * @param {val}  每页显示数量
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 跳转到指定页
     * @author lifei
     * @version 2019.05.24
     * @param {val} 跳转页签
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 搜索，初始化显示数据方法
     * @author lifei
     * @version 2019.05.24
     * @param {num} 搜索传入的页签数
     */
    axiosGetData(num) {
      //alert(1)
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
      if (
        this.formRoadInspectionDataQuery.startTime == "" ||
        this.formRoadInspectionDataQuery.startTime == null ||
        this.formRoadInspectionDataQuery.startTime == "null"
      ) {
        obj.startTime = "";
      } else {
        obj.startTime =
          this.formRoadInspectionDataQuery.startTime + " 00:00:00";
      }

      if (
        this.formRoadInspectionDataQuery.endTime == "" ||
        this.formRoadInspectionDataQuery.endTime == null ||
        this.formRoadInspectionDataQuery.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.formRoadInspectionDataQuery.endTime + "24:59:59";
      }
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/roadInspect/getRoadInspect",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          cljg: that.formRoadInspectionDataQuery.csjg,
          hphm: that.formRoadInspectionDataQuery.cph,
          hpys: that.formRoadInspectionDataQuery.cpys,
          startTime: obj.startTime,
          endTime: obj.endTime
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.data) {
            that.tableData = res.data.data.data;
            that.total = res.data.data.total;
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            message: "很遗憾，数据加载失败！",
            type: "warning"
          });
        });
    },
    /**
     * @description 调取roadInformation准备参数方法
     * @author lifei
     * @version 2019.05.24
     * @param {table_yc, title, row, table_yc_one, lineRow} 搜索传入的页签数
     */
    informationOpen(table_yc, title, row, table_yc_one, lineRow) {
      this.diaSta = true;
      let keys_ = Object.keys(table_yc);
      let keys_head = Object.keys(table_yc_one);
      let arr = [];
      let headTwo = [];
      let that = this;

      keys_.forEach(function(item, index) {
        let obj = {};
        obj["name"] = table_yc[item];
        obj["valdata"] = row[item.toLowerCase()];
        //debugger;
        arr.push(JSON.parse(JSON.stringify(obj)));
      });
      keys_head.forEach(function(item) {
        let obj = {};
        if (item == "jcwcsj") {
          obj["name"] = table_yc_one[item];
          obj.valdata = row[item];
        } else if (item == "jcjgscsj") {
          obj["name"] = table_yc_one[item];
          obj["valdata"] = row[item];
        } else {
          obj["name"] = table_yc_one[item];
          obj["valdata"] = lineRow[item];
        }
        headTwo.push(JSON.parse(JSON.stringify(obj)));
      });
      this.title = title;
      //console.log(row);
      this.updataData = arr;
      //console.log(keys_head);
      this.headTwo = headTwo;
      that.$refs.roadInformation.handleClose();
    },
    /**
     * @description 调取roadInformation准备参数方法
     * @author lifei
     * @version 2019.05.24
     * @param {table_yc, title, row, table_yc_one, lineRow} 搜索传入的页签数
     */
    informationSelfOpen(title, lineRow) {
      this.diaSta = true;
      let keys_head = Object.keys(this.tableYc);

      let headTwo = [];
      let that = this;
      keys_head.forEach(function(item) {
        let obj = {};
        obj["name"] = that.tableYc[item];
        obj["valdata"] = lineRow[item];
        headTwo.push(JSON.parse(JSON.stringify(obj)));
      });
      this.title = title;
      //console.log(row);
      this.updataData = this.otherData;
      //console.log(keys_head);this.otherData
      this.headTwo = headTwo;
      that.$refs.roadInformation.handleClose();
    },

    resetData() {
      let keys_ = Object.keys(this.formRoadInspectionDataQuery);
      for (let i = 0; i < keys_.length; i++) {
        this.formRoadInspectionDataQuery[keys_[i]] = "";
      }
    },
    /**
     * @description 查看详情
     * @author lifei
     * @version 2019.05.24
     * @param {row} 选中行参数
     */
    handleClick(row) {
      let that = this;
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/inspectMethod/getInspectDetails",
        params: {
          jclsh: row.jclsh,
          jcff: row.jcff,
          sidebar: that.sidebar
        }
      })
        .then(function(res) {
          if (res.data && row.jcff <= 6) {
            that.rowData = res.data.data;
            let keys_ = Object.keys(that.rowData);
            for (let i = 0; i < keys_.length; i++) {
              if (
                keys_[i] == "judgeco" ||
                keys_[i] == "judgehc" ||
                keys_[i] == "judgehcno" ||
                keys_[i] == "judgeno" ||
                keys_[i] == "judge2540co" ||
                keys_[i] == "judge2540hc" ||
                keys_[i] == "judge2540no" ||
                keys_[i] == "judge5025co" ||
                keys_[i] == "judge5025hc" ||
                keys_[i] == "judge5025no" ||
                keys_[i] == "dscozpd" ||
                keys_[i] == "dshczpd" ||
                keys_[i] == "gdscozpd" ||
                keys_[i] == "gdshczpd" ||
                keys_[i] == "pjzpd" ||
                keys_[i] == "lmdzpd"
              ) {
                that.rowData[keys_[i]] =
                  that.$store.state.enumData.jcjg[that.rowData[keys_[i]]];
              }
            }
          }

          if (row.jcff > 6) {
            console.log(res.data.data);
            let arrawObj = [];
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = {};
              obj["name"] = res.data.data[i].ffcsmc;
              obj["valdata"] = res.data.data[i].ffcsz;
              arrawObj.push(JSON.parse(JSON.stringify(obj)));
            }
            that.otherData = arrawObj;
          }
          that.showPage(row, that.rowData);
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "很遗憾，数据加载失败!"
          });
        });
    },
    close() {
      this.diaSta = false;
    },
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
            if (type === "HPYS") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.cpysObj = obj;
              that.cpysData = res.data.data;
            } else if (type === "JCJG") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.jcjgObj = obj;
              that.jcjgData = res.data.data;
              //console.log(res.data.data);
            } else if (type === "JCFF") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.jcffObj = obj;
              //console.log(res.data.data);
            } else {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.ryzlObj = obj;
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
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.formRoadInspectionDataQuery.endTime == "" ||
              this.formRoadInspectionDataQuery.endTime == "null" ||
              this.formRoadInspectionDataQuery.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formRoadInspectionDataQuery.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formRoadInspectionDataQuery.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.formRoadInspectionDataQuery.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.formRoadInspectionDataQuery.startTime == "" ||
              this.formRoadInspectionDataQuery.startTime == "null" ||
              this.formRoadInspectionDataQuery.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.formRoadInspectionDataQuery.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.formRoadInspectionDataQuery.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.formRoadInspectionDataQuery.endTime = "";
            }
          }
          break;
      }
    }
  }
};
</script>
<style scoped>
.button-div {
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
}
/*table tr:nth-child(odd) {
  background: #a5bfd7;
}*/
</style>

