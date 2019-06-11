<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose" v-if="formDataShow">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>{{title}}</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
          </div>
        </div>
        <div class="cont_xi">
          <div>
            <el-form :label-position="labelPosition" label-width="80px">
              <div class="every_input" v-for="(items,index) in rowData" :key="items.lable">
                <el-form-item :label="items.lable" v-if="items.type === 'input'">
                  <el-input
                    v-model="items.val"
                    @keyup.enter.native="cursorChange(items.ref)"
                    :ref="items.nameRef"
                    @blur="dataVerification(items.regular,items.check,items.val,index)"
                    @input="e => items.val = $utils.validForbid (e)"
                  ></el-input>
                  <span class="every_span" v-show="items.textShow">{{items.alertText}}</span>
                  <span class="red_must" ng-if="items.mustInput">*</span>
                </el-form-item>
                <el-form-item :label="items.lable" v-if="items.type === 'textarea'">
                  <el-input
                    @keyup.enter.native="cursorChange(items.ref)"
                    type="textarea"
                    :rows="5"
                    v-model="items.val"
                    :ref="items.nameRef"
                    @blur="dataVerification(items.regular,items.check,items.val,index)"
                  ></el-input>
                  <span class="every_span2" v-show="items.textShow">{{items.alertText}}</span>
                  <span class="red_must2" ng-if="items.mustInput">*</span>
                </el-form-item>
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
  name: "formData",
  methods: {
    handleClose() {
      this.formDataShow = !this.formDataShow;
    },
    saveData() {
      let that = this;
      const loadingObj = this.$loading({
        lock: true,
        text: "数据保存中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let funP = function() {
        for (let i = 0; i < that.rowData.length; i++) {
          if (
            that.dataVerification(
              that.rowData[i].regular,
              that.rowData[i].check,
              that.rowData[i].val,
              i
            ) === false
          ) {
            return true;
          }
        }
      };
      if (funP()) {
        loadingObj.close();
        return;
      }
      let formdata = {};
      for (let i = 0; i < this.rowData.length; i++) {
        //console.log(this.rowData.keys+"----"+)
        formdata[this.rowData[i].keys] = this.rowData[i].val;
      }
      for (let item in this.saveDataForm) {
        if (item != "url") {
          formdata[item] = this.saveDataForm[item];
        }
      }
      this.$axios({
        method: "POST",
        url: that.saveDataForm.url,
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(formdata)
      })
        .then(function(res) {
          loadingObj.close();
          console.log(res);
          if (res.data.data === "error") {
            that.$message({
              type: "warning",
              message: res.data.msg
            });
          } else {
            that.$message({
              type: "success",
              message: "数据保存成功!"
            });
            that.$parent.axiosGetData();
            that.handleClose();
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "数据保存失败!"
          });
        });
    },
    dataVerification(regular, check, val, num) {
      if (check) {
        if (!regular.test(val)) {
          this.rowData[num].val = "";
          this.rowData[num].textShow = true;
          return false;
        } else {
          this.rowData[num].textShow = false;
          return true;
        }
      } else {
        return true;
      }
    },
    resetClick() {
      for (let i = 0; i < this.rowData.length; i++) {
        this.rowData[i].val = "";
      }
    },
    cursorChange(ress) {
      if (ress == "end") {
        this.saveData();
      } else {
        //debugger;
        if (this.$refs[ress][0].$el.querySelector("input")) {
          this.$refs[ress][0].$el.querySelector("input").focus();
        }else{
          this.$refs[ress][0].$el.querySelector("textarea").focus();
        }
      }
    }
  },
  props: {
    title: String,
    sidebar: String,
    rowData: Array,
    saveDataForm: Object
  },
  data() {
    return {
      labelPosition: "left",
      formDataShow: false,
      alertFormData: {}
    };
  },
  mounted() {
    //console.log(this.updataData);
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
  width: 500px;
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
  top: 26px;
  left: 5px;
  font-size: 12px;
}
.every_span2 {
}
.red_must{
  color: red;
  position: absolute;
  right: -10px;
  top: 5px;
}
.red_must2{
  color: red;
  position: absolute;
  right: -10px;
  top: 15px;
}
</style>


