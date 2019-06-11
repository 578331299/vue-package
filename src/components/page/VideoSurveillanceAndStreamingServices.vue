

<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;">
      <el-form
        red="formVideoSurveillanceAndStreamingServices"
        :model="formVideoSurveillanceAndStreamingServices"
        :inline="true"
      >
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: flex-end;">
            <el-form-item label="监测点名称：">
              <el-input
                v-model="formVideoSurveillanceAndStreamingServices.monitoringPoint"
                style="width:150px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-start;align-items: center">
            <div class="button_box">
              <el-button type="primary" @click="searchVideo">查询</el-button>
              <el-button type="primary" @click="resetVideo">重置</el-button>
              <!-- <el-switch
                v-model="stream"
                active-text="开始拉流"
                inactive-text="结束拉流"
                style="margin-left:20px"
              ></el-switch> -->
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:auto"
    >
      <el-row>
        <el-col :span="24" style="display:flex;justify-content: flex-end;">
          <el-button icon="icon-quanping" type="primary" @click="show"></el-button>
        </el-col>
      </el-row>
      <el-row v-if="showVideo">
        <template v-for="(item,index) in videoList">
          <el-col :span="12" style="height:400px;border:solid 1px #ddd" :index="index">
            <video-stream
              :videoId="item.id"
              :readyStatus="ready"
              @removeLoading="removeLoading"
              :index="index"
              :srcData="item.videoSrc"
            ></video-stream>
            <span style="height:40px">{{item.txt}}</span>
          </el-col>
        </template>
      </el-row>
      <el-row v-else>
        <template v-for="(item,index) in videoListB">
          <el-col :span="8" style="height:400px;border:solid 1px #ddd" :index="index">
            <video-stream :videoId="item.id" :readyStatus="ready" :index="index"></video-stream>
            <span style="height:40px">{{item.txt}}</span>
          </el-col>
        </template>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="logPag.pageNum"
        :page-size="logPag.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="logPag.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import videoStream from "../common/video-stream.vue";
export default {
  name: "VideoSurveillanceAndStreamingServices",
  data() {
    return {
      searchName:"",
      logPag: { pageNum: 1, pageSize: 4, total: 0 },
      stream: false,
      showVideo: true,
      videoList: [
        // {
        //   txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
        //   id: "videoA",
        //   loadingA: true,
        //   videoSrc: "rtmp://192.168.1.25:1935/live/home"
        // },
        // {
        //   txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
        //   id: "videoB",
        //   loadingA: true,
        //   videoSrc: "rtmp://192.168.1.25:1935/live/home1"
        // },
        // {
        //   txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
        //   id: "videoC",
        //   loadingA: true,
        //   videoSrc: "rtmp://192.168.1.25:1935/live/home1"
        // },
        // {
        //   txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
        //   id: "videoD",
        //   loadingA: true,
        //   videoSrc: "rtmp://192.168.1.25:1935/live/home"
        // }
      ],

      videoListB: [
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA1",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA2",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA3",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA4",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA5",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA6",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA7",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA8",
          loadingA: true,
          videoSrc: ""
        },
        {
          txt: "陕西省西安市未央区北二环路西段9号监控摄像头",
          id: "videoA9",
          loadingA: true,
          videoSrc: ""
        }
      ],

      loadingName: "loadingA",
      loadingA: true,
      formVideoSurveillanceAndStreamingServices: {monitoringPoint:""},
      videoA: "videoA",
      videoB: "videoB",
      videoC: "videoC",
      ready: false,
      readyB: false
    };
  },
  components: { videoStream },
  mounted() {
    this.videoReady();
  },
  created() {
    this.finaAllPage();
  },
  methods: {
    searchVideo(){
      this.logPag.pageNum=1;
      this.finaAllPage();
    },
    resetVideo(){

    },

    handleSizeChange() {},
    handleCurrentChange() {},
    show() {
     // this.showVideo = !this.showVideo;
     this.logPag.pageSize=9;
     this.finaAllPage();
    },
    videoReady() {
      //当mounted之后初始化播放器
      this.ready = true;
    },
    removeLoading(num) {
      //取消遮罩层
      this.videoList.forEach((item, index) => {
        if (index == num) {
          item.loadingA = false;
        }
      });
    },
    finaAllPage() {
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios({
        url: "http://192.168.1.121:8083/camera/getPage",
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        params: {},
        data: { pageSize: 10, pageNum: 1 ,name:this.formVideoSurveillanceAndStreamingServices.monitoringPoint}
      })
        .then(res => {
          loadingObj.close();
          this.logPag.total=res.data.data.total;
          let arr=[];
          res.data.data.list.forEach((ele,index)=>{
            let obj={};
            obj.id="video"+index;
            obj.txt=ele.name;
            obj.videoSrc=ele.putpath;
            arr.push(obj);
          })
          this.videoList=arr;

        })
        .catch(err => {
          loadingObj.close();
          this.$message({type:"warning",message:err})
        });
    }
  }
};

// player.onAlive(function(){
//     console.log("onAlive");
// });
</script>

<style scoped>
</style>

