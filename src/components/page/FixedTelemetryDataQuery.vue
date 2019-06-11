<template>
  <div class="content_box">
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form
        red="formExhaustTelemetryManagement"
        :model="formExhaustTelemetryManagement"
        :inline="true"
      >
        <el-row>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="车牌号码：">
              <el-input v-model="formExhaustTelemetryManagement.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="display:flex;justify-content: flex-start;">
            <el-form-item label="检测结果：">
              <el-input v-model="formExhaustTelemetryManagement.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: flex-start;">
            <el-form-item label="起始时间：" style="margin-right:15px">
              <el-date-picker v-model="formExhaustTelemetryManagement.startTime" class="time-input"></el-date-picker>
            </el-form-item>
            <el-form-item label=" - 结束时间：">
              <el-date-picker v-model="formExhaustTelemetryManagement.endTime" class="time-input"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button-div">
      <el-button type="primary" round>更多查询</el-button>
      <el-button type="primary" round>查询</el-button>
      <el-button type="primary" round>重置</el-button>
      <el-button type="primary" round>审核</el-button>
      <el-button type="primary" round>导出</el-button>
      <el-button type="primary" round>打印</el-button>
    </div>
    <div
      class="chare_box"
      style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;"
    >
      <el-table
        :data="formExhaustTelemetryManagementTable"
        border
        style="margin-top:20px;"
        max-height="500px"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column fixed prop="number" label="系统编号" align="center" width="120"></el-table-column>
        <el-table-column prop="roadNumber" label="车道号" align="center" width="120"></el-table-column>
        <el-table-column prop="pastTime" label="通过时间" align="center" width="120"></el-table-column>
        <el-table-column prop="carNumber" label="车牌号码" align="center" width="120"></el-table-column>
        <!--<el-table-column prop="address" label="地址" align="center" width="120"></el-table-column>-->
        <el-table-column prop="carColor" label="车牌颜色" align="center" width="120"></el-table-column>
        <el-table-column prop="speed" label="速度" align="center" width="120"></el-table-column>
        <el-table-column prop="testingResult" align="center" label="检测结果" width="120"></el-table-column>
        <el-table-column prop="CO2" label="CO2(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="CO" label="CO(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="HC" label="HC(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="NO" label="NO(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="lighttight" label="不透光烟度" align="center" width="120"></el-table-column>
        <el-table-column prop="opticalAbsorption" label="光吸收系数" align="center" width="120"></el-table-column>
        <el-table-column prop="windSpeen" label="风速(m/s)" align="center" width="120"></el-table-column>
        <el-table-column prop="windSense" label="风向(0)" align="center" width="120"></el-table-column>
        <el-table-column prop="airTEmperture" label="气温(0C)" align="center" width="120"></el-table-column>
        <el-table-column prop="humidity" label="湿度(%)" align="center" width="120"></el-table-column>
        <el-table-column prop="airPressure" label="气压(hPa)" align="center" width="120"></el-table-column>
        <el-table-column prop="internationalStandard" align="center" label="国标等级" width="120"></el-table-column>
        <el-table-column prop="VSP" label="VSP(0·12)" align="center" width="120"></el-table-column>
        <el-table-column prop="auditResult" label="审核结果" align="center" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
            <el-button type="text" size="small">检验结果告知书</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="position: absolute; bottom:10px;right: 20px;"
      ></el-pagination>
    </div>
    <!--<img src="../../assets/img/guyaoce.png">-->
    <img src="../../assets/img/xiang.png">
  </div>
</template>

<script>
export default {
  name: "FixedTelemetryDataQuery",
  data() {
    return {
      formExhaustTelemetryManagement: {},
      formExhaustTelemetryManagementTable: [
        {
          number: "20180212",
          roadNumber: 12,
          pastTime: "2018-12-12",
          carNumber: "陕A215632",
          address: "陕西商洛",
          carColor: "黄色",
          speed: "12",
          testingResult: "超标",
          CO2: "1",
          CO: "2",
          HC: "3",
          NO: "1",
          lighttight: "22",
          opticalAbsorption: "23",
          windSpeen: "2",
          windSense: "23",
          airTEmperture: "23",
          humidity: "1",
          airPressure: "23",
          internationalStandard: "12",
          VSP: "3",
          auditResult: "超标"
        }
      ]
    };
  },
  methods:{
   handleSizeChange(){}
  }
};
</script>
<style scoped>
.button-div {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>