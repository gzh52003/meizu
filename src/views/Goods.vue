<template>
	<div>
		<el-table :data="goodsList" stripe style="width: 100%">
			<el-table-column type="index" label="#" >
			</el-table-column>
			<el-table-column prop="skuid" label="商品Id" width="100">
			</el-table-column>
			<el-table-column prop="name" show-overflow-tooltip label="商品名称" >
			</el-table-column>
			<el-table-column prop="skuprice" label="价格" width="100">
			</el-table-column>
			<el-table-column prop="title" show-overflow-tooltip label="商品描述">
			</el-table-column>

			<el-table-column align="right">
				<template slot="header">
					<el-input size="mini" placeholder="输入关键字搜索" />
				</template>
				<template v-slot:default="scope">
					<el-button size="mini" @click="goto(scope.row._id)" type="success">编辑</el-button>
					<el-button size="mini" @click="deleteGoods(scope.row._id)" type="danger">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		<div class="pagination">
			<el-pagination @current-change="currentPage" background layout="prev, pager, next" :total="1000">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {

				goodsList: [],
				currentId: "0"

			}
		},
		methods: {
			async currentPage(idx) {

				const url = 'page=' + idx

				let {
					data
				} = await this.$request.get("/goods" + "?" + url);
				// data = JSON.parse(data)
				this.goodsList = data.data


			},

			async deleteGoods(id) {

				this.$confirm("你确定要删除吗", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",

				}).then(async () => {

					const {
						data
					} = await this.$request.delete("goods/" + id)

					if (data.code === 1) {

						this.goodsList = this.goodsList.filter((item => item._id !== id))
						this.$message({
							type: "sucss",
							message: "删除成功"
						})
					}

				})
			},
			goto(id) {
				this.$router.push({
					name: 'goodsEdit',
					params: {
						id
					}

				})
			}


		},
		async created() {


			let {
				data
			} = await this.$request.get("/goods");
			// data = JSON.parse(data)
			this.goodsList = data.data



		}



	}
</script>

<style lang="scss">

</style>
