<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width='80px'>
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
                            :min="3"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="深度">
                        <el-slider
                            v-model="form.depth"
                            :min="0"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="宽度">
                        <el-slider
                            v-model="form.widthSegments"
                            :min="1"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="高度">
                        <el-slider
                            v-model="form.heightSegments"
                            :min="1"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="深度">
                        <el-slider
                            v-model="form.depthSegments"
                            :min="1"
                            :max="20"
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
        width: 4,
        height: 10,
        depth: 10,
        widthSegments: 4,
        heightSegments: 4,
        depthSegments: 4
    })
    const BoxGeometry = new THREE.BoxGeometry(form.width, form.height, form.depth, Math.round(
        form.widthSegments), Math.round(form.heightSegments), Math.round(
        form.depthSegments))
    const BoxMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let box = new THREE.Mesh(BoxGeometry, BoxMaterial)
    box.castShadow = true
    box.position.set(0,0,0)
    scene.add(box)

    watch(form, (val) => {
        BoxMaterial.wireframe = val.wireframe
        let newBoxGeometry = new THREE.BoxGeometry(form.width, form.height, form.depth, Math.round(
            form.widthSegments), Math.round(form.heightSegments), Math.round(
            form.depthSegments))
        scene.remove(box)
        box = new THREE.Mesh(newBoxGeometry, BoxMaterial)
        scene.add(box)
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
