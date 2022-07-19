<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import {
        initAmbientLight,
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
    camera.position.set(0, 0, 10)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true
    // 创建灯光
    initAmbientLight(scene)

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

    const sphereMetrial = new THREE.SphereBufferGeometry(3, 30, 30)
    const pointsMaterial = new THREE.PointsMaterial()
    pointsMaterial.size = 0.2
    pointsMaterial.color.set(0xfff000)
    // 相机深度而衰减
    pointsMaterial.sizeAttenuation = true

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./public/textures/particles/1.png')
    pointsMaterial.map = texture
    pointsMaterial.alphaMap = texture
    pointsMaterial.transparent = true
    pointsMaterial.depthWrite = false
    pointsMaterial.blending = THREE.AdditiveBlending

    const points = new THREE.Points(sphereMetrial, pointsMaterial)
    scene.add(points)

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

        .form {
            width: 300px;
            margin-right: 10px;

            .form-item {
                text-align: center;
                margin-top: 5px;
            }
        }

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
