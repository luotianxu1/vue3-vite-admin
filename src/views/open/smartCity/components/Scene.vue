<template>
    <div ref="sceneDiv" class="scene"></div>
</template>

<script lang="ts" setup>
    // 导入场景
    import scene from '@/utils/three/model/scene'
    // 导入相机
    import camera from '@/utils/three/model/camera'
    // 导入gui
    import gui from '@/utils/three/model/gui'
    // 导入渲染器
    import renderer from '@/utils/three/model/renderer'
    // 导入坐标轴
    import axesHelper from '@/utils/three/model/axesHelper'
    // 导入控制器
    import controls from '@/utils/three/model/controls'
    // 初始化屏幕调整
    import '@/utils/three/model/init'
    // 导入执行函数
    import animate from '@/utils/three/model/animate'
    import createMesh from '@/utils/three/model/createMesh'

    scene.add(camera)
    scene.add(axesHelper)
    createMesh()

    // 场景元素div
    const sceneDiv = ref()

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
