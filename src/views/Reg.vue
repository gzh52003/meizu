<template>

	<el-container class="sl-container">

		<el-main>
			<transition name="el-zoom-in-center">
				<div class="transition-box">
					<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
						<el-form-item label="账号" prop="username">

							<el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="账号" @keyup.enter="reg('ruleForm')" clearable></el-input>

						</el-form-item>

						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password placeholder="密码" clearable></el-input>
						</el-form-item>

						<el-form-item label="确认密码" prop="checkPass">
							<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password placeholder="确认密码" clearable></el-input>
						</el-form-item>

						<el-form-item label="验证码" prop="vcode">
							<el-input type="text" v-model="ruleForm.vcode" autocomplete="off" placeholder="验证码">
								<template slot="append">
									<div v-html="vcode" @click="Rvcode" style="height:38px"></div>
								</template>
							</el-input>
						</el-form-item>

						<el-form-item>
							<el-button @click="reg('ruleForm')" type="success">注册</el-button>

							<el-button @click="goLog" size="mini">登录</el-button>
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


			var validateUser = async (rule, value, callback) => {
				let checkUrl = `/reg/check?username=${this.ruleForm.username}`
				const {
					data: checkData
				} = await this.$request.get(checkUrl)
				//空格正则
				let zz1 = /^\S+$/
				//中文正则
				// let zz2 = /^[\u4e00-\u9fa5]{2,4}$/
				if (value === "") {
					callback(new Error("请输入账号"));
				} else if (checkData.code === 0) {
					callback(new Error("用户已存在"));
					console.log(checkData.code);
				} else if(!(zz1.test(value))){
					callback(new Error("账号不能含空格"));
				} else {
					callback();
				}
			};

			var validatePass = (rule, value, callback) => {
				let zz = /^\S+$/
				if (value === "") {
					callback(new Error("请输入密码"));
				}else if(!(zz.test(value))){
					callback(new Error("密码不能含空格"));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
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

			var validateVcode = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入验证码"));
				} else {
					callback();
				}
			};


			return {
				ruleForm: {
					username: "",
					password: "",
					checkPass: "",
					vcode: ""
				},
				rules: {

					username: [{
						validator: validateUser,
						trigger: "change"
					}],
					password: [{
						validator: validatePass,
						trigger: "change"
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: "change"
					}],
					vcode: [{
						validator: validateVcode,
						trigger: "change"
					}]
				},
				vcode: {
					data: ""
				}

			};

		},

		methods: {


			reg(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let url = `/reg`;
						const {
							ruleForm
						} = this;
						const {
							data
						} = await this.$request.post(url, {
							...ruleForm,
						});
						if (data.code === 1) {
							this.$message({
								message: "注册成功",
								type: "success",
								showClose: true,
							});
							this.$router.push('/login')
						}
					} else {
						console.log("error submit!!");
						return false;
					}
				});

			},


			goLog() {
				this.$router.push('/login')
			},
			async Rvcode() {
				let url = `/vcode`;
				const {
					data
				} = await this.$request.get(url);
				this.vcode = (data.data)
			}
		},
		async created() {
			let url = `/vcode`;
			const {
				data
			} = await this.$request.get(url);
			this.vcode = (data.data)
		}
	};
</script>


<style>
	* {
		margin: 0;
	}

	html {
		height: 100%;
		width: 100%;
	}

	body {
		height: 100%;
	}

	.sl-container {
		height: 100%;
		width: 100%;
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
		padding: 40px 80px 18px 20px;
		padding-right: 60px;
		box-sizing: border-box;
	}
</style>
