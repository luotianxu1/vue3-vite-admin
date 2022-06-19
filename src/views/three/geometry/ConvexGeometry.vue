<template>
    <div class="page">
        <div class="form">
            <el-button @click="generatePoints">绘制</el-button>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
    import { Vector3 } from 'three/src/math/Vector3'
    import {
        initAxes,
        initCamera,
        initCameraControl,
        initDefaultLighting,
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
    camera.position.set(-30, 40, 30)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true
    // 创建灯光
    initDefaultLighting(scene)

    let spGroup
    const generatePoints = () => {
        if (spGroup) {
            scene.remove(spGroup)
        }

        let points:any = []
        for (let i = 0; i < 20; i++) {
            let randomX = -15 + Math.round(Math.random() * 30)
            let randomY = -15 + Math.round(Math.random() * 30)
            let randomZ = -15 + Math.round(Math.random() * 30)
            points.push(new Vector3(randomX, randomY, randomZ))
        }

        spGroup = new THREE.Object3D()

        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: false
        })
        const normalMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        })
        points.forEach(function (point) {
            let spGeom = new THREE.SphereGeometry(0.2)
            let spMesh = new THREE.Mesh(spGeom, material)
            spMesh.position.copy(point)
            spGroup.add(spMesh)
        })

        let convexGeometry = new ConvexGeometry(points)
        const mesh2 = new THREE.Mesh(convexGeometry, normalMaterial)
        mesh2.material.side = THREE.FrontSide
        mesh2.renderOrder = 1
        spGroup.add(mesh2)

        scene.add(spGroup)
    }

    generatePoints()

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

        .form {
            width: 70px;
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
