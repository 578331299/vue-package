

<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="padding:20px 20px;height:100%;position:relative;margin-bottom:0;">
      <div id="map_box" style="height:100%;width:100%"></div>
      <map-legend :positionLR="positionLR"></map-legend>
    </div>
  </div>
</template>

<script>
import mapLegend from "../common/mapLegend.vue";
import mapLayout from "../common/mapLayout.vue";
import * as $jquery from "jquery";
export default {
  name: "TelemetryGISDisplay",
  data() {
    return {
      positionLR: {
        right: "85px",
        bottom: "30px"
      },
      mapLegendData: [
        {
          point: [
            [108.867686, 34.344634],
            [108.882993, 34.33134],
            [108.855038, 34.321442],
            [108.833048, 34.330207],
            [108.867686, 34.344634]
          ],
          color: "#FF0000"
        },
        {
          point: [
            [108.950762, 34.342429],
            [108.999055, 34.334202],
            [108.994743, 34.319892],
            [108.940701, 34.309397],
            [108.921441, 34.327882]
          ],
          color: "#04FF3F"
        }
      ],
      mapdata: [
        {
          point: [108.97074, 34.327882],
          AQI: "66",
          color: "#ffff00",
          pollutionState: "良",
          pollutionLevel: "2",
          firstContaminants: "PM2.5",
          healthEffects:
            "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较轻影响。",
          proposal: "少数异常敏感人群应减少户外运动。",
          everyContaminants: [
            { name: "PM2.5", color: "#00E600", number: 12 },
            { name: "O3", color: "#00E600", number: 22 },
            { name: "SO2", color: "#00E600", number: 10 },
            { name: "PM10", color: "#ffff00", number: 55 },
            { name: "NO2", color: "#00E600", number: 25 },
            { name: "CO", color: "#00E600", number: 2 }
          ]
        }
      ]
    };
  },
  mounted() {
    //console.log($jquery("#divwer")[0]);
    // console.log(this.$jquery("#divwer"));
    // return;
    let map = new BMap.Map("map_box"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(108.97074, 34.327882), 11); // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      })
    );
    map.setZoom(14);
    map.setCurrentCity("西安"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    //地圖劃多邊形區域
    /*for (let i = 0; i < this.mapLegendData.length; i++) {
      let mpArr = [];
      for (let j = 0; j < this.mapLegendData[i].point.length; j++) {
        mpArr.push(
          new BMap.Point(
            this.mapLegendData[i].point[j][0],
            this.mapLegendData[i].point[j][1]
          )
        );
      }
      let polygons = new BMap.Polygon(mpArr, {
        strokeColor: "blue",
        strokeWeight: 1,
        strokeOpacity: 0.1,
        fillColor: this.mapLegendData[i].color,
        fillColorOpacity: "0.4"
      });
      map.addOverlay(polygons);
    }*/
    let that = this;
    let cityId = null;
    // 复杂的自定义覆盖物
    //参数 point 坐标 , backImg 图片,oneparameter 周边设备数,twoparameter 上网人数 ,threeparameter 车牌号码 ,fourparameter 设备MAC,fiveparameter 时间
    function ComplexCustomOverlay(point, backImg, num, mapdata) {
      this._point = point;
      this._backImg = backImg;
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
      div.style.background =
        "url('" + this._backImg + "') no-repeat center center";
      div.style.MozUserSelect = "none";
      div.style.zIndex = 99;
      // div.setAttribute("className","abc");
      $jquery(div).css({
        position: "absolute",
        "z-index": this._num,
        cursor: "pointer",
        height: "30",
        width: "60",
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
        "text-align": "center",
        "line-height": "30px"
      });
      //onediv.innerHTML = this._num;
      $jquery(div)
        .append(`<div class="disNCz" style="display:none; position:absolute;padding:10px; left:-276px; top:-255px; width: 553px;height:273px; ">
         <div class="mapLaout_box" style=" width: 553px; display: flex; font-size: 0;background-image: url(img/bg.c9b1cfaa.png) ;background-repeat: no-repeat;">
    <div class="left" style=" padding: 15px; width: 330px; position: relative;">
      <div class="title1 title" style=" position: absolute; left: 58px; top: 11px; color: #fff;font-size: 14px; font-weight: 700;">实时空气质量指数</div>
      <div class="content_box" style="display: flex;">
        <div class="numberTe" style="color:${
          this._mapdata.color
        };font-size: 50px; padding-top: 50px; width: 100px; text-align: center; font-weight: 700;  color: #ffff00;">${
        this._mapdata.AQI
      }</div>
        <div class="detailed" style="font-size: 12px; padding: 20px 10px; position: relative; left: 12px; top: 25px; color: #fff;">
          <p style="margin-bottom: 5px;">首要污染物：${
            this._mapdata.firstContaminants
          }</p>
          <p style="margin-bottom: 5px;">污染级别：${
            this._mapdata.pollutionLevel
          }级</p>
          <p style="margin-bottom: 5px;">空气质量：${
            this._mapdata.pollutionState
          }</p>
        </div>
      </div>
      <div class="introduce" style="font-size: 12px; position: relative; padding-top: 55px;color:#000">
        <div style="line-height: 20px;width: 330px;">
          <span style="color: #598ee5;">对健康的影响：</span>
          <span>${this._mapdata.healthEffects}</span>
        </div>
        <div style="line-height: 20px;width: 330px;word-wrap:break-word">
          <span style="color: #598ee5;">建议措施：</span>
          <span>${this._mapdata.proposal}</span>
        </div>
      </div>
    </div>
    <div class="right" style="">
      <div class="title2 title" style=" font-size: 14px; font-weight: 700; padding-left: 40px; padding-top: 10px;">污染物空气质量分指数</div>
      <div class="progress_bar" style=" position: relative; font-size: 12px; height: 25px; padding-top: 8px; padding-left: 23px; width: 155px;">
        <div class="progress_bar_lift" style="position: absolute; left: 23px; top: 15px;">${
          this._mapdata.everyContaminants[0].name
        }</div>
        <div class="progress_bar_right" style="position: absolute; right: 0px; top: 15px;">${
          this._mapdata.everyContaminants[0].number
        }</div>
        <div class="length" style=" width: 100%; height: 10px; background: #fff; position: relative; top: 20px; overflow: hidden;">
        <div style="background-color: ${
          this._mapdata.everyContaminants[0].color
        };width:${(this._mapdata.everyContaminants[0].number / 300) * 100 +
        "%"};height:10px"></div>
        </div>
      </div>
      <div class="progress_bar" style=" position: relative; font-size: 12px; height: 25px; padding-top: 8px; padding-left: 23px; width: 155px;">
        <div class="progress_bar_lift" style="position: absolute; left: 23px; top: 15px;">${
          this._mapdata.everyContaminants[1].name
        }</div>
        <div class="progress_bar_right" style="  position: absolute; right: 0px; top: 15px;">${
          this._mapdata.everyContaminants[1].number
        }</div>
        <div class="length" style=" width: 100%; height: 10px; background: #fff; position: relative; top: 20px; overflow: hidden;">
        <div style="background:${
          this._mapdata.everyContaminants[1].color
        };width:${(this._mapdata.everyContaminants[1].number / 300) * 100 +
        "%"};height:10px"></div>
        </div>
      </div>
        <div class="progress_bar" style=" position: relative; font-size: 12px; height: 25px; padding-top: 8px; padding-left: 23px; width: 155px;">
        <div class="progress_bar_lift" style="position: absolute; left: 23px; top: 15px;">${
          this._mapdata.everyContaminants[2].name
        }</div>
        <div class="progress_bar_right" style="  position: absolute; right: 0px; top: 15px;">${
          this._mapdata.everyContaminants[2].number
        }</div>
        <div class="length" style=" width: 100%; height: 10px; background: #fff; position: relative; top: 20px; overflow: hidden;">
        <div style="background:${
          this._mapdata.everyContaminants[2].color
        };width:${(this._mapdata.everyContaminants[2].number / 300) * 100 +
        "%"};height:10px"></div>
        </div>
      </div>
        <div class="progress_bar" style=" position: relative; font-size: 12px; height: 25px; padding-top: 8px; padding-left: 23px; width: 155px;">
        <div class="progress_bar_lift" style="position: absolute; left: 23px; top: 15px;">${
          this._mapdata.everyContaminants[3].name
        }</div>
        <div class="progress_bar_right" style="  position: absolute; right: 0px; top: 15px;">${
          this._mapdata.everyContaminants[3].number
        }</div>
        <div class="length" style=" width: 100%; height: 10px; background: #fff; position: relative; top: 20px; overflow: hidden;">
        <div style="background:${
          this._mapdata.everyContaminants[3].color
        };width:${(this._mapdata.everyContaminants[3].number / 300) * 100 +
        "%"};height:10px"></div>
        </div>
      </div>
      <div class="progress_bar" style=" position: relative; font-size: 12px; height: 25px; padding-top: 8px; padding-left: 23px; width: 155px;">
        <div class="progress_bar_lift" style="position: absolute; left: 23px; top: 15px;">${
          this._mapdata.everyContaminants[4].name
        }</div>
        <div class="progress_bar_right" style="  position: absolute; right: 0px; top: 15px;">${
          this._mapdata.everyContaminants[4].number
        }</div>
        <div class="length" style=" width: 100%; height: 10px; background: #fff; position: relative; top: 20px; overflow: hidden;">
        <div style="background:${
          this._mapdata.everyContaminants[4].color
        };width:${(this._mapdata.everyContaminants[4].number / 300) * 100 +
        "%"};height:10px"></div>
        </div>
      </div>
      <div class="progress_bar" style=" position: relative; font-size: 12px; height: 25px; padding-top: 8px; padding-left: 23px; width: 155px;">
        <div class="progress_bar_lift" style="position: absolute; left: 23px; top: 15px;">${
          this._mapdata.everyContaminants[5].name
        }</div>
        <div class="progress_bar_right" style="  position: absolute; right: 0px; top: 15px;">${
          this._mapdata.everyContaminants[5].number
        }</div>
        <div class="length" style=" width: 100%; height: 10px; background: #fff; position: relative; top: 20px; overflow: hidden;">
        <div style="background:${
          this._mapdata.everyContaminants[5].color
        };width:${(this._mapdata.everyContaminants[5].number / 300) * 100 +
        "%"};height:10px"></div>
        </div>
      </div>
    </div>
  </div></div>`);
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
      let backImg =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY5RkI2RkE1RTkxMUUwODI2REU5NkQ5QTFGNjdFMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY5RkI3MEE1RTkxMUUwODI2REU5NkQ5QTFGNjdFMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjlGQjZEQTVFOTExRTA4MjZERTk2RDlBMUY2N0UxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjlGQjZFQTVFOTExRTA4MjZERTk2RDlBMUY2N0UxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kU8h2AAAA3dJREFUeNrMl0toFEEQhqtnZh9unm5MxEQRNQ8IHnwe9JJAQLx5NBc9COJB8aSgN4+KOejdo6go4knwIhIJPlEUUS9RYkxissnmsTGZ3Z2dGf9aK2HYTLK7SUZs+NM9zHbn66qu6hrlui4VtpdN+w10tdBmqBUKQ3PQF2hKlG+Hht9RUM3wAWtDdwo6FtHdtpDuksID/83YRJatXuPxIXQXGqIAm1qwnFjrOHStvtJtqm6MU7ShjigaJSeRIHdyklzTpHRO0WxWo0lTe4vfXoTlev8F3Hl0PTta46Gqrg5yk0nKffxIzsSE70QGHJnVExh2A/BZYHAAO4rxvZY9TTWxI11kPX1K9sBA0ckC+A3DowDsX284DWAN6C9srTdqYl2dlH38uCQwblVhhxoq7F0YnsM64XWHg/ZBnTV728nq6yNndLSsBWojDndnoE1BwHXUx2xd6TrZ/eV7RiGUqyNOlDcYBNzuSEWY7KHVZ4WokQ+qA0HAOcoIle1Ob5OAt4OAI+c3kr/j0P/WGM5Q5K4tH6l8FwoC7n3aVmtaxLTy818EAffctLRVL+C4+WQ8jWFfEBf/5zlL9UIdFaHy3TuTyW/sPpRUShUzxIKUaHGPBVqEG4FuDqWMgy1xK6aV4WETRUBiTuf5N3B9ZWgpnCblFp/HDVAlFOPsA+kCmIOyUpKl+FaEMpwEFkqmR9CtqbR2vm5DaVHLNh6cMSx0lwH21QcqKjXhNqkLY2KMQsu5Il5rhpeFvvPevfXc1Yl5/TAsd2BjtDhgcp43TrehBwWv+AVqLeK6cEsB1Iq5XKzLv+VSKO2d8As6CTeNz1sr+3Ya05Km9gbDS7Ca6c0qUI3c1ztlHC4BzOsQU9y8ZBK75+zPlOHknOXTxticPiyXfcInwNiFcShScOhXDHqBGhUGPnuO347YTVcmTX3JCxtLDKYMPrgXoA/L7DwN/ZYzVMxKOQmEcegT17wCmPP9hpB2HcHRbmhud9wTIMm/wD1cmC4zj+/XMXFlM1QvkVqYNrKyiQkJgHGxnCXQtBIcT7w0Pq83KwkQjAnAdzhwSjgzPyQd7JKgiAh4RqzKJdCwWC2zYKmiX1+exv/gBALkSdZW2xEEr/B8WsCLuSst+ZNBp+UcJgUoJUCWN+H63tkvGveVGkW+h9v73ar8k3BIlBOgkkurPwIMAGoCSg1/fYeDAAAAAElFTkSuQmCC";
      let pointd = new BMap.Point(
        that.mapdata[o - 1].point[0],
        that.mapdata[o - 1].point[1]
      );
      //console.log(that.mapdata[o - 1].point[0], that.mapdata[o - 1].point[1]);
      let myCompOverlayveh = new ComplexCustomOverlay(
        pointd,
        backImg,
        o,
        that.mapdata[o - 1]
      );
      map.addOverlay(myCompOverlayveh);
      o++;
      if (o - 1 < that.mapdata.length) {
        timeOut = setTimeout(posiPoint, 500);
      }
    }
    posiPoint();
  },
  components: {
    mapLegend,
    mapLayout
  },
  methods: {}
};
</script>
<style scoped>
.mapLaout_box {
  width: 553px;
  display: flex;
  font-size: 0;
  background-image: url(../../assets/img/bg.png);
  background-repeat: no-repeat;
}

.left {
  padding: 15px;
  width: 330px;
  position: relative;
}

.content_box {
  display: flex;
}

.title {
  font-size: 14px;
  font-weight: 700;
}

.title1 {
  position: absolute;
  left: 58px;
  top: 11px;
  color: #fff;
}

.title2 {
  padding-left: 40px;
  padding-top: 10px;
}

.numberTe {
  font-size: 50px;
  padding-top: 50px;
  width: 100px;
  text-align: center;
  font-weight: 700;
  color: #ffff00;
}

.detailed {
  font-size: 12px;
  padding: 20px 10px;
  position: relative;
  left: 12px;
  top: 25px;
  color: #fff;
}

.detailed > p {
  margin-bottom: 5px;
}

.introduce {
  font-size: 12px;
  position: relative;
  padding-top: 55px;
}

.introduce > p {
  line-height: 20px;
}

.introduce > p > span {
  color: #598ee5;
}

.progress_bar {
  position: relative;
  font-size: 12px;
  height: 25px;
  padding-top: 8px;
  padding-left: 23px;
  width: 155px;
}

.length {
  width: 100%;
  height: 10px;
  background: #fff;
  position: relative;
  top: 20px;
  overflow: hidden;
}

.progress_bar_lift {
  position: absolute;
  left: 23px;
  top: 15px;
}

.progress_bar_right {
  position: absolute;
  right: 0px;
  top: 15px;
}
</style>

