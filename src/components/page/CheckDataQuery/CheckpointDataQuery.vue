<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="车牌号码">
              <el-input
                v-model="formTrafficFlowAnalysis.site"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="起始时间">
              <el-date-picker
                v-model="formTrafficFlowAnalysis.startTime"
                value-format="yyyy-MM-dd"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="formTrafficFlowAnalysis.endTime"
                value-format="yyyy-MM-dd"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;align-item:center">
            <div class="button_box">
              <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
              <el-button type="primary" @click="resetData">重置</el-button>
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
        <el-table
          :data="tableData"
          height="calc(100% - 20px)"
          border
          style="width: 100%;margin-top:20px;"
        >
          <el-table-column prop="jclsh" label="检测流水号" align="center"></el-table-column>
          <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="cpys" label="车牌颜色" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData["hpys"][scope.row.cpys]}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="jcbgdbh" label="检测报告单编号" align="center"></el-table-column>
          <el-table-column prop="jcff" label="检测方法" align="center">
            <template scope="scope">
              <a>{{$store.state.enumData["jcff"][scope.row.jcff]}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="jccs" label="检测次数" align="center"></el-table-column>
          <el-table-column prop="jcwcsj" label="检测时间" align="center"></el-table-column>
          <el-table-column prop="jcjg" label="检测结果" align="center">
            <template scope="scope">
              <a
                :style="{color:scope.row.jcjg == 1 ? '#909399' : 'red'}"
              >{{$store.state.enumData["jcjg"][scope.row.jcjg]}}</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detailsData(scope.row)">检测详情</el-button>
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
    <three-list :tableYc="tableYc" ref="threeList"></three-list>
    <road-information
      :title="title"
      @dialogClose="close"
      :updataData="updataData"
      :headTwo="headTwo"
      ref="roadInformation"
    ></road-information>
    <!-- <img src="../../../assets/img/环检数据查询.jpg"> -->
  </div>
</template>


<script>
import threeList from "../../common/threeList.vue";
import roadInformation from "../../common/roadInformation.vue";
export default {
  name: "CheckpointDataQuery",

  data() {
    return {
      formTrafficFlowAnalysis: { site: "", startTime: "", endTime: "" },
      rowData: {},
      sidebar: "环检数据查询",
      diaSta: false,
      headTwo: [],
      updataData: [],
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      title: "",
      tableData: [],
      cpysObj: {},
      jcjgObj: {},
      jcffObj: {},
      tableYc: {
        jclsh: "检测流水号",
        hphm: "车牌号码",
        cpys: "车牌颜色",
        jcbgdbh: "检测报告单编号",
        jcff: "检测方法",
        jccs: "检测次数",
        jcwcsj: "检测时间",
        jcjg: "检测结果"
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
          hphm: "车牌号码",
          cpys: "车牌颜色",
          jcbgdbh: "检测报告单编号",
          jcff: "检测方法",
          jccs: "检测次数",
          jcwcsj: "检测完成时间",
          jcjg: "检测结果"
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
          hphm: "车牌号码",
          cpys: "车牌颜色",
          jcbgdbh: "检测报告单编号",
          jcff: "检测方法",
          jccs: "检测次数",
          jcwcsj: "检测完成时间",
          jcjg: "检测结果"
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
  components: {
    threeList,
    roadInformation
  },
  created() {
    /*this.carCalorfun("JCJG");
    this.carCalorfun("HPYS");
    this.carCalorfun("JCFF");*/
  },
  mounted() {
    this.axiosGetData();
  },
  methods: {
    /**
     * @description 相应详情组件调取
     * @author lifei
     * @version 2019.05.24
     */
    showPage(row, rowData) {
      let that = this;
      let obj = {};
      for (let key in row) {
        if (key == "cpys") {
          obj[key] = this.$store.state.enumData["hpys"][row[key]];
        } else if (key == "jcff") {
          obj[key] = this.$store.state.enumData["jcff"][row[key]];
        } else if (key == "jcjg") {
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
     * @description 设置分页显示条数
     * @author lifei
     * @version 2019.05.24
     */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 跳转页码
     * @author lifei
     * @version 2019.05.24
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description information组件的打开展示
     * @author lifei
     * @version 2019.05.24
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
    /**
     * @description 查询详情的参数接口方法
     * @author lifei
     * @version 2019.05.24
     */
    detailsData(row) {
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
          if (res.data.data && row.jcff <= 6) {
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
    /**
     * @description 搜索，查询页面显示数据方法
     * @author lifei
     * @version 2019.05.24
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
      if (
        this.formTrafficFlowAnalysis.startTime == "" ||
        this.formTrafficFlowAnalysis.startTime == null ||
        this.formTrafficFlowAnalysis.startTime == "null"
      ) {
        obj.startTime = "";
      } else {
        obj.startTime = this.formTrafficFlowAnalysis.startTime + " 00:00:00";
      }

      if (
        this.formTrafficFlowAnalysis.endTime == "" ||
        this.formTrafficFlowAnalysis.endTime == null ||
        this.formTrafficFlowAnalysis.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.formTrafficFlowAnalysis.endTime + "24:59:59";
      }
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/hj/getInspect",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          hphm: that.formTrafficFlowAnalysis.site,
          startTime: obj.startTime,
          endTime: obj.endTime
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.data) {
            that.tableData = res.data.data.data;
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
     * @description 关闭弹框
     * @author lifei
     * @version 2019.05.24
     */
    close() {
      this.diaSta = false;
    },
    resetData() {
      let keys_ = Object.keys(this.formTrafficFlowAnalysis);
      for (let i = 0; i < keys_.length; i++) {
        this.formTrafficFlowAnalysis[keys_[i]] = "";
      }
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
            } else if (type === "JCJG") {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.jcjgObj = obj;
              //console.log(res.data.data);
            } else {
              let obj = {};
              for (let i = 0; i < res.data.data.length; i++) {
                obj[res.data.data[i].sz] = res.data.data[i].xmnr;
              }
              that.jcffObj = obj;
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
     * @description 搜索时间校验
     * @author lifei
     * @version 2019.05.24
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
</style>

