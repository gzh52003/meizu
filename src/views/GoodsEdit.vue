<template>
	<div>
		<h1>商品数据修改</h1>
		<el-form :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
			<el-form-item prop="skuid" label="商品Id">
				<el-input type="text"  v-model="ruleForm.skuid" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="name" label="商品名称">
				<el-input type="text" v-model="ruleForm.name" autocomplete="on"></el-input>
				
			</el-form-item>
			<el-form-item prop="name" label="商品价格">
				<el-input type="text" v-model="ruleForm.skuprice" autocomplete="on"></el-input>
				</el-form-item>
			<el-form-item prop="img" label="商品图片">
				<el-input v-model="ruleForm.img"></el-input>
			</el-form-item>
			<el-form-item prop="title" label="商品描述">
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="submitForm">提交</el-button>

			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {

			return {
				goodsid: "",
				ruleForm: {
					skuid: "",
					name: "",
					skuprice: "",
					title: "",
					img: ""
				}
			}
		},
		methods: {
			async submitForm() {
				
				const {goodsid,ruleForm}=this
				
				const {data} = await this.$request.put("/goods/"+goodsid,{
					...ruleForm
				})
				
				if(data.code===1){
					this.$message({
						type:"success",
						message:"修改成功"
					})
				}else{
					
					return false
				}
			},
			

		},

		async created() {

			const {
				id
			} = this.$route.params

			const {
				data
			} = await this.$request.get("/goods/" + id)

			this.goodsid = id
			
			Object.assign(this.ruleForm, data.data)
			
		}


	}
</script>
