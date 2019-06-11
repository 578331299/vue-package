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
          <div class="cont_xi_lf">
            <vuescroll :ops="ops" color="#5db6f8">
              <div>
                <div class="evbox" v-for="item in updataData" :key="item.key">
                  <div v-for="litItem in item" :key="litItem.index" class="wid50">
                    <div style="width:50%;text-align: right;padding-right:15px;">{{litItem.key}}</div>
                    <!--<div class="baitiao"></div>-->
                    <div style="padding-left:15px;width:50%;word-break:break-all;word-wrap:break-word;" class="border-right">{{litItem.values}}</div>
                  </div>
                </div>
              </div>
            </vuescroll>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import vuescroll from "vuescroll";
export default {
  name: "informationMuch",
  components: {
    vuescroll
  },
  methods: {
    openDialog() {},
    handleClose() {
      // this.diaSta= false;
      this.$emit("dialogClose", false);
    }
  },
  data() {
    return {
      ops: {
        bar: {
          background: "#5db6f8"
        }
      },
      dataList: [1, 2]
    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    updataData: Array
  },
  watch: {
    updataData(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        //this.dataList=newVal;
        this.dataList = JSON.parse(JSON.stringify(newVal));
        console.log(this.dataList)
        // console.log(this.updataData);
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.detailedInformation-box {
  position: fixed;
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
  max-height: 800px;
  overflow: auto;
}
.evbox {
  display: flex;
  line-height: 40px;
  border-left: 1px solid #ebeff6;
  border-top: 1px solid #ebeff6;
  border-right: 1px solid #ebeff6;
}
.evbox:last-child {
  border-bottom: 1px solid #ebeff6;
}
.baitiao {
  width: 5px;
  height: 100%;
  background-color: #fff;
  color: #fff;
}
.cont_xi_lf {
  width: 100%;
  /*height: 400px;*/
}
.wid50 {
  width: 380px;
  display: flex;
  line-height: 40px;
  border-right: 1px solid #ebeff6;
}
.wid50:nth-of-type(even){
  border-right:none;
}
.border-right{
  border-left: 1px solid #ebeff6;
}
</style>


