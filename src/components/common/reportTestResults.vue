<template>
  <div>
    <el-dialog title="检测结果报告书" :visible.sync="reportTestResultsbool" width="600px" :before-close="handleClose">
      <div>
          <img src="../../assets/img/word1_03.png" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:"reportTestResult",
  data() {
    return {
      reportTestResultsbool: false
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
    showPage(){
        this.reportTestResultsbool = true
    }
  }
};
</script>
