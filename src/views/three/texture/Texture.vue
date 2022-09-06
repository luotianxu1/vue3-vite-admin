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

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./textures/door/minecraft.png')

    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    // texture.minFilter = THREE.LinearFilter
    // texture.magFilter = THREE.LinearFilter

    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const basicMaterial = new THREE.MeshBasicMaterial({
        map: texture
    })
    const cube = new THREE.Mesh(cubeGeometry, basicMaterial)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        web.addAmbientLight(0x444444)
        web.addSpotLight(-10, 30, 40, 0xffffff)
        web.camera.position.set(0, 0, 5)
        web.scene.add(cube)

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
