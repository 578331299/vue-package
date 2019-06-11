<template>
  <div class="content_box">
    <div class="chare_box" style="height:700px ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true">
        <el-row>
          <!-- <el-col :span="8" style="display:flex;justify-content: flex-star;"></el-col>
          <el-col :span="8" style="display:flex;justify-content: center;"></el-col>-->
          <!-- <el-col :span="8" style="display:flex;justify-content: center;">
            <el-form-item label="状态：">
              <el-input v-model="SmokyCarManagement.number" style="width:250px"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="模板文件下载">
              <el-button type="primary" @click="dowmloadExcel">模板下载</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="display:flex;justify-content: flex-start;">
            <el-form-item label="设置Excel文件" style="display:flex;">
              <form action @submit.native.prevent>
                <el-input disabled="disabled" style="width:250px" v-model="excelName"></el-input>
                <input type="file" style="display:none" id="file" @change="findExcel($event)">
                <el-button type="primary" style="margin-left:30px" @click="clickExp">浏览</el-button>
                <el-button type="primary" @click="excelSubmit">提交Excel</el-button>
                <el-button type="primary" @click="imgSubmit">提交图片及视频</el-button>
              </form>
            </el-form-item>
          </el-col>

          <el-col :span="24" style="height:300px">
            <el-col :span="24" style="display:flex;justify-content: flex-start;">
              <el-form-item label="黑烟车视频"></el-form-item>
              <div class="file_a">
                <el-upload
                  action="string"
                  list-type="picture"
                  :on-preview="handlePictureCardPreview"
                  :on-success="videoSuccess"
                  :auto-upload="false"
                  ref="uploadVideo"
                  multiple
                  accept=".mp4"
                  :headers="formHeaders"
                  :http-request="videoGo"
                >
                  <!-- <i class="el-icon-plus"></i> -->
                  <el-button type="primary">浏览</el-button>
                </el-upload>
                <!-- <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl"  alt>
                  
                </el-dialog>-->
              </div>
            </el-col>
            <el-col :span="24" style="display:flex;justify-content: flex-start;margin-bottom:20px">
              <el-form-item label="黑烟车图片"></el-form-item>
              <div class="file_a">
                <el-upload
                  action="string"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-success="imgSuccess"
                  :auto-upload="false"
                  ref="uploadImg"
                  :headers="formHeaders"
                  :http-request="imgGo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </div>
            </el-col>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: center;align-items: center"></el-col>

          <!-- <el-col :span="24" style="display:flex;justify-content: center;">
            <el-button type="primary" round>查询</el-button>
            <el-button type="primary" round>重置</el-button>
          </el-col>-->
        </el-row>
      </el-form>
    </div>
    <!-- <div class="button-div">
      <el-button type="primary" round @click="search">查询</el-button>
      <el-button type="primary" round @click="reset">重置</el-button>
    </div>-->

    <v-videosrc ref="vVideosrc"></v-videosrc>
    <v-compile ref="vCompile"></v-compile>
    <black-information ref="blackInformation"></black-information>
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
    // submitUpload(){
    //   this.$refs.uploaded.submit()
    // },
    //  handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //   },
    //   handlePreview(file) {
    //     console.log(file);
    //   },
    //   handleExceed(files, fileList) {
    //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    //   },
    //   beforeRemove(file, fileList) {
    //     return this.$confirm(`确定移除 ${ file.name }？`);
    //   },
    dowmloadExcel() {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute(
        "href",
        "/serveApi/hbj/blackSmokeVechicle/downloadExcelTemplate"
      );
      a.setAttribute("download", true);
      a.click();
      a.style.display = "none";
    },
    videoGo(item) {
      this.uploadForm.append("files", item.file);
    },
    imgGo(item) {
      this.uploadForm.append("files", item.file);
    },

    imgSuccess() {
      this.$message({
        type: "success",
        message: "上传图片成功"
      });
      this.$refs.uploadImg.clearFiles();
    },
    videoSuccess(data) {
      this.$message({
        type: "success",
        message: "上传视频成功"
      });
      this.$refs.uploadVideo.clearFiles();
    },
    imgSubmit() {
      let that = this;
      this.$refs.uploadVideo.submit(); //触发提交动作
      this.$refs.uploadImg.submit();
      try {
        //判断formData是否存在文件
        if (this.uploadForm.get("files").name.length <= 0) {
          this.$message({
            type: "warning",
            message: "请确保已添加文件"
          });
          return false;
        }
      } catch (err) {
        this.$message({
          type: "warning",
          message: "请确保已添加文件"
        });
        return false;
      }

      //this.uploadForm.append("files", this.fileList)
      const loadingObj = this.$loading({
        lock: true,
        text: "正在提交数据中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".submit-test-dialog")
      });
      this.$axios
        .post(
          "/serveApi/hbj/blackSmokeVechicle/upload?sidebar=黑烟车数据导入",
          this.uploadForm,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(function(res) {
          loadingObj.close();
          if(res.data.code==1){
            that.$message({type:"success",message:res.data.msg})
          }else{
            that.$message({type:"warning",message:res.data.msg})
          }
        })
        .catch(err => {
          that.$message({
            type: "warning",
            message: err
          });
          loadingObj.close();
        });
       this.$refs.uploadImg.clearFiles();
       this.$refs.uploadVideo.clearFiles();
       this.uploadForm=new FormData()//释放旧的form对象
      // this.$refs.uploadVideo.submit();
      // this.$refs.uploadImg.submit();
    },
    handlePictureCardPreview(file) {
      //图片缩略图展示
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleVideoPreview(url) {
      //视频缩略图展示
      this.dialogVideoUrl = file.url;
      this.videoVisible = true;
    },

    clickExp() {
      document.querySelector("#file").click();
    },
    findExcel(e) {
      this.fileExcel = e.target.files[0];
      this.excelName = e.target.files[0].name;
    },
    excelSubmit() {
      //提交excel
      let that = this;
      if (this.excelName == "") {
        this.$message({
          type: "warning",
          message: "请先上传excel"
        });
      } else if (
        this.excelName.lastIndexOf(".xlsx") > 0 ||
        this.excelName.lastIndexOf(".XLSX") > 0
      ) {
        let form = new FormData();
        form.append("file", this.fileExcel);
        this.$axios
          .post(
            "/serveApi/hbj/blackSmokeVechicle/uploadExcel?sidebar=黑烟车数据导入",
            form,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then(function(res) {
            // console.log(data.data.code)
            if (res.data.data.failCount == 0) {
              that.$message({
                type: "success",
                message: "提交数据成功"
              });
            } else {
              that.$message({
                type: "warning ",
                dangerouslyUseHTMLString:true,
                message:
                  "失败编号为" + res.data.data.failBhlist.join(",")+";<br/>成功编号为:"+res.data.data.successList.join(",")
              });
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "请选择xlsx格式"
        });
      }
    },
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
          sidebar: "黑烟车数据导入"
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
      pagnationList: { total: 0, pageSize: 30, pageNum: 1 },
      tableData: [],
      hideVideo: false,
      fileList: [],
      excelName: "",
      fileExcel: {},
      dialogVisible: false,
      videoVisible: false,
      dialogImageUrl: "",
      dialogVideoUrl: "",
      formHeaders: { "Content-Type": "multipart/form-data" },
      uploadForm: new FormData()
    };
  },
  created() {
    //  this.search();
  },
  components: {
    vVideosrc,
    vCompile,
    blackInformation
  }
};
</script>

<style>
.file_a .el-upload--picture-card {
  width: 260px !important;
}
.file_a .el-upload-list {
  display: flex;
  flex-wrap: wrap;
}
.file_a .el-upload-list--picture .el-upload-list__item {
  width: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

<style scoped>
.button-div {
  display: flex;
  justify-content: center;
}
.upload-excel {
  height: 20px;
}
</style>

