<template>
    <div ref="sceneDiv" class="scene"></div>
</template>

<script lang="ts" setup>
    // 导入场景
    import scene from '@/utils/three/model/sceneFactory'
    // 导入相机
    import camera from '@/utils/three/model/cameraFactory'
    // 导入渲染器
    import rendererModule from '@/utils/three/model/rendererFactory'
    // 导入控制器
    import controls from '@/utils/three/model/controlsFactory'
    // 初始化屏幕调整
    import '@/utils/three/model/initFactory'
    // 导入执行函数
    import animate from '@/utils/three/model/animateFactory'
    import createFactory from '@/utils/three/model/createFactory'

    createFactory()

    // 场景元素div
    const sceneDiv = ref()
    scene.add(camera)

    onMounted(() => {
        sceneDiv.value.appendChild(rendererModule.renderer.domElement)
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
