<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true">
        <el-row>
          <!-- <el-col :span="8" style="display:flex;justify-content: flex-star;"></el-col>
          <el-col :span="8" style="display:flex;justify-content: center;"></el-col>-->
          <!-- <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="状态：">
              <el-input v-model="SmokyCarManagement.number" style="width:250px"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="24" style="display:flex;justify-content: center;">
            <el-form-item label="车牌颜色">
              <el-select v-model="inputList.hpys" placeholder="选择车牌颜色" style="width:150px">
              <template v-for="item in HPYS">
               <el-option :label="item.xmnr" :value="item.sz"></el-option>
              </template>
              </el-select>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input v-model="inputList.hphm" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="inputList.pdjg" placeholder="状态" style="width:150px">
                  <el-option label="已审核" value="1"></el-option>
                  <el-option label="未审核" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抓拍时间起：" style="margin-right:15px">
              <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="inputList.startTime" class="time-input"></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 抓拍时间止：">
              <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="inputList.endTime" class="time-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24" style="display:flex;justify-content: center;">
            <el-button type="primary" round>查询</el-button>
            <el-button type="primary" round>重置</el-button>
          </el-col>-->
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary" round @click="search">查询</el-button>
      <el-button type="primary" round @click="reset">重置</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 210px);margin-bottom:0;"
    >
     <div style="height:calc(100% - 45px);overflow: auto">
      <el-table :data="tableData" border style="width: 100%;margin-top:20px;" height="calc(100% - 20px)" >
        <!-- <el-table-column type="selection" align="center"></el-table-column> -->
        <el-table-column prop="cphm" align="center" label="车牌号码"></el-table-column>
        <el-table-column prop="cpzl" align="center" label="车牌种类"></el-table-column>
        <el-table-column prop="scnf" align="center" label="生产年份"></el-table-column>
        <el-table-column prop="czxm" align="center" label="车主姓名"></el-table-column>
        <el-table-column prop="cyzz" align="center" label="常用地址"></el-table-column>
        <el-table-column prop="sjhm" align="center" label="手机号码"></el-table-column>
        <el-table-column prop="qzsj" align="center" label="取证时间"></el-table-column>
        <el-table-column prop="qzdd" align="center" label="取证地点"></el-table-column>
        <el-table-column prop="sfsc" align="center" label="是否删除"></el-table-column>
        <el-table-column prop="amountPenalty" align="center" label="视频">
          <template scope="scope">
            <img
              src="../../../assets/img/video.png"
              width="20"
              height="20"
              style="margin-top:10px; cursor: pointer;"
              @click="showPage(scope.row)"
              class="head_pic"
            >
          </template>
        </el-table-column>
        <el-table-column prop="lgmhd" label="林格曼黑度"></el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="showInfor(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,20,30]"
        :page-size="pagnationList.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagnationList.total"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
    <v-videosrc ref="vVideosrc"></v-videosrc>
    <v-compile ref="vCompile"></v-compile>
    <black-information ref="blackInformation"></black-information>
    <!--<img src="../../../assets/img/smokeAlert.png">
    <img src="../../../assets/img/BlackSmokeDataLead.png">-->
    <!--<img src="../../../assets/img/SmokyCarDataImport.png">-->
    <!-- <div class="chare_box">
      <el-upload
        class="upload-demo"
        action="/serveApi/hbj/blackSmokeVechicle/uploadExcel"
        :auto-upload=false
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        ref="uploaded"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
        <el-button size="small" type="primary" @click="submitUpload">确定</el-button>
    </div>-->
  </div>
</template>

<script>
import vVideosrc from "../../common/videosrc.vue";
import vCompile from "../../common/smokyCar/vCompile.vue";
import bus from "../../common/bus.js";
import blackInformation from "../../common/blackSmokeInformation.vue";
export default {
  name: "SmokyCarManagement",

  methods: {
    reset() {
      for (let i in this.inputList) {
        this.inputList[i] = "";
      }
    },
    showInfor(val) {
      val["sfsc"] == "1" ? (val["sfsc"] = "是") : (val["sfsc"] = "否");
      val["sfsh"] == "1" ? (val["sfsh"] = "是") : (val["sfsh"] = "否");
      this.$refs.blackInformation.returnAlert(val);
    },
    handleClick(row) {
      console.log(row);
    },
    showPage(data) {
      this.$refs.vVideosrc.showPage(data);
    },
    showvCompile() {
      this.$refs.vCompile.showvCompile();
    },
    handleSizeChange(val) {
      this.pagnationList.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pagnationList.pageNum = val;
      this.search();
    },
    search() {
      const loadingObj = this.$loading({
        lock: true,
        text: "数据加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      let that = this;
      this.loading = true;
      this.$axios("/serveApi/hbj/blackSmokeVechicle/getPage", {
        params: {
          hphm: this.inputList.hphm,
          hpys: this.inputList.hpys,
          sfsh: this.inputList.sfsh,
          startTime: this.inputList.startTime,
          endTime: this.inputList.endTime,
          pageNum: this.pagnationList.pageNum,
          pageSize: this.pagnationList.pageSize,
          sidebar:"黑烟车查询"
        }
      })
        .then(function(data) {
          // console.log(data.data.data.list)
          loadingObj.close();
          that.loading = false;
          that.tableData = data.data.data.list;
          that.pagnationList.total = data.data.data.total;
        })
        .catch(function(err) {
          loadingObj.close();
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    }
  },

  data() {
    return {
      loading: true,
      inputList: { hpys: "", hphm: "", startTime: "", endTime: "", sfsh: "" },
      pagnationList: { total: 0, pageSize: 10, pageNum: 1 },
      tableData: [],
      hideVideo: false,
      fileList: [],
      HPYS:[]
    };
  },
  created() {
     this.search();
    let that=this;
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
    
      headers: {
        "Content-Type": "application/json"
      },
      data:{lx:"HPYS"}
       
    }).then(function(data){
      that.HPYS=data.data.data;
    })
  },
  mounted(){
    
  },
  components: {
    vVideosrc,
    vCompile,
    blackInformation
  }
};
</script>

<style scoped>
.button-div {
  display: flex;
  justify-content: center;
}
</style>

