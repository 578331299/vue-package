<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose" v-show="pictureShow">
      <!--<div class="content1_box">-->
      <div class="clouse_box" @click.stop>
        <img src="image/clouse.png" @click="handleClose" alt>
      </div>
      <!--<div class="title_box">
          <span>查看大图</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
          </div>
      </div>-->
      <div class="big_small" @click.stop>
        <span @click="bigFun(50)">放大</span>
        <span @click="bigFun(-50)">缩小</span>
      </div>
      <span class="icon-jiantou left_ico" @click.stop @click="leftFun(-1)"></span>
      <span class="icon-jiantou right_ico" @click.stop @click="leftFun(1)"></span>
      <img ref="imgDem" :src="pictureData.url[arrSize]" class="picture_size" alt="图片加载错误">
      <!--<div class="cont_xi">

          
      </div>-->
      <!--</div>-->
    </div>
  </transition>
</template>
<script>
export default {
  name: "pictureBig",
  props: {
    pictureData: Object
  },
  data() {
    return {
      pictureShow: false,
      arrSize: 0
    };
  },
  mounted() {
    //console.log(this.updataData);
  },
  methods: {
    /**
     * @description 组件打开关闭
     * @author lifei
     * @version 2019.6.04
     */
    handleClose() {
      this.pictureShow = !this.pictureShow;
    },
    /**
     * @description 图片放大缩小
     * @author lifei
     * @version 2019.6.04
     */
    bigFun(num) {
      console.log(this.$refs.imgDem);
      if (num > 0) {
        if (this.$refs.imgDem.clientWidth > document.body.clientWidth) {
          this.$message({
            type: "warning",
            message: "图片已经很大了，不能在放大了!"
          });
        } else {
          this.$refs.imgDem.style.width =
            this.$refs.imgDem.clientWidth + 50 + "px";
        }
      }

      if (num < 0) {
        if (this.$refs.imgDem.clientWidth < 500) {
          this.$message({
            type: "warning",
            message: "图片已经很小了，不能在缩小了!"
          });
        } else {
          this.$refs.imgDem.style.width =
            this.$refs.imgDem.clientWidth - 50 + "px";
        }
      }
    },
    /**
     * @description 图片左右移动
     * @author lifei
     * @version 2019.6.04
     */
    leftFun(num) {
      if (num < 0) {
        if (this.arrSize > 0) {
          this.arrSize -= 1;
        } else {
          this.arrSize = this.pictureData.url.length - 1;
        }
      }
      if (num > 0) {
        if (this.arrSize < this.pictureData.url.length - 1) {
          this.arrSize += 1;
        } else {
          this.arrSize = 0;
        }
      }
    }
  }
};
</script>
<style scoped>
.detailedInformation_box {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(52, 52, 52, 0.9);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content1_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.title_box {
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
/*.clouse_box{
  
  border: 1px solid #fff;
  border-radius: 50%;
 
  
  color: #fff;
}*/
.clouse_box > img {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 101;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.cont_xi {
  padding: 35px;
  box-sizing: border-box;
  width: 100%;
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
.bottom_but_box {
  text-align: center;
  padding: 30px;
}
.every_input {
  position: relative;
}
.every_span {
  color: red;
  position: absolute;
  top: 26px;
  left: 5px;
  font-size: 12px;
}
.picture_size {
}
.big_small {
  position: absolute;
  top: 50px;
  right: 15px;
  color: #01c8b3;
  z-index: 102;
  padding: 30px 0 30px 30px;
}
.big_small > span {
  margin-left: 15px;
  cursor: pointer;
  font-size: 20px;
}
.left_ico {
  font-size: 50px;
  transform: rotate(-90deg);
  position: absolute;
  left: 30px;
  cursor: pointer;
}
.right_ico {
  font-size: 50px;
  transform: rotate(90deg);
  position: absolute;
  right: 30px;
  cursor: pointer;
}
</style>


