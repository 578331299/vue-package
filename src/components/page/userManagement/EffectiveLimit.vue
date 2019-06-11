<template>
  <div class="content_box" style="width:100%;height:100%;">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form :inline="true" @submit.native.prevent>
        <el-row>
          <el-col :span="24" style="display:flex;justify-content: flex-start;align-item:center">
            <el-form-item label="发动机类型" style="margin-right:2%">
              <el-select
                v-model="inputList.fdjlx"
                placeholder="发动机类型"
                @keyup.enter.native="showAll"
              >
                <el-option label="点燃式" value="点燃式"></el-option>
                <el-option label="压燃式" value="压燃式"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="风速最大标准值(m/s)" style="margin-right:2%">
              <el-input v-model="inputList.fszdbzz" @keyup.enter.native="showAll"></el-input>
            </el-form-item>

            <el-form-item label="风速最大限定值(m/s)">
              <el-input v-model="inputList.fszdxdz" @keyup.enter.native="showAll"></el-input>
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
    <information
      :title="informationTotal.informationTitle"
      :diaSta="informationTotal.informationTitleDiasta"
      @dialogClose="closeInformation"
      :updataData="informationTotal.informationData"
    ></information>
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
          <el-table-column prop="fdjlx" label="发动机类型" align="center"></el-table-column>
          <el-table-column prop="fszdxdz" label="风速最大限定值(m/s)" align="center"></el-table-column>
          <!-- <el-table-column prop="fsdw" label="风速单位(m/s)" align="center"></el-table-column> -->
          <el-table-column prop="hjwdzxxdz" label="环境温度最小限定值(℃)" align="center"></el-table-column>
          <el-table-column prop="hjwdzxbzz" label="环境温度最小标准值(℃)" align="center"></el-table-column>
          <el-table-column prop="hjwdzdxdz" label="环境温度最大限定值(℃)" align="center"></el-table-column>
          <el-table-column prop="hjwdzdbzz" label="环境温度最大标准值(℃)" align="center"></el-table-column>
          <!-- <el-table-column prop="hjwddw" label="环境温度单位(℃)" align="center"></el-table-column> -->
          <el-table-column prop="xdsdzdxdz" label="相对湿度最大限定值(%)" align="center"></el-table-column>
          <el-table-column prop="xdsdzdbzz" label="相对湿度最大标准值(%)" align="center"></el-table-column>
          <!-- <el-table-column prop="xdsddw" label="相对湿度单位(%)" align="center"></el-table-column> -->
          <el-table-column prop="dqylzxxdz" label="大气压力最小限定值(kpa)" align="center"></el-table-column>
          <el-table-column prop="dqylzxbzz" label="大气压力最小标准值(kpa)" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showInformation(scope.row)">查看详情</el-button>
              <el-button type="text" size="small" @click="restore(scope.row)">恢复默认值</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="logPag.pageNum"
          :page-sizes="[10,20,30]"
          :page-size="logPag.pagesize"
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
import information from "../../common/informationMuch.vue";
import tableEdit from "../../common/userManagement/effectLimitEdit.vue";
import vueScroll from "vuescroll";
import { constants } from "crypto";
import * as utils from "../../../utils/utils";
export default {
  name: "DataDictionaryManagement",
  data() {
    return {
      loading: false,
      informationTotal: {
        informationTitle: "有效性限值维护详情",
        informationTitleDiasta: false,
        informationData: []
      },
      editSelected: { cflx: "", sfjzcf: "", qssj: "", jssj: "" },
      inputList: {
        fdjlx: "",
        fszdxdz: "",
        fszdxdz: ""
      },
      logPag: { pageNum: 1, total: 0, pagesize: 10 },
      logName: "",
      tableData: [],
      tableAdd: false,
      tableEdit: false,
      tableEditTitle: "有效性限值维护编辑",
      tableAddTitle: "有效性限值维护新增",
      tableTitle: [
        {
          title: "fdjlx",
          title_cn: "发动机类型",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          disabled: true,
          showMark: true
        },
        {
          title: "fszdxdz",
          title_cn: "风速最大限定值(m/s)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          specialNum: true,
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "fszdbzz",
          title_cn: "风速最大标准值(m/s)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },

        {
          title: "hjwdzxxdz",
          title_cn: "环境温度最小限定值(℃)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[-]{0,1}[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空且最多七位,可保留一位小数",
          placeholder: "输入非空且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "hjwdzdxdz",
          title_cn: "环境温度最大限定值(℃)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[-]{0,1}[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空且最多七位,可保留一位小数",
          placeholder: "输入非空且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "hjwdzdbzz",
          title_cn: "环境温度最大标准值(℃)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[-]{0,1}[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空且最多七位,可保留一位小数",
          placeholder: "输入非空且最多七位,可保留一位小数",
          showMark: true
        },

        {
          title: "xdsdzdxdz",
          title_cn: "相对湿度最大限定值(%)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "xdsdzdbzz",
          title_cn: "相对湿度最大标准值(%)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "dqylzxxdz",
          title_cn: "大气压力最小限定值(kpa)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "dqylzxbzz",
          title_cn: "大气压力最小标准值(kpa)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "dqylzdxdz",
          title_cn: "大气压力最大限定值(kpa)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "dqylzdbzz",
          title_cn: "大气压力最大标准值(kpa)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          specialNum: true,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "vspzxxdz",
          title_cn: "VSP最小限定值(kw/t)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "vspzdxdz",
          title_cn: "VSP最大限定值(kw/t)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "vspzxbzz",
          title_cn: "VSP最小标准值(kw/t)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },

        {
          title: "vspzdbzz",
          title_cn: "VSP最大标准值(kw/t)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,7}\\.{0,1}[0-9]{1}$/",
          error_info: "输入非空非负且最多七位,可保留一位小数",
          placeholder: "输入非空非负且最多七位,可保留一位小数",
          showMark: true
        },
        {
          title: "hpzxdzxxdz",
          title_cn: "车牌置信度最小限定值",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/[0-9]{1,8}$/",
          error_info: "请输入最多两位且大于零的整数",
          placeholder: "请输入最多两位且大于零的整数",
          showMark: true
        },
        {
          title: "hpzxdzxbzz",
          title_cn: "车牌置信度最小标准值",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/[0-9]{1,8}$/",
          error_info: "请输入最多两位且大于零的整数",
          placeholder: "请输入最多两位且大于零的整数",
          showMark: true
        },
        {
          title: "fsdw",
          title_cn: "风速单位",
          model: "",
          types: "text",
          show: false
        },
        {
          title: "hjwddw",
          title_cn: "环境温度单位",
          model: "",
          types: "text",
          show: false
        },
        {
          title: "xdsddw",
          title_cn: "相对湿度单位",
          model: "",
          types: "text",
          show: false
        },
        {
          title: "dqyldw",
          title_cn: "大气压力单位",
          model: "",
          types: "text",
          show: false
        },
        {
          title: "hpzxddw",
          title_cn: "车牌置信度单位",
          model: "",
          types: "text",
          show: false
        },
        {
          title: "xgr",
          title_cn: "修改人",
          model: localStorage.getItem("ms_username"),
          types: "text",
          show: false
        },

        {
          title: "bz",
          title_cn: "备注",
          model: "",
          types: "textarea",
          show: true,
          error_message: false,
          error_info: "字符不超过500位即可(允许特殊符号)",
          placeholder: "字符不超过500位即可(允许特殊符号)"
        }
      ],
      tableEditList: [],
      tableEditId: ""
    };
  },
  components: {
    information,
    tableEdit,
    vueScroll
  },
  created() {
    this.logSearch();
    let that = this;
  },
  methods: {
    showAll() {
      this.logPag.pageNum = 1;
      this.logSearch();
    },
    /**
     * @description 显示详情
     * @author B51733
     * @param {*} row 当前列数据
     * @version 2019.5.24
     */
    showInformation(row) {
      let showRow = JSON.parse(JSON.stringify(row));
      let arr = [];
      this.tableTitle.forEach(ele => {
        let obj = {};
        obj.key = ele.title_cn;
        obj.values = showRow[ele.title];
        arr.push(obj);
      });
      let arrTwo = [];
      let arrlittle = [];
      for (let i = 0; i < arr.length; i++) {
        arrlittle.push(arr[i]);
        if (arrlittle.length == 2 && i < arr.length - 1) {
          arrTwo.push(arrlittle);
          arrlittle = [];
        }
        if (i == arr.length - 1) {
          arrTwo.push(arrlittle);
          arrlittle = [];
        }
      }
      this.informationTotal.informationData = arrTwo;
      this.informationTotal.informationTitleDiasta = true;
    },
    closeInformation() {
      //关闭显示详情
      this.informationTotal.informationTitleDiasta = false;
    },

    /**
     * @description 恢复默认值
     * @author B51733
     * @param {*} row 当前列数据
     * @version 2019.5.24
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
          rowVal.fszdxdz = rowVal.fszdbzz;
          rowVal.hjwdzxbzz = rowVal.hjwdzxbzz;
          rowVal.hjwdzdxdz = rowVal.hjwdzdbzz;
          rowVal.xdsdzdxdz = rowVal.xdsdzdbzz;

          rowVal.dqylzxxdz = rowVal.dqylzxbzz;
          rowVal.dqylzdxdz = rowVal.dqylzdbzz;
          rowVal.vspzxxdz = rowVal.vspzxbzz;
          rowVal.vspzdxdz = rowVal.vspzdbzz;
          rowVal.hpzxdzxxdz = rowVal.hpzxdzxbzz;

          this.$axios({
            //删除接口
            method: "post",
            url: "/serveApi/hbj/effectiveLimit/update",
            headers: {
              "Content-Type": "application/json"
            },
            params: { siderbar: "处罚规则维护" },
            data: JSON.stringify(rowVal)
          }).then(function(res) {
            if (res.data.code == "1") {
              that.$message({
                type: "success",
                message: "恢复默认值成功"
              });
              setTimeout(function() {
                that.logSearch();
              }, 500);
            } else {
              that.$message({
                type: "warning",
                message: "恢复默认值失败"
              });
              setTimeout(function() {
                that.logSearch();
              }, 500);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    reset() {
      for (let i in this.inputList) {
        this.inputList[i] = "";
      }
      this.CFLX = "";
    },
    /**
     * @description 提交修改
     * @author B51733
     * @param  Array  组件传递修改后数据
     * @version 2019.5.24
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
        url: "/serveApi/hbj/effectiveLimit/update",
        headers: {
          "Content-Type": "application/json"
        },
        params: { siderbar: "有效性限值维护" },
        data: JSON.stringify(obj)
      })
        .then(function(data) {
          if (data.data.code == 1) {
            that.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            that.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
          that.tableEdit = false;
          that.logSearch();
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
    btnAddSubmit(data) {
      //新增提交按钮

      let obj = {};
      let that = this;
      data.forEach(element => {
        obj[element.title] = element.model;
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
    closeAdd(data) {
      //关闭新增模态框
      if (data == "add") {
        this.tableAdd = false;
      } else if (data == "edit") {
        this.tableEdit = false;
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
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/effectiveLimit/findByPage",

        headers: {
          "Content-Type": "application/json"
        },
        params: {
          siderbar: "有效性限值维护",
          pagesize: this.logPag.pagesize,
          pageNum: this.logPag.pageNum
        },
        data: {
          fdjlx: this.inputList.fdjlx,
          fszdbzz: this.inputList.fszdbzz,
          fszdxdz: this.inputList.fszdxdz
        }
      })
        .then(function(res) {
          // console.log(data.data.data.list)

          let data = res.data.data;
          loadingObj.close();
          that.tableData = data.list;
          that.logPag.total = data.total;
        })
        .catch(function(err) {
          console.log(err);
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
    handleClick(row) {
      //点击编辑按钮
      this.tableEditId = row.id;
      let tableTitle2 = JSON.parse(JSON.stringify(this.tableTitle));
      tableTitle2.forEach(ele => {
        ele.model = row[ele.title];
      });

      this.tableEditList = tableTitle2;
      this.tableEdit = true;
    },
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
                sidebar: "有效性限值维护"
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

