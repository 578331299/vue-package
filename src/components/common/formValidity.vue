<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose" v-show="formDataShow">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>{{title}}</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
          </div>
        </div>
        <div class="cont_xi">
          <div>
            <el-form :label-position="labelPosition" label-width="100px">
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="失效原因">
                    <el-select
                      v-model="inputFormData.sxyy"
                      style="width:485px"
                      placeholder="选择失效原因"
                    >
                      <el-option
                        v-for="item in $store.state.enumSelection.sxyy"
                        :key="item.value"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.sxyy}}</span>
                <span class="red_must">*</span>
              </div>
            </el-form>
            <div class="bottom_but_box">
              <el-button type="primary" @click="saveData">保存</el-button>
              <el-button type="primary" @click="resetClick">重置</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "formValidity",

  props: {
    title: String,
    rowId: String
  },
  data() {
    return {
      labelPosition: "left",
      formDataShow: false,
      inputFormData: { sxyy: "" },
      alertFormData: { sxyy: "" }
    };
  },
  mounted() {
    //console.log(this.$store.state.enumData.sxyy);
  },
  methods: {
    handleClose() {
      this.formDataShow = !this.formDataShow;
    },
    handleCloseMust() {
      this.formDataShow = false;
    },
    saveData() {
      if (this.inputFormData.sxyy == "") {
        this.alertFormData.sxyy = "提交前请选择失效原因！";
        return;
      }
      let obj = {
        id: this.rowId,
        sfyx: 0,
        sxyy: this.inputFormData.sxyy
      };
      this.$parent.axiosTrueFalseFun(obj);

    },
    resetClick() {
      this.inputFormData.sxyy = "";
      this.alertFormData.sxyy = "";
    }
  }
};
</script>
<style scoped>
.detailedInformation_box {
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
.content1_box {
  width: 655px;
  background: #fff;
  border-radius: 10px;
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
  top: 34px;
  left: 100px;
  font-size: 12px;
}
.every_span1 {
  color: red;
  position: absolute;
  top: 50px;
  left: 100px;
  font-size: 12px;
}
.flex_div {
  display: flex;
}
.demonstration {
  color: #606266;
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
}
.red_must {
  color: red;
  position: absolute;
  right: -10px;
  top: 10px;
}
</style>


