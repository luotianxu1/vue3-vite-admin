<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import basicVertexShader from './basic/vertex.glsl?raw'
    import basicFragmentShader from './basic/fragment.glsl?raw'
    import WebGl from '@/utils/three/modelNew/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    // 创建着色器材质
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: basicVertexShader,
        fragmentShader: basicFragmentShader
    })

    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 64, 64),
        shaderMaterial
    )

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.camera.position.set(0, 0, 10)
        web.scene.add(floor)
        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        web.renderer.render(web.scene, web.camera)
        requestAnimationFrame(renderScene)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
