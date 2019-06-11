<template>
  <div class="detailedInformation_box" @click="handleClose()" v-if="diaSta">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <span>{{title}}</span>
        <div class="clouse_box">
          <img src="image/clouse.png" @click="handleClose" alt>
          <!--<span class="spanclick" ></span>-->
        </div>
      </div>
      <div class="cont_xi">
        <div class="con_parent">
          <vue-scroll :ops="ops"  ref="vs">
            <div class="cont_left_son">
              <el-row>
                <template v-for="item in updataList">
                  <el-col :span="12" class="col_parent" v-show="item.show">
                    <div class="item_title">{{item.title_cn}}:</div>
                    <div class="item_input">
                      <el-input
                        v-model="item.model"
                        :type="item.types"
                        :style="item.specialStyle"
                        @blur="blur(item.model,item.rules,item.title,require)"
                        :placeholder="item.placeholder"
                      ></el-input>
                      <p class="validator_test" v-show="item.error_message">{{item.error_info}}</p>
                    </div>
                  </el-col>
                </template>           
              </el-row>
            </div>
          </vue-scroll>
          <div class="con_footer" style="text-align:center">
            <el-button type="primary" @click="btnEdit">保存编辑结果</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueScroll from "vuescroll";
export default {
  name: "tableEdit",
  components: { vueScroll },
  methods: {
    openDialog() {},
    handleClose() {
      this.diaSta2 = false;
       this.updataList.forEach(ele=>{ //遍历将错误信息注销
         ele.error_message=false;
       })
      this.$emit("dialogClose", false);
    },
     btnEdit() {
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
         //console.log("ok");
        this.$emit("btnEdit", this.updataList,this.names);
      } else {
        // console.log("no");
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
      // diaSta: false,
      ops: {
          mode:"native",
          sizeStrategy:"number",
           bar: {
          keepShow: true,
          background:"#5db6f8"
        }
      },
      dataList: [1, 2],
      inputModel: {},
      updataList: []
    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    editData: Array,
    names:String
  },
  watch: {
    editData(newVal, oldVal) {
      console.log(oldVal);
      console.log(newVal)
       this.updataList = JSON.parse(JSON.stringify(newVal));
      
    }
  },
  mounted() {
    console.log(this.updataData);
  }
};
</script>
<style>
.item_input input.el-input__inner {
  background-color: #f2f6f9 !important;
  width: 100%;
}
</style>

<style scoped>
.validator_test {
  font-size: 12px;
  height: 12px;
  color: red;
}
.con_footer{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.con_parent{
    height: 520px;
}
.col_parent {
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: center;
  /* float: left; */
}
.item_title {
  width: 100px;
}
.item_input {
  width: 220px;
}
.cont_left_son {
  /* overflow-y: auto; */
  height: 500px;
  width: 100%;
  /* background-color: #f2f6f9; */
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
  /* overflow: hidden; */
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
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  /* overflow: auto; */
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


