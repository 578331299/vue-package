<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="16" style="display:flex;justify-content: flex-end;align-item:center">
            <el-form-item label="车牌号码码">
              <el-input v-model="formTrafficFlowAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="起始时间">
              <el-date-picker v-model="formTrafficFlowAnalysis.startTime" style="width:150px"></el-date-picker>
            </el-form-item>
             <el-form-item label="结束时间">
              <el-date-picker v-model="formTrafficFlowAnalysis.endTime" style="width:150px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="display:flex;justify-content: center;align-item:center">
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">新增</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="chare_box" style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;">
      <el-table :data="tableData" border style="width: 100%;margin-top:20px;" max-height="500px">
        <el-table-column type="selection"></el-table-column>
        <el-table-column  prop="prop1" label="编号" width="120"  align="center"></el-table-column>
        <el-table-column prop="prop2" label="检测时间" width="140" align="center"></el-table-column>
        <el-table-column prop="prop3" label="车牌号码码" width="120" align="center"></el-table-column>
        <el-table-column prop="prop4" label="车牌颜色" width="120" align="center"></el-table-column>
        <el-table-column prop="prop5" label="年份" width="120" align="center"></el-table-column>
        <el-table-column prop="prop6" label="车主" width="120" align="center"></el-table-column>
        <el-table-column prop="prop7" label="地址" width="120" align="center"></el-table-column>
        <el-table-column prop="prop8" label="联系电话" width="120" align="center"></el-table-column>
        <el-table-column prop="prop9" label="co2(%)" width="120" align="center"></el-table-column>
        <el-table-column prop="prop10" label="co(%)" width="120" align="center"></el-table-column>
        <el-table-column prop="prop11" label="HC(ppm)" width="120" align="center"></el-table-column>
        <el-table-column prop="prop12" label="NO(ppm)" width="120" align="center"></el-table-column>
        <el-table-column prop="prop13" label="不透光度(%)" width="120" align="center"></el-table-column>
        <el-table-column prop="prop14" label="光吸收系数(m-1)" width="120" align="center"></el-table-column>
        <el-table-column  label="操作" width="300">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button> -->
            <el-button type="text" size="small">整改告知书</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <img src="../../assets/img/遥测处罚管理.jpg"> -->
  </div>
</template>
  </div>
</template>

<script>
export default {
  name: "TelemetryPunishmentManagement",
 
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
       formTrafficFlowAnalysis:{site:"",startTime:"",endTime:""},
      tableData: [
        {
          prop1: "2050822",
          prop2: "2017-5-12 2:50:09",
          prop3: "陕A10086",
          prop4: "蓝",
          prop5: "2016",
          prop6: "张三",
          prop7: "陕西省西安市西三环",
          prop8: "13023567897",
          prop9: "15.03",
          prop10: "0.04",
          prop11: "5",
          prop12: "4470.42",
          prop13: "5",
          prop14: "0.51"
        },
        {
          prop1: "2050822",
          prop2: "2017-5-12 2:50:09",
          prop3: "陕A10086",
          prop4: "蓝",
          prop5: "2016",
          prop6: "张三",
          prop7: "陕西省西安市西三环",
          prop8: "13023567897",
          prop9: "15.03",
          prop10: "0.04",
          prop11: "5",
          prop12: "4470.42",
          prop13: "5",
          prop14: "0.51"
        }
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

