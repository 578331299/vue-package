<template>
  <div class="content_box" style="width:100%;height:100%;">
    <!--<v-test></v-test>-->
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="SmokyCarManagement" :model="SmokyCarManagement" :inline="true">
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-end;">
            <el-form-item label="点位名称：">
              <el-select
                v-model="SmokyCarManagement.number"
                style="width:150px"
                placeholder="选择点位名称"
                @keyup.enter.native="axiosGetData(1)"
              >
                <el-option
                  v-for="item in xxdwData"
                  :key="item.dwbh"
                  :label="item.dwmc"
                  :value="item.dwmc"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="是否提交交警：">
              <el-select
                v-model="SmokyCarManagement.type"
                @keyup.enter.native="axiosGetData(1)"
                placeholder="选择判定结果"
                style="width:150px"
              >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-start;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="SmokyCarManagement.startTime"
                value-format="yyyy-MM-dd"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('startTime')"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 结束时间：">
              <el-date-picker
                v-model="SmokyCarManagement.endTime"
                value-format="yyyy-MM-dd"
                class="time-input"
                @keyup.enter.native="axiosGetData(1)"
                @change="timeCheck('endTime')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
      <el-button type="primary" @click="resetData">重置</el-button>
      <el-button @click="exportFileFun('pdf')" type="primary">导出</el-button>
      <el-button type="primary" @click="SubmitPolice(null)">批量提交交警</el-button>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 175px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column fixed prop="jlbh" label="记录编号" align="center"></el-table-column>
          <el-table-column prop="dwmc" label="点位名称" align="center"></el-table-column>
          <el-table-column prop="cdxh" label="车道序号" align="center"></el-table-column>
          <el-table-column prop="jcrq" label="检查日期" align="center" width="150px"></el-table-column>
          <el-table-column prop="hphm" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="cpys" label="车牌颜色" align="center"></el-table-column>
          <el-table-column prop="sbzxd" label="识别置信度" align="center"></el-table-column>
          <el-table-column prop="hbctj" label="是否提交交警" align="center">
            <template slot-scope="scope">
              <a
                :style="{color:scope.row.hbctj == 1 ? '#909399' : 'red'}"
              >{{scope.row.hbctj==1 ? "已提交" : "未提交"}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="tp1" label="车牌图片" align="center">
            <template slot-scope="scope">
              <el-button
                @click="pictureFun(scope.row,'image/car.png')"
                type="text"
                size="small"
              >查看图片</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button @click="SubmitPolice(scope.row)" type="text" size="small">提交交警</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="position: absolute; bottom:10px;right: 20px;"
        ></el-pagination>
      </div>
    </div>
    <picture-big ref="pictureDOM" :pictureData="pictureData"></picture-big>
    <yellow-sub-data-view
      :title="title"
      :saveId="saveId"
      :subDataViewData="subDataViewData"
      ref="subDataViewDom"
    ></yellow-sub-data-view>
    <export-file
      ref="exportFileDem"
      :pdfOrExcell="pdfOrExcell"
      :updataData="updataData"
      :nameObj="nameObj"
    ></export-file>
  </div>
</template>

<script>
import pictureBig from "../../common/pictureBig.vue";
import yellowSubDataView from "../../common/yellowSubDataView.vue";
import exportFile from "../../common/exportFile.vue";
export default {
  name: "YellowLabelCarLine",
  components: {
    pictureBig,
    yellowSubDataView,
    exportFile
  },
  data() {
    return {
      SmokyCarManagement: {
        number: "",
        type: "",
        startTime: "",
        endTime: ""
      },
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "黄标车限行",
      tableData: [],
      multipleSelection: [],
      updataID: [],
      xxdwData: [],
      pictureData: {
        url: ""
      },
      title: "提交数据",
      saveId: null,
      subDataViewData: [],
      pdfOrExcell: "",
      updataData: [
        { jlbh: "记录编号", check: false, name: "jlbh" },
        { dwmc: "点位名称", check: false, name: "dwmc" },
        { cdxh: "车道序号", check: false, name: "cdxh" },
        { jcrq: "检查日期", check: false, name: "jcrq" },
        { hphm: "车牌号码", check: false, name: "hphm" },
        { cpys: "车牌颜色", check: false, name: "cpys" },
        { hbctj: "是否提交交警", check: false, name: "hbctj" },
        { sbzxd: "识别置信度", check: false, name: "sbzxd" }
      ],
      nameObj: {
        jlbh: "记录编号",
        dwmc: "点位名称",
        cdxh: "车道序号",
        jcrq: "检查日期",
        hphm: "车牌号码",
        cpys: "车牌颜色",
        hbctj: "是否提交交警",
        sbzxd: "识别置信度"
      }
    };
  },
  mounted() {
    this.axiosGetData();
    this.dwcxfun();
  },
  methods: {
    /**
     * @description 提交交警
     * @author lifei
     * @version 2019.5.28
     */
    SubmitPolice(rowdata) {
      if (rowdata === null) {
        if (this.updataID.length < 1) {
          this.$message({
            type: "warning",
            message: "请最少选择一条数据!"
          });
          return;
        }
        this.saveId = this.updataID;
        this.$refs.subDataViewDom.handleClose();
      } else {
        let arr = [rowdata.id];
        this.subDataViewData = [rowdata];
        this.saveId = arr;
        this.$refs.subDataViewDom.handleClose();
      }
    },
    /**
     * @description 分页每页条数
     * @author lifei
     * @version 2019.5.28
     */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 分页跳转
     * @author lifei
     * @version 2019.5.28
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 搜索时间重组
     * @author lifei
     * @version 2019.5.28
     */
    timeDataFun() {
      let obj = {};
      obj.type = 1;
      obj.dwmc = this.SmokyCarManagement.number;
      obj.hbctj = this.SmokyCarManagement.type;
      if (
        this.SmokyCarManagement.startTime == "" ||
        this.SmokyCarManagement.startTime == null ||
        this.SmokyCarManagement.startTime == "null"
      ) {
        obj.startTime = "";
      } else {
        obj.startTime = this.SmokyCarManagement.startTime + " 00:00:00";
      }

      if (
        this.SmokyCarManagement.endTime == "" ||
        this.SmokyCarManagement.endTime == null ||
        this.SmokyCarManagement.endTime == "null"
      ) {
        obj.endTime = "";
      } else {
        obj.endTime = this.SmokyCarManagement.endTime + "24:59:59";
      }
      return obj;
    },
    /**
     * @description 搜索，初始化展示数据
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData(num) {
      if (num === 1) {
        this.currentPage4 = 1;
      }
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      let obj = this.timeDataFun();
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/remoteSensing/findJudgeWithPage",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: {
          siderbar: "黄标车限行",
          pageSize: this.pageSize,
          pageNum: this.currentPage4
        }
      })
        .then(function(res) {
          loadingObj.close();
          if (res.data.data.list) {
            that.tableData = res.data.data.list;
            //console.log(res.data.data.data);
            that.total = res.data.data.total;
          }
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "数据加载失败!"
          });
        });
    },
    /**
     * @description 重置
     * @author lifei
     * @version 2019.5.28
     */
    resetData() {
      let keys_ = Object.keys(this.SmokyCarManagement);
      for (let i = 0; i < keys_.length; i++) {
        this.SmokyCarManagement[keys_[i]] = "";
      }
    },
    /**
     * @description 多选获取参数
     * @author lifei
     * @version 2019.5.28
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.subDataViewData = val;
      this.updataID = [];
      for (let i = 0; i < val.length; i++) {
        this.updataID.push(val[i].id);
      }
    },
    /**
     * @description 时间校验
     * @author lifei
     * @version 2019.5.28
     */
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.SmokyCarManagement.endTime == "" ||
              this.SmokyCarManagement.endTime == "null" ||
              this.SmokyCarManagement.endTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.SmokyCarManagement.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.SmokyCarManagement.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.SmokyCarManagement.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.SmokyCarManagement.startTime == "" ||
              this.SmokyCarManagement.startTime == "null" ||
              this.SmokyCarManagement.startTime == null
            )
          ) {
            let timeBegin = parseInt(
              this.SmokyCarManagement.startTime.replace(/-/g, "")
            );
            let timeEnd = parseInt(
              this.SmokyCarManagement.endTime.replace(/-/g, "")
            );

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.SmokyCarManagement.endTime = "";
            }
          }
          break;
      }
    },
    /**
     * @description 点位查询
     * @author lifei
     * @version 2019.5.28
     */
    dwcxfun() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/point/getAll",
        params: {
          sidebar: that.sidebar
        }
      })
        .then(function(res) {
          let obj = [];
          let result = [];
          if (res.data) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (
                obj.indexOf(res.data.data[i].dwmc) > 0 ||
                res.data.data[i].dwmc == ""
              ) {
                continue;
              } else {
                result.push(res.data.data[i]);
                obj.push(res.data.data[i].dwmc);
              }
            }
          }
          that.xxdwData = result;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "点位查询失败!"
          });
        });
    },
    /**
     * @description 文件下载数据组装
     * @author lifei
     * @version 2019.5.28
     */
    excellDataFun(objData) {
      let obj = {};
      let titleEn = [];
      let titleCn = [];
      for (let keys in objData) {
        titleEn.push(keys);
        titleCn.push(objData[keys]);
      }
      obj.title = titleEn;
      obj.titleCN = titleCn;
      obj.select = this.timeDataFun();
      return obj;
    },
    /**
     * @description excell下载
     * @author lifei
     * @version 2019.5.28
     */
    upload_excel(objData) {
      let obj = this.excellDataFun(objData);
      this.$axios({
        method: "post",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        },
        responseType: "blob",
        url: "/serveApi/hbj/remoteSensing/export?type=1",
        data: obj
      })
        .then(res => {
          const a = document.createElement("a");
          const blob = new Blob([res.data]);
          const href = window.URL.createObjectURL(blob);
          a.href = href;
          a.download = "yellowCar.xls";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(href);
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "下载失败!"
          });
        });
    },
    /**
     * @description pdf下载
     * @author lifei
     * @version 2019.5.28
     */
    upload_pdf(subData) {
      let that = this;
      let objData = {};
      objData.select = this.timeDataFun();
      objData.title = subData;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/remoteSensing/judgeExportPDF",
        headers: {
          "Content-Type": "application/json; application/octet-stream"
        },
        responseType: "blob",
        data: objData
      })
        .then(res => {
          const blob = new Blob([res.data]);
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = "yellowCar.pdf";
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放掉blob对象)
          that.$refs.exportFileDem.handleClose();
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "下载失败!"
          });
        });
    },
    /**
     * @description 图片查看
     * @author lifei
     * @version 2019.5.28
     */
    pictureFun(rowData, url) {
      this.pictureData.url = rowData.tp1.split(",");
      this.$refs.pictureDOM.handleClose();
    },
    /**
     * @description 文件选择字段模块打开
     * @author lifei
     * @version 2019.5.28
     */
    exportFileFun(typeStr) {
      this.$refs.exportFileDem.handleClose();
      this.pdfOrExcell = typeStr;
    }
  }
};
</script>

<style scoped>
.button-div {
  display: flex;
  justify-content: center;
}
.head_pic {
  width: 100%;
  height: 30px;
  cursor: pointer;
}
</style>

