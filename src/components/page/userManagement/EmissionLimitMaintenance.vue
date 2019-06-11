<template>
  <div class="content_box" style="width:100%;height:95%;">
    <!--<div class="button-div">
      <el-button type="primary" @click="axiosGetData" round>新增</el-button>
    </div>-->

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:100%;margin-bottom:0;"
    >
      <div style="height:calc(100% - 45px);overflow: auto">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px; box-sizing: border-box"
          @selection-change="handleSelectionChange"
          height="calc(100% - 20px)"
        >
          <el-table-column prop="fdjlx" label="发动机类型" align="center"></el-table-column>
          <!--<el-table-column prop="btgydxdz" label="不透光烟度限定值" align="center"></el-table-column>-->
          <el-table-column prop="btgydbzz" label="不透光烟度标准值" align="center" width="150px"></el-table-column>
          <!--<el-table-column prop="btgyddw" label="不透光烟度单位" align="center"></el-table-column>-->
          <!--<el-table-column prop="lgmhexdz" label="林格曼黑度限定值" align="center"></el-table-column>-->
          <el-table-column prop="glmhdbzz" label="林格曼黑度标准值" align="center" width="150px"></el-table-column>
          <!--<el-table-column prop="lgmhddw" label="林格曼黑度单位" align="center"></el-table-column>-->
          <!--<el-table-column prop="nptjndxdz" label="NO体积浓度限定值" align="center"></el-table-column>-->
          <el-table-column prop="notjndbzz" label="NO体积浓度标准值" align="center" width="150px"></el-table-column>
          <!--<el-table-column prop="notjnddw" label="NO体积浓度单位" align="center"></el-table-column>
          <el-table-column prop="cotjndxdz" label="CO体积浓度限定值" align="center"></el-table-column>-->
          <el-table-column prop="cotjndbzz" label="CO体积浓度标准值" align="center" width="150px"></el-table-column>
          <!--<el-table-column prop="cotjnddw" label="CO体积浓度单位" align="center"></el-table-column>-->
          <el-table-column prop="yybz" label="引用标准" align="center"></el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column prop="xgsj" label="修改时间" align="center"></el-table-column>
          <el-table-column prop="xgr" label="修改人" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <!--<el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>-->
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
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
    <form-emission ref="formEmissionDom" :title="title" :rowData="rowData"></form-emission>
    <information-much :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information-much>
  </div>
</template>


<script>
/**
 * @description 新增和修改模块
 * @author lifei
 * @version 2019.6.04
 */
import formEmission from "../../common/formEmission.vue";
import informationMuch from "../../common/informationMuch.vue";
export default {
  name: "EmissionLimitMaintenance",
  components: { formEmission, informationMuch },
  data() {
    return {
      SmokyCarManagement: {
        number: "",
        type: "",
        startTime: "",
        endTime: ""
      },
      currentPage4: 1,
      pageSize: 10,
      total: 10,
      sidebar: "排放限值维护",
      tableData: [],
      multipleSelection: [],
      updataID: [],
      title: "",
      rowData: [
        {
          type: "input",
          lable: "应用限值",
          val: "",
          keys: "yyxz",
          alertText: "输入格式为xxxxx.x(x为0-9的数字)！",
          check: true,
          textShow: false,
          nameRef: "yyxzRef",
          ref: "bzRef",
          regular: /^[0-9]{5}[.][0-9]{1}$/
        },
        {
          type: "textarea",
          lable: "备注",
          val: "",
          keys: "bz",
          alertText: "输入汉字或字母或数字",
          check: true,
          textShow: false,
          nameRef: "bzRef",
          ref: "end",
          regular: /^[\w\u4E00-\u9FA5]/
        }
      ],
      saveDataForm: {
        url: "/serveApi/hbj/ygRemoteSensingLimit/update",
        id: "",
        xgr: localStorage.getItem("ms_username"),
        sidebar: this.sidebar
      },
      diaSta: false,
      updataData: [],
      table_yc: {
        fdjlx: "发动机类型",
        btgydxdz: "不透光烟度限定值(%)",
        btgydbzz: "不透光烟度标准值",
        btgyddw: "不透光烟度单位",
        glmhdxdz: "林格曼黑度限定值(级)",
        glmhdbzz: "林格曼黑度标准值",
        glmhddw: "林格曼黑度单位",
        notjndxdz: "NO体积浓度限定值(ppm)",
        notjndbzz: "NO体积浓度标准值",
        notjnddw: "NO体积浓度单位",
        cotjndxdz: "CO体积浓度限定值(%)",
        cotjndbzz: "CO体积浓度标准值",
        cotjnddw: "CO体积浓度单位",
        yybz: "引用标准",
        bz: "备注",
        xgsj: "修改时间",
        xgr: "修改人"
      }
    };
  },
  mounted() {
    this.axiosGetData();
  },
  methods: {
    /**
     * @description 预留修改模块调用
     * @author lifei
     * @version 2019.6.04
     */
    modify(row) {
      this.rowData = row;
      this.title = "修改";
      this.$refs.formEmissionDom.handleClose();
    },
    /**
     * @description 设置每页显示条数
     * @author lifei
     * @version 2019.6.04
     */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage4 = 1;
      this.axiosGetData();
    },
    /**
     * @description 跳转分页
     * @author lifei
     * @version 2019.6.04
     */
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.axiosGetData();
    },
    /**
     * @description 初始化数据显示
     * @author lifei
     * @version 2019.6.04
     */
    axiosGetData() {
      let that = this;
      let obj = {};
      obj.pageSize = this.pageSize;
      obj.pageNum = this.currentPage4;
      obj.sidebar = this.sidebar;
      this.$axios({
        method: "post",
        url: "/serveApi/hbj/ygRemoteSensingLimit/getPage",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
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
     * @description 查看详情
     * @author lifei
     * @version 2019.6.04
     */
    handleClick(row) {
      this.diaSta = true;
      let keys_ = Object.keys(this.table_yc);
      let arr = [];
      let that = this;

      keys_.forEach(function(item, index) {
        let obj = {};
        obj["key"] = that.table_yc[item];
        obj["values"] = row[item];
        arr.push(JSON.parse(JSON.stringify(obj)));
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
      //console.log(arrTwo);
      this.updataData = arrTwo;
    },
    /**
     * @description 关闭
     * @author lifei
     * @version 2019.6.04
     */
    close() {
      this.diaSta = false;
    }
  }
};
</script>

<style scoped>
.button-div {
  text-align: right;
  padding: 20px 20px 0 0;
}
.head_pic {
  width: 100%;
  height: 30px;
}
.content_box {
  box-sizing: border-box;
}
</style>

