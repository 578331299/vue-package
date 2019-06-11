<template>
  <div>
    <el-dialog title="播放视频" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <video width="100%" id="video"  controls autoplay="autoplay">
        <source :src="videoSrc" type="video/mp4" >
      </video>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../common/bus.js";
export default {
  name:"vVideosrc",
  data() {
    return {
      dialogVisible: false,
      videoSrc:""
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
        document.getElementById('video').pause()
        done();
    },
    showPage(data){
        this.videoSrc=data.sp1;
        this.dialogVisible = true
    }
  }
};
</script>
