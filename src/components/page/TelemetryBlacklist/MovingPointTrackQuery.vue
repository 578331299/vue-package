<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="dwmc" :model="dwmc" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content:center;">
            <el-form-item label="点位编号：">
              <el-input v-model="dwmc.dwbh" style="width:150px" @keyup.enter.native="btnDwSearch"></el-input>
            </el-form-item>
            <el-form-item label="车流方向">
             <el-select
                v-model="dwmc.clfx"
                placeholder="车流方向"
                style="width:150px"
                @keyup.enter.native="btnDwSearch"
              >
                <template v-for="item in $store.state.enumSelection.clfx">
                  <el-option :label="item.xmnr" :value="item.sz"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <div class="button_box">
              <el-button type="primary" @click="btnDwSearch">查询</el-button>
              <el-button type="primary" @click="reset" style="margin-left:15px;">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 210px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
          :data="tableList"
        >
          <el-table-column label="点位编号" prop="dwbh" align="center"></el-table-column>
          <el-table-column label="记录编号" prop="jlbh" align="center" width="200px"></el-table-column>
          <el-table-column label="遥测线编号" prop="ycxbh" align="center"></el-table-column>
          <el-table-column label="监测点位日志号" prop="jcdwrzh" align="center"> </el-table-column>
          <el-table-column label="车道序号" prop="cdxh" align="center"></el-table-column>
          <el-table-column label="车流方向" prop="clfx" align="center"> 
               <template scope="scope">{{scope.row.clfx==1?"上行":"下行"}}</template>
          </el-table-column>
          <el-table-column label="运行地址" prop="yxdz" align="center"></el-table-column>
          <el-table-column label="地点经度(°)" prop="ddjd" align="center"></el-table-column>
          <el-table-column label="地点纬度(°)" prop="ddwd" align="center"></el-table-column>
          <el-table-column label="车道坡度(°)" prop="cdpd" align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="dwSizeChange"
          @current-change="dwCurrentChange"
          :current-page="dwPage.pageNum"
          :page-sizes="[10, 20, 30]"
          :page-size="dwPage.pageSize"
           layout="total, sizes, prev, pager, next, jumper"
          :total="dwPage.total"
          style="position: absolute; bottom:10px;right: 20px;"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "MovingPointTrackQuery",
  methods:{
     reset() {
      this.dwmc.dwbh = "";
      this.dwmc.clfx = "";
    },
    btnDwSearch(){this.dwRefresh()},
     dwRefresh() {
      //刷新 dw表
      let that = this;
      this.$axios
        .get("/serveApi/hbj/mobilePoint/getPage", {
          //第一个表 点位
          params: {
            dwbh: this.dwmc.dwbh,
            clfx: this.dwmc.clfx,
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "移动点位轨迹查询"
          }
        })
        .then(function(data) {
          //console.log(data.data)
          that.tableList = data.data.data.list;
          that.dwPage.total = data.data.data.total;
          // that.dwPage.pageSize = data.data.data.pageSize;
        });
    },
     dwSizeChange(val) {
      //点位表页码数改变
      let that = this;
      this.dwPage.pageSize = val;
      this.$axios
        .get("/serveApi/hbj/mobilePoint/getPage", {
          //第一个表 点位
         // http://192.168.1.39:8080/hbj/mobilePoint/getPage
          params: {
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "移动点位轨迹查询"
          }
        })
        .then(function(data) {
          //console.log(data.data)
          that.tableList = data.data.data.list;
          that.dwPage.total = data.data.data.total;
          //  that.dwPage.pageSize = data.data.data.pageSize;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },
    dwCurrentChange(val) {
      //点位表点击页码
      let that=this;
      this.dwPage.pageNum = val;
      this.$axios
        .get("/serveApi/hbj/mobilePoint/getPage", {
          //第一个表 点位
          params: {
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "移动点位轨迹查询"
          }
        })
        .then(function(data) {
          //console.log(data.data)
          that.tableList = data.data.data.list;
          that.dwPage.total = data.data.data.total;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },
  },
  data() {
    return {
      dwmc: {
        jlbh:"",
        clfx:"",
        dwzt: "",
        dwbh: ""
      },
      dwPage: {
        pageSize: 10,
        total: 0,
        ycxbh: "",
        pageNum: 1,
        dw_input: "",
        yc_id: ""
      },
    };
  },
  mounted() { this.dwRefresh()},
    
};
</script>
<style scoped>
.el-dialog__body {
  background-color: #f0f0f0;
}
</style>

