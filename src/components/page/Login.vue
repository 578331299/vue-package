<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title" style="color:#009fff">咸阳市机动车尾气遥测管理平台</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="ms-content"
        @submit.native.prevent
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="ruleForm.username"
            placeholder="用户名"
            @keydown.native="changeInput($event)"
          >
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="passWordInput"
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "Login",
  data: function() {
    return {
      focusInput: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    changeInput(event) {
      if (event.keyCode == 9) {
        this.password = "";
        this.$refs.passWordInput.focus();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this;
          localStorage.setItem("ms_username", that.ruleForm.username);
          // that.$cookie.set("user_name", that.ruleForm.username); //用户信息保存cookie
          // that.$router.push("/");

          this.$axios
            .post("/serveApi/hbj/login", {
              username: this.ruleForm.username,
              password: md5(
                md5(this.ruleForm.password) + this.ruleForm.username
              ) //用户名加盐
            })
            .then(function(data) {
              if (Number(data.data.code) != 1000) {
                //如果报错
                that.$confirm(data.data.msg, { type: "warning" }); //用户异常信息
              } else {
                //跳转主页面
                localStorage.setItem("ms_username", that.ruleForm.username);
                that.$cookie.set("user_name", that.ruleForm.username); //用户信息保存cookie
                that.$router.push("/");
              }
            })
            .catch(function(err) {
              that.$confirm(JSON.stringify(err), { type: "warning" }); //服务器异常信息
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    document.onkeydown = function() {
      if (event.keyCode == 9) {
        //如果是其它键，换上相应在ascii 码即可。
        return false; //非常重要
      }
    };

    // this.$axios.get("/api/hbj/resource/getRoleRes").then(function(data){
    //   console.log(data)
    // })
    // this.$cookie.set("user_nname","zhangsan")
    // this.$axios
    //   .post("/api/hbj/login", {
    //     username: this.ruleForm.username,
    //     password: ""
    //   })
    //   .then(function(data) {
    //     console.log(data);
    //   });
    // console.log(md5(md5("hellow") + "123213"));
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/log.png);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>