<template>
  <div class="detailedInformation_box" @click="handleClose()" v-if="show">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <span>用户角色权限编辑</span>
        <div class="clouse_box">
          <img src="image/clouse.png" @click="handleClose" alt>
          <!--<span class="spanclick" ></span>-->
        </div>
      </div>
      <div class="cont_xi">
        <div class="cont_xi_lf content_2">
          <vuescroll :ops="ops" color="#5db6f8">
            <div>
              <div
                class="paddlf_20"
                v-for="(item,index) in juese"
                :key="item.index"
                :style="{background:(index%2 == 0 ? '#fff' : '')}"
              >
                <el-checkbox v-model="item.check">{{item.name}}</el-checkbox>
              </div>
            </div>
          </vuescroll>
        </div>
        <div class="bottom_but_box">
          <el-button type="primary" @click="savaData">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vuescroll from "vuescroll";
export default {
  name: "role",
  methods: {
    openDialog() {},
    handleClose() {
      this.show = !this.show;
    },
    getUserRoleByUser(row) {
      let that = this;
      this.$axios({
        method: "GET",
        url:
          "/serveApi/hbj/role/getUserRoleByUserId?userId=" +
          row.userid +
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
    },
    savaData() {
      let that = this;
      let idArraw = [];
      for (let i = 0; i < this.juese.length; i++) {
        if (this.juese[i].check) {
          
          idArraw.push(this.juese[i].id);
        }
      }
      let formData = {};
      formData.userId = this.rowData.userid;
      formData.roleIds = idArraw.join();
      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/role/setUserRole",
        data: formData
      })
        .then(function(res) {
          console.log("res"+res);
          that.$emit("axiosGetData");
          that.handleClose();
          /*if (res.data.data) {
            that.handleClose();
          }*/
        })
        .catch(function(err) {
          console.log("cuowu");
        });
    }
  },
  data() {
    return {
      show: false,
      sidebar: "用户权限管理",
      ops: {
        // some configs....
      },
      juese: []
    };
  },
  props: {
    //title: String,
    //diaSta: Boolean
    //updataData: Array
    rowData: Object
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
  computed: {
    diaSta() {
      return this.$store.state.diaSta;
    }
  },
  components: {
    vuescroll
  },
  created() {}
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


