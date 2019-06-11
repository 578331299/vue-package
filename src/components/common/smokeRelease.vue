<template>
  <transition name="fade">
    <div class="detailedInformation-box" @click="handleClose()" v-if="diaSta">
      <div class="content1-box" @click.stop>
        <div class="title-box">
          <span>{{title}}</span>
          <div class="clouse-box">
            <img src="image/clouse.png" @click="handleClose" alt>
            <!--<span class="spanclick" ></span>-->
          </div>
        </div>
        <div class="cont-xi">
          <div class="cont_xi_lf">
            <vuescroll :ops="ops" color="#5db6f8">
              <el-form :inline="true">
                <el-row>
                  <el-col :span="24" class="input-col">
                    <el-form-item label="发布平台:">
                      <el-select v-model="inputList.fbpt" placeholder="选择发布平台" style="width:350px">
                        <template v-for="item in FBPT">
                          <el-option :label="item.xmnr" :value="item.sz"></el-option>
                        </template>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" class="input-col">
                    <el-form-item label="发布车辆:">
                      <el-input
                        disabled="disabled"
                        type="textarea"
                        :rows="3"
                        v-model="inputList.fbcl"
                        style="width:350px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" class="input-col">
                    <el-form-item label="发布内容:">
                      <el-input
                        type="textarea"
                        :rows="3"
                        v-model="inputList.fbnr"
                        style="width:350px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" class="input-col">
                    <el-button type="primary" @click="submitRelease">确认</el-button>
                    <el-button type="primary" @click="closeDialog">取消</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </vuescroll>
          </div>
        </div>
      </div>
    </div> 
  </transition>
</template>
<script>
import vuescroll from "vuescroll";
export default {
  name: "information",
  components: {
    vuescroll
  },
  methods: {
    submitRelease() {  //黑烟车发布
      let that = this;
      var formDa = new FormData();
      var arr = [];
      this.dataList.forEach(ele => {
        arr.push(ele.hycgzid);
      });
      //console.log(arr)
      formDa.append("hycgzids", arr);
      formDa.append("fbpt", this.inputList.fbpt);
      formDa.append("fbnr", this.inputList.fbnr);
      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/blackSmokeVechiclePublish/add",
        data: formDa,
        params:{sidebar:"黑烟车发布"}
      }).then(function(data) {
        if (data.data.code == "1") {
              that.$message({
                type: "success",
                message: data.data.msg
              });
            } else {
              that.$message({
                type: "warning",
                message: data.data.msg
              });
            }
            that.$emit("dialogClose", false);
      });
    },
    openDialog() {},
    handleClose() {
      this.$emit("dialogClose", false);
    },
    closeDialog() {
      this.$emit("dialogClose", false);
    }
  },
  data() {
    return {
      inputList: { fbcl: "", fbpt: "", fbnr: "" },
      ops: {
        bar: {
          background: "#5db6f8"
        }
      },
      dataList: [],
      FBPT: ""
    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    updataData: Array
  },
  watch: {
    updataData(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.dataList = newVal;
        let arr = "";
        newVal.forEach(element => {
          arr += element.hphm + ",";
        });
        this.inputList.fbcl = arr;
        this.inputList.fbnr = arr;
        // console.log(this.updataData);
      }
    }
  },
  mounted() {},
  created() {
    let that = this;
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",

      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "FBPT" },
      params:{siderbar:"黑烟车发布"}
    }).then(function(data) {
      that.FBPT = data.data.data;
    });
  }
};
</script>
<style scoped>
.input-col {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.detailedInformation-box {
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
.content1-box {
  width: 600px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.title-box {
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
/*.clouse-box{
  
  border: 1px solid #fff;
  border-radius: 50%;
 
  
  color: #fff;
}*/
.clouse-box > img {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 101;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.cont-xi {
  padding: 15px;
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
.cont_xi_lf {
  width: 100%;
  height: 400px;
}
</style>


