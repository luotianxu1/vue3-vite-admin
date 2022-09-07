<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import { addLargeGroundPlane } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    const textureLoader = new THREE.TextureLoader()
    const cubeMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveMap: textureLoader.load('./textures/emissive/lava.png'),
        normalMap: textureLoader.load('./textures/emissive/lava-normals.png'),
        metalnessMap: textureLoader.load(
            './textures/emissive/lava-smoothness.png'
        ),
        metalness: 1,
        roughness: 0.4,
        normalScale: new THREE.Vector2(4, 4)
    })
    const cube = new THREE.BoxGeometry(16, 16, 16)
    const cube1 = new THREE.Mesh(cube, cubeMaterial)
    cube1.rotation.y = (1 / 3) * Math.PI
    cube1.position.x = -12

    const sphere = new THREE.SphereGeometry(9, 50, 50)
    const sphere1 = new THREE.Mesh(sphere, cubeMaterial)
    sphere1.rotation.y = (1 / 6) * Math.PI
    sphere1.position.x = 15

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.addSpotLight(-10, 30, 40, 0xffffff, 0.1)
        web.camera.position.set(0, 20, 40)

        const groundPlane = addLargeGroundPlane(web.scene, true)
        groundPlane.position.y = -10
        web.scene.add(cube1)
        web.scene.add(sphere1)

        renderScene()
    }

    const clock = new THREE.Clock()
    const renderScene = () => {
        const time = clock.getDelta()
        cube1.rotation.y += time
        sphere1.rotation.y -= time
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
