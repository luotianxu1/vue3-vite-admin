<template>
	<div class="avatar">
		<el-dropdown @command="handleCommand" trigger="click">
			<span class="el-dropdown-link">
				<span class="user">
					<el-avatar :size="30" :src="userInfo?.img"></el-avatar>
					<span class="userInfo">
						<span>{{ userInfo?.name }}</span>
					</span>
				</span>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="userCenter">
						<i class="iconfont icon-yonghu1"></i>
						个人中心
					</el-dropdown-item>
					<el-dropdown-item command="quit" divided>
						<i class="iconfont icon-qidong"></i>
						退出登录
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts" setup>
import { UserStore } from "@/store/modules/user"
import { storeToRefs } from "pinia"

const userStore = UserStore()
const { userInfo } = storeToRefs(userStore)

const handleCommand = command => {
	switch (command) {
		case "userCenter":
			break
		case "quit":
			ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				userStore.logout()
			})
			break
		default:
			break
	}
}
</script>

<style scoped lang="scss">
.avatar {
	cursor: pointer;
}

.el-dropdown-link {
	display: flex;
	align-items: center;

	.user {
		display: flex;
		align-items: center;

		.userInfo {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 10px;

			span:nth-child(1) {
				font-size: 16px;
			}

			span:nth-child(2) {
				font-size: 12px;
				margin-top: 4px;
			}
		}
	}
}

.iconfont {
	font-size: 16px;
}
</style>
