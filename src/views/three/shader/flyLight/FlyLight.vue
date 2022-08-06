<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import gsap from 'gsap'
    import { initCameraControl, initStats } from '@/utils/three/util'
    import vertexShader from './shader/vertex.glsl?raw'
    import fragmentShader from './shader/fragment.glsl?raw'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        90,
        window.innerHeight / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(0, 0, 2)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    scene.add(camera)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer({ alpha: true })
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.outputEncoding = THREE.sRGBEncoding
    webGLRenderer.toneMapping = THREE.ACESFilmicToneMapping
    // webGLRenderer.toneMapping = THREE.LinearToneMapping
    // webGLRenderer.toneMapping = THREE.ReinhardToneMapping
    // webGLRenderer.toneMapping = THREE.CineonToneMapping
    webGLRenderer.toneMappingExposure = 0.2

    const controls = initCameraControl(camera, webGLRenderer.domElement)
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.1
    controls.maxPolarAngle = (Math.PI / 3) * 2
    controls.minPolarAngle = (Math.PI / 3) * 2

    // 创建纹理加载器对象
    const rgbeLoader = new RGBELoader()
    rgbeLoader.loadAsync('./textures/hdr/2k.hdr').then((texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.background = texture
        scene.environment = texture
    })

    // 创建着色器材质;
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {},
        side: THREE.DoubleSide
        //   transparent: true,
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
            scene.add(fly)
        }
    })

    let stats
    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        // 创建渲染器
        const width = body.offsetWidth
        const height = body.offsetHeight
        webGLRenderer.setSize(width, height)
        body.appendChild(webGLRenderer.domElement)
        stats = initStats(body)
        renderScene()
    }

    const renderScene = () => {
        controls.update()
        stats.update()
        requestAnimationFrame(renderScene)
        webGLRenderer.render(scene, camera)
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
