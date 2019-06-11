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
            <el-form :label-position="labelPosition" label-width="100px">
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="限行日期选择">
                    <el-date-picker
                      v-model="inputFormData.qsxxrq"
                      @change="dataVerification('',inputFormData.qsxxrq,'qsxxrq')"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择限行开始日期"
                    ></el-date-picker>
                  </el-form-item>
                  <div>
                    <span class="demonstration">至</span>
                    <el-date-picker
                      v-model="inputFormData.jzxxrq"
                      @change="dataVerification('',inputFormData.jzxxrq,'jzxxrq')"
                      type="date"
                      placeholder="选择限行结束日期"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <span class="every_span">{{alertFormData.qsxxrq}}</span>
                <span class="red_must" ng-if="items.mustInput">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="限行时段选择">
                    <el-time-select
                      v-model="inputFormData.ksxxsj"
                      @change="dataVerification('',inputFormData.ksxxsj,'ksxxsj')"
                      :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '24:00'
                        }"
                      value-format="hh:ss"
                      placeholder="选择限行时段开始时间"
                    ></el-time-select>
                  </el-form-item>
                  <div>
                    <span class="demonstration">至</span>
                    <el-time-select
                      v-model="inputFormData.jsxxsj"
                      @change="dataVerification('',inputFormData.jsxxsj,'jsxxsj')"
                      :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '24:00'
                        }"
                      placeholder="选择限行时段结束时间"
                      value-format="hh:ss"
                    ></el-time-select>
                  </div>
                </div>
                <span class="every_span">{{alertFormData.ksxxsj}}</span>
                <span class="red_must" ng-if="items.mustInput">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="限行区域">
                    <el-select
                      v-model="inputFormData.xxqy"
                      style="width:485px"
                      multiple
                      placeholder="选择限行区域"
                    >
                      <el-option
                        v-for="item in xxdwData"
                        :key="item.dwbh"
                        :label="item.dwmc"
                        :value="item.dwbh"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.xxqy}}</span>
                <span class="red_must" ng-if="items.mustInput">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="限行规则">
                    <el-select
                      v-model="inputFormData.xxgz"
                      style="width:485px"
                      placeholder="选择限行规则"
                    >
                      <el-option
                        v-for="item in xxgzData"
                        :key="item.value"
                        :label="item.xxgzmc"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.xxgz}}</span>
                <span class="red_must" ng-if="items.mustInput">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="排外车辆">
                    <el-select
                      v-model="inputFormData.pwcl"
                      style="width:485px"
                      multiple
                      placeholder="选择排外车辆"
                    >
                      <el-option
                        v-for="item in pwclObj"
                        :key="item.value"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.pwcl}}</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="发布日期">
                    <el-date-picker
                      v-model="inputFormData.fbrq"
                      style="width:485px"
                      multiple
                      placeholder="选择发布日期"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.fbrq}}</span>
                <span class="red_must" ng-if="items.mustInput">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="备注">
                    <el-input
                      type="textarea"
                      v-model="inputFormData.bz"
                      style="width:485px"
                      multiple
                      placeholder="填写备注"
                    ></el-input>
                  </el-form-item>
                </div>
                <span class="every_span1">{{alertFormData.bz}}</span>
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
  name: "formDataMuch",

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
      typArraw: [
        {
          regular: "",
          type: "qsxxrq"
        },
        {
          regular: "",
          type: "jzxxrq"
        },
        {
          regular: "",
          type: "jsxxsj"
        },
        {
          regular: "",
          type: "jsxxsj"
        },
        {
          regular: "",
          type: "xxqy"
        },
        {
          regular: "",
          type: "xxgz"
        },
        {
          regular: "",
          type: "wpcl"
        },
        {
          regular: "",
          type: "fbrq"
        },
        {
          regular: "",
          type: "bz"
        }
      ],
      alertFormData: {
        qsxxrq: "",
        jzxxrq: "",
        ksxxsj: "",
        jsxxsj: "",
        xxqy: "",
        xxgz: "",
        pwcl: "",
        fbrq: "",
        bz: ""
      },
      inputFormData: {
        qsxxrq: "",
        jzxxrq: "",
        ksxxsj: "",
        jsxxsj: "",
        xxqy: [],
        xxgz: [],
        pwcl: [],
        fbrq: "",
        bz: ""
      },
      xxdwData: [],
      xxgzData: [{ value: "1", text: "时段" }],
      pwclObj: []
    };
  },
  mounted() {
    this.carCalorfun("PWCL");
    this.dwcxfun();
    this.xxgzfun();
  },
  methods: {
    handleClose() {
      this.formDataShow = !this.formDataShow;
      if (!this.formDataShow) {
        this.resetClick();
      }
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
        for (let i = 0; i < that.typArraw.length; i++) {
          if (
            that.dataVerification(
              that.typArraw[i].regular,
              that.inputFormData[that.typArraw[i].type],
              that.typArraw[i].type
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
      that.inputFormData.sidebar = that.sidebar;
      let objData = {
        whr: localStorage.getItem("ms_username")
      };
      let keys_ = Object.keys(that.inputFormData);
      for (let i = 0; i < keys_.length; i++) {
        if (keys_[i] == "xxqy") {
          objData[keys_[i]] = that.inputFormData[keys_[i]].join();
        } else if (keys_[i] == "pwcl") {
          objData[keys_[i]] = that.inputFormData[keys_[i]].join();
        } else {
          objData[keys_[i]] = that.inputFormData[keys_[i]];
        }
      }

      console.log(objData);
      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/restrictRule/add",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(objData)
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
    dataVerification(regular, value, type) {
      let that = this;
      switch (type) {
        case "qsxxrq":
          if (
            that.inputFormData.qsxxrq == "" ||
            that.inputFormData.qsxxrq == "null" ||
            that.inputFormData.qsxxrq == null
          ) {
            that.alertFormData.qsxxrq = "请选择限行开始时间！";
            return false;
          }
          if (
            !(
              that.inputFormData.jzxxrq == "" ||
              that.inputFormData.jzxxrq == "null" ||
              that.inputFormData.jzxxrq == null
            )
          ) {
            let timeBegin = parseInt(
              that.inputFormData.qsxxrq.replace(/-/g, "")
            );
            let timeEnd = parseInt(that.inputFormData.jzxxrq.replace(/-/g, ""));

            if (timeBegin > timeEnd) {
              that.alertFormData.qsxxrq = "限行开始时间不能大于限行结束时间";
              that.inputFormData.qsxxrq = "";
              return false;
            } else {
              that.alertFormData.qsxxrq = "";
              return true;
            }
          }
          break;
        case "jzxxrq":
          if (
            that.inputFormData.jzxxrq == "" ||
            that.inputFormData.jzxxrq == "null" ||
            that.inputFormData.jzxxrq == null
          ) {
            that.alertFormData.qsxxrq = "请选择限行结束时间！";
            return false;
          }
          if (
            !(
              that.inputFormData.qsxxrq == "" ||
              that.inputFormData.qsxxrq == "null" ||
              that.inputFormData.qsxxrq == null
            )
          ) {
            let timeBegin = parseInt(
              that.inputFormData.qsxxrq.replace(/-/g, "")
            );
            let timeEnd = parseInt(that.inputFormData.jzxxrq.replace(/-/g, ""));
            if (timeBegin > timeEnd) {
              that.alertFormData.qsxxrq = "限行结束时间不能小于限行开始束时间";
              that.inputFormData.jzxxrq = "";
              return false;
            } else {
              that.alertFormData.qsxxrq = "";
              return true;
            }
          }
          break;
        case "ksxxsj":
          if (
            that.inputFormData.ksxxsj == "" ||
            that.inputFormData.ksxxsj == "null" ||
            that.inputFormData.ksxxsj == null
          ) {
            that.alertFormData.ksxxsj = "请选择限行时段开始时间！";
            return false;
          }
          if (
            !(
              that.inputFormData.jsxxsj == "" ||
              that.inputFormData.jsxxsj == "null" ||
              that.inputFormData.jsxxsj == null
            )
          ) {
            let timeBegin = parseInt(
              that.inputFormData.ksxxsj.replace(/:/g, "")
            );
            let timeEnd = parseInt(that.inputFormData.jsxxsj.replace(/-/g, ""));
            if (timeBegin > timeEnd) {
              that.alertFormData.ksxxsj =
                "限行时段开始时间不能大于限行时段结束时间";
              that.inputFormData.ksxxsj = "";
              return false;
            } else {
              that.alertFormData.ksxxsj = "";
              return true;
            }
          }
          break;
        case "jsxxsj":
          if (
            that.inputFormData.jsxxsj == "" ||
            that.inputFormData.jsxxsj == "null" ||
            that.inputFormData.jsxxsj == null
          ) {
            that.alertFormData.ksxxsj = "请选择限行时段结束时间！";
            return false;
          }
          if (
            !(
              that.inputFormData.ksxxsj == "" ||
              that.inputFormData.ksxxsj == "null" ||
              that.inputFormData.ksxxsj == null
            )
          ) {
            let timeBegin = parseInt(
              that.inputFormData.ksxxsj.replace(/-/g, "")
            );
            let timeEnd = parseInt(that.inputFormData.jsxxsj.replace(/-/g, ""));
            if (timeBegin > timeEnd) {
              that.alertFormData.ksxxsj =
                "限行时段结束时间不能小于限行时段开始束时间";
              that.inputFormData.jsxxsj = "";
              return false;
            } else {
              that.alertFormData.ksxxsj = "";
              return true;
            }
          }
          break;
        case "xxqy":
          if (that.inputFormData.xxqy.length < 1) {
            that.alertFormData.xxqy = "请选择限行区域！";
            return false;
          } else {
            that.alertFormData.xxqy = "";
            return true;
          }

          break;
        case "xxgz":
          if (that.inputFormData.xxgz.length < 1) {
            that.alertFormData.xxgz = "请选择限行规则！";
            return false;
          } else {
            that.alertFormData.xxgz = "";
            return true;
          }

          break;
        case "pwcl":
          /*if (that.inputFormData.pwcl.length < 1) {
            that.alertFormData.pwcl = "请选择排外车辆！";
            return false;
          } else {
            that.alertFormData.pwcl = "";
            return true;
          }*/
          return true;
          break;
        case "fbrq":
          if (
            that.inputFormData.fbrq == "" ||
            that.inputFormData.fbrq == null ||
            that.inputFormData.fbrq == "null"
          ) {
            that.alertFormData.fbrq = "请选择发布日期！";
            return false;
          } else {
            that.alertFormData.fbrq = "";
            return true;
          }

          break;
        case "bz":
          /*if (that.inputFormData.bz == "") {
            that.alertFormData.bz = "请填写备注！";
            return false;
          } else {
            that.alertFormData.bz = "";
            return true;
          }*/
          return true;

          break;
      }
    },
    resetClick() {
      let keys_ = Object.keys(this.inputFormData);
      for (let i = 0; i < keys_.length; i++) {
        if (keys_[i] == "xxqy" || keys_[i] == "pwcl") {
          this.inputFormData[keys_[i]] = [];
          this.alertFormData[keys_[i]] = "";
        } else {
          this.inputFormData[keys_[i]] = "";
          this.alertFormData[keys_[i]] = "";
        }
      }
    },

    carCalorfun(type) {
      let that = this;
      let obj = {};
      obj.lx = type;
      obj.sidebar = this.sidebar;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/enum/select",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          if (res.data) {
            if (type === "PWCL") {
              that.pwclObj = res.data.data;
            }
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    dwcxfun() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/point/getAll",
        params: {
          sidebar: that.sidebar
        }
      })
        .then(function(res) {
          console.log(res.data.data);
          if (res.data) {
            that.xxdwData = res.data.data;
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "点位查询失败!"
          });
        });
    },
    xxgzfun() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/resDrivingRuleSet/select",
        params: {
          sidebar: that.sidebar
        }
      })
        .then(function(res) {
          console.log(res.data.data);
          if (res.data) {
            that.xxgzData = res.data.data;
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "限行规则查询失败!"
          });
        });
    },
    checkDataFun(value) {
      value = value
        .replace(
          /[`~!@#$%^&*()_\-+=<>?:"{}|./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、]/g,
          ""
        )
        .replace(/\s/g, "");
      return value;
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
  top: 5px;
}
</style>


