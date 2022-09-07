<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/modelNew/webGl'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    import * as THREE from 'three'
    import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
    import Factory from '@/utils/three/model/mesh/factory'

    const webGl = ref()

    const css3drender = new CSS3DRenderer()
    let web
    onMounted(() => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.camera.position.set(20, 20, 20)
        web.addDirectionalLight(10,100,10,0xffffff)
        web.camera.position.set(100, 100, 300)
        web.renderer.shadowMap.enabled = true
        web.renderer.toneMapping = THREE.ACESFilmicToneMapping
        web.renderer.toneMappingExposure = 1.5

        // 导入hdr纹理
        const hdrLoader = new RGBELoader()
        hdrLoader.loadAsync('./textures/hdr/2k.hdr').then((texture) => {
            web.scene.background = texture
            web.scene.environment = texture
            web.scene.environment.mapping = THREE.EquirectangularReflectionMapping
        })

        css3drender.setSize(window.innerWidth, window.innerHeight)
        if (document.querySelector('#cssrender')) {
            // eslint-disable-next-line no-unused-expressions
            document.querySelector('#cssrender')?.appendChild(css3drender.domElement)
        }

        new Factory(web.scene,web.camera)

        render()
    })

    const render = () => {
        web.renderer.render(web.scene, web.camera)
        css3drender.render(web.scene, web.camera)
        requestAnimationFrame(render)
    }
</script>

<style lang="scss" scoped>
    .webGl {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }
</style>
