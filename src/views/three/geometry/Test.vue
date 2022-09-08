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

    const material = new THREE.MeshBasicMaterial()
    const texture = new THREE.TextureLoader().load(
        'src/assets/img/three/texture/test.jpg'
    )
    material.map = texture

    const skyBox = new THREE.Mesh(
        new THREE.SphereBufferGeometry(100, 100, 100),
        material
    )
    skyBox.geometry.scale(1, 1, -1)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight(0x343434)
        web.addSpotLight(-10, 30, 40,0xffffff)

        web.scene.add(skyBox)

        renderScene()
    }

    const renderScene = () => {
        web.update()
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
