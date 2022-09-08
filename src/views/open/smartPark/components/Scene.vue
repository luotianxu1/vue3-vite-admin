<template>
    <div ref="sceneDiv" class="scene"></div>
</template>

<script lang="ts" setup>
    // 导入场景
    import scene from '@/views/open/smartPark/model/scenePark'
    // 导入相机
    import cameraModule from '@/views/open/smartPark/model/cameraPark'
    // 导入渲染器
    import renderer from '@/views/open/smartPark/model/renderer'
    // 导入控制器
    import controls from '@/views/open/smartPark/model/controlsPark'
    // 初始化屏幕调整
    import '@/views/open/smartPark/model/initpark'
    // 导入执行函数
    import animate from '@/views/open/smartPark/model/animatePark'
    import createPark from '@/views/open/smartPark/model/createPark'

    createPark()

    // 场景元素div
    const sceneDiv = ref()
    scene.add(cameraModule.activeCamera)

    onMounted(() => {
        sceneDiv.value.appendChild(renderer.domElement)
        animate()
    })
</script>

<style lang="scss" scoped>
    .scene {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }
</style>
