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
    camera.position.set(0, 20, 40)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    scene.add(new THREE.AmbientLight(0x888888))

    const pointLight = new THREE.PointLight("#ffffff")
    scene.add(pointLight)
    const sphereLight = new THREE.SphereGeometry(0.2)
    const sphereLightMaterial = new THREE.MeshStandardMaterial({color: 0xff5808})
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)
    scene.add(sphereLightMesh)

    const urls = [
        './textures/cubemap/car/right.png',
        './textures/cubemap/car/left.png',
        './textures/cubemap/car/top.png',
        './textures/cubemap/car/bottom.png',
        './textures/cubemap/car/front.png',
        './textures/cubemap/car/back.png'
    ]
    const cubeLoader = new THREE.CubeTextureLoader()
    scene.background = cubeLoader.load(urls)

    const sphere = new THREE.SphereGeometry(8, 50, 50)
    const cubeMaterial = new THREE.MeshStandardMaterial({
        envMap: scene.background,
        color: 0xffffff,
        metalness: 1,
        roughness: 0.5
    })

    const cubeMaterialWithMetalMap = cubeMaterial.clone()
    cubeMaterialWithMetalMap.metalnessMap = textureLoader.load('./textures/engraved/roughness-map.jpg')
    const cubeMaterialWithRoughnessMap = cubeMaterial.clone()
    cubeMaterialWithRoughnessMap.roughnessMap = textureLoader.load('./textures/engraved/roughness-map.jpg')

    const cube1 = new THREE.Mesh(sphere, cubeMaterialWithMetalMap)
    cube1.castShadow = true
    cube1.position.x = -10
    cube1.rotation.y = 1/3*Math.PI
    scene.add(cube1)

    const cube2 = new THREE.Mesh(sphere, cubeMaterialWithRoughnessMap)
    cube2.castShadow = true
    scene.add(cube2)
    cube2.position.x = 10
    cube2.rotation.y = -1/3*Math.PI

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

    let invert = 1
    let phase = 0
    const renderScene = () => {
        if (phase > 2 * Math.PI) {
            invert = invert * -1
            phase -= 2 * Math.PI
        } else {
            phase += 0.02
        }
        sphereLightMesh.position.z = +(21 * (Math.sin(phase)))
        sphereLightMesh.position.x = -14 + (14 * (Math.cos(phase)))
        sphereLightMesh.position.y = 5
        if (invert < 0) {
            let pivot = 0
            sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot
        }
        pointLight.position.copy(sphereLightMesh.position)
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
