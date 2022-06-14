<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width='100px'>
                    <el-form-item label="wireframe">
                        <el-checkbox v-model="form.wireframe" size="small"/>
                    </el-form-item>
                    <el-form-item label="宽度">
                        <el-slider
                            v-model="form.width"
                            :min="0"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="高度">
                        <el-slider
                            v-model="form.height"
                            :min="0"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="宽度段数">
                        <el-slider
                            v-model="form.widthSegments"
                            :min="1"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="高度段数">
                        <el-slider
                            v-model="form.heightSegments"
                            :min="1"
                            :max="40"
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
        width: 20,
        height: 20,
        widthSegments: 1,
        heightSegments: 1
    })
    const planeGeometry = new THREE.PlaneGeometry(20,20)
    const planeMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.castShadow = true
    plane.position.set(15,5,0)
    scene.add(plane)

    watch(form, (val) => {
        planeMaterial.wireframe = val.wireframe
        let newPlaneGeometry = new THREE.PlaneGeometry(form.width,form.height,form.widthSegments,form.heightSegments)
        scene.remove(plane)
        plane = new THREE.Mesh(newPlaneGeometry, planeMaterial)
        scene.add(plane)
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

    let step = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        cameraControls.update(delta)
        stats.update()
        plane.rotation.y = step+=0.01
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
