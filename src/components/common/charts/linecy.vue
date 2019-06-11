<template>
  <div id="lineCylindrical"></div>
</template>
<script>
export default {
  name:"vLinecy",
  data() {
    return {
        
    };
  },
  props: {
    lineCylindricalData:Object,
    styleData:Object
  },
  methods: {
    lineCylindricalFn() {
      let dom = document.getElementById("lineCylindrical");
      dom.style.width=this.styleData.width;
      dom.style.height=this.styleData.height;
      let myChart = this.$echarts.init(dom);
      let option = null;
      option = this.lineCylindricalData;
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    }
  },
  mounted() {
      this.lineCylindricalFn();
  }
};
</script>
<style>
</style>

