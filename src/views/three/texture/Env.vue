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

    const urls = [
        './textures/cubemap/flowers/right.png',
        './textures/cubemap/flowers/left.png',
        './textures/cubemap/flowers/top.png',
        './textures/cubemap/flowers/bottom.png',
        './textures/cubemap/flowers/front.png',
        './textures/cubemap/flowers/back.png'
    ]
    const cubeLoader = new THREE.CubeTextureLoader()
    const texture = cubeLoader.load(urls)

    const cubeMaterial = new THREE.MeshStandardMaterial({
        // envMap: scene.background,
        color: 0xffffff,
        metalness: 1,
        roughness: 0
    })
    const sphereMaterial = cubeMaterial.clone()
    const textureLoader = new THREE.TextureLoader()
    sphereMaterial.normalMap = textureLoader.load(
        './textures/engraved/Engraved_Metal_003_NORM.jpg'
    )
    sphereMaterial.aoMap = textureLoader.load(
        './textures/engraved/Engraved_Metal_003_OCC.jpg'
    )

    const cube = new THREE.BoxGeometry(16, 12, 12)
    const cube1 = new THREE.Mesh(cube, cubeMaterial)
    cube1.position.x = -15
    cube1.rotation.y = (-1 / 3) * Math.PI

    const sphere = new THREE.SphereGeometry(10, 50, 50)
    const sphere1 = new THREE.Mesh(sphere, sphereMaterial)
    sphere1.position.x = 15

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
        web.camera.position.set(0,20,40)

        web.scene.background = texture
        web.scene.environment = texture
        web.scene.add(cube1)
        web.scene.add(sphere1)

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
