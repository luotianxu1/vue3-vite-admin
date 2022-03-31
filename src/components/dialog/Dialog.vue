<template>
    <el-dialog
        :model-value="visible"
        :title="title"
        :width="width + 'px'"
        :before-close="handleClose"
        :modal="modal"
        :show-close="showClose"
        :close-on-click-modal="closeMode"
    >
        <slot name="content"></slot>
        <div class="dialog-footer">
            <slot name="footer"></slot>
        </div>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Dialog',
    props: {
        // 弹窗标题
        title: {
            type: String,
            required: false,
            default: ''
        },
        // 是否显示弹窗
        visible: {
            type: Boolean,
            required: true
        },
        // 宽度
        width: {
            type: String,
            required: false,
            default: '30'
        },
        // 是否显示遮罩
        modal: {
            type: Boolean,
            required: false,
            default: true
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            required: false,
            default: true
        },
        // 是否可以点击遮罩关闭弹窗
        closeMode: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props, context) {
        // 关闭弹窗
        const handleClose = function () {
            context.emit('update:visible', false)
        }
        return {
            handleClose
        }
    }
})
</script>

<style scoped lang="scss">
    .dialog-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10px 0;
    }
</style>
