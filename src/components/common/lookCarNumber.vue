<template>
  <transition name="fade">
    <div class="detailedInformation_box" @click="handleClose" v-if="lookCarNumber">
      <div class="content1_box" @click.stop>
        <div class="title_box">
          <span>查看限行尾号规则</span>
          <div class="clouse_box">
            <img src="image/clouse.png" @click="handleClose" alt>
          </div>
        </div>
        <div class="cont_xi" style="height:calc(100% - 110px)">
          <div class="text_right">
            <el-button type="primary" @click="addLookCarNumberFun">新增限行尾号规则</el-button>
          </div>
          <div style="height:calc(100% - 35px);overflow: auto;">
            <el-table
              :data="tableData"
              border
              style="width: 100%;margin-top:20px;"
              height="calc(100% - 20px)"
            >
              <el-table-column fixed prop="xxgzmc" label="限行规则名称" align="center"></el-table-column>
              <el-table-column prop="xqyxxwh" label="周一限行尾号" align="center"></el-table-column>
              <el-table-column prop="xqexxwh" label="周二限行尾号" align="center" width="150px"></el-table-column>
              <el-table-column prop="xqsxxwh1" label="周三限行尾号" align="center"></el-table-column>
              <el-table-column prop="xqsxxwh2" label="周四限行尾号" align="center"></el-table-column>
              <el-table-column prop="xqwxxwh" label="周五限行尾号" align="center"></el-table-column>
              <el-table-column prop="xqlxxwh" label="周六限行尾号" align="center"></el-table-column>
              <el-table-column prop="xqrxxwh" label="周日限行尾号" align="center"></el-table-column>
              <el-table-column prop="cjsj" label="创建时间" align="center"></el-table-column>
              <el-table-column prop="cjr" label="创建人" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button type="text" size="small" @click="delateData(scope.row)">刪除</el-button>
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
      </div>
      <div @click.stop>
        <add-look-car-number ref="addLookCarNumber"></add-look-car-number>
      </div>
    </div>
  </transition>
</template>
<script>
import addLookCarNumber from "./addLookCarNumber.vue";
//import addLookCarNumber from "../../common/addLookCarNumber.vue";
export default {
  name: "lookCarNumber",
  components: {
    addLookCarNumber
  },
  data() {
    return {
      labelPosition: "left",
      lookCarNumber: false,
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "限行规则",
      tableData: [],
      addLookCarNumberShow: false
    };
  },
  mounted() {
    //console.log(this.updataData);
    this.axiosGetData();
  },
  methods: {
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    handleClose() {
      this.lookCarNumber = !this.lookCarNumber;
    },
    addLookCarNumberFun() {
      //this.$refs.addLookCarNumber.clouseLook();
      this.$refs.addLookCarNumber.clouseLook();
    },
    delateData(rowData) {
      let that = this;
      let obj = {
        sidebar: "限行规则",
        id: rowData.id
      };
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios({
          method: "post",
          url: "/serveApi/hbj/resDrivingRuleSet/delete",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(obj)
        })
          .then(function(res) {
            that.$message({
              type: "success",
              message: "数据删除成功!"
            });
            that.axiosGetData();
          })
          .catch(function(err) {
            that.$message({
              type: "warning",
              message: "数据删除失败!"
            });
          });
      })
      .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    axiosGetData() {
      let that = this;
      let obj = {};
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/resDrivingRuleSet/findByPage",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj),
        params: {
          siderbar: "限行规则",
          pageSize: this.pageSize,
          pageNum: this.currentPage4
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
    }
  }
};
</script>
<style scoped>
.detailedInformation_box {
  position: fixed;
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
  position: relative;
  width: 90%;
  height: 90%;
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
  padding: 35px 35px 0 35px;
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
.bottom_but_box {
  text-align: center;
  padding: 30px;
}
.every_input {
  position: relative;
}
.every_span {
  color: red;
  position: absolute;
  top: 26px;
  left: 5px;
  font-size: 12px;
}
.text_right {
  text-align: right;
}
</style>


