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
          <div class="xxtext">
            <div class="everyText" v-for="item in information" :key="item.index">
              <span>{{item.name}}：</span>
              <span class="value-span">{{item[item.key]}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <img src="../../assets/img/car.png" width="50%" height="260px" alt>
          <img src="../../assets/img/car.png" width="50%" height="260px" alt>
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
  name: "blackInformation",
  data() {
    return {
      detailedInformationBool: false,
      informationName: {
        hphm: "车牌号码",
        hpzl: "车牌种类",
        hpys: "车牌颜色",
        scnf: "生产年份",
        czxm: "车主姓名",
        cyzz: "常用地址",
        sjhm: "手机号码",
        qzsj: "取证时间",
        qzdd: "取证地点",
        sfsc: "是否删除",
        cjsj: "创建时间",
        bz: "备注",
        lgmhd: "林格曼黑度",
        sfsh: "是否审核",
        bh: "编号",
        tp1: "图片1文件名",
        tp2: "图片2文件名",
        sp1: "视频1文件名",
        sjly:"数据来源"

      },
      information: []
    };
  },
  methods: {
    returnAlert(rowVal) {
      for(let i in rowVal){
        if(i=="sjly"){
          rowVal[i]==2?rowVal[i]="遥感系统":rowVal[i]="手动导入";
        }
      }
      this.detailedInformationBool = !this.detailedInformationBool;
      let arr = [];
      for (let i in this.informationName) {
        let obj1 = {};
        obj1[i] = rowVal[i];
        obj1.name = this.informationName[i];
        obj1.key = i;
        arr.push(JSON.parse(JSON.stringify(obj1)));
      }
    //  console.log(JSON.stringify(arr))
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
.value-span{
  word-break: break-all;


}
.content1_box {
  width: 1140px;
  height: 645px;
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