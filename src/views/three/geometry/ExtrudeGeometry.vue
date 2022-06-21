<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="130px">
                    <el-form-item label="bevelThickness">
                        <el-slider
                            v-model="form.bevelThickness"
                            :min="0"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="bevelSize">
                        <el-slider
                            v-model="form.bevelSize"
                            :min="0"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="bevelSegments">
                        <el-slider
                            v-model="form.bevelSegments"
                            :min="0"
                            :max="30"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="curveSegments">
                        <el-slider
                            v-model="form.curveSegments"
                            :min="1"
                            :max="30"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="steps">
                        <el-slider
                            v-model="form.steps"
                            :min="1"
                            :max="5"
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
        bevelThickness: 2,
        bevelSize: 0.5,
        bevelEnabled: true,
        bevelSegments: 3,
        curveSegments: 12,
        steps: 1
    })

    const drawShape = () => {
        let shape = new THREE.Shape()
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

    const ExtrudeMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    const ExtrudeGeometry = new THREE.ExtrudeGeometry(drawShape(), {
        bevelThickness: form.bevelThickness,
        bevelSize: form.bevelSize,
        bevelSegments: form.bevelSegments,
        bevelEnabled: form.bevelEnabled,
        curveSegments: form.curveSegments,
        steps: form.steps
    })
    let shape = new THREE.Mesh(ExtrudeGeometry, ExtrudeMaterial)
    shape.castShadow = true
    scene.add(shape)

    watch(form, (val) => {
        if (shape) {
            scene.remove(shape)
        }
        const newExtrudeGeometry = new THREE.ExtrudeGeometry(drawShape(), {
            bevelThickness: val.bevelThickness,
            bevelSize: val.bevelSize,
            bevelSegments: val.bevelSegments,
            bevelEnabled: val.bevelEnabled,
            curveSegments: val.curveSegments,
            steps: val.steps
        })
        shape = new THREE.Mesh(newExtrudeGeometry, ExtrudeMaterial)
        shape.castShadow = true
        scene.add(shape)
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
