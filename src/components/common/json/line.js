import * as utils from "../../../utils/utils";
export function line() { //车流量分析
  return {
    "title": {
      "text": "",
      "x": "center"
    },
    "tooltip": {
      "trigger": "axis"
    },
    "legend": {
      "data": [],
      "y": "top"
    },
    "grid": {
      "left": "3%",
      "right": "4%",
      "bottom": "2%",
      "containLabel": true
    },
    "toolbox": {
      "feature": {
        "saveAsImage": {}
      }
    },
    "xAxis": {
      "type": "category",
      "boundaryGap": false,
      "data": []
    },
    "yAxis": {
      "type": "value"
    },
    "series": []
  }
}

export function bar() { // 车辆归属分析
  return {
    "title": {
      "text": "",
      "x": "center"
    },
    "tooltip": {
      "trigger": "axis"
    },
    "legend": {
      "data": [],
      "y": "top"
    },
    "grid": {
      "left": "3%",
      "right": "4%",
      "bottom": "2%",
      "containLabel": true
    },
    "toolbox": {
      "feature": {
        "saveAsImage": {}
      }
    },
    "xAxis": {
      "type": "category",
      "boundaryGap": true,
      "data": []
    },
    "yAxis": {
      "type": "value"
    },
    "series": []
  }
}

export function pie() { //遥测数据质量统计分析
  return {
    title: {
      text: "",
      left: "center",
      top:5
    },
    tooltip: {
      trigger: "item"
      // formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          optionToContent: function(opt) {
            var serise=opt.series[0].data;
            var legend=opt.legend[0].data;
            var tr="";
            var thead="";
            var tbody="";
            console.log(serise)
            legend.forEach(ele=>{
              thead += "<td class='tdClass'>" + ele + "</td>";
            });
            tr = "<tr>" + thead + "</tr>";
            serise.forEach(ele=>{
              tbody+= "<td class='tdClass'>" + ele.value + "</td>";
            })
            tr+="<tr>"+tbody+"</td>";
            var table =
            '<table style="width:100%;text-align:center;border-collapse:collapse" class="table_border">' +
            tr +
            "</table>";
          return table;
          },
          readOnly: true,
          lang: ["", "关闭"]
        }
      },
      right: 20
    },
    legend: {
      orient: "horizontal",
      left: "center",
      data: [],
      top: "bottom"
    },
    series: [{
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: true,
      label: {
        normal: {
          show: true,
          position: "inner",
          formatter: function (data) {
            return data.data.value + "," + utils.getPercent(data.data.value, data.data.total)
          },
          color: "black"
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "30",
            fontWeight: "bold"
          }
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: []
    }]
  }
}