<template>
  <div>
    <h1>用户编辑</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username" >
        <el-input type="text" v-bind:value="ruleForm.username" disabled clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          <el-option label="保密" value="保密"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm">修改</el-button>
        <el-button type="danger" @click="back">取消</el-button>
      </el-form-item>
      <el-col>
        <img :src="ruleForm.pic" alt width="100" />
        <input type="file" @change="upload" class="upload-input">
      </el-col>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value < 18) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("未满18禁止浏览"));
      }else{
          // 规则通过后的回掉
          callback();
      }
    };
    return {
      userid: "",
      ruleForm: {
        username: '',
        password: "",
        gender: "",
        age: "",
        pic:""
      },
      rules: {
        age: [
          { required: true, message: "年龄必填", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          // 自定义校验规则
          {
            validator: checkAge,
            trigger: "change",
          },
        ],
        password: [
          {
            min: 6,
            max: 12,
            message: "密码长度必须在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
            const {userid,ruleForm} = this
          const {data} = await this.$request.put("/user/"+userid,{
              ...ruleForm
          });
          console.log(data)
          if(data.code === 1){
              this.$message({
                type: "success",
                message: "修改成功",

            });
            this.$router.push({
              name:"User"
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async upload(e){

      const data = new FormData();

      data.set('_id',this.ruleForm._id);

      data.set('avatar',e.target.files[0]);

      const result = await this.$request.post("/upload/avatar",data,{
        // contentType:false,
        'Content-Type':'multipart/form-data',
      })

      this.ruleForm.pic = 'http://47.112.180.216:2003' + result.data.data.avatarUrl;
    },
    back() {
      this.$router.back();
    },

  },
  async created() {
    // console.log("Router=", this.$router);
    // console.log("Route=", this.$route);
    // const {a,b} = this.$route.query;
    const { id } = this.$route.params;

    const { data } = await this.$request.get("/user/" + id);
    console.log('user=',data);
    this.userid = id;
    // this.ruleForm.username = data.data.username;
    // this.ruleForm.password = data.data.password;
    Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang="scss">
  h1{
    margin-bottom: 25px;
  }
  .upload-input{
    margin-left: 100px;
    margin-bottom: 20px;
    z-index: 999;
  }
</style>
