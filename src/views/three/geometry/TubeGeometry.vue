<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="segments">
                        <el-slider
                            v-model="form.segments"
                            :min="0"
                            :max="200"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="radius">
                        <el-slider
                            v-model="form.radius"
                            :min="0"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="radiusSegments">
                        <el-slider
                            v-model="form.radiusSegments"
                            :min="0"
                            :max="100"
                            :step="1"
                        />
                    </el-form-item>
                </el-form>
            </div>
        </div>
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
    import { Vector3 } from 'three/src/math/Vector3'

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

    const form = reactive({
        segments: 64,
        radius: 1,
        radiusSegments: 8
    })

    let mesh
    let points: any = []
    for (let i = 0; i < 20; i++) {
        let randomX = -15 + Math.round(Math.random() * 30)
        let randomY = -15 + Math.round(Math.random() * 30)
        let randomZ = -15 + Math.round(Math.random() * 30)
        points.push(new Vector3(randomX, randomY, randomZ))
    }
    const generatePoints = () => {
        if (mesh) {
            scene.remove(mesh)
        }
        const normalMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        })

        const geometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(points),
            form.segments,
            form.radius,
            form.radiusSegments,
            false
        )
        mesh = new THREE.Mesh(geometry, normalMaterial)
        mesh.castShadow = true
        scene.add(mesh)
    }

    generatePoints()
    watch(form, () => {
        generatePoints()
    })

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
            width: 250px;
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
