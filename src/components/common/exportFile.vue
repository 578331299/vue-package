<template>
  <transition name="fade">
    <div class="detailedInformation-box" @click="handleClose()" v-show="exportFileShow">
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
            <div>
              <div>
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                  style="padding-left:20px;"
                >全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedData" @change="handleCheckedCitiesChange">
                  <div
                    v-for="(item,index) in updataData"
                    :key="item.index"
                    class="evbox"
                    :style="{background: (index%2 != 0 ? '#fff':'#e4f3fe')}"
                  >
                    <el-checkbox :label="item.name">{{item[item.name]}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="bottom-but-box">
            <el-button type="primary" @click="saveData('pdf')">导出pdf </el-button>
            <el-button @click="saveData('excell')" type="primary">导出Excell</el-button>
            <el-button type="primary" @click="handleClose">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
let checkedOptions = [];
export default {
  name: "exportFile",

  data() {
    return {
      checkedData: [],
      checkAll: false,
      checkedDataAll: [],
      isIndeterminate: true,
      exportFileShow: false,
      title: "选择需要导出的字段"
    };
  },
  props: {
    pdfOrExcell: String,
    updataData:Array,
    nameObj:Object
  },
  watch: {},

  mounted() {
    this.mountedFun();
  },
  methods: {
    openDialog() {},
    handleClose() {
      // this.diaSta= false;
      this.exportFileShow = !this.exportFileShow;
    },
    handleCheckAllChange(val) {
      console.log(checkedOptions);
      this.checkedData = val ? checkedOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedDataAll.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkedDataAll.length;
    },
    saveData(typeString) {
      let that = this;
      let objData = {};
      if (this.checkedData.length < 1) {
        that.$message({
          type: "warning",
          message: "最少选择一条数据!"
        });
        return;
      }
      for (let i = 0; i < this.checkedData.length; i++) {
        objData[this.checkedData[i]] = this.nameObj[this.checkedData[i]];
      }
      if (typeString == "pdf") {
        this.$parent.upload_pdf(objData);
      } else {
        this.$parent.upload_excel(objData);
      }
    },
    mountedFun() {
      checkedOptions = [];
      this.checkedData = [];
      for (let i = 0; i < this.updataData.length; i++) {
        checkedOptions.push(this.updataData[i].name);
        if (this.updataData[i].check) {
          this.checkedData.push(this.updataData[i].name);
        }
        //debugger;
      }
      this.checkedDataAll = checkedOptions;
      //console.log(this.checkedDataAll);
    }
  }
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
  overflow: auto;
}
.evbox {
  display: flex;
  line-height: 40px;
  padding-left: 20px;
}
.baitiao {
  width: 5px;
  height: 100%;
  background-color: #fff;
  color: #fff;
}
.cont_xi_lf {
  width: 100%;
  height: 340px;
}
.bottom-but-box {
  padding-top: 10px;
  text-align: center;
  padding-bottom: 10px;
}
.wid30 {
  width: 33.3333%;
}
</style>


