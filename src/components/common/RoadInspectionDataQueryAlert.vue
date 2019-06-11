<template>
  <el-dialog
    title="路检结果详情"
    :visible.sync="dialogCompile"
    width="600px"
    :before-close="handleClose"
  >
    <div>
      <el-form red="SmokyCarManagement" :model="SmokyCarManagement" :inline="true">
        <el-row v-for="item in dataXi" :key="item.index">
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:2px;">
              <span class="line_height25">{{item.name}}：</span>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-sta;padding-left:2px;">
            <span class="line_height25">{{item.values}}</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "roadInspectionDataQueryAlert",
  data() {
    return {
      dialogCompile: false,
      SmokyCarManagement: {},
      dataXi:[{
          name:"过量空气系数测量结果",
          values:""
      },{
          name:"怠速测量结果",
          values:""
      },{
          name:"光吸收系数k测值平均值",
          values:"0.89"
      },{
          name:"光吸收系数k测值1",
          values:"0.98"
      },{
          name:"光吸收系数k测值2",
          values:"0.83"
      },{
          name:"光吸收系数k测值3",
          values:"0.87"
      },{
          name:"光吸收系数k法规限值",
          values:"3"
      },{
          name:"测试结果",
          values:"合格"
      },{
          name:"测试方法",
          values:""
      },{
          name:"过量空气系数测量结果",
          values:"自由加速度（不透光烟度）检测"
      },{
          name:"测试仪器型号",
          values:"DiSmoke 480 BT (i)"
      },{
          name:"测试仪器编号",
          values:"DiSmoke480-4833"
      },{
          name:"检测车车牌号码",
          values:"陕A123321"
      },{
          name:"测试地点",
          values:"西三环"
      },{
          name:"检测员",
          values:"xnb"
      }]
    };
  },
  methods: {
    handleClose(done) {
      /*this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});*/
      //this.dialogVisible = false
      done();
    },
    showPage(rowdata) {
      this.dialogCompile = true;
    }
  }
};
</script>
<style scoped>
.button-div {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.line_height25{
    line-height: 25px;
    font-size: 14px;
}
</style>

