<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="16" style="display:flex;justify-content: center;align-item:center">
            <el-form-item label="名称">
              <el-input v-model="formTrafficFlowAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="环保类型">
              <el-input v-model="formTrafficFlowAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="维护时间">
              <el-input v-model="formTrafficFlowAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="display:flex;justify-content: flex-start;">
            <div class="button_box">
              <el-button type="primary">查询</el-button>
              <el-button type="primary">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;height:600px;overflow-y:auto"
    >
      <template>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px;" min-height="500px">
          <el-table-column type="selection"></el-table-column>
          <el-table-column  prop="prop1" label="名称" align="center"></el-table-column>
          <el-table-column prop="prop2" label="单位" align="center"></el-table-column>
          <el-table-column prop="prop3" label="燃烧方式" align="center"></el-table-column>
          <el-table-column prop="prop4" label="燃油类型" align="center"></el-table-column>
          <el-table-column prop="prop5" label="上限" align="center"></el-table-column>
          <el-table-column prop="prop6" label="下值" align="center"></el-table-column>
          <el-table-column prop="prop7" label="启停用" align="center"></el-table-column>
          <el-table-column prop="prop8" label="备注" align="center"></el-table-column>
          <el-table-column prop="prop9" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="prop10" label="更改时间" align="center"></el-table-column>
          <el-table-column prop="prop11" label="维护人员" align="center"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
  </div>
</template>

<script>
export default {
  name: "DataDictionaryManagement",
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      formTrafficFlowAnalysis: { site: "" },
      tableData: [
{"prop1":"CO","prop4":"汽油","prop3":"点燃式","prop2":"%","prop5":"3","prop6":"","prop7":"启用","prop8":"超标车排放限值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"NO","prop4":"汽油","prop3":"点燃式","prop2":"","prop5":"2000x10-6","prop6":"","prop7":"启用","prop8":"超标车排放限值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"HC","prop4":"汽油","prop3":"点燃式","prop2":"/","prop5":"/","prop6":"","prop7":"启用","prop8":"超标车排放限值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"不透光度","prop4":"汽油","prop3":"点燃式","prop2":"%","prop5":"25","prop6":"","prop7":"启用","prop8":"超标车排放限值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"NO","prop4":"汽油","prop3":"点燃式","prop2":"/","prop5":"/","prop6":"","prop7":"启用","prop8":"超标车排放限值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"CO","prop4":"汽油","prop3":"点燃式","prop2":"%","prop5":"2","prop6":"","prop7":"停用","prop8":"高排放车辆筛查参考值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"NO","prop4":"汽油","prop3":"点燃式","prop2":"","prop5":"1000x10-6","prop6":"","prop7":"停用","prop8":"高排放车辆筛查参考值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"HC","prop4":"汽油","prop3":"点燃式","prop2":"/","prop5":"/","prop6":"","prop7":"停用","prop8":"高排放车辆筛查参考值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"不透光度","prop4":"汽油","prop3":"点燃式","prop2":"%","prop5":"15","prop6":"","prop7":"停用","prop8":"高排放车辆筛查参考值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"NO","prop4":"汽油","prop3":"点燃式","prop2":"/","prop5":"/","prop6":"","prop7":"停用","prop8":"高排放车辆筛查参考值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"不透光","prop4":"柴油","prop3":"压燃式","prop2":"%","prop5":"30","prop6":"","prop7":"启用","prop8":"超标车排放限值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"林格曼黑度","prop4":"柴油","prop3":"压燃式","prop2":"级","prop5":"","prop6":"1","prop7":"启用","prop8":"超标车排放限值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"NO","prop4":"柴油","prop3":"压燃式","prop2":"","prop5":"1500x10-6","prop6":"","prop7":"启用","prop8":"高排放车辆筛查参考值","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"湿度","prop4":"","prop3":"","prop2":"℃","prop5":"50","prop6":"-10","prop7":"启用","prop8":"固定式遥测设备环境要求","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"相对湿度","prop4":"","prop3":"","prop2":"%","prop5":"95","prop6":"5","prop7":"启用","prop8":"固定式遥测设备环境要求","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"坡度角度","prop4":"","prop3":"","prop2":"°","prop5":"15","prop6":"-15","prop7":"启用","prop8":"固定式遥测设备环境要求","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},
{"prop1":"风速","prop4":"","prop3":"","prop2":"m/s","prop5":"5","prop6":"0","prop7":"启用","prop8":"固定式遥测设备环境要求","prop9":"2019-3-18 12:12:12","prop10":"2019-3-18 12:12:12","prop11":"张三"},

]
    };
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

