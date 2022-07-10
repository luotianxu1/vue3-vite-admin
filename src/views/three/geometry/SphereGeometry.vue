<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width='80px'>
                    <el-form-item label="wireframe">
                        <el-checkbox v-model="form.wireframe" size="small"/>
                    </el-form-item>
                    <el-form-item label="半径">
                        <el-slider
                            v-model="form.radius"
                            :min="0"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="竖直分段">
                        <el-slider
                            v-model="form.widthSegments"
                            :min="3"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="水平分段">
                        <el-slider
                            v-model="form.heightSegments"
                            :min="0"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="x轴开始">
                        <el-slider
                            v-model="form.phiStart"
                            :min="1"
                            :max="2 * Math.PI"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="长度">
                        <el-slider
                            v-model="form.phiLength"
                            :min="1"
                            :max="2 * Math.PI"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="y轴开始">
                        <el-slider
                            v-model="form.thetaStart"
                            :min="1"
                            :max="2 * Math.PI"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="长度">
                        <el-slider
                            v-model="form.thetaLength"
                            :min="1"
                            :max="2 * Math.PI"
                            :step="0.1"
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
    camera.position.set(-30,40,30)

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
        wireframe: false,
        radius: 4,
        widthSegments: 10,
        heightSegments: 10,
        phiStart: Math.PI,
        phiLength: Math.PI * 2,
        thetaStart: Math.PI,
        thetaLength: Math.PI
    })
    const SphereGeometry = new THREE.SphereGeometry(form.radius, form.widthSegments, form.heightSegments,
        form.phiStart, form.phiLength, form.thetaStart, form.thetaLength)
    const SphereMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let sphere = new THREE.Mesh(SphereGeometry, SphereMaterial)
    sphere.castShadow = true
    sphere.position.set(0,0,0)
    scene.add(sphere)

    watch(form, (val) => {
        SphereMaterial.wireframe = val.wireframe
        let newSphereGeometry = new THREE.SphereGeometry(form.radius, form.widthSegments, form.heightSegments,
            form.phiStart, form.phiLength, form.thetaStart, form.thetaLength)
        scene.remove(sphere)
        sphere = new THREE.Mesh(newSphereGeometry, SphereMaterial)
        scene.add(sphere)
    })

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
