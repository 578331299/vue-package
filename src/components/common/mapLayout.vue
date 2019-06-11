<template>
  <div class="mapLaout_box">
    <div class="left">
      <div class="title1 title">实时空气质量指数</div>
      <div class="content_box">
        <div class="numberTe" :style="{color:mapdata.color}">{{mapdata.AQI}}</div>
        <div class="detailed">
          <p>首要污染物：{{mapdata.firstContaminants}}</p>
          <p>污染级别：{{mapdata.pollutionLevel}}级</p>
          <p>空气质量：{{mapdata.pollutionState}}</p>
        </div>
      </div>
      <div class="introduce">
        <p>
          <span>对健康的影响：</span>
          {{mapdata.healthEffects}}
        </p>
        <p>
          <span>建议措施：</span>
          {{mapdata.proposal}}
        </p>
      </div>
    </div>
    <div class="right">
      <div class="title2 title">污染物空气质量分指数</div>
      <div class="progress_bar" v-for="item in mapdata.everyContaminants" :key="item.index">
        <div class="progress_bar_lift">{{item.name}}</div>
        <div class="progress_bar_right">{{item.number}}</div>
        <div class="length">
          <div :style="{backgroundColor:item.color,width:(item.number/300)*100+'%',height:'10px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    mapdata: Object
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.mapLaout_box {
  width: 553px;
  display: flex;
  font-size: 0;
  background-image: url(../../assets/img/bg.png);
  background-repeat: no-repeat;
}

.left {
  padding: 15px;
  width: 330px;
  position: relative;
}

.content_box {
  display: flex;
}

.title {
  font-size: 14px;
  font-weight: 700;
}
.title1 {
  position: absolute;
  left: 58px;
  top: 11px;
  color: #fff;
}
.title2 {
  padding-left: 40px;
  padding-top: 10px;
}

.numberTe {
  font-size: 50px;
  padding-top: 50px;
  width: 100px;
  text-align: center;
  font-weight: 700;
  color: #ffff00;
}

.detailed {
  font-size: 12px;
  padding: 20px 10px;
  position: relative;
  left: 12px;
  top: 25px;
  color: #fff;
}

.detailed > p {
  margin-bottom: 5px;
}

.introduce {
  font-size: 12px;
  position: relative;
  padding-top: 55px;
}

.introduce > p {
  line-height: 20px;
}

.introduce > p > span {
  color: #598ee5;
}

.progress_bar {
  position: relative;
  font-size: 12px;
  height: 25px;
  padding-top: 8px;
  padding-left: 23px;
  width: 155px;
}
.length {
  width: 100%;
  height: 10px;
  background: #fff;
  position: relative;
  top: 20px;
  overflow: hidden;
}
.progress_bar_lift {
  position: absolute;
  left: 23px;
  top: 15px;
}
.progress_bar_right {
  position: absolute;
  right: 0px;
  top: 15px;
}
</style>

