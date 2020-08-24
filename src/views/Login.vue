<template>
<el-container class="sl-container">
    <el-main>
  <transition name="el-zoom-in-center">
    <div class="transition-box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="user">
          <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            show-password
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="log('ruleForm')" type="success">登录</el-button>
          <el-button @click="goReg('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
      </el-main>
  </el-container>
</template>


<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        user: "",
        pass: "",
      },
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
      
    async log(formName) {
        let _this = this
      let url = `/login?username=${_this.ruleForm.user}&password=${_this.ruleForm.pass}`;
      
      const { data } = await this.$request.get(url);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (data.code === 1) {
            this.$message({
              message: "登录成功",
              type: "success",
              showClose: true,
              
            });
			this.$router.push({
				name:"Home"
			})
          } else {
            this.$message({
          showClose: true,
          message: '账号或密码错误',
          type: 'error'
        });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goReg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      }); 
    },
  },
};
</script>

<style>
*{
  margin: 0;
}
html {
  height: 100%;
  width: 100%;
}
body{
  height: 100%;
}
.sl-container{
  height: 100%;
  width: 100%;
  background: url("/images/logo.png") no-repeat rgb(84, 92, 100);
  background-position: center;
  background-size: 100%;
}
.transition-box {
  margin: 0 auto;
  margin-top: 10%;
  width: 500px;
  min-height: 250px;
  border-radius: 4px;
  background-color: rgba(221, 221, 221, 0.8);
  text-align: center;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 80px;
  padding-bottom: 18px;
  box-sizing: border-box;
}
</style>
