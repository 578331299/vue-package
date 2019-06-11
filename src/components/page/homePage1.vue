<template>
  <div style="width:100%;height:100%">
    <div id="naremid" style="width:100%;">
      <div v-show="show_page2">
        <home></home>
      </div>
    </div>

    <div class="content_box" style="width:100%;height:100%" v-show="show_page1">
      <div class="index_title">
        <!-- <router-link to="/ExhaustTelemetryManagement">
        <div class="title_box titleimg">
          <span class="icon-zuoyeqianqitijiance ico_size"></span>
          <br>
          <span class="text_zh">尾气遥测管理</span>
          <br>
          <span class="text_en">Exhaust Telemetry Management</span>
        </div>
      </router-link>
      <router-link to="/SmokyCarManagement" style="margin-left:30px;">
        <div class="title_box titleimg2">
          <span class="icon-cheliangxinxi ico_size"></span>
          <br>
          <span class="text_zh">黑烟车管理</span>
          <br>
          <span class="text_en">Smoky Car Managment</span>
        </div>
      </router-link>
      <router-link to="/ExhaustTelemetryManagement" style="margin-left:30px;">
        <div class="title_box titleimg3">
          <span class="icon-fenxi ico_size"></span>
          <br>
          <span class="text_zh">数据综合分析</span>
          <br>
          <span class="text_en">Comprehensive Analysis Of Data</span>
        </div>
        </router-link>-->
      </div>
      <div
        class="chare_box"
        style="padding:8px;height:100%;position:relative;margin-bottom:0;box-sizing: border-box"
      >
        <div class="riqi" style="color:#009fff">
          <span>当前时间：{{nowTime}}</span>
          <div class="tuli_box">
            <div class="tuliBg color1"></div>
            <div class="tuliName">车流量</div>
            <div class="tuliBg color2"></div>
            <div class="tuliName">超标车辆</div>
            <div class="tuliBg color3"></div>
            <div class="tuliName">黑烟车</div>
          </div>
        </div>
        <div class="title_index">咸阳市遥感监测GIS展示</div>
        <div id="map_box" style="height:100%;width:100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
import vBar from "../common/PositionBar.vue";
import vLine from "../common/charts/line.vue";
import * as $jquery from "jquery";
import home from "./homePage.vue";
import bus from "../common/bus";

export default {
  name: "homePage",
  data() {
    return {
      show_page1: true,
      show_page2: false,
      nowTime: "",
      mapdata: []
    };
  },
  components: {
    vBar,
    vLine,
    home
  },
  mounted() {
    this.setTimer();
    window.reset_map = function(hashSome) {
      location.hash = "#/" + hashSome;
    };
  },
  created() {
    this.axiosGetData();
    bus.$on("homeChange", page => {
      this.show_page1 = !this.show_page1;
      this.show_page2 = !this.show_page2;
    });
  },
  methods: {
    onSubmitVehicleMonitoring() {},
    onSubmitVehicleAnalysis() {},
    onSubmitCylindricalGraph() {},
    timeFormate() {
      let riqi = new Date();
      let year = riqi.getFullYear();

      let month =
        riqi.getMonth() + 1 < 10
          ? "0" + (riqi.getMonth() + 1)
          : riqi.getMonth() + 1;
      let date = riqi.getDate() < 10 ? "0" + riqi.getDate() : riqi.getDate();
      let hh = riqi.getHours() < 10 ? "0" + riqi.getHours() : riqi.getHours();
      let mm =
        riqi.getMinutes() < 10 ? "0" + riqi.getMinutes() : riqi.getMinutes();
      let ss =
        riqi.getSeconds() < 10 ? "0" + riqi.getSeconds() : riqi.getSeconds();

      this.nowTime =
        year + "-" + month + "-" + date + " " + " " + hh + ":" + mm + ":" + ss;
      //console.log(this.nowTime);
    },
    axiosGetData() {
      let that = this;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/gis/findGisData",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          siderbar: "gis展示"
        }
      })
        .then(function(res) {
          console.log(res.data.data);
          let arrObj = [];
          if (res.data.data) {
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = {
                point: [res.data.data[i]["jd"], res.data.data[i]["wd"]],
                cll: res.data.data[i]["cll"],
                bhgcls: res.data.data[i]["bhgcls"],
                hgcls: res.data.data[i]["hgcls"],
                hyczs: res.data.data[i]["hyczs"],
                hycycfs: res.data.data[i]["hycycfs"],
                hycwcfs: res.data.data[i]["hycwcfs"],
                mc: res.data.data[i]["mc"],
                type: res.data.data[i]["type"]
              };
              arrObj.push(JSON.parse(JSON.stringify(obj)));
            }
          }
          that.mapdata = arrObj;
          that.mapFun();
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    mapFun() {
      let map = new BMap.Map("map_box", { enableMapClick: false }); // 创建Map实例

      map.centerAndZoom(new BMap.Point(108.715154, 34.335737), 14); // 初始化地图,设置中心点坐标和地图级别
      map.setMapStyle({
        styleJson: [
          {
            featureType: "poilabel",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          }
        ]
      });

      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      map.setZoom(14);
      map.setCurrentCity("西安"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      let that = this;
      let cityId = null;
      // 复杂的自定义覆盖物
      //参数 point 坐标 , backImg 图片,oneparameter 周边设备数,twoparameter 上网人数 ,threeparameter 车牌号码 ,fourparameter 设备MAC,fiveparameter 时间
      function ComplexCustomOverlay(point, backImg, num, mapdata, backImg2) {
        this._point = point;
        this._backImg = backImg;
        this._backImg2 = backImg2;
        this._num = num;
        this._mapdata = mapdata;
      }
      ComplexCustomOverlay.prototype = new BMap.Overlay();
      ComplexCustomOverlay.prototype.initialize = function(map) {
        console.log($jquery("#divwer")[0]);
        this._map = map;
        let div = (this._div = document.createElement("div"));
        console.log(this._point.lat);
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        console.log(this._backImg);
        if (this._mapdata.type == 1) {
          div.style.background =
            "url('" + this._backImg + "') no-repeat center center";
        } else {
          div.style.background =
            "url('" + this._backImg2 + "') no-repeat center center";
        }

        div.style.MozUserSelect = "none";
        div.style.zIndex = 99;
        // div.setAttribute("className","abc");
        $jquery(div).css({
          position: "absolute",
          "z-index": this._num,
          cursor: "pointer",
          height: "30",
          width: "30",
          margin: "0",
          padding: "0",
          color: "#fff",
          "font-size": "14px"
        });
        $jquery(div).attr({ num: this._num, class: "pointD" });
        //  滑过显示盒子
        let onediv = document.createElement("div");
        $jquery(onediv).css({
          height: "30",
          width: "30",
          "white-space": "nowrap",
          margin: "0",
          padding: "0",
          color: "#fff",
          //background:"red",
          "text-align": "center",
          "line-height": "30px"
        });
        //onediv.innerHTML = this._num;
        $jquery(div)
          .append(`<div class="disNCz" style="display:none; position:absolute;padding:10px;left: -160px; top: -214px;  width: 320px;height:200px;z-index: 3; ">
    <div style="width:320px;height: 200px;border: 2px solid #5eb5f8;border-radius: 7px;background-color: #fff">
      <div
        style="line-height:45px;overflow: hidden;text-align: center;background: #5eb5f8;font-weight: 700;font-size: 14px;">
        <a style="color:#fff;text-decoration: none;" onmouseover="this.style.fontSize='15px';"
          onmouseout="this.style.fontSize='14px';" onclick="reset_map('PointManagement')">站点名称：${
              this._mapdata.mc
            }</a></div>
      <div style="line-height:25px;padding:5px 20px 5px 45px;position: relative;"><a
          style="color: #000;text-decoration: none;" onmouseover="this.style.color='#5eb5f8';"
          onmouseout="this.style.color='#000';" onclick="reset_map('TrafficFlowMonitoringStatistics')"><span style="position: absolute;left:11px;font-size: 25px;"
            class="icon-liuliang"></span>车流量：${
              this._mapdata.cll
            }辆/h</a></div>
      <div style="line-height:25px;padding:5px 20px 5px 45px;position: relative;"><a
          style="color: #000;text-decoration: none;" onmouseover="this.style.color='#5eb5f8';"
          onmouseout="this.style.color='#000';" onclick="reset_map('ExhaustTelemetryManagement')"><span style="position: absolute;left:11px;font-size: 25px;"
            class="icon-jiance"></span>监测信息：合格车辆${
              this._mapdata.hgcls
            }辆,不合格车辆${this._mapdata.bhgcls}辆</a></div>
      <div style="line-height:25px;"></div>
      <div style="line-height:25px;padding:5px 20px 5px 45px;position: relative;"><a
          style="color: #000;text-decoration: none;" onmouseover="this.style.color='#5eb5f8';"
          onmouseout="this.style.color='#000';" onclick="reset_map('SmokyCarManagement')"><span style="position: absolute;left:11px;font-size: 25px;"
            class="icon-cheliangxinxi"></span>黑烟车处理情况：黑烟车总数${
              this._mapdata.hyczs
            }辆,已处罚${this._mapdata.hycycfs}辆，未处罚${
          this._mapdata.hycwcfs
        }辆</a></div>
      <div style="line-height:25px;"></div>
    </div>
  </div>`);
        $jquery(div)
          .append(`<div class="zhuzhuangtu" style=" width: 90px; height: 50px; display: flex;align-items: flex-end;position:absolute;z-index: 1;color: #fff;font-size: 10px;text-align: center;left: -32px; top: -50px;">
        <div style="width: 30px;height: ${Math.floor(
          this._mapdata.cll <= 100 ? this._mapdata.cll*5 : this._mapdata.cll / 3
        )}px;background-color: #5b9bd5;">${this._mapdata.cll}</div>
        <div style="width: 30px;height: ${Math.floor(
          this._mapdata.bhgcls <= 100
            ? this._mapdata.bhgcls*5
            : this._mapdata.bhgcls / 3
        )}px;background-color: #ed7d31;">${this._mapdata.bhgcls}</div>
        <div style="width: 30px;height: ${Math.floor(
          this._mapdata.hgcls <= 100 ? this._mapdata.hgcls*5 : this._mapdata.hgcls / 3
        )}px;background-color: #ffc000;">${this._mapdata.hgcls}</div>
    </div>`);
        div.appendChild(onediv);
        //  滑到显示
        $jquery(div).mousemove(function() {
          $jquery(this).css("z-index", "999999");
          $jquery(this)
            .children(".disNCz")
            .css("display", "block");
        });
        //  滑过隐藏
        $jquery(div).mouseout(function() {
          $jquery(this).css("z-index", $jquery(this).attr("num"));
          $jquery(this)
            .children(".disNCz")
            .css("display", "none");
        });
        map.getPanes().labelPane.appendChild(div);
        map.addEventListener("zoomend", function(div) {
          var ZoomNum = map.getZoom();
          if (ZoomNum < 14) {
            $jquery(".zhuzhuangtu").css("display", "none");
          } else {
            $jquery(".zhuzhuangtu").css("display", "flex");
          }
          //console.log(ZoomNum);
        });
        return div;
      };
      ComplexCustomOverlay.prototype.draw = function() {
        let map = this._map;
        let pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 15 + "px";
        this._div.style.top = pixel.y - 15 + "px";
      };

      // 把定位点添加到地图中
      let o = 1;
      let timeOut = null;
      function posiPoint() {
        let backImg = "image/xinhao.png";
        let backImg2 = "image/red.gif";
        console.log(that.mapdata);
        //debugger;
        let pointd = new BMap.Point(
          that.mapdata[o - 1].point[0],
          that.mapdata[o - 1].point[1]
        );
        //console.log(that.mapdata[o - 1].point[0], that.mapdata[o - 1].point[1]);
        //debugger;
        let myCompOverlayveh = new ComplexCustomOverlay(
          pointd,
          backImg,
          o,
          that.mapdata[o - 1],
          backImg2
        );
        map.addOverlay(myCompOverlayveh);
        o++;
        if (o - 1 < that.mapdata.length) {
          timeOut = setTimeout(posiPoint, 500);
        }
      }
      posiPoint();
    },
    setTimer: function() {
      this.timer = setInterval(() => {
        this.timeFormate();
      }, 1000);
    }
  }
};
</script>
<style scoped>
.tuli_box {
  display: flex;
  font-size: 12px;
  margin-top: 10px;
}
.tuliBg {
  width: 30px;
  height: 10px;
  border-radius: 3px;
}
.color1 {
  background-color: #5b9bd5;
}
.color2 {
  background-color: #ed7d31;
}
.color3 {
  background-color: #ffc000;
}
.tuliName {
  padding: 0 20px 0 5px;
  position: relative;
  top: -2px;
}
.remoteSensingEquipmentDate {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50px;
  font-size: 14px;
}
.margin_right50 {
  margin-right: 50px;
}

.cylindricalGraph_search {
  text-align: center;
}
.input_style {
  width: 130px;
  height: 30px;
  border-radius: 5px;
  background: #e7e7e7;
  border: none;
}
.margin_left {
  margin-left: 150px;
}
.span_style {
  margin-left: 5px;
  margin-right: 5px;
}
.subumit {
  text-align: center;
  margin-bottom: 30px;
}
.but_style {
  padding: 5px 20px 5px 20px;
  background: #a8a8a8;
  border-radius: 5px;
  border: none;
}
.margin_lef35 {
  margin-right: 35px;
}
.index_title {
  display: flex;
}
.title_box {
  width: 229px;
  height: 111px;
  overflow: hidden;
  text-align: center;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 30px;
}
.titleimg {
  background-image: url("../../assets/img/1.png");
}
.titleimg:hover {
  background-image: url("../../assets/img/1-2.png");
}
.titleimg2 {
  background-image: url("../../assets/img/2.png");
}
.titleimg2:hover {
  background-image: url("../../assets/img/2-1.png");
}
.titleimg3 {
  background-image: url("../../assets/img/3.png");
}
.titleimg3:hover {
  background-image: url("../../assets/img/3-1.png");
}
.ico_size {
  display: inline-block;
  font-size: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.text_zh {
}
.text_en {
  font-size: 12px;
}
.riqi {
  width: 300px;
  height: 40px;
  position: absolute;
  z-index: 999;
  right: 10px;
  top: 20px;
}
.title_index {
  width: 100%;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 20px;
  padding-left: 30px;
  font-size: 20px;
  font-weight: 700;
  color: #009fff;
  text-align: left;
  box-sizing: border-box;
}
</style>

