<template>
    <div class="screenfull" @click="click">
        <el-tooltip content="全屏" placement="bottom" effect="light">
            <MyIcon
                :icon="isFullscreen === true ? 'icon-suoxiao' : 'icon-fullScreen'"
                :font="20"
                :hover="true"
                :width="500"
            ></MyIcon>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
    import screenfull from 'screenfull'

    const sf = screenfull

    const isFullscreen = ref(false)

    onMounted(() => {
        if (sf.isEnabled) {
            sf.on('change', change)
            window.addEventListener('keydown', KeyDown, true) // 监听按键事件
        }
    })

    onBeforeUnmount(() => {
        if (sf.isEnabled) {
            sf.off('change', change)
            window.removeEventListener('keydown', KeyDown, false)
        }
    })

    const KeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === 122) {
            click()
            event.returnValue = false
        }
    }

    const change = () => {
        if (sf.isEnabled) {
            isFullscreen.value = sf.isFullscreen
        }
    }

    const click = () => {
        if (!sf.isEnabled) {
            ElMessage({
                message: '您的浏览器不支持！',
                type: 'warning'
            })
            return false
        }
        sf.toggle()
    }
</script>

<style scoped lang="scss">
    .screenfull {
        cursor: pointer;
    }
</style>
