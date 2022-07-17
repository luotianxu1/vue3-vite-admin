<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import {
        initAxes,
        initCamera,
        initCameraControl,
        initStats
    } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()
    // 创建坐标轴并设置轴线粗细为20
    initAxes(scene)
    // 创建相机
    const camera = initCamera()
    camera.position.set(0, 0, 5)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    // 直线光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
    // doorColorTexture.offset.x = 0.5
    // doorColorTexture.offset.y = 0.5
    // doorColorTexture.center.set(0.5, 0.5)
    // doorColorTexture.rotation = Math.PI / 4
    // 设置纹理重复
    // doorColorTexture.repeat.set(2,2)
    // doorColorTexture.wrapS = THREE.MirroredRepeatWrapping
    // doorColorTexture.wrapT = THREE.RepeatWrapping

    // 透明纹理
    const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
    // ao贴图
    const doorAoTexture = textureLoader.load(
        './textures/door/ambientOcclusion.jpg'
    )
    // 置换贴图
    const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
    // 粗糙度贴图
    const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
    // 金属贴图
    const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
    // 法线贴图
    const normalTexture = textureLoader.load('./textures/door/normal.jpg')

    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 200, 200, 200)
    const material = new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        aoMap: doorAoTexture,
        aoMapIntensity: 1,
        displacementMap: doorHeightTexture,
        displacementScale: 0.05,
        roughnessMap: doorRoughnessTexture,
        roughness: 1,
        metalnessMap: doorMetalnessTexture,
        metalness: 1,
        normalMap: normalTexture,
        side: THREE.DoubleSide
    })
    const cube = new THREE.Mesh(cubeGeometry, material)
    scene.add(cube)
    cubeGeometry.setAttribute(
        'uv2',
        new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
    )

    const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 200, 200)
    const plane = new THREE.Mesh(planeGeometry, material)
    plane.position.set(2, 0, 0)
    scene.add(plane)

    // 给平面设置第二组uv
    planeGeometry.setAttribute(
        'uv2',
        new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
    )

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
        cameraControls.update()
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
