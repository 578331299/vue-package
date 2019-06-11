<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose" v-show="formEmissionShow">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>{{title}}</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
          </div>
        </div>
        <div class="cont_xi">
          <div>
            <el-form :label-position="labelPosition" label-width="135px" >
              <div class="every_input">
                <el-form-item label="发动机类型">
                  <el-input
                    v-model="inputFormData.fdjlx"
                    @keyup.enter.native="cursorChange('btgydbzzRef')"
                    @blur="dataVerification()"
                  ></el-input>
                  <span class="every_span">{{alertFormData.fdjlx}}</span>
                  <span class="red_must">*</span>
                </el-form-item>
              </div>
              <div class="every_input">
                <el-form-item label="不透光烟度标准值">
                  <el-input
                    v-model="inputFormData.btgydbzz"
                    @keyup.enter.native="cursorChange('glmhdbzzRef')"
                    ref="btgydbzzRef"
                    @blur="dataVerification()"
                  ></el-input>
                  <span class="every_span">{{alertFormData.btgydbzz}}</span>
                  <span class="red_must">*</span>
                </el-form-item>
              </div>
              <div class="every_input">
                <el-form-item label="林格曼黑度标准值">
                  <el-input
                    v-model="inputFormData.glmhdbzz"
                    @keyup.enter.native="cursorChange('notjndbzzRef')"
                    ref="glmhdbzzRef"
                    @blur="dataVerification()"
                  ></el-input>
                  <span class="every_span">{{alertFormData.glmhdbzz}}</span>
                  <span class="red_must">*</span>
                </el-form-item>
              </div>
              <div class="every_input">
                <el-form-item label="NO体积浓度标准值">
                  <el-input
                    v-model="inputFormData.notjndbzz"
                    @keyup.enter.native="cursorChange('cotjndbzzRef')"
                    ref="notjndbzzRef"
                    @blur="dataVerification()"
                  ></el-input>
                  <span class="every_span">{{alertFormData.fdjlx}}</span>
                  <span class="red_must">*</span>
                </el-form-item>
              </div>
              <div class="every_input">
                <el-form-item label="CO体积浓度标准值">
                  <el-input
                    v-model="inputFormData.cotjndbzz"
                    @keyup.enter.native="cursorChange('yybzRef')"
                    ref="cotjndbzzRef"
                    @blur="dataVerification()"
                  ></el-input>
                  <span class="every_span">{{alertFormData.cotjndbzz}}</span>
                  <span class="red_must">*</span>
                </el-form-item>
              </div>
              <div class="every_input">
                 <el-form-item label="引用标准">
                  <el-input
                    @keyup.enter.native="cursorChange('bzRef')"
                    type="textarea"
                    :rows="3"
                    v-model="inputFormData.yybz"
                    ref="yybzRef"
                    @blur="dataVerification()"
                  ></el-input>
                  <span class="every_span2" >{{alertFormData.yybz}}</span>
                  <span class="red_must2">*</span>
                </el-form-item>
              </div>
              <div class="every_input">
                <el-form-item label="备注">
                  <el-input
                    @keyup.enter.native="saveData()"
                    type="textarea"
                    :rows="3"
                    v-model="inputFormData.bz"
                    ref="bzRef"
                    @blur="dataVerification()"
                  ></el-input>
                  <span class="every_span2" >{{alertFormData.bz}}</span>
                  <span class="red_must2">*</span>
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
  name: "formEmission",

  props: {
    title: String,
    rowData: Object
  },
  data() {
    return {
      labelPosition: "left",
      sidebar: '排放限值维护',
      formEmissionShow: false,
      inputFormData: {
        fdjlx: "",
        btgydbzz: "",
        glmhdbzz: "",
        notjndbzz: "",
        cotjndbzz: "",
        yybz: "",
        bz: ""
      },
      alertFormData: {
        fdjlx: "",
        btgydbzz: "",
        glmhdbzz: "",
        notjndbzz: "",
        cotjndbzz: "",
        yybz: "",
        bz: ""
      }
    };
  },
  mounted() {
    //console.log(this.updataData);
  },
  methods: {
    handleClose() {
      this.formEmissionShow = !this.formEmissionShow;
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
        } else {
          this.$refs[ress][0].$el.querySelector("textarea").focus();
        }
      }
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
  width: 800px;
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
  max-height: 700px;
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
.red_must {
  color: red;
  position: absolute;
  right: -10px;
  top: 5px;
}
.red_must2 {
  color: red;
  position: absolute;
  right: -10px;
  top: 15px;
}
</style>


