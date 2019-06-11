<template>
  <div>
    <el-dialog
      :title="title"
      :visible="diaSta"
      width="70%"
      @open="openDialog"
      :before-close="handleClose"
     
    >
      <div>
        <el-form :inline="true">
          <el-row>
            <el-col :span="6" style="display:flex;justify-content:flex-end">
              <el-form-item label="车牌号码:">
                <el-input v-model="editDialogInput.a" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车牌颜色:" style="display:flex;justify-content:flex-end">
                <el-input v-model="editDialogInput.b" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年份:" style="display:flex;justify-content:flex-end">
                <el-input v-model="editDialogInput.c" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车主:" style="display:flex;justify-content:flex-end">
                <el-input v-model="editDialogInput.d" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="6">
              <el-form-item label="地址:" style="display:flex;justify-content:flex-end">
                <el-input v-model="editDialogInput.a" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系号码:" style="display:flex;justify-content:flex-end">
                <el-input v-model="editDialogInput.b" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="浓度:" style="display:flex;justify-content:flex-end">
                <el-input v-model="editDialogInput.c" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="取证时间:" style="display:flex;justify-content:flex-end"> 
                <el-input v-model="editDialogInput.d" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
               <el-form-item label="取证地点:" style="display:flex;justify-content:flex-end"> 
                <el-input v-model="editDialogInput.d" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="display:flex;justify-content:center">
              <el-button>检索</el-button>
              <el-button>导出</el-button>
              <el-button>打印</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  methods: {
    openDialog() {
      
    },
    handleClose() {
      this.$emit("dialogClose");
    }
  },
  data() {
    return {
      dialogVisible: false,
      editDialogInput: {
        a: "",
        b: "",
        c: "",
        d: ""
      }
    };
  },
  props: {
    title: String,
    diaSta: Boolean
  }
};
</script>
<style scoped>
</style>


