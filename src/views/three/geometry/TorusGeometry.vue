<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width='80px'>
                    <el-form-item label="wireframe">
                        <el-checkbox v-model="form.wireframe" size="small"/>
                    </el-form-item>
                    <el-form-item label="尺寸">
                        <el-slider
                            v-model="form.radius"
                            :min="0"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="半径">
                        <el-slider
                            v-model="form.tube"
                            :min="0"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="长度段数">
                        <el-slider
                            v-model="form.radialSegments"
                            :min="1"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="宽度段数">
                        <el-slider
                            v-model="form.tubularSegments"
                            :min="1"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="结束">
                        <el-slider
                            v-model="form.arc"
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
        radius: 10,
        tube: 10,
        radialSegments: 8,
        tubularSegments: 6,
        arc: 2 * Math.PI
    })
    const TorusGeometry = new THREE.TorusGeometry(form.radius, form.tube, Math.round(form.radialSegments),
        Math.round(form.tubularSegments), form.arc)
    const TorusMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let torus = new THREE.Mesh(TorusGeometry, TorusMaterial)
    torus.castShadow = true
    torus.position.set(0,0,0)
    scene.add(torus)

    watch(form, (val) => {
        TorusMaterial.wireframe = val.wireframe
        let newTorusGeometry = new THREE.TorusGeometry(form.radius, form.tube, Math.round(form.radialSegments),
            Math.round(form.tubularSegments), form.arc)
        scene.remove(torus)
        torus = new THREE.Mesh(newTorusGeometry, TorusMaterial)
        scene.add(torus)
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
