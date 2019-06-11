<template>
  <div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:600px"
    >
      <el-table :data="tablePoint" border style="width: 100%;margin-top:20px;" max-height="500px">
        <el-table-column prop="dwbh" label="点位编号" align="center"></el-table-column>
        <el-table-column prop="ycxbh" label="遥测线编号" align="center"></el-table-column>
        <el-table-column prop="zjksrq" label="自检开始时间" align="center"></el-table-column>
        <el-table-column prop="sftg" label="是否通过" align="center"></el-table-column>
        <el-table-column prop="BZ" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showInformation(scope.row)">详细信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-sizes="[30, 60, 100]"
        :page-size="zj_page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="zj_page.total"
        style="margin-top:20px;"
      ></el-pagination>
     
    </div>
     <information :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information>
  </div>
</template>


<script>
import information from "../common/information.vue";
export default {
  components: {
    information
  },
  name: "RoadInspectionPunishmentManagement",
  methods: {
    close() {
      this.diaSta = false;
    },
    showInformation(row) {
      let that = this;
      this.$axios
        .get("/serveApi/hbj/deviceSelfTestData/getOne", {
          params: { zjjlbh: row.zjjlbh }
        })
        .then(function(data) {
          that.diaSta = true;
          let row=data.data.data;
          let keys_ = Object.keys(that.table_jz);
          let arr = [];
          keys_.forEach(function(item, index) {
            let obj = {};
            obj.key = that.table_jz[item];
            obj.values = row[item];
            arr.push(obj);
          });
          that.title = "遥测设备自检";
          that.updataData = arr;
        });
    },
    showTable() {
      let that = this;
      this.$axios
        .get("/serveApi/hbj/deviceSelfTest/getPage", {
          params: {
            ycxbh: sessionStorage.getItem("sbzj"),
            pageSize: this.zj_page.pageSize,
            pageNum: this.zj_page.pageNum
          }
        })
        .then(data => {
          that.tablePoint = data.data.data.list;
          that.zj_page.total = data.data.data.total;
        });
    },
    sizeChange(val) {
      this.zj_page.pageSize = val;
      this.showTable();
    },
    currentChange(val) {
      this.zj_page.pageNum = val;
      this.showTable();
    }
  },

  data() {
    return {
      title: "",
      diaSta: false,
      zj_page: { pageSize: 30, total: 0, pageNum: 1 },
      tablePoint: [],
      updataData: [],
      table_jz: {
        dwbh: "点位编号",
        ycxbh: "遥测线编号",
        zjkssj: "自检开始时间",
        co2bzz: "CO2标准值",
        cobzz: "CO标准值",
        dexbzz: "1,3-丁二烯标准值",
        bwbzz: "丙烷标准值",
        nobzz: "NO标准值",
        co2clz: "CO2测量值",
        coclz: "CO测量值",
        dexclz: "1,3-丁二烯测量值",
        bwclz: "丙烷测量值",
        noclz: "NO测量值",
        ydp1bzz: "烟度片1标准值",
        ydp2bzz: "烟度片2标准值",
        ydp3bzz: "烟度片3标准值",
        ydp4bzz: "烟度片4标准值",
        ydp5bzz: "烟度片5标准值",
        ydp1clz: "烟度片1测量值",
        ydp2clz: "烟度片2测量值",
        ydp3clz: "烟度片3测量值",
        ydp4clz: "烟度片4测量值",
        ydp5clz: "烟度片5测量值"
      }
    };
  },
  created() {
    this.showTable();
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

