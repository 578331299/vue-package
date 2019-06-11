<template>
  <div :id="videoId"></div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      src:""
    };
  },
  mounted() {},
  props: {
    videoId: String,
    readyStatus: Boolean,
    index: Number,
    srcData:String,
  },
  watch: {
    // videoSrc(newVal, oldVal) {
    //   if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    //     this.videoReady();
    //   }
    // }
  },
  methods: {
    videoReady() {
      let my_video = this.videoId;
      let player = cyberplayer(my_video).setup({
        height: "360px",
        width: "100%",
        autostart: false,
        stretching: "uniform",
        volume: 100,
        controls: true,
        repeat: false,
        playlist: [
          {
            sources: [
              {
                file:
                  this.srcData, // 资源1 支持mp4, hls, flv等常用视频格式
                label: "高清" // 标签
              },
              {
                file:
                  this.srcData, // 资源2 必须与资源1格式和时长一致！
                label: "标清"
              }
            ]
          }
        ],
        ak: "e199eef5f57b4c8887291fb057da6239" // 公有云平台注册即可获得accessKey
      });

      let that = this; //当播放器状态正常时 取消遮罩层
      player.on("ready", function() {
        that.$emit("removeLoading", that.index); //播放器与网络延迟相关 异步操作消除dom
      });
      player.on("error", function() {
        that.$emit("removeLoading", that.index); //播放器与网络延迟相关 异步操作消除dom
      });
    }
  },
  mounted() {
   this.videoReady();
  }
};
</script>

<style scoped>
</style>


