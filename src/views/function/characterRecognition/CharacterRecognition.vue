<template>
    <div>
        <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="#"
            multiple
            :on-change="onChange"
            :limit="1"
        >
            <el-button type="primary">上传文件</el-button>
        </el-upload>
        <el-input
            v-model="textarea"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10 }"
        />
    </div>
</template>
<script lang="ts" setup>
    import axios from 'axios'
    import Qs from 'qs'
    import { UploadUserFile } from 'element-plus'

    const fileList = ref<UploadUserFile[]>()
    const textarea = ref('')

    const onChange = (file) => {
        let img
        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function () {
            img = reader.result
            getToekn(img)
        }
    }

    const getToekn = async (img) => {
        const res = await axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=24.ba9ab67c2a676b965a9562c7ef048b3a.2592000.1668249553.282335-25406556',
            data: Qs.stringify({
                image: img
            })
        })
        if (res.status === 200) {
            textarea.value = ''
            res.data.words_result.forEach((item) => {
                textarea.value += item.words
            })
        }
        console.log(textarea.value)

        console.log(res)
    }
</script>
<style lang="scss" scoped></style>
