<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose" v-if="addMechanismShow">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>{{title}}</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
          </div>
        </div>
        <div class="cont_xi">
          <div>
            <h2 class="h2">分配角色</h2>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <div class="form_box">
                <div class="every_input2" v-for="item in juese" :key="item.index">
                  <el-checkbox v-model="item.check">{{item.rolename}}</el-checkbox>
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
export default {
  name: "addMechanism",
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
        name: ""
      },
      alertFormData: {
        name: ""
      },
      juese: [],
      addMechanismShow: false
    };
  },
  watch: {},
  mounted() {
    let obj = {
      userid: ""
    };
    this.getUserRoleByUser(obj);
  },
  computed: {},
  methods: {
    openDialog() {},
    handleClose() {
      this.resetClick();
      this.addMechanismShow = !this.addMechanismShow;
    },
    resetClick() {
      for (let key in this.juese) {
        this.juese[key].check = false;
      }
    },
    dataVerification(item) {
      switch (item) {
        case "name":
          let regularXm = /^[\u4E00-\u9FA5A-Za-z].{2,20}$/;
          if (!regularXm.test(this.formLabelAlign.name)) {
            this.alertFormData.name = "机构名称只能输入1-20汉字字母！";
            this.formLabelAlign.name = "";
            this.saveType = false;
          } else {
            this.alertFormData.name = "";
            this.saveType = true;
          }
          break;
      }
    },
    checkData() {
      let arr = ["name"];
      for (let i = 0; i < arr.length; i++) {
        this.dataVerification(arr[i]);
        if (!this.saveType) {
          return false;
        }
      }
      return true;
    },
    /**
     * @description 组装请求参数
     * @author lifei
     * @version 2019.5.28
     */
    formData() {
      let idArraw = [];
      for (let i = 0; i < this.juese.length; i++) {
        if (this.juese[i].check) {
          idArraw.push(this.juese[i].roleid);
        }
      }
      let formdata = {};
      formdata.sidebar = "机构管理";
      formdata.roleIds = idArraw.join();
      formdata.id = this.rowData.id;
      return formdata;
    },
    /**
     * @description 保存角色
     * @author lifei
     * @version 2019.5.28
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
      let formdata = this.formData();
      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/department/editRole",
        headers: {
          "Content-Type": "application/json"
        },
        data: formdata
      })
        .then(function(res) {
          loadingObj.close();
          that.$message({
            message: "恭喜你，保存角色成功",
            type: "success"
          });
          that.handleClose();
        })
        .catch(function(err) {
          loadingObj.close();
          this.$message({
            message: "很遗憾，保存角色失败",
            type: "warning"
          });
        });
      return;
    },
    getUserRoleByUser(row) {
      let that = this;
      this.$axios({
        method: "GET",
        url: "/serveApi/hbj/department/getDepartmentRole",
        params: {
          id: row.id,
          sidebar: that.sidebar
        }
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
  display: block;
  width: 400px;
}
.h2 {
  border-bottom: 1px solid #98bbf8;
  font-size: 16px;
  line-height: 30px;
  padding-left: 15px;
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
  left: 410px;
  top: 5px;
}
</style>


