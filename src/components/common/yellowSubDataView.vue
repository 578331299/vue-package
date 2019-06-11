<template>
  <transition name="fade">
    <div class="detailedInformation-box" @click="handleClose()" v-show="subDataViewShow">
      <div class="content1-box" @click.stop>
        <div class="title-box">
          <span>{{title}}</span>
          <div class="clouse-box">
            <img src="image/clouse.png" @click="handleClose" alt>
            <!--<span class="spanclick" ></span>-->
          </div>
        </div>
        <div class="cont-xi">
          <div style="height:calc(100% - 20px);overflow: auto">
            <el-table
              :data="subDataViewData"
              border
              style="width: 100%;margin-top:20px;"
              height="calc(100% - 120px)"
            >
              <el-table-column fixed prop="jlbh" label="记录编号" align="center"></el-table-column>
              <el-table-column prop="dwmc" label="点位名称" align="center"></el-table-column>
              <el-table-column prop="cdxh" label="车道序号" align="center"></el-table-column>
              <el-table-column prop="jcrq" label="检查日期" align="center" width="150px"></el-table-column>
              <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
              <el-table-column prop="cpys" label="车牌颜色" align="center"></el-table-column>
              <el-table-column prop="sbzxd" label="识别置信度" align="center"></el-table-column>

              <el-table-column prop="tp1" label="车牌图片" align="center">
                <template slot-scope="scope">
                  <img
                    src="image/car.png"
                    @click="pictureFun(scope.row,'image/car.png')"
                    class="head_pic"
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="bottom_but_box">
              <el-button type="primary" @click="upData(saveId)">确认提交</el-button>
              <el-button type="primary" @click="handleClose">取消提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "yellowSubDataView",
  components: {},
  data() {
    return {
      subDataViewShow: false
    };
  },
  props: {
    title: String,
    saveId: Array,
    subDataViewData: Array
  },
  mounted() {},
  methods: {
    openDialog() {},
    handleClose() {
      this.subDataViewShow = !this.subDataViewShow;
    },
    upData(row) {
      let that = this;
      let obj = {};
      obj.list = row;
      obj.type = 1;

      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/remoteSensing/submitPolice",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(function(res) {
          console.log(res);
          if (res.data.data === "error") {
            that.$message({
              type: "warning",
              message: "提交失败!"
            });
          } else {
            that.$parent.axiosGetData();
            that.handleClose();
            that.$message({
              type: "success",
              message: "提交成功!"
            });
          }
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "提交失败失败!"
          });
        });
    }
  }
};
</script>
<style scoped>
.detailedInformation-box {
  position: fixed;
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
  width: 96%;
  height: 95%;
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
  height: 95%;
  overflow: auto;
}
.head_pic {
  width: 100%;
  height: 30px;
  cursor: pointer;
}
.bottom_but_box {
  text-align: center;
  padding: 30px;
}
</style>


