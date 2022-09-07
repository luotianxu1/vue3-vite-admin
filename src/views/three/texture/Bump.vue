<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import cubeMap from '../../../assets/img/three/texture/general/stone.jpg'
    import bumpMap from '../../../assets/img/three/texture/general/stone-bump.jpg'
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import { addLargeGroundPlane } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const textureLoader = new THREE.TextureLoader()

    const cube = new THREE.BoxGeometry(16, 16, 16)
    const cubeMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeMap),
        metalness: 0.2,
        roughness: 0.07
    })
    const cubeMaterialWithBumpMap = cubeMaterial.clone()
    cubeMaterialWithBumpMap.bumpMap = textureLoader.load(bumpMap)

    const cube1 = new THREE.Mesh(cube, cubeMaterial)
    cube1.castShadow = true
    cube1.position.x = -17
    cube1.rotation.y = (1 / 3) * Math.PI

    const cube2 = new THREE.Mesh(cube, cubeMaterialWithBumpMap)
    cube2.castShadow = true
    cube2.position.x = 17
    cube2.rotation.y = (1 / 3) * Math.PI

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        const groundPlane = addLargeGroundPlane(web.scene)
        groundPlane.position.y = -10
        web.addAmbientLight(0x343434)
        web.addSpotLight(-10, 30, 40, 0xffffff)
        web.camera.position.set(0, 5, 40)
        web.scene.add(cube1)
        web.scene.add(cube2)

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
