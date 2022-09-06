<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import { Water } from 'three/examples/jsm/objects/Water2'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.addDirectionalLight(50, 100, 50, 0xffffff, 0.5)
        web.camera.position.set(5, 5, 5)

        // 加载场景背景
        const rgbeLoader = new RGBELoader()
        rgbeLoader.loadAsync('./textures/hdr/050.hdr').then((texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            web.scene.background = texture
            web.scene.environment = texture
        })

        // 加载浴缸
        const gltfLoader = new GLTFLoader()
        gltfLoader.load('./model/glb/yugang.glb', (gltf: any) => {
            const yugang = gltf.scene.children[0]
            yugang.material.side = THREE.DoubleSide

            const waterGeometry = gltf.scene.children[1].geometry
            const water = new Water(waterGeometry, {
                color: '#fff',
                scale: 1,
                flowDirection: new THREE.Vector2(1, 1),
                textureHeight: 1024,
                textureWidth: 1024
            })
            web.scene.add(gltf.scene)
            web.scene.add(water)
        })

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
