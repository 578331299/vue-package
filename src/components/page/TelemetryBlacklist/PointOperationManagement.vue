<template>
  <div class="content_box" style="width:100%;height:100%;">
    <table-add
      @dialogClose="closeAdd('add')"
      :diaSta="tableInput.tableAdd"
      :title="tableInput.tableAddTitle"
      :updata="tableInput.tableTitle"
      :names="tableInput.tableAddName"
      @btnAdd="btnAddAubmit"
    ></table-add>
    <table-edit
      :diaSta="tableInput.tableEdit"
      :title="tableInput.tableEditTitle"
      @dialogClose="closeAdd('edit')"
      :editData="tableInput.tableEditList"
      :names="tableInput.tableEditName"
      @btnEdit="btnEditSubmit"
    ></table-edit>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="dwmc" :model="dwmc" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content:center;">
            <el-form-item label="点位编号：">
              <el-input v-model="dwmc.dwbh" style="width:150px" @keyup.enter.native="btnDwSearch"></el-input>
            </el-form-item>
            <el-form-item label="点位名称：">
              <el-input v-model="dwmc.dwmc" style="width:150px" @keyup.enter.native="btnDwSearch"></el-input>
            </el-form-item>
            <el-form-item label="点位状态：">
              <el-select
                v-model="dwmc.dwzt"
                placeholder="点位状态"
                style="width:150px"
                @keyup.enter.native="btnDwSearch"
              >
                <template v-for="item in $store.state.enumSelection.dwzt">
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
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column label="点位编号" prop="dwbh" align="center"></el-table-column>
          <el-table-column label="点位名称" prop="dwmc" align="center"></el-table-column>
          <el-table-column label="点位类型" prop="dwlx" align="center">
            <template scope="scope">{{mjzData.dwlx[scope.row.dwlx]}}</template>
          </el-table-column>
          <el-table-column label="运行时间" prop="yxrq" align="center"></el-table-column>
          <el-table-column label="点位状态" prop="dwzt" align="center">
            <template scope="scope">{{mjzData.dwzt[scope.row.dwzt]}}</template>
          </el-table-column>
          <el-table-column label="点位地址" prop="dwdz" align="center"></el-table-column>
          <el-table-column label="点位经度(°)" prop="ddjd" align="center"></el-table-column>
          <el-table-column label="点位纬度(°)" prop="ddwd" align="center"></el-table-column>
          <el-table-column label="车流方向" prop="clfx" align="center">
            <template scope="scope">{{mjzData.clfx[scope.row.clfx]}}</template>
          </el-table-column>
          <el-table-column label="车道数量" prop="cdsl" align="center"></el-table-column>
          <el-table-column label="车道坡度(°)" prop="cdpd" align="center"></el-table-column>
          <el-table-column label="遥测线数" prop="ycxs" align="center"></el-table-column>
          <!-- <el-table-column label="车牌号码" prop="HPHM" align="center"></el-table-column>
          <el-table-column label="装载车型号" prop="CLXH" align="center"></el-table-column>-->
          <el-table-column fixed="right" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button @click="showInformation(scope.row)" type="text" size="small">查看详情</el-button>
              <!-- <el-button type="text" size="small" @click="edit_dw(scope.row )">修改</el-button>
                      <el-button type="text" size="small" @click="add_dw(scope.row)">新增</el-button>
              <el-button type="text" size="small" @click="deleteDw(scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
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
    <information :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information>
  </div>
</template>
<script>
import information from "../../common/informationMuch.vue";
import tableAdd from "../../common/tableAdd.vue";
import tableEdit from "../../common/tableEdit.vue";
import vueScroll from "vuescroll";
export default {
  name: "PointManagement",
  methods: {
    reset() {
      this.dwmc.dwmc = "";
      this.dwmc.dwbh = "";
      this.dwmc.dwzt = "";
    },
    btnDwSearch() {
      this.dwPage.dwbh = this.dwmc.dwbh;
      this.dwPage.pageNum = 1;
      this.yc_page.pageNum = 1;
      this.dwRefresh();
      this.ycRefresh();
    },
    dwRefresh() {
      //刷新 dw表
      let that = this;
      this.$axios
        .get("/serveApi/hbj/point/getPage", {
          //第一个表 点位
          params: {
            dwbh: this.dwmc.dwbh,
            dwmc: this.dwmc.dwmc,
            dwzt: this.dwmc.dwzt,
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "点位运行管理"
          }
        })
        .then(function(data) {
          //console.log(data.data)
          that.tableList = data.data.data.list;
          that.dwPage.total = data.data.data.total;
          // that.dwPage.pageSize = data.data.data.pageSize;
        });
    },
    ycRefresh() {
      //刷新 yc表
      // console.log(this.dwPage.dwbh);
      let that = this;
      this.$axios
        .get("/serveApi/hbj/telemetryLine/getPage", {
          //第二个表 遥测线
          params: {
            dwbh: this.dwPage.dwbh,
            pageNum: this.yc_page.pageNum,
            pageSize: this.yc_page.pageSize,
            sidebar: "点位运行管理"
          }
        })
        .then(function(data) {
          that.tableList_b = data.data.data.list;
          // that.yc_page.pageSize = data.data.data.pageSize;
          that.yc_page.total = data.data.data.total;
        });
    },

    reset_hash(name, data) {
      if (name == "zj") {
        sessionStorage.setItem("sbzj", data.ycxbh);
        location.hash = "/TelemetryEquipmentCalibration";
      } else if (name == "jc") {
        sessionStorage.setItem("sbjc", data.ycxbh);
        location.hash = "/TelemetryEquipmentInspection";
      }
    },
    deleteDw(data) {
      //点位表删除
      let that = this;
      this.$confirm("是否删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          //点击确定
          that.$axios
            .get("/serveApi/hbj/point/delete", {
              params: {
                id: data.id,
                sidebar: "点位运行管理"
              }
            })
            .then(function(data) {
              if (Number(data.data.code) == "1") {
                that.$message({
                  type: "success",
                  message: data.data.msg
                });
                that.dwRefresh();
              } else {
              }
            });
        })
        .catch(ele => {
          that.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    add_dw(row) {
      //点位表新增
      this.dwPage.dw_id = row.id;
      // let arr = [];
      // for (let i in this.table_point) {
      //   let obj = {};
      //   obj.title = i;
      //   obj.title_cn = this.table_point[i];
      //   obj.model = "";
      //   obj.type = "text";
      //   obj.show = true;
      //   arr.push(obj);
      // }
      console.log(this.table_point_input);
      this.tableInput.tableTitle = this.table_point_input;
      this.tableInput.tableAddTitle = "点位表新增";
      this.tableInput.tableAdd = true;
      this.tableInput.tableAddName = "点位";
    },
    edit_dw(row) {
      this.dwPage.dw_id = row.id;
      let arr = [];
      for (let i in this.table_point) {
        let obj = {};
        obj.title = i;
        obj.title_cn = this.table_point[i];
        obj.model = row[i];
        obj.type = "text";
        obj.show = true;
        arr.push(obj);
      }
      this.tableInput.tableEditList = arr;
      this.tableInput.tableEditTitle = "点位表新增";
      this.tableInput.tableEdit = true;
      this.tableInput.tableEditName = "点位";
    },
    add_yc(row) {
      //遥测表新增
      this.dwPage.yc_id = row.id;

      // let arr = [];
      // for (let i in this.table_yc) {
      //   let obj = {};
      //   obj.title = i;
      //   obj.title_cn = this.table_yc[i];

      //   obj.type = "text";
      //   if (i == "dwbh") {
      //     //遥测线编号不允许手动输入
      //     obj.show = false;
      //     obj.model = this.dwPage.dwbh;
      //   } else {
      //     obj.show = true;
      //     obj.model = "";
      //   }
      //   arr.push(obj);
      // }

      this.table_yc_input.forEach(ele => {
        if (ele.title == "dwbh") {
          ele.model = this.dwPage.dwbh;
        }
      });
      this.tableInput.tableTitle = this.table_yc_input;
      this.tableInput.tableAddTitle = "遥测表新增";
      this.tableInput.tableAdd = true;
      this.tableInput.tableAddName = "遥测";
    },
    edit_yc(row) {
      this.dwPage.yc_id = row.id;
      this.dwPage.ycxbh = row.ycxbh;
      let arr = [];
      for (let i in this.table_yc) {
        let obj = {};
        obj.title = i;
        obj.title_cn = this.table_yc[i];
        obj.model = row[i];
        obj.type = "text";
        obj.show = true;
        arr.push(obj);
      }
      this.tableInput.tableEditList = arr;
      this.tableInput.tableEditTitle = "遥测表编辑";
      this.tableInput.tableEdit = true;
      this.tableInput.tableEditName = "遥测";
    },
    delete_yc(data) {
      //遥测线表删除
      let that = this;
      this.$confirm("是否删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          //点击确定
          that.$axios
            .get("/serveApi/hbj/telemetryLine/delete", {
              params: {
                id: data.id,
                sidebar: "点位运行管理"
              }
            })
            .then(function(data) {
              if (Number(data.data.code) == "1") {
                that.$message({
                  type: "success",
                  message: data.data.msg
                });
                that.ycRefresh();
              } else {
              }
            });
        })
        .catch(ele => {
          that.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    btnAddAubmit(data, name) {
      //新增公用
      var obj = {};
      let that = this;
      // console.log(JSON.stringify(data));
      var assing_data = JSON.parse(JSON.stringify(data));
      assing_data.forEach(function(item) {
        obj[item.title] = item.model;
      });

      // data.forEach(element => {
      //   obj[element.title] = element.model;
      // });
      //console.log(JSON.stringify(obj));

      if (name == "点位") {
        this.$axios({
          //删除接口
          method: "post",
          url: "/serveApi/hbj/point/add",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(obj),
          params: { sidebar: "点位运行管理" }
        }).then(function(data) {
          if (data.data.code == 1) {
            that.$message({
              message: data.data.msg,
              type: "success"
            });
            that.dwRefresh();
            that.tableInput.tableAdd = false;
          } else {
            that.$message({
              //出错提示
              message: data.data.msg,
              type: "warning"
            });
          }
        });
      } else {
        this.$axios({
          //删除接口
          method: "post",
          url: "/serveApi/hbj/telemetryLine/add",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(obj),
          params: { sidebar: "点位运行管理" }
        }).then(function(data) {
          if (data.data.code == 1) {
            that.$message({
              message: data.data.msg,
              type: "success"
            });
            that.ycRefresh();
            that.tableInput.tableAdd = false;
          } else {
            that.$message({
              //出错提示
              message: data.data.msg,
              type: "warning"
            });
          }
        });
      }
    },
    btnEditSubmit(data, name) {
      //编辑弹窗
      let obj = {};
      let that = this;
      data.forEach(element => {
        obj[element.title] = element.model;
      });
      obj.id = this.dwPage.dw_id;
      if (name == "点位") {
        this.$axios({
          //删除接口
          method: "post",
          url: "/serveApi/hbj/point/update",
          headers: {
            "Content-Type": "application/json"
          },
          params: { sidebar: "点位运行管理" },
          data: JSON.stringify(obj)
        }).then(function(data) {
          if (data.data.code == 1) {
            that.$message({
              message: data.data.msg,
              type: "success"
            });
            that.dwRefresh();
            that.tableInput.tableEdit = false;
          } else {
            that.$message({
              //出错提示
              message: data.data.msg,
              type: "warning"
            });
          }
        });
      } else {
        this.$axios({
          //删除接口
          method: "post",
          url: "/serveApi/hbj/telemetryLine/update",
          headers: {
            "Content-Type": "application/json"
          },
          params: { sidebar: "点位运行管理" },
          data: JSON.stringify(obj)
        }).then(function(data) {
          if (data.data.code == 1) {
            that.$message({
              message: data.data.msg,
              type: "success"
            });
            that.ycRefresh();
            that.tableInput.tableEdit = false;
          } else {
            that.$message({
              //出错提示
              message: data.data.msg,
              type: "warning"
            });
          }
        });
      }
    },
    closeAdd(data) {
      //关闭弹窗
      if (data == "add") {
        this.tableInput.tableAdd = false;
      } else if (data == "edit") {
        this.tableInput.tableEdit = false;
      }
    },
    handleNodeClick(total, node, vm) {
      //点击树节点
      let that = this;
      if (total.name == "dw") {
        //点击的树状结构是点位
        this.show = true;
        this.dwPage.dwbh = total.clicked;
        this.$axios
          .get("/serveApi/hbj/point/getPage", {
            //第一个表 点位
            params: { dwbh: this.dwPage.dwbh, sidebar: "点位运行管理" }
          })
          .then(function(data) {
            //console.log(data.data)
            that.tableList = data.data.data.list;
          })
          .catch(function(err) {
            that.$message({
              type: "warning",
              message: "请求失败"
            });
          });
        this.$axios
          .get("/serveApi/hbj/telemetryLine/getPage", {
            //第二个表 遥测线
            params: { dwbh: this.dwPage.dwbh, sidebar: "点位运行管理" }
          })
          .then(function(data) {
            //console.log(data.data.data.list)
            that.tableList_b = data.data.data.list;
            //  that.yc_page.pageSize = data.data.data.pageSize;
            that.yc_page.total = data.data.data.total;
          });
      } else if (total.name == "ycx") {
        //点击的树状结构是遥测线
        this.yc_page.ycxbh = total.clicked;
        this.$axios
          .get("/serveApi/hbj/telemetryLine/getPage", {
            //第二个表 遥测线
            params: { ycxbh: this.yc_page.ycxbh, sidebar: "点位运行管理" }
          })
          .then(function(data) {
            that.tableList_b = data.data.data.list;
            //  that.yc_page.pageSize = data.data.data.pageSize;
            that.yc_page.total = data.data.data.total;
          })
          .catch(function(err) {
            that.$message({
              type: "warning",
              message: "请求失败"
            });
          });
      }
    },
    showInformation(row) {
      //点位管理表
      let rowVal = JSON.parse(JSON.stringify(row));
      rowVal.dwlx = this.mjzData.dwlx[rowVal.dwlx];
      rowVal.dwzt = this.mjzData.dwzt[rowVal.dwzt];
      rowVal.clfx = this.mjzData.clfx[rowVal.clfx];
      this.diaSta = true;
      let keys_ = Object.keys(this.table_point);
      let arr = [];
      let that = this;
      keys_.forEach(function(item, index) {
        let obj = {};
        obj.key = that.table_point[item];
        obj.values = rowVal[item];
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
      this.title = "点位信息表详情";
      this.updataData = arrTwo;
    },
    showInformationDsitance(row) {
      //点位遥测信息表
      row.dwlx = this.mjzData.dwlx[row.dwlx];
      row.dwzt = this.mjzData.dwzt[row.dwzt];
      row.clfx = this.mjzData.clfx[row.clfx];
      this.diaSta = true;
      let keys_ = Object.keys(this.table_yc);
      let arr = [];
      let that = this;
      keys_.forEach(function(item, index) {
        let obj = {};
        obj.key = that.table_yc[item];
        obj.values = row[item];
        arr.push(obj);
      });
      this.title = "点位遥测信息表详情";
      this.updataData = arr;
      console.log(arr);
    },

    close() {
      //
      this.diaSta = false;
    },
    dwSizeChange(val) {
      //点位表页码数改变
      let that = this;
      this.dwPage.pageSize = val;
      this.$axios
        .get("/serveApi/hbj/point/getPage", {
          //第一个表 点位
          params: {
            dwbh: this.dwPage.dwbh,
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "点位运行管理"
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
        .get("/serveApi/hbj/point/getPage", {
          //第一个表 点位
          params: {
            dwbh: this.dwPage.dwbh,
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "点位运行管理"
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
    yc_sizeChange(val) {
      //遥测表页码改变
      let that = this;
      this.yc_page.pageSize = val;
      this.$axios
        .get("/serveApi/hbj/telemetryLine/getPage", {
          //第二个表 遥测线
          params: {
            ycxbh: this.yc_page.ycxbh,
            pageNum: this.yc_page.pageNum,
            pageSize: this.yc_page.pageSize,
            sidebar: "点位运行管理"
          }
        })
        .then(function(data) {
          that.tableList_b = data.data.data.list;
          // that.yc_page.pageSize = data.data.data.pageSize;
          that.yc_page.total = data.data.data.total;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },
    yc_currentChange(val) {
      //遥测表点击页码
      let that = this;
      this.yc_page.pageNum = val;
      this.$axios
        .get("/serveApi/hbj/telemetryLine/getPage", {
          //第二个表 遥测线
          params: {
            ycxbh: this.yc_page.ycxbh,
            pageNum: this.yc_page.pageNum,
            pageSize: this.yc_page.pageSize,
            sidebar: "点位运行管理"
          }
        })
        .then(function(data) {
          that.tableList_b = data.data.data.list;
          //   that.yc_page.pageSize = data.data.data.pageSize;
          that.yc_page.total = data.data.data.total;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    }
  },
  data() {
    return {
      mjzData: { dwlx: [], dwzt: [], clfx: [] },
      title: "",
      ops: {
        bar: {
          keepShow: true,
          background: "#5db6f8"
        }
      },
      updataData: [],
      diaSta: false,
      show: false,
      dwmc: {
        dwzt: "",
        dwbh: "",
        dwmc: "",
        site: "",
        beginTime: "",
        endTime: ""
      },
      tableInput: {
        tableAdd: false,
        tableEdit: false,
        tableAddTitle: "",
        tableEditTitle: "",
        tableTitle: [],
        tableEditList: [],
        tableAddName: "",
        tableEditName: ""
      },
      yc_page: {
        pageSize: 10,
        total: 0,
        dwbh: "",
        pageNum: 1,
        yc_input: "",
        dw_id: ""
      },
      dwPage: {
        pageSize: 10,
        total: 0,
        ycxbh: "",
        pageNum: 1,
        dw_input: "",
        yc_id: ""
      },
      table_point: {
        dwbh: "点位编号",
        dwmc: "点位名称",
        dwlx: "点位类型",
        yxrq: "运行日期",
        dwzt: "点位状态",
        dwdz: "点位地址",
        ddjd: "地点经度(°)",
        ddwd: "地点纬度(°)",
        clfx: "车流方向",
        cdsl: "车道数量",
        cdpd: "车道坡度(°)",
        ycxs: "遥测线数",
        hphm: "车牌号码",
        clxh: "装载车型号"
      },
      table_point_input: [
        {
          title: "dwbh",
          title_cn: "点位编号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9]{1,12}$/",
          error_info: "不可为空且最多只能输入12位字符"
        },
        {
          title: "dwmc",
          title_cn: "点位名称",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "dwlx",
          title_cn: "点位类型",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1}$/",
          error_info: "最多只能输入1位数字"
        },
        {
          title: "yxrq",
          title_cn: "运行日期",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "dwzt",
          title_cn: "点位状态",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1}$/",
          error_info: "最多只能输入1位数字"
        },
        {
          title: "dwdz",
          title_cn: "点位地址",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "ddjd",
          title_cn: "地点经度",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1,10}$/",
          error_info: "精确到小数点后1~5位",
          require: true
        },
        {
          title: "ddwd",
          title_cn: "地点纬度",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1,10}$/",
          error_info: "精确到小数点后1~5位"
        },
        {
          title: "clfx",
          title_cn: "车流方向",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1}$/",
          error_info: "最多只能输入1位数字"
        },
        {
          title: "cdsl",
          title_cn: "车道数量",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1,2}$/",
          error_info: "最多只能输入2位数字"
        },
        {
          title: "cdpd",
          title_cn: "车道坡度",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1,3}$/",
          error_info: "最多只能输入3位数字"
        },
        {
          title: "ycxs",
          title_cn: "遥测线数",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^\\s*$|^\\d{1,2}$/",
          error_info: "最多只能输入2位数字"
        },
        {
          title: "hphm",
          title_cn: "车牌号码",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "clxh",
          title_cn: "装载车型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        }
      ],
      table_yc: {
        dwbh: "点位编号",
        ycxbh: "遥测线编号",
        cdxh: "车道序号",
        jcxtxh: "监测系统型号",
        jcxtmc: "监测系统名称",
        jcxtbh: "监测系统编号",
        jcxtzzc: "监测系统制造厂",
        csyxh: "测速仪型号",
        csyscc: "测速仪生产厂",
        csyyxq: "测速仪有效期",
        qtcsyxh: "气体测试仪型号",
        qtcsyscc: "气体测试仪生产厂",
        qtcsyyxq: "气体测试仪有效期",
        ydjxh: "烟度计型号",
        ydjscc: "烟度计生产厂",
        ydjyxq: "烟度计有效期",
        sxxtxh: "摄像系统型号",
        sxxtscc: "摄像系统生产厂",
        sxxtyxq: "摄像系统有效期",
        pdjxh: "坡度计型号",
        pdjscc: "坡度计生产厂",
        pdjyxq: "坡度计有效期",
        qxzxh: "气象计型号",
        qxzscc: "气象站生产厂",
        qxzyxq: "气象站有效期"
      },
      table_yc_input: [
        {
          title: "dwbh",
          title_cn: "点位编号",
          model: "",
          types: "text",
          show: false,
          error_message: false
        },
        {
          title: "ycxbh",
          title_cn: "遥测线编号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9]{1,12}$/",
          error_info: "最多只能输入12位字符"
        },
        {
          title: "cdxh",
          title_cn: "车道序号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9]{1,6}$/",
          error_info: "最多只能输入6位字符"
        },
        {
          title: "jcxtxh",
          title_cn: "监测系统型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "jcxtmc",
          title_cn: "监测系统名称",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "jcxtbh",
          title_cn: "监测系统编号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "jcxtzzc",
          title_cn: "监测系统制造厂",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "csyxh",
          title_cn: "测速仪型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "csyscc",
          title_cn: "测速仪生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "csyyxq",
          title_cn: "测速仪有效期",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "qtcsyxh",
          title_cn: "气体测试仪型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "qtcsyscc",
          title_cn: "气体测试仪生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "qtcsyyxq",
          title_cn: "气体测试仪有效期",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "ydjxh",
          title_cn: "烟度计型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "ydjscc",
          title_cn: "烟度计生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "ydjyxq",
          title_cn: "烟度计有效期",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "sxxtxh",
          title_cn: "摄像系统型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "sxxtscc",
          title_cn: "摄像系统生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "sxxtyxq",
          title_cn: "摄像系统有效期",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "pdjxh",
          title_cn: "坡度计型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "pdjscc",
          title_cn: "坡度计生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "pdjyxq",
          title_cn: "坡度计有效期",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "qxzxh",
          title_cn: "气象计型号",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "qxzscc",
          title_cn: "气象站生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false
        },
        {
          title: "qxzyxq",
          title_cn: "气象站有效期",
          model: "",
          types: "text",
          show: true,
          error_message: false
        }
      ],
      tableList: [],
      tableList_b: [],
      dataTree: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    const loadingObj = this.$loading({
      lock: true,
      text: "数据加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
      target: document.querySelector(".submit-test-dialog")
    });
    let that = this;
    this.$axios
      .get("/serveApi/hbj/point/getTree", {
        //侧边树菜单
        params: {
          sidebar: "点位管理"
        }
      })
      .then(function(data) {
        that.dataTree = data.data.data;
      })
      .catch(function(err) {
        loadingObj.close();
        that.$message({
          type: "warning",
          message: "请求失败"
        });
      });
    this.$axios
      .get("/serveApi/hbj/point/getPage", {
        params: {
          sidebar: "点位管理",
          dwbh: this.dwmc.dwbh,
          dwmc: this.dwmc.dwmc
        }
        //右侧首个表格
      })
      .then(function(data) {
        loadingObj.close();
        that.tableList = data.data.data.list;
        that.dwPage.total = data.data.data.total;
        //   that.dwPage.pageSize = data.data.data.pageSize;
      });

    this.$axios({
      method: "post",
      url: "/serveApi/hbj/enum/select",
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "DWLX" },
      params: { sidebar: "点位管理" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.mjzData.dwlx = obj;
    });
    this.$axios({
      //
      method: "post",
      url: "/serveApi/hbj/enum/select",
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "DWZT" },
      params: { sidebar: "点位管理" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.mjzData.dwzt = obj;
    });
    this.$axios({
      //
      method: "post",
      url: "/serveApi/hbj/enum/select",
      headers: {
        "Content-Type": "application/json"
      },
      data: { lx: "CLFX" },
      params: { sidebar: "点位管理" }
    }).then(function(res) {
      let obj = {};
      for (let i = 0; i < res.data.data.length; i++) {
        obj[res.data.data[i].sz] = res.data.data[i].xmnr;
      }
      that.mjzData.clfx = obj;
    });
  },
  mounted() {},
  components: { information, tableAdd, tableEdit, vueScroll }
};
</script>
<style scoped>
.el-dialog__body {
  background-color: #f0f0f0;
}
</style>

