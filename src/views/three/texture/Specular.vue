<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import gsap from 'gsap'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const textureLoader = new THREE.TextureLoader()
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('./textures/earth/Earth.png'),
        normalMap: textureLoader.load('./textures/earth/EarthNormal.png'),
        specularMap: textureLoader.load('./textures/earth/EarthSpec.png'),
        normalScale: new THREE.Vector2(6, 6)
    })
    const sphere = new THREE.SphereGeometry(9, 50, 50)
    const sphere1 = new THREE.Mesh(sphere, earthMaterial)
    sphere1.rotation.y = (1 / 6) * Math.PI

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
        web.scene.add(sphere1)

        renderScene()
    }

    gsap.to(sphere1.rotation, { y: 2 * Math.PI, duration: 5, repeat: -1 })
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
