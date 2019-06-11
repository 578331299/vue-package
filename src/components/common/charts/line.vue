<template>
  <div :id="lineId"></div>
</template>
<script>
export default {
  name:"vLine",
  data() {
    return {
        
    };
  },
  props: {
    lineData:Object,
    styleData:Object,
    lineId:String
  },
  methods: {
    line() {
      let id=this.lineId;
      let dom = document.getElementById(id);
      dom.style.width=this.styleData.width;
      dom.style.height=this.styleData.height;
      let myChart = this.$echarts.init(dom);
      let app = {};
      let option = null;
      option = this.lineData;
      if (option && typeof option === "object"){
        myChart.setOption(option, true);
      }
    }
  },
  mounted() {
      this.line();
  },
  watch:{
    lineData(newVal,oldVal){
        if(JSON.stringify(newVal)!==JSON.stringify(oldVal)){
         // alert(1)
          this.line();
        }
    }
  }
};
</script>
<style>
</style>

