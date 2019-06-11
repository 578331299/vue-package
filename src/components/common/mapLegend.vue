<template>
  <div class="mapLegend" :style="positionLR">
    <div class="every" v-for="item in legendData" :key="item.index">
      <div class="text">{{item.text}}</div>
      <div class="legend" :style="{backgroundColor:item.color}"></div>
      <div class="number">{{item.number}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mapLegend",
  data() {
    return {
      legendData: [
        { text: "严重污染",color:"#8E0804",number:">300" },
        { text: "重度污染",color:"#8F0175",number:"201~300" },
        { text: "中度污染",color:"#FF0000",number:"151~200" },
        { text: "轻度污染",color:"#FF9003",number:"101~150" },
        { text: "良",color:"#FFFF23",number:"51~100" },
        { text: "优",color:"#04FF3F",number:"0~50" },
        ]
    };
  },
  props: {
    positionLR: Object
  }
};
</script>
<style scoped>
.mapLegend {
  position: absolute;
  font-size: 0;
}
.every {
  position: relative;
}
.text {
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 7px;
  width: 50px;
  text-align: right;
}
.legend {
  width: 10px;
  height: 30px;
  background-color: #04ff3f;
}
.number {
  font-size: 12px;
  width: 50px;
  position: absolute;
  top: 0;
  left: 10px;
}
</style>

