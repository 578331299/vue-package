<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <!-- <sider></sider> -->
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>

      <div class="content">
        <!-- <v-bar></v-bar> -->
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import sider from "./sider2.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
import vBar from "./PositionBar.vue";
export default {
  name: "Home",
  data() {
    return {
      tagsList: [],
      collapse: false
      // special_collapse: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    vBar,
    sider
  },
  created() {
    let that = this;
    // if (Object.keys(this.$store.state.enumSelection.length == 0)) {
    //   //处理枚举值类型
    //   let obj={};
    //   let obj2={};
    //   this.$axios({
    //     method: "post",
    //     url: "/serveApi/hbj/enum/select",
    //     params: { sidebar: "" },
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     data: { }
    //   }).then(function(res) {
    //    // console.log(res.data.data);
    //     res.data.data.forEach(element => {
    //         if(obj[element.lx.toLowerCase()] ){
    //          obj[element.lx.toLowerCase()][element.sz]=element.xmnr;
    //          obj2[element.lx.toLowerCase()].push(element)
    //         }else{
    //           obj[element.lx.toLowerCase()]={};
    //           obj[element.lx.toLowerCase()][element.sz]=element.xmnr;
    //           obj2[element.lx.toLowerCase()]=[];
    //            obj2[element.lx.toLowerCase()].push(element)
    //         }
    //     });
    //     that.$store.commit('enumerationData',obj);
    //     that.$store.commit('enumSelectionChange',obj2);
    //     // console.log(that.$store.state.enumData)
    //    //console.log(JSON.stringify(that.$store.state.enumSelection))
    //   });
    // }
    bus.$on("collapse", msg => {
      // console.log(msg);
      this.collapse = msg;
      // this.special_collapse = !msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      //console.log(msg)
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        // if (msg[i].name === "ExhaustTelemetryManagement" || msg[i].name ==='DataValidityAnalysis' || msg[i].name ==='SmokyCarManagement') {
        //   continue;
        // }
        // console.log(msg[i].name);
        if (msg[i].name === "VideoSurveillanceAndStreamingServices") {
          continue;
        }
        msg[i].name && arr.push(msg[i].name);
      }
      // console.log(arr)
      this.tagsList = arr;
    });
  },
  mounted() {
    // this.collapse = true; //将侧边菜单收缩
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

