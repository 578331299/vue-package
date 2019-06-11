<template>
  <transition name="fade">
    <div class="detailedInformation-box" @click="handleClose" v-if="diaSta">
      <div class="content1-box" @click.stop>
        <div class="title-box">
          <span>{{title}}</span>
          <div class="clouse-box">
            <img src="image/clouse.png" @click="handleClose" alt>
            <!--<span class="spanclick" ></span>-->
          </div>
        </div>
        <div class="cont-xi">
          <div class="threeLisc-box">
            <div class="every-cont" v-for="(item1) in headTwo" :key="item1.index">
              <div class="key_box">{{item1.name}}</div>
              <div class="value_box">{{item1.valdata}}</div>
            </div>
            <div class="every-cont" v-for="(item2) in updataData" :key="item2.index">
              <div class="key_box">{{item2.name}}</div>
              <div class="value_box">{{item2.valdata}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "roadInformation",
  methods: {
    handleClose() {
      this.diaSta = !this.diaSta;
    }
  },
  data() {
    return {
      diaSta: false
    };
  },
  props: {
    title: String,
    updataData: Array,
    headTwo: Array
  },
  watch: {
    updataData(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        //this.dataList=newVal;
        //this.dataList = JSON.parse(JSON.stringify(newVal));
      }
    }
  },
  mounted() {
    //console.log(this.updataData);
  }
};
</script>
<style scoped>
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
  width: 800px;
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
.threeLisc-box {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border: 1px solid #ebeef5;
}
.every-cont {
  width: 50%;
  box-sizing: border-box;
  line-height: 30px;
  padding-left: 10px;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  top: 1px;
  display: flex;
}
.every-cont:nth-child(2n) {
  border-right: none;
}
.key_box {
  width: 50%;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}
.value_box {
  width: 50%;
  padding-left: 10px;
  border-left: 1px solid #ebeef5;
}
</style>


