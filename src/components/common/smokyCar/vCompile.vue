<template>
  <el-dialog title="黑烟车信息编辑" :visible.sync="dialogCompile" width="600px" :before-close="handleClose">
    <div>
      <el-form red="SmokyCarManagement" :model="SmokyCarManagement" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="车牌号码：">
              <el-input v-model="SmokyCarManagement.number" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="年份：">
              <el-input v-model="SmokyCarManagement.color" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="车主：">
              <el-input v-model="SmokyCarManagement.number" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="车牌颜色：">
              <el-input v-model="SmokyCarManagement.color" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="联系电话：">
              <el-input v-model="SmokyCarManagement.number" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="地址：">
              <el-input v-model="SmokyCarManagement.color" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="取证时间：">
              <el-input v-model="SmokyCarManagement.number" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="浓度：">
              <el-input v-model="SmokyCarManagement.color" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-end;padding-right:10px;">
            <el-form-item label="取证地点：">
              <el-input v-model="SmokyCarManagement.number" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="button-div">
      <el-button type="primary" round>检索</el-button>
      <el-button type="primary" round>保存</el-button>
    </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "vCompile",
  data() {
    return {
      dialogCompile: false,
      SmokyCarManagement:{}
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
    showvCompile() {
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
</style>

