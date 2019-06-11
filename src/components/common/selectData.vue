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
              <div>
                <div>
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    style="padding-left:20px;"
                  >全选</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedData" @change="handleCheckedCitiesChange">
                    <div
                      v-for="(item,index) in updataData"
                      :key="item.index"
                      class="evbox"
                      :style="{background: (index%2 != 0 ? '#fff':'#e4f3fe')}"
                    >
                      <div v-for="item2 in item" :key="item2.id" class="wid30">
                        <el-checkbox :label="item2.id">{{item2.name}}</el-checkbox>
                      </div>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </vuescroll>
          </div>
          <div class="bottom-but-box">
            <el-button type="primary" @click="saveData" round>保存</el-button>
            <el-button type="primary" @click="handleClose" round>取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import vuescroll from "vuescroll";
let checkedOptions = [];
export default {
  name: "selectData",
  components: {
    vuescroll
  },
  data() {
    return {
      ops: {
        bar: {
          background: "#5db6f8"
        }
      },
      checkedData: [],
      checkAll: false,
      checkedDataAll: [],
      isIndeterminate: true
    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    updataData: Array,
    saveSelectData: Object
  },
  watch: {
    diaSta(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.mountedFun();
      }
    }
  },

  mounted() {
    this.mountedFun();
  },
  methods: {
    openDialog() {},
    handleClose() {
      // this.diaSta= false;
      this.$emit("dialogClose", false);
      
    },
    handleCheckAllChange(val) {
      console.log(checkedOptions);
      this.checkedData = val ? checkedOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedDataAll.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkedDataAll.length;
    },
    saveData() {
      let that = this;
      console.log(this.checkedData);
      const loadingObj = this.$loading({
        lock: true,
        text: "数据保存中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let formdata = {};
      formdata.firmid = this.saveSelectData.firmid;
      formdata.interfaceids = this.checkedData.join();
      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/interface/edit",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(formdata)
      })
        .then(function(res) {
          loadingObj.close();
          console.log(res);
          that.handleClose();
          that.$parent.axiosGetData();
          that.$message({
            type: "success",
            message: "端口权限修改成功!"
          });
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "端口权限修改失败!"
          });
        });
    },
    mountedFun() {
      checkedOptions = [];
      this.checkedData=[];
      for (let i = 0; i < this.updataData.length; i++) {
        for (let j = 0; j < this.updataData[i].length; j++) {
          checkedOptions.push(this.updataData[i][j].id);
          if (this.updataData[i][j].check) {
            this.checkedData.push(this.updataData[i][j].id);
          }
        }

        //debugger;
      }
      this.checkedDataAll = checkedOptions;
      //console.log(this.checkedDataAll);
    }
  }
};
</script>
<style scoped>
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
  width: 800px;
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
  padding-left: 20px;
}
.baitiao {
  width: 5px;
  height: 100%;
  background-color: #fff;
  color: #fff;
}
.cont_xi_lf {
  width: 100%;
  height: 340px;
}
.bottom-but-box {
  padding-top: 10px;
  text-align: center;
  padding-bottom: 10px;
}
.wid30{
    width: 33.3333%;
}
</style>


