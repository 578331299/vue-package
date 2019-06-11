<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="log" :model="log" :inline="true" @submit.native.prevent>
        <el-row>
          <el-col :span="24" style="display:flex;justify-content: flex-start;align-item:center">
              <el-form-item label="业务类型">
              <el-select v-model="log.ywlx" @keyup.enter.native="showAll">
                 <!-- <el-option label="--请选择--" value=""></el-option> -->
                <el-option label="新增" value="新增"></el-option>
                <el-option label="删除" value="删除"></el-option>
                <el-option label="修改" value="修改"></el-option>
                <el-option label="查询" value="查询"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务模块">
              <el-input v-model="log.ywmk"  @keyup.enter.native="showAll"></el-input>
            </el-form-item>
            <el-form-item label="操作人">
              <el-input v-model="log.czrid"  @keyup.enter.native="showAll"></el-input>
            </el-form-item>
          
           
          </el-col>
          <el-col :span="24" style="display:flex;justify-content: flex-start;align-item:center">
             <el-form-item label="操作结果">
              <el-select v-model="log.czjg" @keyup.enter.native="showAll">
                <!-- <el-option label="--请选择--" value="-1"></el-option> -->
                <el-option label="操作成功" value="1"></el-option>
                <el-option label="操作失败" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作时间起">
              <el-date-picker
                @keyup.enter.native="log_search"
                @change="timeCheck  ('startTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="log.startTime"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="--操作时间止">
              <el-date-picker
                @keyup.enter.native="log_search"
                @change="timeCheck('endTime')"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                v-model="log.endTime"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="button_div" style="text-align:center">
      <el-button type="primary" @click="showAll">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 164px);margin-bottom:0;"
    >
      <template>
        <div style="height:calc(100% - 45px);overflow: auto">
          <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:20px;"
            height="calc(100% - 20px)"
          >
            <!-- <el-table-column fixed prop="id" label="日志表" align="center"></el-table-column> -->
            <el-table-column prop="ywmk" label="业务模块" align="center"></el-table-column>
            <el-table-column prop="ywlx" label="业务类型" align="center"></el-table-column>
            <el-table-column prop="czsj" label="操作时间" align="center"></el-table-column>
            <el-table-column prop="czjg" label="操作结果" align="center" :formatter="format"></el-table-column>
            <el-table-column prop="czip" label="操作IP" align="center"></el-table-column>
            <el-table-column prop="czrid" label="操作人" align="center"></el-table-column>
          </el-table>
        </div>
      </template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="logPag.pageNum"
        :page-sizes="[10,20,30]"
        :page-size="this.logPag.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logPag.total"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
  </div>
</template>
  </div>
</template>

<script>
export default {
  name: "LogManagement",

  data() {
    return {
      logPag: { pageNum: 1, total: 0, pagesize: 10 },
      log: {
        czrid: "",
        ywmk: "",
        ywlx: "",
        czjg: "",
        startTime: "",
        endTime: ""
      },
      tableData: []
    };
  },
  created() {
    this.logSearch();
    //  this.$axios.get("/serveApi/hbj/user/getPage")
  },
  methods: {
    timeCheck(type) {
      switch (type) {
        case "startTime":
          if (
            !(
              this.log.endTime == "" ||
              this.log.endTime == "null" ||
              this.log.endTime == null
            )
          ) {
            let timeBegin = this.log.startTime.toString();
            let timeEnd = this.log.endTime.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间!"
              });
              this.log.startTime = "";
            }
          }
          break;
        case "endTime":
          if (
            !(
              this.log.startTime == "" ||
              this.log.startTime == "null" ||
              this.log.startTime == null
            )
          ) {
            let timeBegin = this.log.startTime.toString();
            let timeEnd = this.log.endTime.toString();

            if (timeBegin > timeEnd) {
              this.$message({
                type: "warning",
                message: "結束时间不能小于开始时间!"
              });
              this.log.endTime = "";
            }
          }
          break;
      }
    },
    showAll() {
      this.logPag.pageNum = 1;
      this.logSearch();
    },

    reset() {
      //重置
      for (let i in this.log) {
        this.log[i] = "";
      }
    },
    logSearch() {
      //分页
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      this.$axios
        .get("/serveApi/hbj/log/listLog", {
          params: {
            startTime:this.log.startTime,
            endTime:this.log.endTime,
            czrid: this.log.czrid,
            ywmk: this.log.ywmk,
            ywlx: this.log.ywlx,
            czjg: this.log.czjg.length <= 0 ? -1 : this.log.czjg, //为空时传递给后台-1
            pageNum: this.logPag.pageNum,
            pageSize: this.logPag.pagesize,
            sidebar: "日志管理"
          }
        })
        .then(function(data) {
          //console.log(JSON.stringify(data.data.list));
          loadingObj.close();
          that.tableData = data.data.data.list;
          that.logPag.total = data.data.data.total;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },
    handleCurrentChange(val) {
      this.logPag.pageNum = val;
      this.logSearch();
    },
    handleSizeChange(val) {
      //改变每页条数
      this.logPag.pagesize = val;
      this.logSearch();
    },
    format(val) {
      //字段过滤
      return val.czjg == 1 ? "操作成功" : "操作失败";
    }
  }
};
</script>

<style scoped>
.user-content-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
}
.label-div {
  margin-right: 5px;
}
</style>

