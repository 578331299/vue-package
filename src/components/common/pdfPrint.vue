<template>
  <transition name="fade">
    <div class="detailedInformation-box" @click="handleClose()" v-if="diaSta">
      <div class="content1-box" @click.stop>
        <div class="title-box">
          <span>{{title}}</span>
          <div class="clouse-box">
            <img src="image/clouse.png" @click="handleClose" alt>
            <!--<span class="spanclick" ></span>-->
          </div>
        </div>
        <div class="cont-xi">
          <div class="iframe-container">
            <iframe frameborder="0" width="100%" height="500" :src="frameSrc"></iframe>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "information",
  methods: {
    openDialog() {},
    handleClose() {
      // this.diaSta= false;
      this.$emit("dialogClose", false);
    }
  },
  data() {
    return {
      // diaSta: false,
      dataList: [1, 2],
      frameSrc: ""
    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    updataData: Array,
    src:String
  },
  watch: {
    src(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        let flag= JSON.parse(JSON.stringify(newVal));
        this.frameSrc="pdf/web/viewer.html?file="+encodeURIComponent(flag)+"";
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
 .iframe-container{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.detailedInformation-box {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(52, 52, 52, 0.5);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content1-box {
  width: 900px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.title-box {
  width: 100%;
  height: 60px;
  background: #01c8b3;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  font-weight: 700;
  position: relative;
}
/*.clouse-box{
  
  border: 1px solid #fff;
  border-radius: 50%;
 
  
  color: #fff;
}*/
.clouse-box > img {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 101;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.cont-xi {
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  max-height: 600px;
  overflow: auto;
}
.evbox {
  display: flex;
  line-height: 40px;
}
.baitiao {
  width: 5px;
  height: 100%;
  background-color: #fff;
  color: #fff;
}
</style>


