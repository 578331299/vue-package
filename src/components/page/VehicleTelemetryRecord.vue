<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="dataQuailty" :model="dataQuailty" :inline="true">
        <el-row>
          <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="车牌号码:">
              <el-input v-model="dataQuailty.hphm" placeholder="请输入车牌号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="车牌颜色:">
              <el-select
                v-model="dataQuailty.cpys"
                placeholder="选择车牌颜色"
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
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary" @click="axiosGetData">查询</el-button>
              <el-button type="primary" @click="resetData">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="chare_box" style="height:auto;padding-bottom:2px;padding-left:20px;">
      <div style="width:100%" class="parent_div">
        <div style="width:60%;display:flex;justify-content:center">
          <div class="time_data">
            <div class="time_" v-for="item in timeList">{{item.time}}</div>
          </div>
          <div class="time_line">
            <template v-for="(item,index) in timeList">
              <div class="inner_div">{{item.timeLine}}</div>
              <div class="parent_border_div">
                <div class="border_div" v-if="index<=5"></div>
              </div>
            </template>
          </div>
          <div class="time_content">
            <template v-for="item in timeList">
              <div class="parent_content_div" @click="showInformation(item)" :key="item.index">
                <div class="content_title">{{item.title}}</div>
                <div class="content_inner">
                  <div class="txt_parent_div" v-for="itemB in item.timeitem" :key="itemB.index">
                    <span>{{itemB.title}}</span>
                    <span>{{itemB.titleData}}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <three-list ref="threeList" :tableYc="tableYc"></three-list>
    <road-information
      :title="title"
      @dialogClose="close"
      :updataData="updataData"
      :headTwo="headTwo"
      ref="roadInformation"
    ></road-information>
    <detailed-information ref="detailedInformation"></detailed-information>
  </div>
</template>

<script>
import threeList from "../common/threeList.vue";
import roadInformation from "../common/roadInformation.vue";
import detailedInformation from "../common/detailedInformation.vue";
export default {
  components: { threeList, roadInformation, detailedInformation },
  data() {
    return {
      title: "",
      sidebar: "一车一档",
      dataQuailty: {
        hphm: "陕A10086", //陕A10086
        cpys: "1" //1
      },
      diaSta: false,
      timeList: [],
      tableList_lj: [
        { key: "系统编号", values: "20180101001" },
        { key: "检测时间", values: "2012-11-11 12:13:34" },
        { key: "车牌号码码", values: "陕A123456" },
        { key: "车牌颜色", values: "黄色" },
        { key: "燃油类型", values: "柴油" },
        { key: "测试方法", values: "" },
        { key: "监测地点", values: "电视塔" },
        { key: "测试结果", values: "合格" },
        { key: "怠速测量结果", values: "" },
        { key: "测试仪器型号", values: "DiSmoke 480 BT (i)" },
        { key: "测试仪器编号", values: "DiSmoke480-4833" },
        { key: "检测车车牌号码", values: "陕A123321" },
        { key: "双怠速测量结果", values: "正常" },
        { key: "稳态工况测量结果", values: "" },
        { key: "光吸收系数k测值1", values: "0.98" },
        { key: "光吸收系数k测值2", values: "0.83" },
        { key: "光吸收系数k测值3", values: "0.87" },
        { key: "简易瞬态工况测量结果", values: "" },
        { key: "加载减速工况检测结果", values: "" },
        { key: "过量空气系数测量结果", values: "自由加速度（不透光烟度）检测" },
        { key: "光吸收系数k法规限值", values: "3" },
        { key: "光吸收系数k测值平均值", values: "0.89" },
        { key: "不透光烟度自由加速检测结果", values: "" },
        { key: "检测员", values: "xnb" }
      ],
      tableList_hj: [
        { key: "检测流水号", values: "201903130001" },
        { key: "检测结果完成时间", values: "2019-01-11 11:12:30" },
        { key: "5025工况CO限值", values: "1~5" },
        { key: "5025工况NO限值", values: "1~2" },
        { key: "5025工况HC限值", values: "1~5" },
        { key: "2540工况CO限值", values: "1~3" },
        { key: "2540工况NO限值", values: "1~5" },
        { key: "2540工况HC限值", values: "1~5" },
        { key: "5025工况CO值", values: "2" },
        { key: "5025工况NO值", values: "3" },
        { key: "5025工况HC值", values: "1" },
        { key: "2540工况CO值", values: "2" },
        { key: "2540工况NO值", values: "3" },
        { key: "2540工况HC值", values: "1" },
        { key: "5025工况CO判定值", values: "1~5" },
        { key: "5025工况NO判定值", values: "1~2" },
        { key: "5025工况HC判定值", values: "1~5" },
        { key: "2540工况CO限判定值", values: "1~3" },
        { key: "2540工况NO限判定值", values: "1~5" },
        { key: "2540工况HC限判定值", values: "1~5" }
      ],
      tableList_cf: [
        { key: "编号", values: "M20190201001" },
        { key: "检测时间", values: "2017-5-12 2:50:09" },
        { key: "车牌号码码", values: "陕A10086" },
        { key: "车牌颜色", values: "黄色" },
        { key: "年份", values: "年份" },
        { key: "车主", values: "张三" },
        { key: "地址", values: "陕西省西安市西三环" },
        { key: "联系号码", values: "13023567897" },
        { key: "双怠速测量结果", values: "" },
        { key: "稳态工况测量结果", values: "" },
        { key: "简易瞬态工况测量结果", values: "" },
        { key: "不透光烟度自由加速检测结果", values: "" },
        { key: "加载减速工况法检测结果", values: "" },
        { key: "罚款金额", values: "200" },
        { key: "状态", values: "待复检" }
      ],
      tableLIst_yc: {
        JLBH: "20180212",
        DWBH: "302345A",
        YCXBH: "B2",
        JCDWRZH: "20180217",
        JCRYXM: "郭德纲",
        CDXH: "1",
        JCRQ: "2018-04-11 08:22:22",
        DDJD: "123.12541",
        DDWD: "12.1224441",
        CDPD: "23",
        PDJG: "不通过",
        HPHM: "陕A456785",
        CPYS: "蓝牌",
        HPZL: "符合GA/T543",
        RLZL: "按GA 329.2要求",
        CO2JG: "3",
        COCO2: "2",
        HCCO2: "2",
        NOCO2: "3",
        COJG: "5",
        HCJG: "/",
        NOJG: "2",
        BTGDJG: "3",
        LGMHD: "1",
        COXZ: "3",
        NOXZ: "3",
        BTGDXZ: "3",
        HDXZ: "3",
        CLSD: "80m/s",
        CLJSD: "100m/m",
        VSP: "3",
        FS: "3m/s",
        FX: "30",
        HJSD: "3",
        SD: "3",
        DQY: "3",
        GJXXBH: "121212000001",
        TP1: "201802120000001",
        TP2: "201802120000001",
        SP3: "201802120000001"
      },
      objName: {
        data1: "环",
        data2: "遥",
        data3: "遥",
        data4: "遥",
        data5: "路",
        data6: "罚",
        data7: "环"
      },
      objName2: {
        data1: {
          titleName: "环检结果",
          titleTime: "环检时间：",
          titleAddress: "环检地点：",
          titleResult: "环检结果："
        },
        data2: {
          titleName: "第一次遥测",
          titleTime: "遥测时间：",
          titleAddress: "遥测地点：",
          titleResult: "遥测结果："
        },
        data3: {
          titleName: "第二次遥测",
          titleTime: "遥测时间：",
          titleAddress: "遥测地点：",
          titleResult: "遥测结果："
        },
        data4: {
          titleName: "第三次遥测",
          titleTime: "遥测时间：",
          titleAddress: "遥测地点：",
          titleResult: "遥测结果："
        },
        data5: {
          titleName: "路检结果",
          titleTime: "路检时间：：",
          titleAddress: "路检地点：",
          titleResult: "路检结果："
        },
        data6: {
          titleName: "处罚结果",
          titleTime: "处罚时间：",
          titleAddress: "处罚地点：",
          titleResult: "处罚结果："
        },
        data7: {
          titleName: "环检结果",
          titleTime: "环检时间：",
          titleAddress: "环检结果：",
          titleResult: "环检结果："
        }
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
      tableYc: {},
      otherData: [],
      rowDataLine: [],
      updataData: [],
      headTwo: [],
      roadDataName: {
        cljg: "测量结果",
        dssz: "怠速数值",
        gdssz: "高怠速数值",
        glkqxs: "过量空气系数",
        gxsxsjz: "光吸收系数平均值",
        hphm: "车牌号码",
        jcdd: "检测地点",
        jcff: "检测方法",
        jclsh: "检测流水号",
        jcsj: "检测时间",
        rlzl: "燃料种类"
      },
      roadDataName6: {
        spsj: "审批时间",

        sfjzcf: "是否加重处罚",

        cfdh: "处罚单号",

        cfje: "处罚金额",

        cfjzrq: "处罚截止日期",

        cfzt: "处罚状态",

        cfdjs: "处罚单寄送",

        cfdjssj: "处罚单收到时间",

        jkdjs: "缴款单寄送",

        jkdjssj: "缴款单收到时间",

        zgjzrq: "整改截止日期",

        jclsh: "检测流水号",

        jcwcsj: "检测完成时间",

        jcjg: "检测结果",

        yxjzrq: "有效截止日期",

        zgzt: "整改状态",

        hphm: "号牌号码",

        sjhm: "手机号码",

        jcdd: "检测地点",

        czmc: "车主名称"
      },
      data5MuchData: [],
      data6MuchData: [],
      roadDataNameData2: {
        jlbh: "记录编号",
        dwbh: "点位编号",
        ycxbh: "遥测线编号",
        jcdwrzh: "监测点位日志号",
        jcryxm: "监测人员姓名",
        cdxh: "车道序号",
        jcrq: "监测时间",
        ddjd: "地点经度(°)",
        ddwd: "地点维度(°)",
        cdpd: "车道坡度(°)",
        pdjg: "判定结果",
        hphm: "车牌号码",
        cpys: "车牌颜色",
        hpzl: "车牌种类",
        rlzl: "燃料种类",
        co2jg: "CO2结果(%)",
        coco2: "CO/CO2比例(%)",
        hcco2: "HC/CO2比例(%)",
        noco2: "NO/CO2比例(%)",
        cojg: "CO结果(%)",
        hcjg: "HC结果(ppm)",
        nojg: "NO结果(ppm)",
        btgdjg: "不透光度结果(%)",
        lgmhd: "林格曼黑度(级)",
        coxz: "CO限值(%)",
        noxz: "NO限值(ppm)",
        btgdxz: "不透光度限值(%)",
        hdxz: "黑度限值(%)",
        clsd: "车辆速度(m/s)",
        cljsd: "车辆加速度(m/s²)",
        vsp: "VSP(kw/t)",
        fs: "风速(m/s)",
        fx: "风向",
        hjsd: "环境湿度(%)",
        sd: "湿度(%)",
        dqy: "大气压(kpa)",
        gjxxbh: "轨迹信息编号",
        tp1: "图像1文件名",
        tp2: "图像2文件名",
        sp3: "视频1文件名"
      },
      roadDataNameData2Much: {},
      roadDataNameData3Much: {},
      roadDataNameData4Much: {}
    };
  },
  mounted() {
    console.log(this.$store.state.enumSelection);
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
      switch (row.jcff) {
        case 6:
          that.$refs.threeList.showPage(
            rowData,
            that.title,
            that.WTGKJCXQ,
            obj
          );
          break;
        case 1:
          this.$refs.threeList.showPage(
            rowData,
            that.title,
            this.JYSTGKJCXQ,
            obj
          );
          break;
        case 2:
          this.$refs.threeList.showPage(
            rowData,
            that.title,
            this.SDSFJCJGXQ,
            obj
          );
          break;
        case 3:
          this.informationOpen(
            this.LZYDZYJSJCJGXQ[1],
            that.title,
            rowData,
            this.LZYDZYJSJCJGXQ[0],
            obj
          );
          break;
        case 4:
          this.informationOpen(
            this.BTGYDZYJSJCJGXQ[1],
            that.title,
            rowData,
            this.BTGYDZYJSJCJGXQ[0],
            obj
          );
          break;
        case 5:
          this.informationOpen(
            this.JZJSGKFJCJGXQ[1],
            that.title,
            rowData,
            this.JZJSGKFJCJGXQ[0],
            obj
          );
          break;
        default:
          this.informationSelfOpen(that.title, obj);
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
        url:
          "/serveApi/hbj/inspectMethod/getInspectDetails?jclsh=" +
          row.jclsh +
          "&jcff=" +
          row.jcff +
          "&sidebar" +
          that.sidebar
      })
        .then(function(res) {
          console.log(res.data);
          if (res.data && row.jcff <= 6) {
            that.rowData = res.data.data;
            let keys_ = Object.keys(that.rowData);
            for (let i = 0; i < keys_.length; i++) {
              if (
                keys_[i] == "judgeco" ||
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
     * @description 没有数据的提示
     * @author lifei
     * @version 2019.5.29
     * @param {dataUnll} 数据为空的校验字段
     */
    alertText(dataUnll) {
      if (!dataUnll) {
        this.$message({
          type: "warning",
          message: "暂无数据，不能查看!"
        });
        return false;
      } else {
        return true;
      }
    },
    /**
     * @description 点击查看详情
     * @author lifei
     * @version 2019.5.29
     * @param {item} 选择的当前行数据
     */
    showInformation(item) {
      this.title = item.title;
      if (item.type == "data1") {
        if (!this.alertText(item.dataUnll)) {
          return;
        }
        this.handleClick(this.rowDataLine[0]);
      } else if (item.type == "data7") {
        if (!this.alertText(item.dataUnll)) {
          return;
        }
        this.handleClick(this.rowDataLine[6]);
      } else if (item.type == "data5") {
        //console.log(this.$store.state.enumData)
        if (!this.alertText(item.dataUnll)) {
          return;
        }
        this.updataData = [];
        this.headTwo = this.data5MuchData;
        this.$refs.roadInformation.handleClose();
      } else if (item.type == "data2") {
        if (!this.alertText(item.dataUnll)) {
          return;
        }
        this.$refs.detailedInformation.returnAlert(this.roadDataNameData2Much);
      } else if (item.type == "data3") {
        if (!this.alertText(item.dataUnll)) {
          return;
        }
        this.$refs.detailedInformation.returnAlert(this.roadDataNameData3Much);
      } else if (item.type == "data4") {
        if (!this.alertText(item.dataUnll)) {
          return;
        }
        this.$refs.detailedInformation.returnAlert(this.roadDataNameData4Much);
      } else if (item.type == "data6") {
        if (!this.alertText(item.dataUnll)) {
          return;
        }
        this.updataData = [];
        //console.log(keys_head);this.otherData
        this.headTwo = this.data6MuchData;
        this.$refs.roadInformation.handleClose();
      }
    },
    /**
     * @description 数据初始化请求，分页，搜索
     * @author lifei
     * @version 2019.5.29
     */
    axiosGetData() {
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      if (that.dataQuailty.hphm == "" || that.dataQuailty.cpys == "") {
        loadingObj.close();
        that.$message({
          type: "warning",
          message: "两个搜索条件都必须输入!"
        });
        return;
      }
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/hj/getCarOneCheck",
        params: {
          sidebar: that.sidebar,
          hphm: that.dataQuailty.hphm,
          cpys: that.dataQuailty.cpys
        }
      })
        .then(function(res) {
          loadingObj.close();
          console.log(res.data.data.data1);
          if (res.data.data) {
            let dataArraw = [
              "data1",
              "data2",
              "data3",
              "data4",
              "data5",
              "data6",
              "data7"
            ];
            let arrawData = [];
            let useArraw = [];
            for (let i = 0; i < dataArraw.length; i++) {
              if (!(res.data.data[dataArraw[i]] == null)) {
                let objUse = {
                  jcff: res.data.data[dataArraw[i]].jcff,
                  jclsh: res.data.data[dataArraw[i]].jclsh
                };
                useArraw.push(JSON.parse(JSON.stringify(objUse)));
              }
              switch (dataArraw[i]) {
                case "data1":
                  let obj1 = {
                    type: dataArraw[i],
                    dataUnll: res.data.data.data1 == null ? false : true,
                    time:
                      res.data.data.data1 == null
                        ? "暂无数据"
                        : res.data.data[dataArraw[i]].jckssj,
                    timeLine: that.objName[dataArraw[i]],
                    title: that.objName2[dataArraw[i]].titleName,
                    timeitem: [
                      {
                        title: that.objName2[dataArraw[i]].titleTime,
                        titleData:
                          res.data.data.data1 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jckssj
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleAddress,
                        titleData:
                          res.data.data.data1 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jczxxdz
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleResult,
                        titleData:
                          res.data.data.data1 == null
                            ? "暂无数据"
                            : that.$store.state.enumData.jcjg[
                                res.data.data[dataArraw[i]].jcjg
                              ]
                      }
                    ]
                  };
                  arrawData.push(JSON.parse(JSON.stringify(obj1)));
                  break;
                case "data2":
                  let obj2 = {
                    type: dataArraw[i],
                    dataUnll: res.data.data.data2 == null ? false : true,
                    time:
                      res.data.data.data2 == null
                        ? "暂无数据"
                        : res.data.data[dataArraw[i]].jckssj,
                    timeLine: that.objName[dataArraw[i]],
                    title: that.objName2[dataArraw[i]].titleName,
                    timeitem: [
                      {
                        title: that.objName2[dataArraw[i]].titleTime,
                        titleData:
                          res.data.data.data2 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jcrq
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleAddress,
                        titleData:
                          res.data.data.data2 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].dwdz
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleResult,
                        titleData:
                          res.data.data.data2 == null
                            ? "暂无数据"
                            : that.$store.state.enumData.jcjg[
                                res.data.data[dataArraw[i]].pdjg
                              ]
                      }
                    ]
                  };
                  let objData2 = {};
                  if (!(res.data.data.data2 == null)) {
                    for (let key in that.roadDataNameData2) {
                      if (key == "pdjg") {
                        objData2[key] =
                          res.data.data[dataArraw[i]][key] == 0
                            ? "不通过"
                            : "通过";
                      } else {
                        objData2[key] = res.data.data[dataArraw[i]][key];
                      }
                    }
                  }

                  that.roadDataNameData2Much = objData2;
                  arrawData.push(JSON.parse(JSON.stringify(obj2)));
                  break;
                case "data3":
                  let obj3 = {
                    type: dataArraw[i],
                    dataUnll: res.data.data.data3 == null ? false : true,
                    time:
                      res.data.data.data3 == null
                        ? "暂无数据"
                        : res.data.data[dataArraw[i]].jckssj,
                    timeLine: that.objName[dataArraw[i]],
                    title: that.objName2[dataArraw[i]].titleName,
                    timeitem: [
                      {
                        title: that.objName2[dataArraw[i]].titleTime,
                        titleData:
                          res.data.data.data3 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jcrq
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleAddress,
                        titleData:
                          res.data.data.data3 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].dwdz
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleResult,
                        titleData:
                          res.data.data.data3 == null
                            ? "暂无数据"
                            : that.$store.state.enumData.jcjg[
                                res.data.data[dataArraw[i]].pdjg
                              ]
                      }
                    ]
                  };
                  let objData3 = {};
                  if (!(res.data.data.data3 == null)) {
                    for (let key in that.roadDataNameData2) {
                      if (key == "pdjg") {
                        objData3[key] =
                          res.data.data[dataArraw[i]][key] == 0
                            ? "不通过"
                            : "通过";
                      } else {
                        objData3[key] = res.data.data[dataArraw[i]][key];
                      }
                    }
                  }

                  that.roadDataNameData3Much = objData3;
                  arrawData.push(JSON.parse(JSON.stringify(obj3)));
                  break;
                case "data4":
                  let obj4 = {
                    type: dataArraw[i],
                    dataUnll: res.data.data.data4 == null ? false : true,
                    time:
                      res.data.data.data4 == null
                        ? "暂无数据"
                        : res.data.data[dataArraw[i]].jckssj,
                    timeLine: that.objName[dataArraw[i]],
                    title: that.objName2[dataArraw[i]].titleName,
                    timeitem: [
                      {
                        title: that.objName2[dataArraw[i]].titleTime,
                        titleData:
                          res.data.data.data4 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jcrq
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleAddress,
                        titleData:
                          res.data.data.data4 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].dwdz
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleResult,
                        titleData:
                          res.data.data.data4 == null
                            ? "暂无数据"
                            : that.$store.state.enumData.jcjg[
                                res.data.data[dataArraw[i]].pdjg
                              ]
                      }
                    ]
                  };
                  let objData4 = {};
                  if (!(res.data.data.data4 == null)) {
                    for (let key in that.roadDataNameData2) {
                      if (key == "pdjg") {
                        objData4[key] =
                          res.data.data[dataArraw[i]][key] == 0
                            ? "不通过"
                            : "通过";
                      } else {
                        objData4[key] = res.data.data[dataArraw[i]][key];
                      }
                    }
                  }

                  that.roadDataNameData4Much = objData4;
                  arrawData.push(JSON.parse(JSON.stringify(obj4)));
                  break;
                case "data5":
                  let obj5 = {
                    type: dataArraw[i],
                    dataUnll: res.data.data.data5 == null ? false : true,
                    time:
                      res.data.data.data5 == null
                        ? "暂无数据"
                        : res.data.data[dataArraw[i]].jckssj,
                    timeLine: that.objName[dataArraw[i]],
                    title: that.objName2[dataArraw[i]].titleName,
                    timeitem: [
                      {
                        title: that.objName2[dataArraw[i]].titleTime,
                        titleData:
                          res.data.data.data5 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jcsj
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleAddress,
                        titleData:
                          res.data.data.data5 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jcdd
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleResult,
                        titleData:
                          res.data.data.data5 == null
                            ? "暂无数据"
                            : that.$store.state.enumData.jcjg[
                                res.data.data[dataArraw[i]].cljg
                              ]
                      }
                    ]
                  };
                  let keys_head = Object.keys(that.roadDataName);
                  let headTwo = [];
                  if (!(res.data.data.data5 == null)) {
                    keys_head.forEach(function(item) {
                      let objRow5 = {};
                      objRow5["name"] = that.roadDataName[item];
                      if (item == "jcff") {
                        objRow5["valdata"] =
                          that.$store.state.enumData["jcff"][
                            res.data.data[dataArraw[i]][item]
                          ];
                      } else if (item == "cljg") {
                        objRow5["valdata"] =
                          that.$store.state.enumData["jcjg"][
                            res.data.data[dataArraw[i]]["cljg"]
                          ];
                      } else if (item == "rlzl") {
                        objRow5["valdata"] =
                          that.$store.state.enumData["rlzl"][
                            res.data.data[dataArraw[i]][item]
                          ];
                      } else {
                        objRow5["valdata"] = res.data.data[dataArraw[i]][item];
                      }

                      headTwo.push(JSON.parse(JSON.stringify(objRow5)));
                    });
                  }

                  that.data5MuchData = headTwo;
                  arrawData.push(JSON.parse(JSON.stringify(obj5)));
                  break;
                case "data6":
                  let obj6 = {
                    type: dataArraw[i],
                    dataUnll: res.data.data.data6 == null ? false : true,
                    time:
                      res.data.data.data6 == null
                        ? "暂无数据"
                        : res.data.data[dataArraw[i]].jckssj,
                    timeLine: that.objName[dataArraw[i]],
                    title: that.objName2[dataArraw[i]].titleName,
                    timeitem: [
                      {
                        title: that.objName2[dataArraw[i]].titleTime,
                        titleData:
                          res.data.data.data6 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jcwcsj
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleAddress,
                        titleData:
                          res.data.data.data6 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jcdd
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleResult,
                        titleData:
                          res.data.data.data6 == null
                            ? "暂无数据"
                            : that.$store.state.enumData.jcjg[
                                res.data.data[dataArraw[i]].jcjg
                              ]
                      }
                    ]
                  };
                  let arrawObj6 = [];
                  if (!(res.data.data.data6 == null)) {
                    for (let keys in that.roadDataName6) {
                      let obj6s = {};
                      obj6s["name"] = that.roadDataName6[keys];
                      if (keys == "sfjzcf") {
                        obj6s["valdata"] =
                          res.data.data[dataArraw[i]][keys] == "1"
                            ? "是"
                            : "否";
                      } else if (keys == "cfdjs") {
                        obj6s["valdata"] =
                          res.data.data[dataArraw[i]][keys] == "1"
                            ? "已寄送"
                            : "未寄送";
                      } else if (keys == "jkdjs") {
                        obj6s["valdata"] =
                          res.data.data[dataArraw[i]][keys] == "1"
                            ? "已寄送"
                            : "未寄送";
                      } else if (keys == "cfzt") {
                        obj6s["valdata"] =
                          that.$store.state.enumData.cfzt[
                            res.data.data[dataArraw[i]][keys]
                          ];
                      } else if (keys == "jcjg") {
                        obj6s["valdata"] =
                          that.$store.state.enumData.jcjg[
                            res.data.data[dataArraw[i]][keys]
                          ];
                      } else if (keys == "zgzt") {
                        obj6s["valdata"] =
                          that.$store.state.enumData.zgzt[
                            res.data.data[dataArraw[i]][keys]
                          ];
                      } else {
                        obj6s["valdata"] = res.data.data[dataArraw[i]][keys];
                      }

                      arrawObj6.push(JSON.parse(JSON.stringify(obj6s)));
                    }
                  }

                  that.data6MuchData = arrawObj6;

                  arrawData.push(JSON.parse(JSON.stringify(obj6)));
                  break;
                case "data7":
                  let obj7 = {
                    type: dataArraw[i],
                    dataUnll: res.data.data.data7 == null ? false : true,
                    time:
                      res.data.data.data7 == null
                        ? "暂无数据"
                        : res.data.data[dataArraw[i]].jckssj,
                    timeLine: that.objName[dataArraw[i]],
                    title: that.objName2[dataArraw[i]].titleName,
                    timeitem: [
                      {
                        title: that.objName2[dataArraw[i]].titleTime,
                        titleData:
                          res.data.data.data7 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jckssj
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleAddress,
                        titleData:
                          res.data.data.data7 == null
                            ? "暂无数据"
                            : res.data.data[dataArraw[i]].jczxxdz
                      },
                      {
                        title: that.objName2[dataArraw[i]].titleResult,
                        titleData:
                          res.data.data.data7 == null
                            ? "暂无数据"
                            : that.$store.state.enumData.jcjg[
                                res.data.data[dataArraw[i]].jcjg
                              ]
                      }
                    ]
                  };
                  arrawData.push(JSON.parse(JSON.stringify(obj7)));
                  break;
              }
            }
            that.timeList = arrawData;
            that.rowDataLine = useArraw;
            console.log(that.timeList);
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "查看详情请求失败!"
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
    /**
     * @description 关闭组件
     * @author lifei
     * @version 2019.5.29
     */
    close() {
      this.diaSta = false;
    },
    /**
     * @description 重置
     * @author lifei
     * @version 2019.5.29
     */
    resetData() {
      let keys_ = Object.keys(this.dataQuailty);
      for (let i = 0; i < keys_.length; i++) {
        this.dataQuailty[keys_[i]] = "";
      }
    }
  }
};
</script>
<style scoped>
.time_line {
  padding-top: 80px;
}
.time_data {
  margin-right: 15%;
  padding-top: 98px;
}
.time_ {
  width: 285px;
  height: 260px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.parent_div {
  width: 100%;
  display: flex;
  justify-content: center;
}
.inner_div {
  width: 56px;
  height: 56px;
  border: solid 4px #e9edf0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #01c8b3;
  color: white;
  font-size: 20px;
}
.parent_border_div {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 56px;
  display: flex;
  justify-content: center;
}
.border_div {
  height: 135px;
  width: 10px;
  border-right: dashed 5px #7cc3f9;
}
.parent_content_div {
  cursor: pointer;
  width: 292px;
  height: 156px;
  border: solid 2px #5db6f8;
  margin-left: 50px;
  border-radius: 10px;
  margin-bottom: 105px;
}
.content_title {
  text-align: center;
  line-height: 30px;
  background-color: #5db6f8;
  width: 100%;
  height: 30px;
  color: white;
  font-size: 15px;
}
.txt_parent_div {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 12px;
}
</style>

