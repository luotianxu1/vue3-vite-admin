<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
import polyheTexture from '../../../assets/img/three/texture/general/brick-wall.jpg'
import sphereTexture from '../../../assets/img/three/texture/general/floor-wood.jpg'
import cubeTexture from '../../../assets/img/three/texture/general/brick-wall.jpg'
    import * as THREE from 'three'
    import {
        initAxes,
        initCamera,
        initCameraControl,
        initStats,
        initDefaultLighting,
        addGeometry,
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

    const polyhedron = new THREE.IcosahedronGeometry(8, 0)
    const polyhedronMesh = addGeometry(
        scene,
        polyhedron,
        'polyhedron',
        textureLoader.load(
            polyheTexture
        )
    )
    polyhedronMesh.position.x = 20

    const sphere = new THREE.SphereGeometry(5, 20, 20)
    const sphereMesh = addGeometry(
        scene,
        sphere,
        'sphere',
        textureLoader.load(sphereTexture)
    )

    const cube = new THREE.BoxGeometry(10, 10, 10)
    const cubeMesh = addGeometry(
        scene,
        cube,
        'cube',
        textureLoader.load(cubeTexture)
    )
    cubeMesh.position.x = -20

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)
    const clock = new THREE.Clock()
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
        const delta = clock.getDelta()
        polyhedronMesh.rotation.x += 0.01
        sphereMesh.rotation.y += 0.01
        cubeMesh.rotation.z += 0.01
        cameraControls.update(delta)
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
