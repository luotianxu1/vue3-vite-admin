<template>
    <div ref="webGl" class="webGl"></div>

</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    const sphereMetrial = new THREE.SphereBufferGeometry(3, 30, 30)
    const pointsMaterial = new THREE.PointsMaterial()
    pointsMaterial.size = 0.2
    pointsMaterial.color.set(0xfff000)
    // 相机深度而衰减
    pointsMaterial.sizeAttenuation = true

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./public/textures/particles/1.png')
    pointsMaterial.map = texture
    pointsMaterial.alphaMap = texture
    pointsMaterial.transparent = true
    pointsMaterial.depthWrite = false
    pointsMaterial.blending = THREE.AdditiveBlending

    const points = new THREE.Points(sphereMetrial, pointsMaterial)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.scene.add(points)
        web.camera.position.set(10,0,10)
        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
