<template>
	<div class="characterRecognition">
		<el-upload
			v-model:file-list="fileList"
			class="upload-demo"
			action=""
			multiple
			:on-change="onChange"
			:limit="1"
			:auto-upload="false"
		>
			<el-button type="primary">上传文件</el-button>
		</el-upload>
		<el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" />
	</div>
</template>
<script lang="ts" setup>
import axios from "axios"
import { UploadUserFile } from "element-plus"
import Qs from "qs"

const fileList = ref<UploadUserFile[]>()
const textarea = ref("")

const onChange = file => {
	let img
	let reader = new FileReader()
	reader.readAsDataURL(file.raw)
	reader.onload = function () {
		img = reader.result
		getToekn(img)
	}
}

const getToekn = async img => {
	const res = await axios({
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: "POST",
		url: "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=24.ba9ab67c2a676b965a9562c7ef048b3a.2592000.1668249553.282335-25406556",
		data: Qs.stringify({
			image: img
		})
	})
	if (res.status === 200) {
		textarea.value = ""
		res.data.words_result.forEach(item => {
			textarea.value += item.words
		})
	} else {
		ElMessage.warning("请联系管理员！")
	}
}
</script>
<style lang="scss" scoped>
.characterRecognition {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
}
</style>
