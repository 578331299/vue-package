<template>
  <div class="detailedInformation_box" @click="handleClose()" v-if="diaSta">
    <div class="content1_box" @click.stop>
      <div class="title_box">
        <span>{{title}}</span>
        <div class="clouse_box">
          <img src="image/clouse.png" @click="handleClose" alt>
          <!--<span class="spanclick" ></span>-->
        </div>
      </div>
      <div class="cont_xi">
        <div class="con_parent">
          <div style="text-align:center">请选择需要导出内容</div>
          <div class="cont_left_son">
            <template>
              <div class="cont_left_son_items">
                <el-checkbox @click.native="select_all" v-model="selectAll">
                  <span>全选</span>
                </el-checkbox>
              </div>
            </template>
            <template v-for="item in checkList">
              <div class="cont_left_son_items">
                <el-checkbox v-model="item.checked">
                  <span>{{item.title_cn}}</span>
                </el-checkbox>
              </div>
            </template>
          </div>
          <div class="con_footer" style="text-align:center">
            <el-button type="primary" @click="upload_excel">导出EXCEL</el-button>
            <el-button type="primary" @click="upload_pdf">导出PDF</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "information",
  methods: {
    openDialog() {},
    handleClose() {
      this.diaSta2 = false;
      this.$emit("dialogClose", false);
    },
    select_all() {
      //全选
      let that = this;
      this.checkList.forEach(element => {
        if (that.selectAll) {
          element.checked = false;
        } else {
          element.checked = true;
        }
      });
    },
    upload_excel() {
     
      let arr = [];
      let arr_cn = [];
      let that = this;
      this.checkList.forEach(element => {
        //将选中的信息提取出来
        if (element.checked) {
          arr.push(element.title);
          arr_cn.push(element.title_cn);
        }
      });
      if (arr.length <= 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一项导出!"
        });
        return;
      } else {
        let obj={};
       for(let i in  this.searchData){
         obj[i]=this.searchData[i];
       }
       obj.rowField=arr.join();
       obj.rowName=arr_cn.join()
        this.$axios({
          method: "get",
          headers: {
            "Content-Type": "application/json; application/octet-stream"
          },
          responseType: "blob",
          url: "/serveApi/hbj/remoteSensing/exportExecl?type="+this.type+"",
          params: obj 
        }).then(res => {
          const a=document.createElement("a");
          const blob=new Blob([res.data]);
          const href=window.URL.createObjectURL(blob);
          a.href=href;
          a.download="遥感.xls";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(href);
        });
      }
    },
    upload_pdf() {
      let that = this;
      let obj = {};
      let flag = true;
      this.checkList.forEach(element => {
        //将选中的信息提取出来
        if (element.checked) {
          obj[element.title] = element.title_cn;
          flag = false;
        }
      });
      if (flag) {
        this.$message({
          type: "warning",
          message: "请至少选择一项导出!"
        });
        return;
      } else {
        let tempSearch={};
        for(let i in this.searchData){
          if(this.searchData[i]!=""){
            tempSearch[i]=this.searchData[i]
          }
        }
        
        this.$axios({
          method: "post",
          headers: {
            "Content-Type": "application/json; application/octet-stream"
          },
          responseType: "blob",
          url: "/serveApi/hbj/remoteSensing/exportPDF",
          data: {para:obj,search:tempSearch,type:this.type}
        }).then(res => {
          //通过filereader 是否能解析为json 如果可以，则说明不是二进制流
          var reader = new FileReader();
          reader.readAsText(res.data);
          reader.onload = ele => {
            try {
              //try catch 只用于同步结构
              let obj = JSON.parse(ele.target.result);
              that.$message({ type: "warning", message: obj.msg });
            } catch (err) {
              const blob = new Blob([res.data]);
              const downloadElement = document.createElement("a");
              const href = window.URL.createObjectURL(blob);
              downloadElement.href = href;
              downloadElement.download = "遥感.pdf";
              document.body.appendChild(downloadElement);
              downloadElement.click();
              document.body.removeChild(downloadElement); // 下载完成移除元素
              window.URL.revokeObjectURL(href); // 释放掉blob对象
            }
          };
        });
      }
    }
  },
  data() {
    return {
      // diaSta: false,
      selectAll: false,
      dataList: [1, 2],
      checkList: [
        { checked: false, title: "jlbh", title_cn: "记录编号" },
        { checked: false, title: "dwbh", title_cn: "点位编号" },
        { checked: false, title: "ycxbh", title_cn: "遥测线编号" },
        { checked: false, title: "jcdwrzh", title_cn: "监测点位日志号" },
        { checked: false, title: "jcryxm", title_cn: "监测人员姓名" },
        { checked: false, title: "cdxh", title_cn: "车道序号" },
        { checked: false, title: "jcrq", title_cn: "监测时间" },
        { checked: false, title: "ddjd", title_cn: "地点经度" },
        { checked: false, title: "ddwd", title_cn: "地点维度" },
        { checked: false, title: "cdpd", title_cn: "车道坡度" },
        { checked: false, title: "pdjg", title_cn: "判定结果" },
        { checked: false, title: "hphm", title_cn: "车牌号码" },
        { checked: false, title: "cpys", title_cn: "车牌颜色" },
        { checked: false, title: "hpzl", title_cn: "车牌种类" },
        { checked: false, title: "rlzl", title_cn: "燃料种类" },
        { checked: false, title: "co2jg", title_cn: "CO2结果" },
        { checked: false, title: "coco2", title_cn: "CO/CO2比例" },
        { checked: false, title: "hcco2", title_cn: "HC/CO2比例" },
        { checked: false, title: "noco2", title_cn: "NO/CO2比例" },
        { checked: false, title: "cojg", title_cn: "CO结果" },
        { checked: false, title: "hcjg", title_cn: "HC结果" },
        { checked: false, title: "nojg", title_cn: "NO结果" },
        { checked: false, title: "btgdjg", title_cn: "不透光度结果" },
        { checked: false, title: "lgmhd", title_cn: "林格曼黑度" },
        { checked: false, title: "coxz", title_cn: "CO限值" },
        { checked: false, title: "noxz", title_cn: "NO限值" },
        { checked: false, title: "btgdxz", title_cn: "不透光度限值" },
        { checked: false, title: "hdxz", title_cn: "黑度限值" },
        { checked: false, title: "clsd", title_cn: "车辆速度" },
        { checked: false, title: "cljsd", title_cn: "车辆加速度" },
        { checked: false, title: "vsp", title_cn: "VSP" },
        { checked: false, title: "fs", title_cn: "风速" },
        { checked: false, title: "fx", title_cn: "风向" },
        { checked: false, title: "hjwd", title_cn: "环境温度" },
        { checked: false, title: "sd", title_cn: "湿度" },
        { checked: false, title: "dqy", title_cn: "大气压" },
        { checked: false, title: "gjxxbh", title_cn: "轨迹信息编号" }
        // { checked: false, title: "ygjtsj", title_cn: "遥感具体数据" }
      ]
    };
  },
  props: {
    title: String,
    diaSta: Boolean,
    updataData: Array,
    searchData:Object,
    type:Number
  },
  watch: {
    updataData(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        //this.dataList=newVal;
        this.dataList = JSON.parse(JSON.stringify(newVal));
      }
    }
  },
  mounted() {
    //console.log(this.updataData);
  }
};
</script>
<style scoped>
.con_parent {
  width: 100%;
}
.cont_left_son_items {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.cont_left_son_items:nth-child(odd) {
  background-color: white;
  /* border: solid 1px #ddd; */
}
.cont_left_son {
  overflow-y: auto;
  height: 500px;
  width: 100%;
  background-color: #f2f6f9;
}
.detailedInformation_box {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(52, 52, 52, 0.5);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content1_box {
  width: 800px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.title_box {
  width: 100%;
  height: 60px;
  background: #01c8b3;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  font-weight: 700;
  position: relative;
}
/*.clouse_box{
  
  border: 1px solid #fff;
  border-radius: 50%;
 
  
  color: #fff;
}*/
.clouse_box > img {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 101;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.cont_xi {
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  max-height: 600px;
  overflow: auto;
}
.evbox {
  display: flex;
  line-height: 40px;
}
.baitiao {
  width: 5px;
  height: 100%;
  background-color: #fff;
  color: #fff;
}
</style>


