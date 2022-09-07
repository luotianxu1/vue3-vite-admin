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

    onUnmounted(() => {
        web.remove()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()

        web.addAmbientLight(0x0c0c0c)
        web.addSpotLight(-40, 60, -10, 0xffffff)

        const sphereGeometry = new THREE.SphereGeometry(14, 20, 20)
        const meshMaterial = new THREE.MeshNormalMaterial({
            flatShading: true
        })
        const mesh = new THREE.Mesh(sphereGeometry, meshMaterial)
        web.scene.add(mesh)

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
