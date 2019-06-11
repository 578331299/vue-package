<template>
  <div class="content_box" style="width:100%;height:100%;">
    <table-add
      @dialogClose="closeAdd('add')"
      :diaSta="tableInput.tableAdd"
      :title="tableInput.tableAddTitle"
      :updata="tableInput.tableTitle"
      :names="tableInput.tableAddName"
      @btnAdd="btnAddSubmit"
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
              <el-input v-model="dwmc.site" style="width:150px" @keyup.enter.native="btnDwSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;">
            <div class="button_box">
              <el-button type="primary" @click="btnDwSearch">查询</el-button>
              <el-button type="primary" @click="addDw">点位新增</el-button>
              <el-button type="primary" @click="addYc">遥测线新增</el-button>
              <el-button type="primary" @click="reset" style="margin-left:15px;">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:auto;min-height:700px;margin-bottom:0;"
    >
      <vue-scroll :ops="ops">
        <div>
          <el-row>
            <el-col :span="2">
              <el-tree
                :data="dataTree"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :default-expand-all="false"
              ></el-tree>
            </el-col>
            <el-col :span="22" style="height:550px">
              <div class="table_pg_a" style="margin-right:20px">
                <el-table border="border" :data="tableList">
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
                      <el-button type="text" size="small" @click="editDw(scope.row )">编辑</el-button>

                      <el-button type="text" size="small" @click="deleteDw(scope.row)">删除</el-button>
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
                  style="margin-top:20px;"
                ></el-pagination>
              </div>

              <div class="table_pg_b" style="margin-top:150px;margin-right:20px" v-show="show">
                <el-table border="border" :data="tableList_b">
                  <!-- <el-table-column type="selection" align="center"></el-table-column> -->
                  <el-table-column label="点位名称" prop="dwbh" align="center"></el-table-column>
                  <el-table-column label="遥测线编号" prop="ycxbh" align="center"></el-table-column>
                  <el-table-column label="车道序号" prop="cdxh" align="center"></el-table-column>
                  <el-table-column label="检测系统型号" prop="jcxtxh" align="center"></el-table-column>
                  <el-table-column label="监测系统名称" prop="jcxtmc" align="center"></el-table-column>
                  <el-table-column label="监测系统编号" prop="jcxtbh" align="center"></el-table-column>
                  <el-table-column label="监测系统制造厂" prop="jcxtzzc" align="center"></el-table-column>
                  <el-table-column label="测速仪型号" prop="csyxh" align="center"></el-table-column>
                  <el-table-column label="测速仪生产厂" prop="csyscc" align="center"></el-table-column>
                  <el-table-column label="测速仪有效期" prop="csyyxq" align="center"></el-table-column>
                  <el-table-column label="烟度计型号" prop="ydjxh" align="center"></el-table-column>
                  <el-table-column label="烟度计生产厂" prop="ydjscc" align="center"></el-table-column>
                  <!-- <el-table-column label="烟度计有效期" prop="YDJYXQ" align="center"></el-table-column> -->
                  <!-- <el-table-column label="新增" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="addYc(scope.row)">新增</el-button>
                    </template>
                  </el-table-column>-->
                  <el-table-column fixed="right" label="操作" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click="showInformationDsitance(scope.row)"
                        type="text"
                        size="small"
                      >查看详情</el-button>
                      <el-button type="text" size="small" @click="editYc(scope.row)">编辑</el-button>
                      <el-button type="text" size="small" @click="deleteYc(scope.row)">删除</el-button>
                      <!-- <el-button type="text" size="small" @click="resetHash('jc',scope.row)">检查</el-button> -->
                      <el-button type="text" size="small" @click="resetHash('zj',scope.row)">自检</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="ycSizeChange"
                  @current-change="ycCurrentChange"
                  :current-page="ycPage.pageNum"
                  :page-sizes="[10, 20, 30]"
                  :page-size="ycPage.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="ycPage.total"
                  style="margin-top:20px;"
                ></el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>
      </vue-scroll>
    </div>
    <information :title="title" :diaSta="diaSta" @dialogClose="close" :updataData="updataData"></information>
  </div>
</template>
<script>
import information from "../../common/informationMuch.vue";
import tableAdd from "../../common/point/tableAdd.vue";
import tableEdit from "../../common/point/tableEdit.vue";
import vueScroll from "vuescroll";
export default {
  name: "PointManagement",
  methods: {
    reset() {
      this.dwmc.site = "";
    },
    /**
     * @description 还原搜索状态
     * @author B51733
     * @version 2019.5.27
     */
    btnDwSearch() {
      this.dwPage.dwbh = this.dwmc.site;
      this.dwPage.pageNum = 1;
      this.ycPage.pageNum = 1;
      this.dwRefresh();
      this.ycRefresh();
    },

    /**
     * @description 点位表刷新
     * @author B51733
     * @version 2019.5.27
     */
    dwRefresh() {
      //刷新 dw表
      let that = this;
      this.$axios
        .get("/serveApi/hbj/point/getPage", {
          //第一个表 点位
          params: {
            dwbh: this.dwPage.dwbh,
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "点位管理"
          }
        })
        .then(function(data) {
          //console.log(data.data)
          that.tableList = data.data.data.list;
          that.dwPage.total = data.data.data.total;
          // that.dwPage.pageSize = data.data.data.pageSize;
        });
    },
    /**
     * @description 遥测线表刷新
     * @author B51733
     * @version 2019.5.27
     */
    ycRefresh() {
      //刷新 yc表
      // console.log(this.dwPage.dwbh);
      let that = this;
      this.$axios
        .get("/serveApi/hbj/telemetryLine/getPage", {
          //第二个表 遥测线
          params: {
            dwbh: this.dwPage.dwbh,
            pageNum: this.ycPage.pageNum,
            pageSize: this.ycPage.pageSize,
            sidebar: "点位管理"
          }
        })
        .then(function(data) {
          that.tableList_b = data.data.data.list;
          // that.ycPage.pageSize = data.data.data.pageSize;
          that.ycPage.total = data.data.data.total;
        });
    },

    resetHash(name, data) {
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
                sidebar: "点位管理"
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
    /**
     * @description 点位表新增
     * @author B51733
     * @version 2019.5.27
     */
    addDw(row) {
      //点位表新增
      this.dwPage.dw_id = row.id;
      let table_point_input2 = JSON.parse(
        JSON.stringify(this.table_point_input)
      );
      this.tableInput.tableTitle = table_point_input2;
      this.tableInput.tableAddTitle = "点位表新增";
      this.tableInput.tableAdd = true;
      this.tableInput.tableAddName = "点位";
    },
    editDw(row) {
      this.dwPage.dw_id = row.id;
      let that = this;
      let arr = JSON.parse(JSON.stringify(this.table_point_input));
      arr.forEach(ele => {
        if (row[ele.title]!=null) {
          ele.model = row[ele.title].toString();
        } else {
          ele.model = row[ele.title];
        }
      });
      this.tableInput.tableEditList = arr;
      this.tableInput.tableEditTitle = "点位表编辑";
      this.tableInput.tableEdit = true;
      this.tableInput.tableEditName = "点位";
    },
    /**
     * @description 遥测线表新增
     * @author B51733
     * @version 2019.5.27
     */
    addYc(row) {
      //遥测表新增
      this.ycPage.yc_id = row.id;

      let table_yc_input2 = JSON.parse(JSON.stringify(this.table_yc_input));
      table_yc_input2.forEach(ele => {
        if (ele.title == "dwbh") {
          ele.model = this.dwPage.dwbh;
        }
      });
      this.tableInput.tableTitle = table_yc_input2;
      this.tableInput.tableAddTitle = "遥测表新增";
      this.tableInput.tableAdd = true;
      this.tableInput.tableAddName = "遥测";
    },
    editYc(row) {
      this.ycPage.yc_id = row.id;
      this.ycPage.ycxbh = row.ycxbh;
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
    deleteYc(data) {
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
                sidebar: "点位管理"
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
    btnAddSubmit(data, name) {
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
      // console.log(JSON.stringify(obj));

      if (name == "点位") {
        this.$axios({
          //删除接口
          method: "post",
          url: "/serveApi/hbj/point/add",
          params: {
            sidebar: "点位管理"
          },
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(obj)
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
          params: {
            sidebar: "点位管理"
          },
          data: JSON.stringify(obj)
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

      if (name == "点位") {
        obj.id = this.dwPage.dw_id;
        this.$axios({
          //删除接口
          method: "post",
          url: "/serveApi/hbj/point/update",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            sidebar: "点位管理"
          },
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
        }).catch(err=>{
          that.$message({type:"warning",message:err})
        })
      } else {
        obj.id = this.ycPage.yc_id;
        this.$axios({
          //删除接口
          method: "post",
          url: "/serveApi/hbj/telemetryLine/update",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            sidebar: "点位管理"
          },
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
        }).catch(err=>{
          that.$message({type:"warning",message:err})
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
            params: { dwbh: this.dwPage.dwbh, sidebar: "点位管理" }
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
            params: { dwbh: this.dwPage.dwbh, sidebar: "点位管理" }
          })
          .then(function(data) {
            //console.log(data.data.data.list)
            that.tableList_b = data.data.data.list;
            //  that.ycPage.pageSize = data.data.data.pageSize;
            that.ycPage.total = data.data.data.total;
          });
      } else if (total.name == "ycx") {
        //点击的树状结构是遥测线
        this.ycPage.ycxbh = total.clicked;
        this.$axios
          .get("/serveApi/hbj/telemetryLine/getPage", {
            //第二个表 遥测线
            params: { ycxbh: this.ycPage.ycxbh, sidebar: "点位管理" }
          })
          .then(function(data) {
            that.tableList_b = data.data.data.list;
            //  that.ycPage.pageSize = data.data.data.pageSize;
            that.ycPage.total = data.data.data.total;
          })
          .catch(function(err) {
            that.$message({
              type: "warning",
              message: "请求失败"
            });
          });
      }
    },
    /**
     * @description 点位表查看详情
     * @author B51733
     * @version 2019.5.27
     */
    showInformation(row) {
      //点位管理表
      let showRow = JSON.parse(JSON.stringify(row));
      showRow.dwlx = this.mjzData.dwlx[showRow.dwlx];
      showRow.dwzt = this.mjzData.dwzt[showRow.dwzt];
      showRow.clfx = this.mjzData.clfx[showRow.clfx];
      this.diaSta = true;
      let keys_ = Object.keys(this.table_point);
      let arr = [];
      let that = this;

      keys_.forEach(function(item, index) {
        let obj = {};
        obj.key = that.table_point[item];
        obj.values = showRow[item];
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
    /**
     * @description 遥测线表查看详情
     * @author B51733
     * @version 2019.5.27
     */
    showInformationDsitance(row) {
      //点位遥测信息表
      let showRow = JSON.parse(JSON.stringify(row));
      showRow.dwlx = this.mjzData.dwlx[showRow.dwlx];
      showRow.dwzt = this.mjzData.dwzt[showRow.dwzt];
      showRow.clfx = this.mjzData.clfx[showRow.clfx];
      this.diaSta = true;
      let keys_ = Object.keys(this.table_yc);
      let arr = [];
      let that = this;
      keys_.forEach(function(item, index) {
        let obj = {};
        obj.key = that.table_yc[item];
        obj.values = showRow[item];
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
      this.title = "点位遥测信息表详情";
      this.updataData = arrTwo;
      // console.log(arr);
    },

    close() {
      //
      this.diaSta = false;
    },
    /**
     * @description 点位表切换每页条数
     * @author B51733
     * @version 2019.5.27
     */
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
            sidebar: "点位管理"
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
    /**
     * @description 点位表切换页码
     * @author B51733
     * @version 2019.5.27
     */
    dwCurrentChange(val) {
      //点位表点击页码
      let that = this;
      this.dwPage.pageNum = val;
      this.$axios
        .get("/serveApi/hbj/point/getPage", {
          //第一个表 点位
          params: {
            dwbh: this.dwPage.dwbh,
            pageNum: this.dwPage.pageNum,
            pageSize: this.dwPage.pageSize,
            sidebar: "点位管理"
          }
        })
        .then(function(data) {
          //console.log(data.data)
          that.tableList = data.data.data.list;
          console.log(JSON.stringify(that.tableEdit));
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
    /**
     * @description 遥测线表切换每页条数
     * @author B51733
     * @version 2019.5.27
     */
    ycSizeChange(val) {
      //遥测表页码改变
      let that = this;
      this.ycPage.pageSize = val;
      this.$axios
        .get("/serveApi/hbj/telemetryLine/getPage", {
          //第二个表 遥测线
          params: {
            ycxbh: this.ycPage.ycxbh,
            pageNum: this.ycPage.pageNum,
            pageSize: this.ycPage.pageSize,
            sidebar: "点位管理"
          }
        })
        .then(function(data) {
          that.tableList_b = data.data.data.list;
          that.ycPage.total = data.data.data.total;
        })
        .catch(function(err) {
          that.$message({
            type: "warning",
            message: "请求失败"
          });
        });
    },
    /**
     * @description 遥测线表切换页码
     * @author B51733
     * @version 2019.5.27
     */
    ycCurrentChange(val) {
      let that = this;
      this.ycPage.pageNum = val;
      this.$axios
        .get("/serveApi/hbj/telemetryLine/getPage", {
          //第二个表 遥测线
          params: {
            ycxbh: this.ycPage.ycxbh,
            pageNum: this.ycPage.pageNum,
            pageSize: this.ycPage.pageSize,
            sidebar: "点位管理"
          }
        })
        .then(function(data) {
          that.tableList_b = data.data.data.list;
          that.ycPage.total = data.data.data.total;
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
      ycPage: {
        pageSize: 10,
        total: 0,
        ycxbh: "",
        pageNum: 1,
        yc_input: "",
        yc_id: ""
      },
      dwPage: {
        pageSize: 10,
        total: 0,
        dwbh: "",
        pageNum: 1,
        dw_input: "",
        dw_id: ""
      },
      table_point: {
        dwbh: "点位编号",
        dwmc: "点位名称",
        dwlx: "点位类型",
        yxrq: "运行日期",
        dwzt: "点位状态",
        dwdz: "点位地址",
        ddjd: "点位经度(°)",
        ddwd: "点位纬度(°)",
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
          placeholder: "不可为空且最多只能输入12位字符",
          error_info: "不可为空且最多只能输入12位数字或字母",
          showMark: true
        },
        {
          title: "dwmc",
          title_cn: "点位名称",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9\u4e00-\u9fa5]{1,25}$/",
          error_info: "最多只能输入25位数字或字母",
          showMark: true
        },
        {
          select: true,
          model: "",
          show: true,
          error_message: false,
          select_name: "dwlx",
          title: "dwlx",
          title_cn: "点位类型"
        },
        {
          title: "yxrq",
          title_cn: "运行日期",
          model: "",
          time: true,
          show: true,
          error_message: false
        },
        {
          select: true,
          model: "",
          show: true,
          error_message: false,
          select_name: "dwzt",
          title: "dwzt",
          title_cn: "点位状态"
        },
        {
          title: "dwdz",
          title_cn: "点位地址",
          model: "",
          types: "textarea",

          show: true,
          rules: "/^[a-zA-Z0-9\u4E00-\u9FA5]{0,100}$/",
          error_info: "最多输入100汉字"
        },
        {
          title: "ddjd",
          title_cn: "地点经度(°)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{1,3}.[0-9]{1,5}$/",
          error_info: "请输入合法经度(最多精确到小数点后五位)",
          require: true,
          showMark: true
        },
        {
          title: "ddwd",
          title_cn: "地点纬度(°)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{1,3}.[0-9]{1,5}$/",
          error_info: "请输入合法纬度(最多精确到小数点后五位)",
          showMark: true
        },
        {
          select: true,
          model: "",
          show: true,
          error_message: false,
          select_name: "clfx",
          title: "clfx",
          title_cn: "车流方向"
        },
        {
          title: "cdsl",
          title_cn: "车道数量",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{1,2}$/",
          error_info: "非空最多只能输入2位数字",
          showMark: true
        },
        {
          title: "cdpd",
          title_cn: "车道坡度(°)",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{0,3}\\.{0,1}[0-9]{1,2}$/",
          error_info: "非空最多可到小数点后两位",
          showMark: true
        },
        {
          title: "ycxs",
          title_cn: "遥测线数",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9]{1,2}$/",
          error_info: "非空最多只能输入2位数字",
          showMark: true,
          disabled: false
        },
        {
          title: "hphm",
          title_cn: "车牌号码",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,8}$/",
          error_info: "请输入合法车牌号"
        },
        {
          title: "clxh",
          title_cn: "装载车型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,100}$/",
          error_info: "最多输入50个字符"
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
          show: true,
          error_message: false,
          specialType: true,
          data: []
        },
        {
          title: "ycxbh",
          title_cn: "遥测线编号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9]{1,2}$/",
          error_info: "最多只能输入2位字符",
          showMark: true
        },
        {
          title: "cdxh",
          title_cn: "车道序号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[a-zA-Z0-9]{1,6}$/",
          error_info: "最多只能输入6位字符",
          showMark: true
        },
        {
          title: "jcxtxh",
          title_cn: "监测系统型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "jcxtmc",
          title_cn: "监测系统名称",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "jcxtbh",
          title_cn: "监测系统编号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "jcxtzzc",
          title_cn: "监测系统制造厂",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "csyxh",
          title_cn: "测速仪型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "csyscc",
          title_cn: "测速仪生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "csyyxq",
          title_cn: "测速仪有效期",
          model: "",
          time: true,
          show: true,
          error_message: false
        },
        {
          title: "qtcsyyxq",
          title_cn: "气体测试仪有效期",
          model: "",
          time: true,
          show: true,
          error_message: false
        },
        {
          title: "qtcsyxh",
          title_cn: "气体测试仪型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "qtcsyscc",
          title_cn: "气体测试仪生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "qtcsyyxq",
          title_cn: "气体测速仪有效期",
          model: "",
          time: true,
          show: true,
          error_message: false
        },
        {
          title: "ydjxh",
          title_cn: "烟度计型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          types: "text",
          title: "ydjscc",
          title_cn: "烟度计生产厂",
          model: "",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "ydjyxq",
          title_cn: "烟度计有效期",
          model: "",
          time: true,
          show: true,
          error_message: false
        },
        {
          title: "sxxtxh",
          title_cn: "摄像系统型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "sxxtscc",
          title_cn: "摄像系统生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "sxxtyxq",
          title_cn: "摄像系统有效期",
          model: "",
          time: true,
          show: true,
          error_message: false
        },
        {
          title: "pdjxh",
          title_cn: "坡度计型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "pdjscc",
          title_cn: "坡度计生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "pdjyxq",
          title_cn: "坡度计有效期",
          model: "",
          time: true,
          show: true,
          error_message: false
        },
        {
          title: "qxzxh",
          title_cn: "气象计型号",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
        },
        {
          title: "qxzscc",
          title_cn: "气象站生产厂",
          model: "",
          types: "text",
          show: true,
          error_message: false,
          rules: "/^[0-9a-zA-z\u4E00-\u9FA5]{0,50}$/",
          error_info: "最多输入25个字符"
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
  /**
   * @description 初始化加载侧边树及请求表格信息
   * @author B51733
   * @version 2019.5.27
   */
  created() {
    let that = this; //枚举值类型
    this.$axios("/serveApi/hbj/point/getEm?sidebar=点位管理").then(function(
      res
    ) {
      that.table_yc_input[0].data = res.data.data;
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

    const loadingObj = this.$loading({
      lock: true,
      text: "数据加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
      target: document.querySelector(".submit-test-dialog")
    });
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
          sidebar: "点位管理"
        }
        //右侧首个表格
      })
      .then(function(data) {
        loadingObj.close();
        that.tableList = data.data.data.list;
        that.dwPage.total = data.data.data.total;
        //   that.dwPage.pageSize = data.data.data.pageSize;
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

