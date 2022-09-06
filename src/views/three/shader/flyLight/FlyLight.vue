<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import gsap from 'gsap'
    import vertexShader from './shader/vertex.glsl?raw'
    import fragmentShader from './shader/fragment.glsl?raw'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    import WebGl from '@/utils/three/modelNew/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    // 创建着色器材质;
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {},
        side: THREE.DoubleSide
        //   transparent: true,
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.renderer.toneMappingExposure = 0.2
        web.renderer.outputEncoding = THREE.sRGBEncoding
        web.renderer.toneMapping = THREE.ACESFilmicToneMapping
        web.controls.autoRotate = true
        web.controls.autoRotateSpeed = 0.1
        web.camera.position.set(0, 0, 2)

        // 创建纹理加载器对象
        const rgbeLoader = new RGBELoader()
        rgbeLoader.loadAsync('./textures/hdr/2k.hdr').then((texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            web.scene.background = texture
            web.scene.environment = texture
        })

        const gltfLoader = new GLTFLoader()
        let LightBox
        gltfLoader.load('./model/glb/flyLight.glb', (gltf) => {
            LightBox = gltf.scene.children[0]
            LightBox.material = shaderMaterial
            for (let i = 0; i < 150; i++) {
                let fly = gltf.scene.clone(true)
                let x = (Math.random() - 0.5) * 300
                let z = (Math.random() - 0.5) * 300
                let y = Math.random() * 60 + 25
                fly.position.set(x, y, z)
                gsap.to(fly.rotation, {
                    y: 2 * Math.PI,
                    duration: 10 + Math.random() * 30,
                    repeat: -1
                })
                gsap.to(fly.position, {
                    x: '+=' + Math.random() * 5,
                    y: '+=' + Math.random() * 20,
                    yoyo: true,
                    duration: 5 + Math.random() * 10,
                    repeat: -1
                })
                web.scene.add(fly)
            }
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
