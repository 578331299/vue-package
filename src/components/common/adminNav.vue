<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose()" v-if="diaSta">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>用户权限修改</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
            <!--<span class="spanclick" ></span>-->
          </div>
        </div>
        <div class="cont_xi">
          <div class="cont_xi_lf content_2">
            <vuescroll :ops="ops" color="#5db6f8">
              <div>
                <div v-for="(items1,index) in navdata" :key="items1.index">
                  <div v-if="!items1.subs">
                    <div class="paddlf_20" :style="{background:(index%2 == 0 ? '#fff' : '')}">
                      <el-checkbox v-model="items1.check">{{items1.title}}</el-checkbox>
                    </div>
                  </div>
                  <div v-else>
                    <div
                      class="paddlf_20 position_relative"
                      :style="{background:(index%2 == 0 ? '#fff' : '')}"
                      @click="changeSubs1(items1.index)"
                    >
                      <el-checkbox
                        v-model="items1.check"
                        @click.native="changeChecked(index,items1.check)"
                      >{{items1.title}}</el-checkbox>
                      <span
                        class="icon-jiantou1 position_abs_jian"
                        :class="items1.index==items2Index? '':'xuanzuan'"
                      ></span>
                    </div>
                    <div v-show="items2Index == items1.index">
                      <div v-for="(items2,index) in items1.subs" :key="items2.index">
                        <div
                          v-if="!items2.subs"
                          class="padding_50"
                          :style="{background:(index%2 == 0 ? '#e2eef8' : '#e2eef8')}"
                        >
                          <div>
                            <el-checkbox v-model="items2.check">{{items2.title}}</el-checkbox>
                          </div>
                        </div>
                        <div v-else>
                          <div
                            @click="changeSubs2(items2.index)"
                            class="position_relative padding_50"
                            :style="{background:(index%2 == 0 ? '#e2eef8' : '')}"
                          >
                            <el-checkbox
                              v-model="items2.check"
                              @click.native="changeChecked2(index,items2.check)"
                            >{{items2.title}}</el-checkbox>
                            <span
                              class="icon-jiantou1 position_abs_jian"
                              :class="items3Index == items2.index? '':'xuanzuan'"
                            ></span>
                          </div>
                          <div v-show="items3Index == items2.index">
                            <div
                              class="padding_lf60"
                              v-for="(items3,index) in items2.subs"
                              :key="items3.index"
                              :style="{background:(index%2 == 0 ? '#d0e7f8' : '#d0e7f8')}"
                            >
                              <div>
                                <el-checkbox v-model="items3.check">{{items3.title}}</el-checkbox>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vuescroll>
          </div>
          <div class="bottom_but_box">
            <el-button type="primary" @click="saveData">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import vuescroll from "vuescroll";
export default {
  name: "adminNav",

  data() {
    return {
      ops: {
        bar: {
          background: "#5db6f8"
        }
      },
      dataList: [1, 2],
      items2Index: "",
      items3Index: "",
      rowdataId: "",
      seconeIndex: 0,
      navdata: []
    };
  },
  props: {
    //title: String,
    //diaSta: Boolean
    //updataData: Array
    //sidebar:String
  },
  watch: {
    updataData(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        //this.dataList=newVal;
        this.dataList = JSON.parse(JSON.stringify(newVal));
      }
    }
  },
  mounted() {
    //this.axiosGetData(data);
    //console.log(this.updataData);
  },
  props: {
    sidebar: String,
    saveUrl: String
  },
  computed: {
    diaSta() {
      return this.$store.state.diaSta;
    }
  },
  components: {
    vuescroll
  },
  created() {},
  methods: {
    /**
     * @description 打開关闭组件
     * @author lifei
     * @version 2019.5.28
     */
    handleClose() {
      this.$store.commit("changeDiaSta");
    },
    /**
     * @description 一级菜单选择
     * @author lifei
     * @version 2019.5.28
     */
    changeSubs1(a) {
      //alert(a);
      if (this.items2Index == a) {
        this.items2Index = "";
      } else {
        this.items2Index = a;
      }
    },
    /**
     * @description 二级菜单选择
     * @author lifei
     * @version 2019.5.28
     */
    changeSubs2(a) {
      if (this.items3Index == a) {
        this.items3Index = "";
      } else {
        this.items3Index = a;
      }
    },

    //一级有子集的点击事件
    changeChecked(indexNum, checkedData) {
      //console.log(checkedData+"---"+indexNum)
      this.seconeIndex = indexNum;
      let subsData = this.navdata[indexNum].subs.map(function(item) {
        item.check = !checkedData;
        if (item.subs) {
          item.subs.map(function(item2) {
            item2.check = !checkedData;
            return item2;
          });
        }
        return item;
      });
      this.navdata[indexNum].subs = subsData;
      //console.log(this.navdata[indexNum].subs)
    },
    //二级有子集点击事件
    changeChecked2(indexNum, checkedData) {
      //console.log(checkedData+"---"+indexNum)
      let subsData = this.navdata[this.seconeIndex].subs[indexNum].subs.map(
        function(item) {
          item.check = !checkedData;
          return item;
        }
      );
      this.navdata[this.seconeIndex].subs[indexNum].subs = subsData;
      //console.log(this.navdata[indexNum].subs)
    },
    //调用接口请求有权限的数据
    axiosGetData(rowdata, url,paramsData) {
      this.rowdataId = rowdata.id;
      let that = this;
      this.$axios({
        method: "GET",
        url: url,
        params: paramsData
      })
        .then(function(res) {
          if (res.data.data) {
            //console.log(res.data.data);
            let objArraw = JSON.parse(JSON.stringify(res.data.data));
            for (let i = 0; i < objArraw.length; i++) {
              if (objArraw[i].subs.length == 0) {
                delete objArraw[i].subs;
              } else {
                for (let j = 0; j < objArraw[i].subs.length; j++) {
                  if (objArraw[i].subs[j].subs.length == 0) {
                    delete objArraw[i].subs[j].subs;
                  }
                }
              }
            }
            that.navdata = objArraw;
            console.log(objArraw);
          }
        })
        .catch(function(err) {
          this.handleClose();
          console.log("请求错误");
        });
    },
    /**
     * @description 保存权限
     * @author lifei
     * @version 2019.5.28
     */
    saveData() {
      const loadingObj = this.$loading({
        lock: true,
        text: "权限修改中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      let idArraw = [];
      for (let i = 0; i < that.navdata.length; i++) {
        if (that.navdata[i].check) {
          idArraw.push(that.navdata[i].id);
        }
        if (that.navdata[i].subs) {
          for (let j = 0; j < that.navdata[i].subs.length; j++) {
            if (that.navdata[i].subs[j].check) {
              idArraw.push(that.navdata[i].subs[j].id);
            }
            if (that.navdata[i].subs[j].subs) {
              for (let k = 0; k < that.navdata[i].subs[j].subs.length; k++) {
                idArraw.push(that.navdata[i].subs[j].subs[k].id);
              }
            }
          }
        }
        //if(that.navdata.subs)
      }
      let formData = this.$parent.adminNavData(idArraw, this.rowdataId);

      this.$axios({
        method: "POST",
        url: that.saveUrl,
        data: formData
      })
        .then(function(res) {
          loadingObj.close();
          that.$parent.axiosGetData();
          if (res.data.data) {
            that.$message({
              type: "success",
              message: "恭喜你，修改成功!"
            });
            that.handleClose();
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "很遗憾，修改失敗!"
          });
          console.log("cuowu");
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
  width: 600px;
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
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  max-height: 622px;
  overflow: auto;
}
.cont_xi_lf {
  width: 100%;
  height: 400px;
  overflow: auto;
  background-color: #f2f6f9;
  padding: 15px;
  box-sizing: border-box;
  line-height: 40px;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
}
.content_2 {
}
.bottom_but_box {
  text-align: center;
  padding: 30px;
}
.paddlf_20 {
  padding-left: 20px;
}
.padding_50 {
  padding-left: 40px;
}
.padding_lf60 {
  padding-left: 60px;
}
.cont_xi_cen {
  width: 10%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
}
.cont_xi_cen > div {
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.cont_xi_cen > div:last-child {
  margin-top: 30px;
}
.cont_xi_rt {
  width: 45%;
  height: 500px;
  overflow: auto;
  background-color: #f2f6f9;
  padding: 15px;
  box-sizing: border-box;
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
.position_relative {
  position: relative;
}
.position_abs_jian {
  position: absolute;
  right: 15px;
  top: 13px;
  display: inline-block;
}
.xuanzuan {
  transform: rotate(-90deg);
}
</style>


