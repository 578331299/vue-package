<!------------------------------------------------------------------
 * @description 环检站数据查询的详情显示弹框组件，分为三列式布局展现
 * @author lifei
 * @version 2019.04.26
 * @ title rowData  threeData  这三个值依赖父组件的传递才有值，
 * @function handleClose 点击关闭或打开当前组件
 * @function showPage 父组件执行处发，并带有相应的值
------------------------------------------------------------------->
<template>
  <div class="detailedInformation-box" @click="handleClose" v-if="dialogVisible">
    <div class="content1-box" @click.stop>
      <div class="title-box">
        <span>{{title}}</span>
        <div class="clouse-box">
          <img src="image/clouse.png" @click="handleClose" alt>
        </div>
      </div>
      <div class="cont-xi">
        <div class="threeLisc-box">
          <div class="every-cont">{{threeData[0].JCLSH}}:{{rowData.jclsh}}</div>
          <div class="every-cont">{{threeData[0].jcwcsj}}:{{rowData.jcjgscsj}}</div>
        </div>
        <div class="threeLisc-box margin-top border_one">
          <div class="every-cont border_two">
            <div class="every-box border_three" v-for="(item1,val) in threeData[1]" :key="item1">
              <div class="key_box">{{item1}}</div>
              <div class="value_box">{{rowData[val.toLowerCase()]}}</div>
            </div>
          </div>
          <div class="every-cont border_two">
            <div class="every-box border_three" v-for="(item2,val) in threeData[2]" :key="item2">
              <div class="key_box">{{item2}}</div>
              <div class="value_box">{{rowData[val.toLowerCase()]}}</div>
            </div>
          </div>
          <div class="every-cont">
            <div class="every-box border_three" v-for="(item3,val) in threeData[3]" :key="item3">
              <div class="key_box">{{item3}}</div>
              <div class="value_box">{{rowData[val.toLowerCase()]}}</div>
            </div>
          </div>
        </div>
        <div
          class="threeLisc-box border_one mar_top"
          style="border-bottom:1px solid #EBEEF5"
          v-if="JSON.stringify(tableYc).replace(/\s+/g, '') != '{}'"
        >
          <div v-for="(value,key,index) in tableYc" :key="index" class="up_row_style every-box">
            <div class="key2_box">{{value}}</div>
            <div class="value2_box">{{lineRow[key]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "threeList",
  props: {
    tableYc: Object
  },
  data() {
    return {
      dialogVisible: false,
      title: "",
      threeData: [],
      rowData: {},
      lineRow: {}
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
    },
    showPage(row, title, threeData, lineRow) {
      this.title = title;
      this.rowData = row;
      this.threeData = threeData;
      this.lineRow = lineRow;
      this.handleClose();
    }
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
  padding: 35px;
  box-sizing: border-box;
  width: 100%;
  max-height: 600px;
  overflow: auto;
}

.xiang-box {
  padding-left: 20px;
}
.threeLisc-box {
  display: flex;
  flex-wrap: wrap;
}
.every-cont {
  flex: 1;
  line-height: 25px;
  font-size: 14px;
}
.margin-top {
  margin-top: 20px;
}
.every-box {
  line-height: 30px;
  padding-left: 10px;
  display: flex;
}
.border_one {
  border: 1px solid #ebeef5;
  border-bottom: none;
}
.border_two {
  border-right: 1px solid #ebeef5;
}
.border_three {
  border-bottom: 1px solid #ebeef5;
}
.up_row_style {
  box-sizing: border-box;
  width: 50%;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  top: 1px;
}
.up_row_style:nth-child(2n) {
  border-left: 1px solid #ebeef5;
}
.mar_top {
  margin-top: 15px;
}
.key_box {
  width: 70%;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}
.value_box {
  width: 30%;
  padding-left: 10px;
  box-sizing: border-box;
  border-left: 1px solid #ebeef5;
}
.key2_box {
  width: 50%;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}
.value2_box {
  width: 50%;
  padding-left: 10px;
  box-sizing: border-box;
  border-left: 1px solid #ebeef5;
}
</style>

