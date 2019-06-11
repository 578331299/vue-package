<template>
  <div class="detailedInformation_box" @click="handleClose()" v-if="diaSta">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <span>{{title}}</span>
        <div class="clouse_box">
          <img src="image/clouse.png" @click="handleClose" alt>
        </div>
      </div>
      <div class="cont_xi">
        <div class="con_parent">
          <vue-scroll :ops="ops" ref="vs">
            <div class="cont_left_son">
              <el-row>
                <el-col style="color:red">*为必填项</el-col>
              </el-row>
              <el-row>
                 

                <template v-for="item in updataList">
                  <template v-if="item.select">
                    <el-col :span="12" class="col_parent" v-show="item.show">
                      <div class="item_title">{{item.title_cn}}:</div>
                      <div class="item_input">
                        <el-select
                          v-model="item.model"
                          :placeholder="item.title_cn"
                          style="width:220px"
                          @change="selectChange($event,item.title)"
                        >
                          <template
                            v-for="itemList in $store.state.enumSelection[item.select_name]"
                          >
                            <el-option :label="itemList.xmnr" :value="itemList.sz"></el-option>
                          </template>
                        </el-select>
                        <p class="validator_test" v-show="item.error_message">{{item.error_info}}</p>
                      </div>
                    </el-col>
                  </template>

                   <template v-else-if="item.time">
                    <el-col :span="12" class="col_parent" v-show="item.show">
                      <div class="item_title">{{item.title_cn}}:</div>
                      <div class="item_input">
                        <el-date-picker
                          type="datetime"
                           value-format="yyyy-MM-dd HH:mm:ss"
                           timezone="GMT+8"
                          v-model="item.model"
                          class="time-input"
                        ></el-date-picker>
                        <p class="validator_test" v-show="item.error_message">{{item.error_info}}</p>
                      </div>
                    </el-col>
                  </template>               

                    <template v-else-if="item.specialType">
                    <el-col :span="12" class="col_parent" v-show="item.show">
                      <div class="item_title">{{item.title_cn}}:</div>
                      <div class="item_input">
                        <el-select
                          v-model="item.model"
                          :placeholder="item.title_cn"
                          style="width:220px"
                        >
                          <template
                            v-for="itemList in item.data"
                          >
                            <el-option :label="itemList.ycxid" :value="itemList.ycxid"></el-option>
                          </template>
                        </el-select>
                        <p class="validator_test" v-show="item.error_message">{{item.error_info}}</p>
                      </div>
                    </el-col>
                  </template>

                  <template v-else>
                    <el-col :span="12" class="col_parent" v-show="item.show">
                      <div class="item_title">{{item.title_cn}}:</div>
                      <div class="item_input">
                        <el-input
                          v-model.trim="item.model"
                          :type="item.types"
                          :style="item.specialStyle"
                          @blur="blur(item.model,item.rules,item.title,require)"
                          :placeholder="item.placeholder"
                          :disabled="item.disabled"
                        ></el-input>
                        <p class="validator_test" v-show="item.error_message">{{item.error_info}}</p>
                      </div>
                    </el-col>
                  </template>
                </template>
              </el-row>
            </div>
          </vue-scroll>
          <div class="con_footer" style="text-align:center">
            <el-button type="primary" @click="btnAdd">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueScroll from "vuescroll";
export default {
  name: "tableAdd",
  components: { vueScroll },
  methods: {
    selectChange(val, title) {  //根据点位编号筛选
      if (title == "dwlx") {
        if (val == 1) {
          console.log(this.updataList)
          this.updataList.forEach(ele => {
            if (ele.title == "hphm" || ele.title == "clxh") {
              ele.show = false;
            }
            if (ele.title == "ycxs") {
              ele.disabled = false;
              ele.model = "";
            }
          });
        } else if (val == 2) {
          this.updataList.forEach(ele => {
            if (ele.title == "hphm" || ele.title == "clxh") {
              ele.show = false;
            }
            if (ele.title == "ycxs") {
              ele.disabled = true;
              ele.model = 1;
            }
          });
        } else {
          this.updataList.forEach(ele => {
            if (ele.title == "hphm" || ele.title == "clxh") {
              ele.show = true;
            }
            if (ele.title == "ycxs") {
              ele.disabled = false;
              ele.model = "";
            }
          });
        }
      }
    },
    openDialog() {},
    handleClose() {
      this.diaSta2 = false;
      this.updataList.forEach(ele => {
        //遍历将错误信息注销
        ele.error_message = false;
      });
      this.$emit("dialogClose", false);
    },
    btnAdd() {
      //点击确认按钮

      let flag = true;
      this.updataList.forEach(ele => {
        //遍历正则 匹配 看是否有不匹配的
        if (ele.rules) {
          let ruler = eval(ele.rules);
          if (!ruler.test(ele.model)) {
            flag = false;
            ele.error_message = true;
          }
        }
      });
      if (flag) {
        this.$emit("btnAdd", this.updataList, this.names);
      } else {
      }
    },
    blur(data, rules, title, require) {
      //输入校验
      if (!rules) return;
      let ruler = eval(rules);
      if (!ruler.test(data)) {
        //未通过正则显示错误信息
        this.updataList.forEach(ele => {
          if (ele.title == title) {
            ele.error_message = true;
          }
        });
      } else {
        this.updataList.forEach(ele => {
          if (ele.title == title) {
            ele.error_message = false;
          }
        });
      }
    }
  },
  data() {
    return {
      ops: {},
      dataList: [1, 2],
      inputModel: {},
      updataList: [],
      errorMessage: {},




    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    updata: Array,
    names: String
  },
  watch: {
    updata(newVal, oldVal) {
      this.updataList = JSON.parse(JSON.stringify(newVal));
    }
  },
  mounted() {
    this.updataList = this.updata; //this.updataList 所有的框
    // console.log(this.updataList)
    

    // console.log(this.$store.state.enumSelection.mtgs);
    // console.log(this.$store.state.enumSelection.zt);

  
  }
};
</script>
<style>
.item_input input.el-input__inner {
  background-color: #f2f6f9 !important;
}
.item_input .el-textarea__inner {
  background-color: #f2f6f9 !important;
  resize: none
}

</style>

<style scoped>

.validator_test {
  font-size: 12px;
  height: 12px;
  color: red;
}
.con_footer {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.con_parent {
  height: 520px;
}
.col_parent {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
}
.item_title {
  width: 110px;
}
.item_input {
  width: 220px;
}
.cont_left_son {
  height: 500px;
  width: 100%;
}
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
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  height: 600px;
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
</style>


