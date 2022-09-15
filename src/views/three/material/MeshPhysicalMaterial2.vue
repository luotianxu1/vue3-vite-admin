<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    import WebGl from '@/utils/three/model/webGl'
    import { Reflector } from 'three/examples/jsm/objects/Reflector'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    let web
    let cubeCamera
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.camera.position.set(0, 5, 10)
        web.addAxesHelper()

        const hdrLoader = new RGBELoader()
        hdrLoader.load('./textures/hdr/023.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            texture.format = THREE.RGBAFormat
            web.scene.background = texture
            web.scene.environment = texture
            sphereMaterial.envMap = cubeRenderTarget.texture
        })

        // 创建球
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            // 透光程度
            transparent: true,
            roughness: 0,
            metalness: 1
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(0, 0, 0)
        web.scene.add(sphere)

        // 创建立方体
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff
        })
        const box = new THREE.Mesh(boxGeometry, boxMaterial)
        box.position.set(3, 0, 0)
        web.scene.add(box)
        console.log(sphereMaterial)

        // 创建平面
        const planeGeometry = new THREE.PlaneGeometry(10, 10)
        const plane = new Reflector(planeGeometry, {
            textureWidth: 1024,
            textureHeight: 1024,
            color: 0xffffff
        })
        plane.position.set(0, -1, 0)
        plane.rotation.x = -Math.PI / 2
        web.scene.add(plane)
        console.log(plane)

        // 创建cubeTarget
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512)
        cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget)
        console.log()

        renderScene()
    }

    const renderScene = () => {
        web.update()
        cubeCamera.update(web.renderer, web.scene)
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
