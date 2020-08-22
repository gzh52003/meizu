<template>
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
        <el-form-item label="账号" prop="userword">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            show-password
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="reg('ruleForm')" type="success">注册</el-button>
          <el-button @click="goLog('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>




<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
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

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
    };
  },
  methods: {
    async reg(formName) {
        
      let url = `/user`;
      //    $request.get('url').then(res => {
      //       console.log(url);
      //     //   _this.userToken = 'Bearer ' + res.data.data.body.token;
      //     //   // 将用户token保存到vuex中
      //     //   _this.changeLogin({ Authorization: _this.userToken });
      //     //   _this.$router.push('/home');
      //     //   alert('登陆成功');
      //     }).catch(error => {
      //       alert('账号或密码错误');
      //       console.log(error);
      //     });
            const {ruleForm} = this
                console.log(ruleForm);
      const { data } = await this.$request.post(url,{
          ...ruleForm
         
      });

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (data.code === 1) {
            this.$message({
              message: "注册成功",
              type: "success",
              showClose: true,
            });
            console.log(data);
          } else {
            this.$message({
              showClose: true,
              message: "用户已存在",
              type: "error",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goLog(formName) {
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
/* html {
  height: 100%;
  background: url("/images/logo.png") no-repeat rgb(84, 92, 100);
  background-position: center;
  background-size: 100%;
}
.transition-box {
  margin: 0 auto;
  margin-top: 10%;
  width: 400px;
  height: auto;
  border-radius: 4px;
  background-color: rgba(221, 221, 221, 0.8);
  text-align: center;
  padding: 40px 20px;
  padding-right: 60px;
  box-sizing: border-box;
} */
</style>