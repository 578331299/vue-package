<template>
  <div class="detailedInformation_box" @click="clouse($event)" v-if="detailedInformationBool">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <div class="title1 titleEv" style="width:20%">详细信息</div>
        <div class="title2 titleEv" style="width:30%">
          <!-- <span class="spanclick">
            <span class="icon-jiantou icoStyle"></span>上一条
          </span> -->
        </div>
        <div class="title3 titleEv" style="width:30%">
          <!-- <span class="spanclick">
            <span class="icon-jiantou1 icoStyle"></span>下一条
          </span> -->
        </div>
        <div class="title4 titleEv" style="width:20%">
          <span class="spanclick" @click="returnAlert">
            <span class="icon-fanhui icoStyle"></span>返回
          </span>
        </div>
      </div>
      <div class="title2_box">
        <div class="left">
          <div class="xxtext" style="overflow:auto">
            <div class="everyText" v-for="item in information" :key="item.index">
              <span>{{item.name}}：</span>
              <span>{{item[item.key]}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <img src="../../assets/img/car.png" width="50%" height="300px" alt>
          <img src="../../assets/img/car.png" width="50%" height="300px" alt>
          <div style="background:#000; wihth:100%;">
            <video width="100%" id="video" controls>
              <source src="../../assets/img/vi.mp4" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailedInformation",
  data() {
    return {
      detailedInformationBool: false,
      informationName: {
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
        hjwd: "环境温度(℃)",
        sd: "湿度(%)",
        dqy: "大气压(kpa)",
        gjxxbh: "轨迹信息编号",
        tp1: "图像1文件名",
        tp2: "图像2文件名",
        sp3: "视频1文件名",
        ygjtsj: "遥感具体数据"
      },
      information: []
    };
  },
  methods: {
    returnAlert(rowVal) {
      this.detailedInformationBool = !this.detailedInformationBool;
      let arr = [];
      for (let i in this.informationName) {
        let obj1 = {};
        obj1[i] = rowVal[i];
        obj1.name = this.informationName[i];
        obj1.key = i;
        arr.push(JSON.parse(JSON.stringify(obj1)));
      }
     
      this.information = arr;

      if (document.getElementById("video")) {
        document.getElementById("video").pause();
      }
    },
    clouse(e) {
      this.detailedInformationBool = !this.detailedInformationBool;
      if (document.getElementById("video")) {
        document.getElementById("video").pause();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@base: #f938ab;
.detailedInformation_box {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(52, 52, 52, 0.5);
  z-index: 999;
}
.content1_box {
  width: 1080px;
  height: 675px;
  background: #eeeeee;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
}
.title_box {
  display: flex;
  padding: 20px;
  background: #fff;
}
.title2_box {
  display: flex;
  padding: 20px;
}
.title1,
.title4 {
  width: 20%;
}
.title2,
.title3 {
  width: 30%;
  text-align: center;
}
.title1 {
  text-align: left;
}
.title4 {
  text-align: right;
}
.titleEv {
  vertical-align: bottom;
}
.icoStyle {
  font-size: 20px;
  color: #000;
  position: relative;
  top: 3px;
  right: 3px;
}
.spanclick {
  cursor: pointer;
}
.left {
  width: 48%;
  background: #fff;
  padding: 20px;
}
.right {
  width: 50%;
  margin-left: 2%;
  background: #fff;
  height: 390px;
  font-size: 0;
  height: 540px;
}
.pText {
  line-height: 25px;
}
.xxtext {
  display: flex;
  flex-wrap: wrap;
}
.everyText {
  width: 50%;
  line-height: 25px;
}
</style>