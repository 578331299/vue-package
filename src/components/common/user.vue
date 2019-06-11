<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose" v-if="userShow">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>{{title}}</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
          </div>
        </div>
        <div class="cont_xi">
          <div>
            <h2 class="h2">用户信息</h2>

            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <div class="form_box">
                <div class="every_input">
                  <el-form-item label="姓名">
                    <el-input
                      ref="xmRef"
                      v-model="formLabelAlign.xm"
                      @keyup.enter.native="cursorChange('sjhmRef')"
                      @blur="dataVerification('xm')"
                      @input="e => formLabelAlign.xm = $utils.validForbid (e)"
                    ></el-input>
                    <span class="every_span">{{alertFormData.xm}}</span>
                    <span class="red_must">*</span>
                  </el-form-item>
                </div>

                <div class="every_input">
                  <el-form-item label="手机号码">
                    <el-input
                      ref="sjhmRef"
                      @keyup.enter.native="cursorChange('yhmRef')"
                      v-model="formLabelAlign.sjhm"
                      @blur="dataVerification('sjhm')"
                      @input="e => formLabelAlign.sjhm = $utils.validForbid (e)"
                    ></el-input>
                    <span class="every_span">{{alertFormData.sjhm}}</span>
                    <span class="red_must">*</span>
                  </el-form-item>
                </div>
                <div class="every_input">
                  <el-form-item label="用户名">
                    <el-input
                      ref="yhmRef"
                      v-model="formLabelAlign.yhm"
                      @keyup.enter.native="cursorChange('mmRef')"
                      @blur="dataVerification('yhm')"
                      @input="e => formLabelAlign.yhm = $utils.validForbid (e)"
                    ></el-input>
                    <span class="every_span">{{alertFormData.yhm}}</span>
                    <span class="red_must">*</span>
                  </el-form-item>
                </div>
                <div class="every_input" v-if="title === '新增用户信息'">
                  <el-form-item label="密码">
                    <el-input
                      ref="mmRef"
                      @keyup.enter.native="cursorChange('dzyxRef')"
                      v-model="formLabelAlign.mm"
                      @blur="dataVerification('mm')"
                    ></el-input>
                    <span class="every_span">{{alertFormData.mm}}</span>
                    <span class="red_must">*</span>
                  </el-form-item>
                </div>

                <div class="every_input">
                  <el-form-item label="电子邮箱">
                    <el-input
                      ref="dzyxRef"
                      v-model="formLabelAlign.dzyx"
                      @keyup.enter.native="saveData()"
                      @blur="dataVerification('dzyx')"
                    ></el-input>
                    <span class="every_span">{{alertFormData.dzyx}}</span>
                    <span class="red_must">*</span>
                  </el-form-item>
                </div>
                <div class="every_input">
                  <el-form-item label="性别">
                    <el-radio v-model="formLabelAlign.xb" label="男">男</el-radio>
                    <el-radio v-model="formLabelAlign.xb" label="女">女</el-radio>
                    <!--<el-radio-group v-model="formLabelAlign.xb">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                    </el-radio-group>-->
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
          <!--<div>
            <h2 class="h2">分配机构</h2>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <div class="form_box">
                <div class="every_input2" v-for="item in organizationData" :key="item.index">
                  <el-checkbox v-model="item.check">{{item.name}}</el-checkbox>
                </div>
              </div>
            </el-form>
          </div>-->
          <div>
            <h2 class="h2">分配角色</h2>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <div class="form_box">
                <div class="every_input2" v-for="item in juese" :key="item.index">
                  <el-checkbox v-model="item.check">{{item.name}}</el-checkbox>
                </div>
              </div>
            </el-form>
          </div>
          <div>
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
import md5 from "js-md5";
export default {
  name: "user",
  props: {
    title: String,
    sidebar: String,
    rowData: Object
  },
  data() {
    return {
      labelPosition: "left",
      saveType: true,
      xmMm: "mmRef",
      formLabelAlign: {
        yhm: "",
        mm: "",
        xm: "",
        xb: "男",
        sjhm: "",
        dzyx: "",
        sidebar: "用户管理"
      },
      alertFormData: {
        yhm: "",
        mm: "",
        xm: "",
        xb: "",
        sjhm: "",
        dzyx: ""
      },
      juese: [],
      organizationData: [{ check: false, name: "百度" }]
    };
  },
  watch: {
    userShow(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.title == "编辑用户信息") {
          this.formLabelAlign = JSON.parse(JSON.stringify(this.rowData));
          this.xmMm = "xmRef";
          if (this.userShow) {
            this.getUserRoleByUser(this.formLabelAlign);
          }
        } else {
          this.resetClick();
          this.xmMm = "mmRef";
          let obj = {
            userid: ""
          };
          if (this.userShow) {
            this.getUserRoleByUser(obj);
          }
        }
      }
    }
  },
  mounted() {},
  computed: {
    userShow() {
      return this.$store.state.userShow;
    }
  },
  methods: {
    /**
     * @description 打开关闭弹窗
     * @author lifei
     * @version 2019.6.04
     */
    handleClose() {
      this.resetClick();
      this.$store.commit("changeUserShow");
    },
    /**
     * @description 重置
     * @author lifei
     * @version 2019.6.04
     */
    resetClick() {
      for (let key in this.juese) {
        this.juese[key].check = false;
      }
      for (let key in this.organizationData) {
        this.organizationData[key].check = false;
      }
      for (let key in this.formLabelAlign) {
        if (key != "xb") {
          this.formLabelAlign[key] = "";
          this.alertFormData[key] = "";
        } else {
          this.formLabelAlign[key] = "男";
          this.alertFormData[key] = "";
        }
      }
    },
    /**
     * @description 数据校验
     * @author lifei
     * @version 2019.6.04
     */
    dataVerification(item) {
      switch (item) {
        case "yhm":
          let regularYhm = /^([a-zA-Z]){6,16}$/;
          if (!regularYhm.test(this.formLabelAlign.yhm)) {
            this.alertFormData.yhm = "用户名必须是6-16位的字母组成！";
            this.formLabelAlign.yhm = "";
            this.saveType = false;
          } else {
            this.alertFormData.yhm = "";
            this.saveType = true;
          }
          break;
        case "mm":
          let regularMm = /^[a-zA-Z]\w{5,17}$/;
          if (!regularMm.test(this.formLabelAlign.mm)) {
            this.alertFormData.mm =
              "密码须以字母开头，长度在6-18之间，只能包含字符、数字和下划线！";
            this.formLabelAlign.mm = "";
            this.saveType = false;
          } else {
            this.alertFormData.mm = "";
            this.saveType = true;
          }
          break;
        case "xm":
          let regularXm = /^[A-Za-z\u0391-\uFFE5]{2,8}$/;
          if (!regularXm.test(this.formLabelAlign.xm)) {
            this.alertFormData.xm = "姓名必须是2-8位汉字字母组成！";
            this.formLabelAlign.xm = "";
            this.saveType = false;
          } else {
            this.alertFormData.xm = "";
            this.saveType = true;
          }
          break;
        case "sjhm":
          let regularSjhm = /^1[3|4|5|8][0-9]\d{8}$/;
          if (!regularSjhm.test(this.formLabelAlign.sjhm)) {
            this.alertFormData.sjhm = "手机号码格式不正确";
            this.formLabelAlign.sjhm = "";
            this.saveType = false;
          } else {
            this.alertFormData.sjhm = "";
            this.saveType = true;
          }
          break;
        case "dzyx":
          let zhengze = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!zhengze.test(this.formLabelAlign.dzyx)) {
            this.alertFormData.dzyx = "邮箱格式不正确！";
            this.formLabelAlign.dzyx = "";
            this.saveType = false;
          } else {
            this.alertFormData.dzyx = "";
            this.saveType = true;
          }
          break;
      }
    },
    /**
     * @description 提交时检查数据
     * @author lifei
     * @version 2019.6.04
     */
    checkData() {
      let arr = ["yhm", "xm", "xm", "sjhm", "dzyx"];
      for (let i = 0; i < arr.length; i++) {
        this.dataVerification(arr[i]);
        if (!this.saveType) {
          return false;
        }
      }
      return true;
    },
    /**
     * @description 保存数据
     * @author lifei
     * @version 2019.6.04
     */
    saveData() {
      const loadingObj = this.$loading({
        lock: true,
        text: "提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      let bollernData = this.checkData();
      if (!bollernData) {
        loadingObj.close();
        this.$message({
          message: "数据格式不正确，请修改后在提交",
          type: "warning"
        });
        return;
      }
      let idArraw = [];
      for (let i = 0; i < this.juese.length; i++) {
        if (this.juese[i].check) {
          idArraw.push(this.juese[i].id);
        }
      }
      this.formLabelAlign.sidebar = "用户管理";
      let formdata = new FormData();
      formdata.append("roleIds", idArraw.join());
      for (let key in that.formLabelAlign) {
        if (key == "xb") {
          let xingbie =
            that.formLabelAlign[key].replace(/\s*/g, "") == "男" ? 0 : 1;
          formdata.append(key, parseInt(xingbie));
        } else {
          formdata.append(key, that.formLabelAlign[key]);
        }
      }
      if (this.title == "编辑用户信息") {
        formdata.append("userId", that.formLabelAlign.id);
        this.$axios({
          method: "POST",
          url: "/serveApi/hbj/user/updateUser",
          headers: {
            "Content-Type": "application/json"
          },
          data: formdata
        })
          .then(function(res) {
            loadingObj.close();
            console.log(res.data.data);
            if (res.data.data == "error") {
              that.$message({
                message: res.data.msg,
                type: "warning"
              });
              return;
            } else {
              that.$parent.axiosGetData();
              that.$message({
                message: "恭喜你，保存成功",
                type: "success"
              });
              that.handleClose();
            }
          })
          .catch(function(err) {
            loadingObj.close();
            this.$message({
              message: "很遗憾，保存失败",
              type: "warning"
            });
          });
      } else {
        formdata.set("mm", md5(formdata.get("mm")));
        this.$axios({
          method: "POST",
          url: "/serveApi/hbj/user/add",
          data: formdata
        })
          .then(function(res) {
            loadingObj.close();
            console.log(res.data.data);
            if (res.data.data == "error") {
              that.$message({
                message: res.data.msg,
                type: "warning"
              });
              return;
            } else {
              that.$parent.axiosGetData();
              that.$message({
                message: "恭喜你，保存成功",
                type: "success"
              });
              that.handleClose();
            }
          })
          .catch(function(err) {
            loadingObj.close();
            this.$message({
              message: "很遗憾，保存失败",
              type: "warning"
            });
          });
      }
      return;
    },
    /**
     * @description 回车键切换光标
     * @author lifei
     * @version 2019.6.04
     */
    cursorChange(ress) {
      switch (ress) {
        case "mmRef":
          this.$refs.mmRef.$el.querySelector("input").focus();
          break;
        case "xmRef":
          this.$refs.xmRef.$el.querySelector("input").focus();
          break;
        case "sjhmRef":
          this.$refs.sjhmRef.$el.querySelector("input").focus();
          break;
        case "dzyxRef":
          this.$refs.dzyxRef.$el.querySelector("input").focus();
          break;
        case "yhmRef":
          this.$refs.yhmRef.$el.querySelector("input").focus();
          break;
      }
    },
    /**
     * @description 查询角色
     * @author lifei
     * @version 2019.6.04
     */
    getUserRoleByUser(row) {
      let that = this;
      this.$axios({
        method: "GET",
        url:
          "/serveApi/hbj/role/getUserRoleByUserId?userId=" +
          row.id +
          "&sidebar=" +
          that.sidebar
      })
        .then(function(res) {
          if (res.data.data) {
            that.juese = res.data.data;
          }
          console.log(res);
        })
        .catch(function(err) {
          alert(err);
        });
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
  width: 1100px;
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
  width: 33.333%;
  padding-left: 20px;
  box-sizing: border-box;
}
.every_input2 {
  position: relative;
  width: 20%;
  padding-left: 20px;
  box-sizing: border-box;
  line-height: 30px;
}
.every_span {
  color: red;
  position: absolute;
  top: 26px;
  left: 5px;
  font-size: 12px;
}
.h2 {
  border-bottom: 1px solid #98bbf8;
  font-size: 16px;
  line-height: 30px;
}
.form_box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
}
.red_must {
  color: red;
  position: absolute;
  right: -8px;
  top: 5px;
}
</style>


