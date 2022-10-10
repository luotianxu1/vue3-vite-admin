<template>
    <div class="page">
        <div ref="webGl" class="webGl"></div>
    </div>
</template>

<script setup lang="ts">
    import * as THREE from 'three'
    import WebGl from '@/utils/three/model/webGl'
    import { Reflector } from 'three/examples/jsm/objects/Reflector'

    const webGl = ref<HTMLDivElement>()

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
        web.camera.position.set(4, 1.5, 6)
        web.addStats()
        web.addDirectionalLight(0, 10, 10, 0xffffff, 0.3)
        web.addDirectionalLight(0, 10, -10, 0xffffff, 0.3)
        web.addDirectionalLight(10, 10, 10, 0xffffff, 0.3)

        web.setHdrBg('./textures/hdr/sky12.hdr')
        web.gltfLoader('./model/glb/robot.glb').then((gltf) => {
            console.log(gltf)
            web.scene.add(gltf.scene)
        })

        let lightPlane = web.addVideo(
            './video/zp2.mp4',
            new THREE.Vector2(8, 4.5),
            new THREE.Vector3(0, 0.2, 0)
        )
        lightPlane.mesh.rotation.set(-Math.PI / 2, 0, 0)

        // 镜面反射
        let reflectorGeometry = new THREE.PlaneBufferGeometry(100, 100)
        let reflectorPlane = new Reflector(reflectorGeometry, {
            textureWidth: window.innerWidth,
            textureHeight: window.innerHeight,
            color: 0x332222
        })
        reflectorPlane.rotation.x = -Math.PI / 2
        web.scene.add(reflectorPlane)

        rendererScene()
    }

    const rendererScene = () => {
        web.update()
        requestAnimationFrame(rendererScene)
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;

        .webGl {
            flex: 1;
            position: relative;
        }
    }
</style>
