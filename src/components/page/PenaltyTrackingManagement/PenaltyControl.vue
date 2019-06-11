<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true" @submit.native.prevent>
        <el-row>
          <el-col :span="24" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="处罚类型：">
              <el-select
                v-model="inputList.cflx"
                placeholder="处罚类型"
                style="width:150px"
                @keyup.enter.native="showAll"
              >
                <template v-for="item in CFLX">
                  <el-option :label="item.xmnr" :value="item.sz"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="整改期限(天)：" style="margin-right:15px">
              <el-input
                placeholder="整改期限(天)"
                v-model.number="inputList.zgqx"
                @keyup.enter.native="showAll"
              ></el-input>
            </el-form-item>

            <el-form-item label="是否加重处罚">
              <el-select
                v-model="inputList.sfjzcf"
                placeholder="是否加重处罚"
                @keyup.enter.native="showAll"
              >
                <el-option value="1" label="是">是</el-option>
                <el-option value="0" label="否">否</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button_div" style="text-align:center">
      <el-button type="primary" @click="showAll">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <!-- <el-button type="primary" @click="dataAdd">新增</el-button> -->
    </div>

    <table-edit
      :diaSta="tableEdit"
      :title="tableEditTitle"
      @dialogClose="closeAdd('edit')"
      :editData="tableEditList"
      @btnEdit="btnEditSubmit"
      :names="logName"
    ></table-edit>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:calc(100% - 174px);margin-bottom:0;"
    >
      <div style="height:calc(100% - 35px);overflow: auto">
        <el-table
          :data="tableData"
          border
          height="calc(100% - 20px)"
          style="width: 100%;margin-top:20px;overflow-y:auto;height:500px"
        >
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column prop="cflx" label="处罚类型" align="center">
            <template scope="scope">{{$store.state.enumData.cflx[scope.row.cflx]}}</template>
          </el-table-column>
          <el-table-column prop="zgqx" label="整改期限(天)" align="center"></el-table-column>
          <el-table-column prop="zgqxmrz" label="整改期限默认值(天)" align="center"></el-table-column>
          <el-table-column prop="fkqx" label="罚款期限(天)" align="center"></el-table-column>
          <el-table-column prop="fkqxmrz" label="罚款期限默认值(天)" align="center"></el-table-column>
          <el-table-column prop="yxqx" label="有效期限(天)" align="center"></el-table-column>
          <el-table-column prop="yxqxmrz" label="有效期限默认值(天)" align="center"></el-table-column>
          <el-table-column prop="sfjzcf" label="是否加重处罚" align="center">
            <template scope="scope">{{scope.row.sfjzcf.toString()=="0"?"否":"是"}}</template>
          </el-table-column>
          <el-table-column prop="gzsm" label="规则说明" align="center"></el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small">查看</el-button> -->
              <el-button type="text" size="small" @click="restore(scope.row)">恢复默认值</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="turnOn(scope.row)"
                :disabled="scope.row.sfqy=='1'?true:false"
              >启用</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  </div>
</template>
  
  </div>
</template>

<script>
import tableAdd from "../../common/userManagement/penaltyAdd.vue";
import tableEdit from "../../common/userManagement/penaltyEdit.vue";
import vueScroll from "vuescroll";
import { constants } from "crypto";
export default {
  name: "DataDictionaryManagement",
  data() {
    return {
      CFLX: "",
      totalCflx: [],
      loading: false,
      editSelected: { cflx: "", sfjzcf: "" },
      inputList: {
        xmnr: "",
        cflx: "",
        zgqxq: "",
        zgqxz: "",
        sfjzcf: "",
        zgqx: ""
      },
      logPag: { pageNum: 1, total: 0, pagesize: 10 },
      logName: "",
      tableData: [],
      tableAdd: false,
      tableEdit: false,
      tableEditTitle: "处罚规则维护编辑",
      tableAddTitle: "枚举值维护新增",
      ruled: {
        xmnr: [
          {
            validator: function(rule, value, callback) {},
            trigger: "blur"
          }
        ]
      },
      tableTitle: [
        {
          select: true,
          model: "",
          show: true,
          error_message: false,
          select_name: "cflx",
          title: "cflx",
          title_cn: "处罚类型"
        },
        {
          title: "zgqx",
          title_cn: "整改期限(天)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,4}$/",
          error_info: "最多输入4位数字",
          placeholder: "最多输入4位数字"
        },
        {
          title: "zgqxmrz",
          title_cn: "整改期限默认值(天)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,4}$/",
          error_info: "最多输入4位数字",
          placeholder: "最多输入4位数字"
        },
        {
          title: "fkqx",
          title_cn: "罚款期限(天)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,4}$/",
          error_info: "最多输入4位数字",
          placeholder: "最多输入4位数字"
        },
        {
          title: "fkqxmrz",
          title_cn: "罚款期限默认值(天)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,4}$/",
          error_info: "最多输入4位数字",
          placeholder: "最多输入4位数字"
        },
        {
          title: "yxqx",
          title_cn: "有效期限(天)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,4}$/",
          error_info: "最多输入4位数字",
          placeholder: "最多输入4位数字"
        },
        {
          title: "yxqxmrz",
          title_cn: "有效期限默认值(天)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,4}$/",
          error_info: "最多输入4位数字",
          placeholder: "最多输入4位数字"
        },
        {
          title: "sfjzcf",
          title_cn: "是否加重处罚",
          model: "",
          show: true,
          error_message: false,
          specialType: true,
          data: [
            {
              xmnr: "是",
              sz: "1"
            },
            {
              xmnr: "否",
              sz: "0"
            }
          ]
        },
        {
          title: "bz",
          title_cn: "备注",
          model: "",
          types: "textarea",
          show: true,
          error_message: false
        }
      ],
      tableEditList: [],
      tableEditId: ""
    };
  },
  components: {
    tableAdd,
    tableEdit,
    vueScroll
  },
  created() {
    this.logSearch();
    let that = this;
    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      params: { siderbar: "处罚规则维护" },
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "CFLX" }
    }).then(function(res) {
      that.CFLX = res.data.data;
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.totalCflx = obj;
    });
  },
  methods: {
    showAll() {
      this.logPag.pageNum = 1;
      this.logSearch();
    },
    /**
     * @description 启用该条规则
     * @author B51733
     * @param object对象 当前行所有数据
     * @version 2019.5.28
     */
    turnOn(row) {
      let that = this;
      this.$confirm("是否启用此条规则?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          let obj = {};
          obj.id = row.id;
          obj.cflx = row.cflx;
          that
            .$axios({
              //删除接口
              method: "post",
              url: "/serveApi/hbj/punishRule/trunOn",
              headers: {
                "Content-Type": "application/json"
              },
              params: { siderbar: "处罚规则维护" },
              data: obj
            })
            .then(function(res) {
              if (res.data.code == "1") {
                that.$message({
                  type: "success",
                  message: "启用成功"
                });
              } else {
                that.$message({
                  type: "warning",
                  message: "启用失败"
                });
              }
              that.logSearch();
            })
            .catch(err => {
              that.$message({ type: "warning", message: err });
            });
        })
        .catch(function() {
          that.$message({ type: "warning", message: "已取消" });
        });
    },
    /**
     * @description 还原默认值
     * @author B51733
     * @param object对象 当前行所有数据
     * @version 2019.5.28
     */
    restore(row) {
      let that = this;
      this.$confirm("是否恢复该条默认值?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let rowVal = JSON.parse(JSON.stringify(row));
          rowVal.zgqx = rowVal.mrzgqx;
          rowVal.fkqx = rowVal.mrfkqx;
          rowVal.yxqx = rowVal.mryxqx;
          this.$axios({
            //删除接口
            method: "post",
            url: "/serveApi/hbj/punishRule/update",
            headers: {
              "Content-Type": "application/json"
            },
            params: { siderbar: "处罚规则维护" },
            data: JSON.stringify(rowVal)
          })
            .then(function(res) {
              if (res.data.code == "1") {
                that.$message({
                  type: "success",
                  message: "恢复默认值成功"
                });
              } else {
                that.$message({
                  type: "warning",
                  message: "恢复默认值失败"
                });
              }
              that.logSearch();
            })
            .catch(err => {
              that.$message({ type: "warning", message: err });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    reset() {
      for (let i in this.inputList) {
        this.inputList[i] = "";
      }
    },
    /**
     * @description 提交修改
     * @author B51733
     * @param 数组 从edit组件获取的修改后数据
     * @version 2019.5.28
     */

    btnEditSubmit(data) {
      //修改提交
      let obj = {};
      let that = this;

      data.forEach(element => {
        obj[element.title] = element.model;
      });
      obj.id = this.tableEditId;
      this.$axios({
        //删除接口
        method: "post",
        url: "/serveApi/hbj/punishRule/update",
        headers: {
          "Content-Type": "application/json"
        },
        params: { siderbar: "处罚规则维护" },
        data: JSON.stringify(obj)
      })
        .then(function(data) {
          if (data.data.code == 1) {
            that.$message({
              type: "success",
              message: "修改成功"
            });
            that.logSearch();
            that.tableEdit = false;
          } else {
            that.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          // alert(err)
          that.$message({
            type: "error",
            message: JSON.stringify(err),
            duration: 4000
          });
        });
    },

    dataAdd() {
      //打开新增模态框
      this.tableTitle.forEach(ele => {
        ele.model = "";
      });
      this.tableAdd = true;
    },
    dataEduit() {
      this.tableEdit = true;
    },

    /**
     * @description 关闭新增/编辑组件
     * @author B51733
     * @param string 当前关闭的是编辑还是新增组件
     * @version 2019.5.28
     */
    closeAdd(data) {
      //关闭新增模态框
      if (data == "add") {
        this.tableAdd = false;
      } else if (data == "edit") {
        this.tableEdit = false;
      }
    },

    /**
     * @description 查询搜渲染表格
     * @author B51733
     * @param
     * @version 2019.5.28
     */
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
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/punishRule/findByPage",

        headers: {
          "Content-Type": "application/json"
        },
        params: {
          siderbar: "处罚规则维护",
          pageNum: this.logPag.pageNum,
          pageSize: this.logPag.pagesize
        },
        data: {
          cflx: this.inputList.cflx,
          zgqx: this.inputList.zgqx,
          sfjzcf: this.inputList.sfjzcf
        }
      })
        .then(function(data) {
          // console.log(data.data.data.list)
          loadingObj.close();
          that.tableData = data.data.data.list;
          that.logPag.total = data.data.data.total;
        })
        .catch(function(err) {
          loadingObj.close();
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
    /**
     * @description 编辑按钮绑定函数
     * @author B51733
     * @param Object对象 当前行所有数据
     * @version 2019.5.28
     */
    handleClick(row) {
      //点击编辑按钮
      this.tableEditId = row.id;
      let tableTitle2 = JSON.parse(JSON.stringify(this.tableTitle));
      tableTitle2.forEach(ele => {
        if (row[ele.title] != null) {
          ele.model = row[ele.title].toString();
        } else {
          ele.model = "";
        }
      });
      console.log(tableTitle2);
      this.tableEditList = tableTitle2;
      this.tableEdit = true;
    },
    /**
     * @description 删除按钮绑定事件
     * @author B51733
     * @param Object对象 当前行所有数据
     * @version 2019.5.28
     */
    removeData(data) {
      let that = this;
      //删除字典
      this.$confirm("是否删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          //点击确定
          that
            .$axios({
              //删除接口
              method: "post",
              url: "/serveApi/hbj/enum/delete",
              params: {
                id: data.id,
                sidebar: "处罚规则维护"
              }
            })
            .then(function(data) {
              if (data.data.code == 1) {
                that.$message({
                  type: "success",
                  message: "删除成功"
                });
                that.logSearch();
              }
            })
            .catch(function(err) {
              that.$message("删除失败");
            });
        })
        .catch(() => {
          //取消删除
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

