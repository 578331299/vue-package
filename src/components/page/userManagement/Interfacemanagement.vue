<template>
  <div class="content_box" style="width:100%;height:100%;">
    <!--<v-test></v-test>-->
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="SmokyCarManagement" :model="SmokyCarManagement" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-form-item label="厂商：">
              <el-input
                v-model="SmokyCarManagement.site"
                @keyup.enter.native="axiosGetData(1)"
                style="width:150px"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" style="display:flex;justify-content: center;">
            <el-button type="primary" @click="axiosGetData(1)">查询</el-button>
            <el-button type="primary" @click="resetData">重置</el-button>
            <el-button type="primary" @click="formDataShow">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="add_mi">
      <label class="lable" for>是否加密：</label>
      <el-switch @change="checkFun()" v-model="value3" active-text="是" inactive-text="否"></el-switch>
      <label class="lable" style="margin-left:30px;" for>是否启用：</label>
      <el-switch @change="checkFunQy()" v-model="value4" active-text="是" inactive-text="否"></el-switch>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 145px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;"
          height="calc(100% - 20px)"
        >
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column prop="name" label="厂商名称" align="center"></el-table-column>
          <el-table-column prop="key" label="KEY" align="center"></el-table-column>
          <el-table-column prop="createtime" label="创建时间" align="center" width="150px"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="InterfacePermissions(scope.row)" size="small">设置接口权限</el-button>
              <el-button type="text" @click="delateData(scope.row)" size="small">删除</el-button>
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
    <form-data
      ref="formDataShowDom"
      :title="title"
      :sidebar="sidebar"
      :rowData="rowData"
      :saveDataForm="saveDataForm"
    ></form-data>
    <select-data
      :title="title"
      :diaSta="diaSta"
      @dialogClose="close"
      :updataData="updataData"
      :saveSelectData="saveSelectData"
    ></select-data>
  </div>
</template>


<script>
import selectData from "../../common/selectData.vue";
import formData from "../../common/formData.vue";
export default {
  name: "Interfacemanagement",
  components: {
    formData,
    selectData
  },
  data() {
    return {
      SmokyCarManagement: {
        site: ""
      },
      title: "",
      value3: true,
      value4: true,
      diaSta: false,
      updataData: [],
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "数据交换接口",
      tableData: [],
      rowData: [
        {
          type: "input",
          lable: "厂商",
          val: "",
          keys: "name",
          alertText: "输入汉字或字母或数字",
          check: true,
          textShow: false,
          nameRef: "nameRef",
          ref: "end",
          regular: /^[\w\u4E00-\u9FA5]{1,30}$/
        }
      ],
      saveDataForm: {
        url: "/serveApi/hbj/interface/addFirm"
      },
      saveSelectData: {
        firmid: ""
      }
    };
  },
  mounted() {
    this.axiosGetData();
    this.checkFunGet();
  },
  methods: {
    /**
     * @description 设置接口权限
     * @author lifei
     * @version 2019.5.28
     */
    InterfacePermissions(row) {
      let that = this;
      this.saveSelectData.firmid = row.id;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/interface/detail",
        params: {
          firmid: row.id,
          sidebar: that.sidebar
        }
      })
        .then(function(res) {
          if (res.data) {
            let arrLit = [];
            let arr = [];
            for (let i = 0; i < res.data.data.length; i++) {
              arrLit.push(res.data.data[i]);
              if (arrLit.length === 3 && i < res.data.data.length - 1) {
                arr.push(arrLit);
                arrLit = [];
              }
              if (i === res.data.data.length - 1) {
                arr.push(arrLit);
              }
            }
            that.updataData = arr;
            that.diaSta = true;
          }
          console.log(that.updataData);
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败!"
          });
        });
    },
    /**
     * @description 设置每页条数
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
     * @description 跳转页签
     * @author lifei
     * @version 2019.5.28
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 搜索与初始化数据显示
     * @author lifei
     * @version 2019.5.28
     */
    axiosGetData(num) {
      let that = this;
      if (num == 1) {
        that.currentPage4 = 1;
      }
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/interface/getPage",
        params: {
          pageSize: that.pageSize,
          pageNum: that.currentPage4,
          sidebar: that.sidebar,
          name: that.SmokyCarManagement.site.replace(/(^\s*)|(\s*$)/g, "")
        }
      })
        .then(function(res) {
          //console.log(res);
          if (res.data.data.list) {
            that.tableData = res.data.data.list;
            //console.log(res.data.data.data);
            that.total = res.data.data.total;
          }
        })
        .catch(function(err) {
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
     * @description 接口管理新增
     * @author lifei
     * @version 2019.5.28
     */
    formDataShow() {
      //alert()
      this.$refs.formDataShowDom.handleClose();
    },
    /**
     * @description 接口权限管理关闭
     * @author lifei
     * @version 2019.5.28
     */
    close() {
      this.diaSta = false;
    },
    /**
     * @description 是否加密
     * @author lifei
     * @version 2019.5.28
     */
    checkFun() {
      let that = this;
      let formData = new FormData();
      formData.append("sidebar", that.sidebar);
      formData.append("isencrype", that.value3);
      /*let obj = {
        sidebar: that.sidebar,
        isencrype: that.value3
      };*/
      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/encrypt/updateStatus",
        headers: {
          "Content-Type": "application/json"
        },
        data: formData //JSON.stringify(obj)
      })
        .then(function(res) {
          //console.log(res);
          if (res.data.data.list) {
          }
          that.$message({
            type: "success",
            message: "设置成功!"
          });
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "设置失败!"
          });
        });
    },
    /**
     * @description 是否启用
     * @author lifei
     * @version 2019.5.28
     */
    checkFunQy() {
      let that = this;
      let formData = new FormData();
      formData.append("sidebar", that.sidebar);
      formData.append("enable", that.value3);
      /*let obj = {
        sidebar: that.sidebar,
        isencrype: that.value3
      };*/
      this.$axios({
        method: "POST",
        url: "/serveApi/hbj/encrypt/updateEnabled",
        headers: {
          "Content-Type": "application/json"
        },
        data: formData //JSON.stringify(obj)
      })
        .then(function(res) {
          //console.log(res);
          if (res.data.data.list) {
          }
          that.$message({
            type: "success",
            message: "设置成功!"
          });
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "设置失败!"
          });
        });
    },
    /**
     * @description 是否加密，与是否启用查询
     * @author lifei
     * @version 2019.5.28
     */
    checkFunGet() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/serveApi/hbj/encrypt/getStatus",
        params: {
          sidebar: that.sidebar,
          isencrypt: that.value3
        }
      })
        .then(function(res) {
          console.log(res);
          that.value3 = res.data.data;
          //debugger;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "设置失败!"
          });
        });
    },
    /**
     * @description 删除数据
     * @author lifei
     * @version 2019.5.28
     */
    delateData(roeData) {
      let that = this;
      let obj = {
        id: roeData.id,
        sidebar: that.sidebar
      };
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "Post",
            headers: {
              "Content-Type": "application/json"
            },
            url: "/serveApi/hbj/interface/deleteFirm",
            data: JSON.stringify(obj)
          })
            .then(function(res) {
              that.axiosGetData();
              that.$message({
                type: "success",
                message: "刪除成功!"
              });
            })
            .catch(function(err) {
              that.$message({
                type: "warning",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
}
.lable {
  display: inline-block;
  margin-right: 15px;
}
.add_mi {
  color: #909399;
  text-align: right;
}
</style>




