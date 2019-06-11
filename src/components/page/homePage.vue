<template>
  <div class="content_box">
    <div class="chare_box1" style="height:auto;position: relative;">
      <img src="image/home1.png" class="bghome1" alt>
      <div class="useContent">
        <div class="title">尾气遥测管理流程示意</div>
        <div class="nav1">
          <div class="widthNav flexcontent" style="position: relative;">
            <router-link
              :to="{path:'/ExhaustTelemetryManagement',query:{type:'all'}}"
              style="margin-left:30px;"
            >
              <div class="ico1_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq3"></span>
                </div>
                <span>遥测设备</span>
              </div>
            </router-link>
          </div>
          <div class style="width:28vw">
            <img src="image/line2.png" width="100%" alt>
          </div>
          <div class="widthNav" style="position: relative;">
            <router-link
              :to="{path:'/ExhaustTelemetryManagement'}"
              @click.native="show_query('true')"
              show
              style="margin-left:30px;"
            >
              <div class="ico2_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq13"></span>
                </div>
                <span>遥测通过车辆</span>
              </div>
            </router-link>
            <router-link
              :to="{path:'/ExhaustTelemetryManagement'}"
              @click.native="show_query('false')"
              style="margin-left:30px;"
            >
              <div class="ico3_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq9"></span>
                </div>
                <span>遥测超标车辆</span>
              </div>
            </router-link>
            <router-link
              :to="{path:'/DataValidityAnalysis'}"
              @click.native="show_query('false')"
              style="margin-left:30px;"
            >
              <div class="ico4_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq11"></span>
                </div>
                <span>遥测误报数据</span>
              </div>
            </router-link>
          </div>
          <div style="width:28vw">
            <img src="image/line3.png" width="100%">
          </div>
          <div class="widthNav" style="position: relative;">
            <router-link to="/RoadInspectionDataQuery" style="margin-left:30px;">
              <div class="ico5_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq5"></span>
                </div>
                <span>路检管理</span>
              </div>
            </router-link>
            <router-link to="/CheckpointDataQuery" style="margin-left:30px;">
              <div class="ico55_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq5"></span>
                </div>
                <span>环检管理</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="chare_box1" style="height:auto;position: relative;">
      <img src="image/home2.png" class="bghome1" alt>
      <div class="useContent">
        <div class="title">黑烟车管理流程示意</div>
        <div class="nav1">
          <div class="widthNav flexcontent" style="position: relative;">
            <router-link to="/SmokyCarManagement" style="margin-left:30px;">
              <div class="ico6_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq3"></span>
                </div>
                <span>遥测设备</span>
              </div>
            </router-link>
          </div>
          <div style="width:28vw">
            <img src="image/line1.png" width="100%" alt>
          </div>
          <div class="widthNav" style="position: relative;">
            <router-link
              :to="{path:'/SmokeCarApproval'}"
              @click.native="show_query('all')"
              style="margin-left:30px;"
            >
              <div class="ico7_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq8"></span>
                </div>
                <span>黑烟车审核</span>
              </div>
            </router-link>
          </div>
          <div style="width:28vw">
            <img src="image/line3.png" width="100%">
          </div>
          <div class="widthNav" style="position: relative;">
            <router-link
              :to="{path:'/SmokeCarApproval'}"
              @click.native="show_query('true')"
              style="margin-left:30px;"
            >
              <div class="ico8_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq13"></span>
                </div>
                <span>黑烟车审核通过车辆管理</span>
              </div>
            </router-link>
            <router-link
              :to="{path:'/SmokeCarApproval'}"
              @click.native="show_query('false')"
              style="margin-left:30px;"
            >
              <div class="ico9_direction ico_direction">
                <div class="roundStyle">
                  <span class="icon-qq9"></span>
                </div>
                <span>黑烟车审核不通过车辆</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {};
  },
  methods: {
    show_query(data) {
      sessionStorage.setItem("key_data", data);
    }
  }
};
</script>
<style scoped>
.nav1 {
  width: 100%;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.bghome1 {
  width: 100%;
  overflow: hidden;
}
.useContent {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: none;
  box-sizing: border-box;
  padding: 2vw;
}
.title {
  border-left: 2px solid #01c8b3;
  font-size: 18px;
  padding-left: 10px;
  font-weight: 100;
  line-height: 18px;
  height: 18px;
  color: #666666;
}
.roundStyle {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  border: 0.2vw solid #01c8b3;
  text-align: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f6f9;
  color: #01c8b3;
}
.ico1_direction {
  left: 0vw;
  top: -1.6vw;
}
.ico2_direction {
  left: 0.5vw;
  top: -9vw;
}
.ico3_direction {
  left: 0.5vw;
  top: -1vw;
}
.ico4_direction {
  left: 0.5vw;
  top: 6vw;
}
.ico5_direction {
  left: 0vw;
  top: -7vw;
}
.ico55_direction {
  left: 0vw;
  top: 3vw;
}
.ico6_direction {
  left: 0.5vw;
  top: -2vw;
}
.ico7_direction {
  left: 0.3vw;
  top: -2vw;
}
.ico8_direction {
  left: 0vw;
  top: -7vw;
}
.ico9_direction {
  left: 0vw;
  top: 3vw;
}
.ico_direction {
  position: absolute;
  text-align: center;
}
.ico_direction > span {
  display: inline-block;
  margin-top: 0.7vw;
  color: #666666;
  font-size: 0.7vw;
}
.widthNav {
  width: 5vw;
}

.icon-qq1,
.icon-qq2,
.icon-qq3,
.icon-qq4,
.icon-qq5,
.icon-qq7,
.icon-qq8,
.icon-qq9,
.icon-qq10,
.icon-qq11,
.icon-qq12,
.icon-qq13 {
  font-size: 30px;
  display: inline-block;
}
.roundStyle:hover {
  background-color: #01c8b3;
  border: 0.2vw solid #e9edf0;
  color: #fff;
}
@media screen and (max-width: 1080px) {
  .ico_direction > span {
    font-size: 0.3vw;
  }
  .widthNav {
    width: 5vw;
  }
  .icon-qq1,
  .icon-qq2,
  .icon-qq3,
  .icon-qq4,
  .icon-qq5,
  .icon-qq7,
  .icon-qq8,
  .icon-qq9,
  .icon-qq10,
  .icon-qq11,
  .icon-qq12,
  .icon-qq13 {
    font-size: 20px;
    display: inline-block;
  }
  .flexcontent {
    display: flex;
    justify-content: flex-end;
  }
}
@media screen and (max-width: 1290px) {
  .ico4_direction {
    left: 0.5vw;
    top: 7.5vw;
  }
  .ico2_direction {
  left: 0.5vw;
  top: -10vw;
}
}
</style>

