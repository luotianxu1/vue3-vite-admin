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
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        30
    )
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    camera.position.set(0, 0, 40)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true
    // 创建灯光
    initAmbientLight(scene)

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

    const creatPoints = (url,size=0.5) => {
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load(
            `./public/textures/particles/${url}.png`
        )
        const pointsMaterial = new THREE.PointsMaterial()
        pointsMaterial.size = size
        pointsMaterial.sizeAttenuation = true
        pointsMaterial.map = texture
        pointsMaterial.alphaMap = texture
        pointsMaterial.transparent = true
        pointsMaterial.depthWrite = false
        pointsMaterial.blending = THREE.AdditiveBlending
        // 启动顶点材质
        pointsMaterial.vertexColors = true

        const particleGeometry = new THREE.BufferGeometry()
        const count = 5000
        // 设置缓冲区数组
        const positions = new Float32Array(count * 3)
        // 设置顶点颜色
        const colors = new Float32Array(count * 3)
        // 设置顶点
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100
            colors[i] = Math.random()
        }
        particleGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )
        particleGeometry.setAttribute(
            'color',
            new THREE.BufferAttribute(colors, 3)
        )
        const points = new THREE.Points(particleGeometry, pointsMaterial)
        scene.add(points)
        return points
    }

    // const points = creatPoints('zs2')
    const points2 = creatPoints('xh',1)

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

    // 设置时钟
    const clock = new THREE.Clock()
    const renderScene = () => {
        let time = clock.getElapsedTime()
        // points.rotation.x = time * 0.3
        points2.rotation.x = time * 0.2
        points2.rotation.y = time * 0.05
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
