<template>
  <div class="detailedInformation_box" @click="clouseLook" v-if="addLookCarNumberShow">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <span>新增限行尾号规则</span>
        <div class="clouse_box">
          <img src="image/clouse.png" @click="clouseLook" alt>
        </div>
      </div>
      <div class="cont_xi">
        <div>
          <el-form :label-position="labelPosition" label-width="120px">
            <div class="every_input">
              <el-form-item label="限行规则名称:">
                <el-input
                  v-model="checkList.xxgzmc"
                  @blur="checkDataFun('xxgzmc')"
                  placeholder="请输入限行规则名称"
                  @input="e => checkList.xxgzmc = $utils.validForbid (e)"
                ></el-input>
                <span class="every_span">{{alertCheckLista.xxgzmc}}</span>
                <span class="red_must">*</span>
              </el-form-item>
              <el-form-item label="星期一限行尾号:">
                <el-checkbox-group v-model="checkList.xqyxxwh">
                  <el-checkbox v-for="item in numberData" :key="item.index" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="星期二限行尾号:">
                <el-checkbox-group v-model="checkList.xqexxwh">
                  <el-checkbox v-for="item in numberData" :key="item.index" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="星期三限行尾号:">
                <el-checkbox-group v-model="checkList.xqsxxwh1">
                  <el-checkbox v-for="item in numberData" :key="item.index" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="星期四限行尾号:">
                <el-checkbox-group v-model="checkList.xqsxxwh2">
                  <el-checkbox v-for="item in numberData" :key="item.index" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="星期五限行尾号:">
                <el-checkbox-group v-model="checkList.xqwxxwh">
                  <el-checkbox v-for="item in numberData" :key="item.index" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="星期六限行尾号:">
                <el-checkbox-group v-model="checkList.xqlxxwh">
                  <el-checkbox v-for="item in numberData" :key="item.index" :label="item"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="星期日限行尾号:">
                <el-checkbox-group v-model="checkList.xqrxxwh">
                  <el-checkbox v-for="item in numberData" :key="item.index" :label="item"></el-checkbox>
                </el-checkbox-group>
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
  name: "addLookCarNumber",

  props: {
    //addLookCarNumberShow:Boolean
  },
  data() {
    return {
      labelPosition: "left",
      addLookCarNumberShow: false,
      sidebar: "限行规则",
      alertCheckLista: {
        xxgzmc: ""
      },
      checkList: {
        xxgzmc: "",
        xqyxxwh: [],
        xqexxwh: [],
        xqsxxwh1: [],
        xqsxxwh2: [],
        xqwxxwh: [],
        xqlxxwh: [],
        xqrxxwh: []
      },
      numberData: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    };
  },
  mounted() {
    //console.log(this.updataData);
  },
  methods: {
    clouseLook() {
      this.addLookCarNumberShow = !this.addLookCarNumberShow;
    },
    checkDataFun(type) {
      //let listKye = Object.keys(this.checkList);
      //listKye.splice(0, 1);
      if (type == "xxgzmc") {
        let regularXm = /^[a-zA-Z\u0391-\uFFE5]{2,16}$/;
        if (!regularXm.test(this.checkList.xxgzmc)) {
          this.alertCheckLista.xxgzmc =
            "限行规则名称必须是2-8位汉字字母组成,且不能为空！";
          this.checkList.xxgzmc = "";
          return false;
        } else {
          this.alertCheckLista.xxgzmc = "";
          return true;
        }
      }
      return true;
    },
    saveData() {
      let that = this;

      let xxgzmcBool = this.checkDataFun("xxgzmc");
      if (!xxgzmcBool) {
        that.$message({
          type: "warning",
          message: "请正确填写限行规则名称!"
        });
        return;
      }
      let obj = {};
      obj.sidebar = "限行规则";
      obj.cjr = localStorage.getItem("ms_username");
      for (let item in this.checkList) {
        if (item === "xxgzmc" || item === "sidebar") {
          obj[item] = this.checkList[item];
        } else {
          obj[item] = this.checkList[item].join();
        }
      }
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/resDrivingRuleSet/add",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          that.$message({
            type: "success",
            message: "数据保存成功!"
          });
          that.clouseLook();
          that.$parent.axiosGetData();
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据保存失败!"
          });
        });
    },
    resetClick() {
      //let keys_ = Object
      for (let item in this.checkList) {
        if (item === "name" || item === "sidebar") {
          this.checkList[item] = "";
        } else {
          this.checkList[item] = [];
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
  z-index: 999;
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
.red_must {
  color: red;
  position: absolute;
  right: -10px;
  top: 5px;
}
</style>


