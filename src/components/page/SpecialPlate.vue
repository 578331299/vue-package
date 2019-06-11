<template>
  <div>
    <div class="chare_box" style="height:auto ;padding-bottom:2px;padding-left:20px;">
      <el-form red="formTrafficFlowAnalysis" :model="formTrafficFlowAnalysis" :inline="true">
        <el-row>
          <el-col :span="12" style="display:flex;justify-content: flex-end;align-item:center">
            <el-form-item label="车牌号码">
              <el-input v-model="formTrafficFlowAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="车牌颜色">
              <el-input v-model="formTrafficFlowAnalysis.site" style="width:150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="display:flex;justify-content: center;align-item:center">
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="chare_box" style="padding-left:20px;padding-right:20px;margin-top:30px;position:relative;">
      <template>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px;" max-height="500px">
          <el-table-column type="selection"></el-table-column>
          <el-table-column fixed prop="date" label="序号"  align="center"></el-table-column>
          <el-table-column prop="name" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="province" label="车牌颜色" align="center"></el-table-column>
          <el-table-column prop="city" label="登记时间" align="center"></el-table-column>
          <el-table-column prop="address" label="登记人" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small">修改</el-button>
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
  name: "UserRightsManagement",
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      formTrafficFlowAnalysis: { site: "" },
      tableData: [
        {
          date: "1",
          name: "陕A008923",
          province: "黄色",
          city: "2018-04-11 08:22:22",
          address: "",
          zip: "",
          zip2:""
        },
       
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

