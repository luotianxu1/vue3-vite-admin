<template>
	<div class="work">
		<div class="header">
			<div class="header-time">
				{{ globalStore.systemTime }}
			</div>
		</div>
		<el-row :gutter="20">
			<el-col :span="12">
				<Applicatin></Applicatin>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">
							<span class="card-title">暂未开发</span>
						</div>
					</template>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="12">
				<Statistical></Statistical>
			</el-col>
			<el-col :span="12">
				<ToDoList></ToDoList>
			</el-col>
		</el-row>
	</div>
</template>
<script lang="ts" setup>
import { GlobalStore } from "@/store/modules/global"
import Applicatin from "./modules/Application.vue"
import ToDoList from "./modules/ToDoList.vue"
import Statistical from "./modules/Statistical.vue"
const globalStore = GlobalStore()
</script>
<style scoped lang="scss">
.work {
	width: 100%;
	height: 100%;
	padding: 0 10px;
	overflow: auto;

	.header {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-title {
		position: relative;
		&::before {
			content: "";
			width: 5px;
			height: 22px;
			background-color: #0080f9;
			position: absolute;
			left: -10px;
			top: 0;
		}
	}
}

.el-row {
	margin-bottom: 20px;
}
</style>
