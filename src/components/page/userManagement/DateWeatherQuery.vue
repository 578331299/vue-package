<template>
  <div class="content_box">
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% );margin-bottom:0;"
    >
      <lunar-full-calendar :config="config" ref="calendar"></lunar-full-calendar>
    </div>
  </div>
</template>
<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";
export default {
  name: "DataWeatherQuery",
  components: {
    LunarFullCalendar
  },
  data() {
    return {
      events: [],
      config: {
        lunarCalendar: true,
        locale: "zh-cn",
        defaultView: "month", //默认显示
        currentTimezone: "Asia/Beijing", //设置时区
        contentHeight: 600, // 设置内容高度
        editable: true, // 可编辑
        eventLimit: true, // allow "more" link when too many event
        buttonText: {
          today: "今天",
          month: "月",
          week: "周",
          day: "日",
          prev: "上一月",
          next: "下一月"
        },
        events: (start, end, timezone, callback) => {
          //  console.log(start.format());
          //  console.log(end.format());
          this.$axios("/serveApi/hbj/weather/getWeather", {
            params: {
              startTime: start.format(),
              endTime: end.format()
            }
          })
            .then(res => {
              let arr = [];
              res.data.forEach(ele => {
                arr.push({ start: ele.start, title: "天气:" + ele.wea });
                arr.push({ start: ele.start, title: "当日温度:" + ele.tem });
                arr.push({
                  start: ele.start,
                  title: "空气质量等级:" + ele.air_level
                });
                arr.push({ start: ele.start, title: "PM2.5:" + ele.air_pm25 });
              });
              callback(arr);
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: err
              });
            });

          // callback([
          //   {
          //     title: "6666",
          //     start: "2019-06-01"
          //   },
          //   {
          //     title: "777",
          //     start: "2019-06-01"
          //   }
          // ]);
        }
      }
    };
  },
  methods: {}
};
</script>

