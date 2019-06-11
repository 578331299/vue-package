<template>
  <div>
      <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="SmokyCarManagement" :model="SmokyCarManagement" :inline="true">
        <el-row>
          <!-- <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="点位名称：">
              <el-input v-model="SmokyCarManagement.dwmc" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="遥感线名称：">
              <el-input v-model="SmokyCarManagement.ygxmc" style="width:150px"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="检查单位：">
              <el-input v-model="SmokyCarManagement.jcdw" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="检察人员：">
              <el-input v-model="SmokyCarManagement.jcry" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker
                v-model="SmokyCarManagement.startTime"
                value-format="yyyy-MM-dd"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
           
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
             <el-form-item label=" - 结束时间：">
              <el-date-picker
                v-model="SmokyCarManagement.endTime"
                value-format="yyyy-MM-dd"
                class="time-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label="检查方法：">
              <el-input v-model="SmokyCarManagement.jcff" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;">
            <el-form-item label=" 检 查 结 果：">
              <el-input v-model="SmokyCarManagement.jcjg" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary" @click="axiosGetData" round>查询</el-button>
      <el-button type="primary" @click="resetData" round>重置</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:600px"
    >
      <el-table :data="tablePoint" border style="width: 100%;margin-top:20px;" max-height="500px">
        <el-table-column prop="dwbh" label="点位编号" align="center"></el-table-column>
        <el-table-column prop="ycxbh" label="遥测线编号" align="center"></el-table-column>
        <el-table-column prop="jclx" label="检查类型" align="center"></el-table-column>
        <el-table-column prop="jckssj" label="检查开始时间" align="center"></el-table-column>
        <el-table-column prop="sftg" label="是否通过" align="center"></el-table-column>
        <el-table-column prop="BZ" label="备注" align="center"></el-table-column>
        <el-table-column prop="jcdw" label="检查单位" align="center"></el-table-column>
        <el-table-column prop="jcry" label="检查人员" align="center"></el-table-column>
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
      if (Number(row.jclx) == 1) {
        this.$axios
          .get("/serveApi/hbj/deviceStaticCheckData/getOne", {
            params: { dwbh: row.dwbh, ycxbh: row.ycxbh, jckssj: row.jckssj }
          })
          .then(function(data) {
            that.diaSta = true;
            let row = data.data.data;
            let keys_ = Object.keys(that.table_jz);
            let arr = [];
            keys_.forEach(function(item, index) {
              let obj = {};
              obj.key = that.table_jz[item];
              obj.values = row[item];
              arr.push(obj);
            });
            that.title = "遥测设备检查";
            that.updataData = arr;
          });
      } else if (Number(row.jclx) == 2) {
        this.$axios
          .get("/serveApi/hbj/deviceDynamicCheckData/getOne", {
            params: { dwbh: row.dwbh, ycxbh: row.ycxbh, jckssj: row.jckssj }
          })
          .then(function(data) {
            that.diaSta = true;
            let row = data.data.data;
            let keys_ = Object.keys(that.table_jz);
            let arr = [];
            keys_.forEach(function(item, index) {
              let obj = {};
              obj.key = that.table_jz[item];
              obj.values = row[item];
              arr.push(obj);
            });
            that.title = "遥测设备检查";
            that.updataData = arr;
          });
      }
    },
    showTable() {
      let that = this;
      this.$axios
        .get("/serveApi/hbj/deviceCheck/getPage", {
          params: {
            ycxbh: sessionStorage.getItem("sbjc"),
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
       SmokyCarManagement: {
        dwmc: "",
        ygxmc: "",
        jcdw: "",
        jcry: "",
        jcff: "",
        jcjg: "",
        startTime: "",
        endTime: ""
      },
      title: "",
      diaSta: false,
      zj_page: { pageSize: 30, total: 0, pageNum: 1 },
      tablePoint: [],
      updataData: [],
      table_jz: {
        dwbh: "点位编号",
        ycxbh: "遥测线编号",
        jckssj: "检查开始时间",
        bqlb: "标气类别",
        co2bzz: "CO2标准值",
        co2clz: "CO2测量值",
        cobzz: "CO标准值",
        coclz: "CO测量值",
        nobzz: "NO标准值",
        noclz: "NO测量值"
      },
      table_jz_1: {
        dwbh: "点位编号",
        ycxbh: "遥测线编号",
        jckssj: "检查开始时间",
        bqlb: "标气类别",
        xssd: "行驶速度",
        co2bzz: "CO2标准值",
        co2clz: "CO2测量值",
        cobzz: "CO标准值",
        coclz: "CO测量值",
        nobzz: "NO标准值",
        noclz: "NO测量值"
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

