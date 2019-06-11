<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose(null)" v-if="formDataShow">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>{{title}}</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose(null)" alt>
          </div>
        </div>
        <div class="cont_xi">
          <div>
            <el-form :label-position="labelPosition" label-width="100px">
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="审核规则名称">
                    <el-input
                      ref="xmRef"
                      v-model="inputFormData.zdshgzmc"
                      @keyup.enter.native="cursorChange('zdshgzmc')"
                      @blur="dataVerification('zdshgzmc')"
                      @input="e => inputFormData.zdshgzmc = $utils.validForbid (e)"
                      style="width:485px"
                    ></el-input>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.zdshgzmc}}</span>
                <span class="red_must">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="起始检测时间">
                    <el-time-select
                      v-model="inputFormData.qsjcsj"
                      @change="dataVerification('',inputFormData.qsjcsj,'qsjcsj')"
                      :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '24:00'
                        }"
                      value-format="hh:ss"
                      placeholder="选择起始监测时间"
                    ></el-time-select>
                  </el-form-item>
                  <div>
                    <span class="demonstration">止</span>
                    <el-time-select
                      v-model="inputFormData.jzjcsj"
                      @change="dataVerification('',inputFormData.jzjcsj,'jzjcsj')"
                      :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '24:00'
                        }"
                      placeholder="选择结束监测时间"
                      value-format="hh:ss"
                    ></el-time-select>
                  </div>
                </div>
                <span class="every_span">{{alertFormData.jzjcsj}}</span>
                <span class="red_must">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="限行点位组合">
                    <el-select
                      v-model="inputFormData.dwbh"
                      style="width:485px"
                      multiple
                      placeholder="选择限行点位"
                    >
                      <el-option
                        v-for="item in xxdwData"
                        :key="item.index"
                        :label="item.dwmc"
                        :value="item.dwmc"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.dwbh}}</span>
                <span class="red_must" ng-if="items.mustInput">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="车牌颜色组合">
                    <el-select
                      v-model="inputFormData.hpys"
                      multiple
                      placeholder="选择车牌颜色组合"
                      @keyup.enter.native="axiosGetData(1)"
                      class="widCom"
                      style="width:485px"
                    >
                      <el-option
                        v-for="item in this.$store.state.enumSelection['hpys']"
                        :key="item.id"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.hpys}}</span>
                <span class="red_must">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="车牌类型组合">
                    <el-select
                      v-model="inputFormData.hpzl"
                      multiple
                      placeholder="选择车牌类型组合"
                      @keyup.enter.native="axiosGetData(1)"
                      class="widCom"
                      style="width:485px"
                    >
                      <el-option
                        v-for="item in this.$store.state.enumSelection['hpzl']"
                        :key="item.id"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.hpzl}}</span>
                <span class="red_must">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="车辆类型组合">
                    <el-select
                      v-model="inputFormData.cllx"
                      multiple
                      placeholder="选择车辆类型组合"
                      @keyup.enter.native="axiosGetData(1)"
                      class="widCom"
                      style="width:485px"
                    >
                      <el-option
                        v-for="item in this.$store.state.enumSelection['cllx']"
                        :key="item.id"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.cllx}}</span>
                <span class="red_must">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="燃料类型组合">
                    <el-select
                      v-model="inputFormData.rllx"
                      multiple
                      placeholder="选择燃料类型组合"
                      @keyup.enter.native="axiosGetData(1)"
                      class="widCom"
                      style="width:485px"
                    >
                      <el-option
                        v-for="item in this.$store.state.enumSelection['rlzl']"
                        :key="item.id"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.rllx}}</span>
                <span class="red_must">*</span>
              </div>
              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="排放阶段组合">
                    <el-select
                      v-model="inputFormData.pfjd"
                      multiple
                      placeholder="选择排放阶段组合"
                      @keyup.enter.native="axiosGetData(1)"
                      class="widCom"
                      style="width:485px"
                    >
                      <el-option
                        v-for="item in this.$store.state.enumSelection['pfjd']"
                        :key="item.id"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.pfjd}}</span>
                <span class="red_must">*</span>
              </div>

              <div class="every_input">
                <div class="flex_div">
                  <el-form-item label="审核模块">
                    <el-select
                      v-model="inputFormData.yymk"
                      placeholder="选择审核模块"
                      @keyup.enter.native="axiosGetData(1)"
                      class="widCom"
                      style="width:485px"
                    >
                      <el-option
                        v-for="item in this.$store.state.enumSelection['shmk']"
                        :key="item.id"
                        :label="item.xmnr"
                        :value="item.sz"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <span class="every_span">{{alertFormData.yymk}}</span>
                <span class="red_must">*</span>
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
  name: "formDataAutomatic",

  props: {
    title: String,
    sidebar: String,
    formDataAutomaticType: String,
    rowData: Object
  },
  data() {
    return {
      labelPosition: "left",
      formDataShow: false,
      typArraw: [
        {
          regular: "",
          type: "zdshgzmc"
        },
        {
          regular: "",
          type: "qsjcsj"
        },
        {
          regular: "",
          type: "jzjcsj"
        },
        {
          regular: "",
          type: "dwbh"
        },
        {
          regular: "",
          type: "hpys"
        },
        {
          regular: "",
          type: "hpzl"
        },
        {
          regular: "",
          type: "cllx"
        },
        {
          regular: "",
          type: "rllx"
        },
        {
          regular: "",
          type: "pfjd"
        },
        {
          regular: "",
          type: "yymk"
        },
        {
          regular: "",
          type: "bz"
        }
      ],
      alertFormData: {
        zdshgzmc: "",
        qsjcsj: "",
        jzjcsj: "",
        dwbh: "",
        hpys: "",
        hpzl: "",
        cllx: "",
        rllx: "",
        pfjd: "",
        yymk: "",
        bz: ""
      },
      inputFormData: {
        zdshgzmc: "",
        qsjcsj: "",
        jzjcsj: "",
        dwbh: [],
        hpys: [],
        hpzl: [],
        cllx: [],
        rllx: [],
        pfjd: [],
        yymk: "",
        cjr: "",
        bz: ""
      },
      xxdwData: [],
      xxgzData: [{ value: "1", text: "时段" }],
      pwclObj: []
    };
  },
  mounted() {
    console.log(this.$store.state.enumSelection);
    //this.carCalorfun("PWCL");
    this.dwcxfun();
    //this.xxgzfun();
  },
  methods: {
    /**
     * @description 关闭和显示模块组件
     * @author lifei
     * @version 2019.5.28
     */
    handleClose(rowData) {
      //debugger;
      if (rowData != null) {
        let newRowObj = JSON.parse(JSON.stringify(rowData));
        let objArraw = [
          "zdshgzmc",
          "qsjcsj",
          "jzjcsj",
          "dwbh",
          "hpys",
          "hpzl",
          "cllx",
          "rllx",
          "pfjd",
          "yymk",
          "bz"
        ];

        for (let i = 0; i < objArraw.length; i++) {
          if (
            !(
              objArraw[i] == "zdshgzmc" ||
              objArraw[i] == "qsjcsj" ||
              objArraw[i] == "jzjcsj" ||
              objArraw[i] == "yymk" ||
              objArraw[i] == "bz"
            )
          ) {
            let objArraw2 = newRowObj[objArraw[i]].split(",");
            newRowObj[objArraw[i]] = JSON.parse(JSON.stringify(objArraw2));
          }
        }
        this.inputFormData = newRowObj;
      } else {
        this.inputFormData = {
          zdshgzmc: "",
          qsjcsj: "",
          jzjcsj: "",
          cjr: "",
          dwbh: [],
          hpys: [],
          hpzl: [],
          cllx: [],
          rllx: [],
          pfjd: [],
          yymk: "",
          bz: ""
        };
      }

      console.log(this.inputFormData);
      this.formDataShow = !this.formDataShow;
      if (!this.formDataShow) {
        this.resetClick();
      }
    },
    /**
     * @description 保存数据
     * @author lifei
     * @version 2019.5.28
     */
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
      let urlString = "";
      let objData = {};
      for (let keys in that.inputFormData) {
        if (
          keys == "dwbh" ||
          keys == "hpys" ||
          keys == "hpzl" ||
          keys == "cllx" ||
          keys == "rllx" ||
          keys == "pfjd"
        ) {
          objData[keys] = that.inputFormData[keys].join();
        } else {
          objData[keys] = that.inputFormData[keys];
        }
      }
      console.log(that.inputFormData);
      if (this.formDataAutomaticType == "add") {
        objData["cjr"] = localStorage.getItem("ms_username");
        urlString = "/serveApi/hbj/automaticVerify/addVerify";
      } else {
        urlString = "/serveApi/hbj/automaticVerify/modifyVerify";
      }
      this.$axios({
        method: "POST",
        url: urlString,
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
            that.handleClose(null);
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
    /**
     * @description 数据校验
     * @author lifei
     * @version 2019.5.28
     */
    dataVerification(regular, value, type) {
      let that = this;
      switch (type) {
        case "qsjcsj":
          if (
            that.inputFormData.qsjcsj == "" ||
            that.inputFormData.qsjcsj == "null" ||
            that.inputFormData.qsjcsj == null
          ) {
            that.alertFormData.qsjcsj = "请选择监测起始时间！";
            return false;
          }
          if (
            !(
              that.inputFormData.jzjcsj == "" ||
              that.inputFormData.jzjcsj == "null" ||
              that.inputFormData.jzjcsj == null
            )
          ) {
            let timeBegin = parseInt(
              that.inputFormData.qsjcsj.replace(/:/g, "")
            );
            let timeEnd = parseInt(that.inputFormData.jzjcsj.replace(/:/g, ""));

            if (timeBegin > timeEnd) {
              that.alertFormData.qsjcsj = "监测起始时间不能大于监测结束时间";
              that.inputFormData.qsjcsj = "";
              return false;
            } else {
              that.alertFormData.qsjcsj = "";
              return true;
            }
          }
          break;
        case "jzjcsj":
          if (
            that.inputFormData.jzjcsj == "" ||
            that.inputFormData.jzjcsj == "null" ||
            that.inputFormData.jzjcsj == null
          ) {
            that.alertFormData.jzjcsj = "请选择监测结束时间！";
            return false;
          }
          if (
            !(
              that.inputFormData.qsjcsj == "" ||
              that.inputFormData.qsjcsj == "null" ||
              that.inputFormData.qsjcsj == null
            )
          ) {
            let timeBegin = parseInt(
              that.inputFormData.qsjcsj.replace(/-/g, "")
            );
            let timeEnd = parseInt(that.inputFormData.jzjcsj.replace(/-/g, ""));
            if (timeBegin > timeEnd) {
              that.alertFormData.qsjcsj = "监测结束时间不能大于监测起始时间";
              that.inputFormData.qsjcsj = "";
              return false;
            } else {
              that.alertFormData.qsjcsj = "";
              return true;
            }
          }
          break;
        case "zdshgzmc":
          if (that.inputFormData.zdshgzmc == "") {
            that.alertFormData.zdshgzmc = "请输入自动审核名称！";
            return false;
          } else {
            return true;
          }
          break;
        case "dwbh":
          if (that.inputFormData.dwbh.length < 1) {
            that.alertFormData.dwbh = "请选择限行点位组合！";
            return false;
          } else {
            return true;
          }

          break;
        case "hpys":
          if (that.inputFormData.hpys.length < 1) {
            that.alertFormData.hpys = "请选择号牌颜色组合！";
            return false;
          } else {
            return true;
          }

          break;
        case "hpzl":
          if (that.inputFormData.hpzl.length < 1) {
            that.alertFormData.hpzl = "请选择号牌类型组合！";
            return false;
          } else {
            return true;
          }
          break;
        case "cllx":
          if (that.inputFormData.cllx.length < 1) {
            that.alertFormData.cllx = "请选择车辆类型组合！";
            return false;
          } else {
            return true;
          }
          break;
        case "rllx":
          if (that.inputFormData.rllx.length < 1) {
            that.alertFormData.rllx = "请选择燃料类型组合！";
            return false;
          } else {
            return true;
          }

          break;
        case "pfjd":
          if (that.inputFormData.pfjd.length < 1) {
            that.alertFormData.pfjd = "请选择排放阶段组合！";
            return false;
          } else {
            return true;
          }

          break;
        case "yymk":
          if (that.inputFormData.yymk == "") {
            that.alertFormData.yymk = "请选择应用模块！";
            return false;
          } else {
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
    /**
     * @description 重置
     * @author lifei
     * @version 2019.5.28
     */
    resetClick() {
      let keys_ = Object.keys(this.inputFormData);
      for (let i = 0; i < keys_.length; i++) {
        if (keys_[i] == "xxdw" || keys_[i] == "pwcl") {
          this.inputFormData[keys_[i]] = [];
          this.alertFormData[keys_[i]] = "";
        } else {
          this.inputFormData[keys_[i]] = "";
          this.alertFormData[keys_[i]] = "";
        }
      }
    },

    /*carCalorfun(type) {
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
    },*/
    /**
     * @description 点位查询
     * @author lifei
     * @version 2019.5.28
     */
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
          //console.log(res.data.data);

          let obj = [];
          let result = [];
          if (res.data) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (
                obj.indexOf(res.data.data[i].dwmc) > 0 ||
                res.data.data[i].dwmc == ""
              ) {
                continue;
              } else {
                result.push(res.data.data[i]);
                obj.push(res.data.data[i].dwmc);
              }
            }
          }
          that.xxdwData = result;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "点位查询失败!"
          });
        });
    }
    /**
     
     
    xxgzfun() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/resDrivingRuleSet/select?sidebar=" + that.sidebar
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
    }*/
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
  background: rgba(52, 52, 52, 0.5);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content1_box {
  width: 665px;
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
  padding: 35px 35px 0 35px;
  box-sizing: border-box;
  width: 100%;
  max-height: 670px;
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


