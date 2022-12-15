<template>
    <div id="webgl" class="webgl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
    import {
        EffectComposer,
        RenderPass,
        SelectiveBloomEffect,
        BlendFunction,
        EffectPass,
        SMAAEffect,
        OutlineEffect
    } from 'postprocessing'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

    onMounted(() => {
        init()
    })

    // 初始化场景
    const scene = new THREE.Scene()
    // 初始化相机
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(8, 4, 0)
    camera.lookAt(0, 2, 0)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true,
        powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // 初始化控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 2, 0)

    // 添加环境纹理
    let rbgeLoader = new RGBELoader()
    rbgeLoader.load('./textures/hdr/powerplant.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.background = texture
        scene.environment = texture
        scene.backgroundBlurriness = 1
    })

    // 添加聚光灯
    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-200, 200, -100)
    spotLight.angle = 0.1
    spotLight.intensity = 5
    scene.add(spotLight)

    // 添加模型
    let dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    let gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    let bear, elephant, dear

    gltfLoader.load('./model/gltf/bear.gltf', (gltf) => {
        bear = gltf.scene.children[0]
        scene.add(bear)

        bear.position.set(0, 0, -4)
    })
    gltfLoader.load('./model/gltf/elephant.gltf', (gltf) => {
        elephant = gltf.scene.children[0]
        elephant.position.set(0, 0, 4)
        scene.add(elephant)
    })

    gltfLoader.load('./model/gltf/dear.gltf', (gltf) => {
        dear = gltf.scene.children[0]
        scene.add(dear)
    })

    // 实例化后期处理效果
    const composer = new EffectComposer(renderer)
    // 添加renderPass
    composer.addPass(new RenderPass(scene, camera))
    // 添加发光效果
    const bloomEffect = new SelectiveBloomEffect(scene, camera, {
        mipmapBlur: true,
        blendFunction: BlendFunction.ADD,
        luminanceThreshold: 0.7,
        luminanceSmoothing: 0.3,
        intensity: 10
    })

    // 添加轮毂效果
    const outlineEffect = new OutlineEffect(scene, camera, {
        blendFunction: BlendFunction.ADD,
        edgeStrength: 3,
        pulseSpeed: 0,
        visibleEdgeColor: 0xffffff,
        hiddenEdgeColor: 0x22090a,
        blur: false,
        xRay: true
    })
    // 添加ontlinePass
    const outlinePass = new EffectPass(camera, outlineEffect)
    composer.addPass(outlinePass)

    // 提升抗锯齿效果
    const smaaEffect = new SMAAEffect()

    // 创建效果通道
    const effectPass = new EffectPass(camera, bloomEffect, smaaEffect)
    composer.addPass(effectPass)

    // 添加鼠标点击事件
    let raycaster = new THREE.Raycaster()
    let mouse = new THREE.Vector2()
    let intersects: any = []
    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(mouse, camera)
        intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length > 0) {
            console.log(outlineEffect.selection)
            let object = intersects[0].object
            outlineEffect.selection.set([object])
            bloomEffect.selection.set([object])
        }
    })

    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        // 创建渲染器
        const width = body.offsetWidth
        const height = body.offsetHeight
        renderer.setSize(width, height)
        body.appendChild(renderer.domElement)
        renderScene()
    }
    const renderScene = () => {
        composer.render()
        requestAnimationFrame(renderScene)
    }
</script>

<style scoped lang="scss">
    .webgl {
        width: 100%;
        height: 100%;
    }
</style>
