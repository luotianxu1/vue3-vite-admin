<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import cubeMap from '../../../assets/img/three/texture/general/stone.jpg'
    import bumpMap from '../../../assets/img/three/texture/general/stone-bump.jpg'
    import * as THREE from 'three'
    import {
        initAxes,
        initCamera,
        initCameraControl,
        initStats,
        initDefaultLighting,
        addLargeGroundPlane
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

    const groundPlane = addLargeGroundPlane(scene)
    groundPlane.position.y = -10

    initDefaultLighting(scene)
    scene.add(new THREE.AmbientLight(0x444444))

    const textureLoader = new THREE.TextureLoader()

    const cube = new THREE.BoxGeometry(16, 16, 16)
    const cubeMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(
            cubeMap
        ),
        metalness: 0.2,
        roughness: 0.07
    })
    const cubeMaterialWithBumpMap = cubeMaterial.clone()
    cubeMaterialWithBumpMap.bumpMap = textureLoader.load(
        bumpMap
    )

    const cube1 = new THREE.Mesh(cube, cubeMaterial)
    cube1.castShadow = true
    scene.add(cube1)
    cube1.position.x = -17
    cube1.rotation.y = (1 / 3) * Math.PI

    const cube2 = new THREE.Mesh(cube, cubeMaterialWithBumpMap)
    cube2.castShadow = true
    scene.add(cube2)
    cube2.position.x = 17
    cube2.rotation.y = (1 / 3) * Math.PI

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

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
