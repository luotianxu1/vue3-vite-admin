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
        initDefaultLighting,
        initLargeGroundPlane,
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
    // 创建平面
    const groundPlane = initLargeGroundPlane(scene)
    groundPlane.position.y = -10

    const drawShape = () => {
        var shape = new THREE.Shape()
        shape.moveTo(10, 10)
        shape.lineTo(10, 40)
        shape.bezierCurveTo(15, 25, 25, 25, 30, 40)
        shape.splineThru([
            new THREE.Vector2(32, 30),
            new THREE.Vector2(28, 20),
            new THREE.Vector2(30, 10)
        ])
        shape.quadraticCurveTo(20, 15, 10, 10)
        let hole1 = new THREE.Path()
        hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true)
        shape.holes.push(hole1)
        let hole2 = new THREE.Path()
        hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true)
        shape.holes.push(hole2)
        let hole3 = new THREE.Path()
        hole3.absarc(20, 16, 2, 0, Math.PI, true)
        shape.holes.push(hole3)
        return shape
    }
    const ShapeMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    const ShapeGeometry = new THREE.ShapeGeometry(drawShape())
    let shape = new THREE.Mesh(ShapeGeometry, ShapeMaterial)
    scene.add(shape)

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
            width: 200px;
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
