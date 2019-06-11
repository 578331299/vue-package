<template>
  <div class="detailedInformation_box" @click="handleClose" v-if="roleChangeShow">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <span>{{title}}</span>
        <div class="clouse_box">
          <img src="image/clouse.png" @click="handleClose" alt>
        </div>
      </div>
      <div class="cont_xi">
        <div>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <div class="every_input">
              <el-form-item label="角色名称">
                <el-input
                  @keyup.enter.native="cursorChange()"
                  v-model="formLabelAlign.jsmc"
                  :blur="dataVerification(formLabelAlign.jsmc)"
                  @input="e => formLabelAlign.jsmc = $utils.validForbid (e)"
                  placeholder="请输入角色名称"
                ></el-input>
                <span class="every_span">{{alertFormLabelAlign.jsmc}}</span>
                <span class="red_must" ng-if="items.mustInput">*</span>
              </el-form-item>
            </div>
            <div class="every_input">
              <el-form-item label="角色描述">
                <el-input
                  type="textarea"
                  v-model="formLabelAlign.jsms"
                  @keyup.enter.native="saveData()"
                  :blur="dataVerification(formLabelAlign.jsms)"
                  :rows="4"
                  placeholder="请输入角色描述"
                ></el-input>
                <span class="every_span1">{{alertFormLabelAlign.jsms}}</span>
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
</template>
<script>
export default {
  name: "roleChange",

  props: {
    title: String,
    rowData: Object
  },
  data() {
    return {
      labelPosition: "left",
      saveType: false,
      formLabelAlign: {
        jsmc: "",
        hdms: "",
        sidebar: "角色管理"
      },
      alertFormLabelAlign: {
        jsmc: "",
        hdms: ""
      },
      dataList: [1, 2]
    };
  },
  watch: {
    roleChangeShow(newVal, oldVal) {
      if (newVal !== oldVal) {
        //this.dataList=newVal;
        if (this.title == "角色修改") {
          this.formLabelAlign = JSON.parse(JSON.stringify(this.rowData));
        } else {
          this.formLabelAlign = {
            jsmc: "",
            hdms: "",
            sidebar: "角色管理"
          };
        }
      }
    }
  },
  mounted() {
    //console.log(this.updataData);
  },
  computed: {
    roleChangeShow() {
      return this.$store.state.roleChangeShow;
    }
  },
  methods: {
    openDialog() {},
    handleClose() {
      this.resetClick();
      this.$store.commit("changeRoleChangeShow");
    },
    resetClick() {
      for (let key in this.formLabelAlign) {
        this.formLabelAlign[key] = "";
        this.alertFormLabelAlign[key] = "";
      }
    },
    dataVerification(item) {
      switch (item) {
        case "jsmc":
          let regularYhm = /^([\u0391-\uFFE5 | a-zA-Z]){2,8}$/;
          if (!regularYhm.test(this.formLabelAlign.jsmc)) {
            this.alertFormLabelAlign.jsmc =
              "角色名称必须是2-8位的汉字字母组成！";
            this.saveType = false;
          } else {
            this.alertFormLabelAlign.jsmc = "";
            this.saveType = true;
          }
          break;
        case "jsms":
          return true;
          break;
      }
    },
    checkData() {
      let arr = ["jsmc", "jsms"];
      for (let i = 0; i < arr.length; i++) {
        this.dataVerification(arr[i]);
        if (!this.saveType) {
          return false;
        }
      }
      return true;
    },
    saveData() {
      let that = this;
      this.formLabelAlign.sidebar = "角色管理";
      let formdata = new FormData();
      let bollernData = this.checkData();
      if (!bollernData) {
        //loadingObj.close();
        this.$message({
          message: "数据格式不正确，请修改后再提交",
          type: "warning"
        });
        return;
      }
      for (let key in that.formLabelAlign) {
        formdata.append(key, that.formLabelAlign[key]);
      }
      if (this.title == "角色修改") {
        this.$axios({
          method: "POST",
          url: "/serveApi/hbj/role/updateRole",
          headers: {
            "Content-Type": "application/json"
          },
          data: formdata
        })
          .then(function(res) {
            if (res.data.data == "error") {
              that.$message({
                message: res.data.msg,
                type: "warning"
              });
            } else {
              that.$parent.axiosGetData();
              that.$message({
                message: "恭喜你，角色修改成功！",
                type: "success"
              });
              that.handleClose();
            }

            //that.$parent.axiosGetData();
          })
          .catch(function(err) {
            that.$message({
              message: "很遗憾，角色修改失败！",
              type: "warning"
            });
          });
      } else {
        console.log(2);
        this.$axios({
          method: "POST",
          url: "/serveApi/hbj/role/add",
          data: formdata
        })
          .then(function(res) {
            console.log(res.data.data);
            debugger;
            if (res.data.data == "error") {
              that.$message({
                message: res.data.msg,
                type: "warning"
              });
            } else {
              that.$parent.axiosGetData();
              that.$message({
                message: "恭喜你，角色添加成功！",
                type: "success"
              });
              that.handleClose();
            }
          })
          .catch(function(err) {
            this.$message({
              message: "很遗憾，角色添加失败！",
              type: "warning"
            });
          });
      }
      return;
    },
    cursorChange() {
      this.$refs.jsmsRef.$el.querySelector("input").focus();
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
.every_span1 {
  color: red;
  position: absolute;
  top: 83px;
  left: 5px;
  font-size: 12px;
}
.red_must {
  color: red;
  position: absolute;
  right: -10px;
  top: 5px;
}
</style>


