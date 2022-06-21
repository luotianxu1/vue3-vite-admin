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
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="半径">
                        <el-slider
                            v-model="form.tube"
                            :min="0"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="长度段数">
                        <el-slider
                            v-model="form.radialSegments"
                            :min="1"
                            :max="400"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="宽度段数">
                        <el-slider
                            v-model="form.tubularSegments"
                            :min="1"
                            :max="200"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="形状">
                        <el-slider
                            v-model="form.p"
                            :min="1"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="形状">
                        <el-slider
                            v-model="form.q"
                            :min="1"
                            :max="10"
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
        radius: 8,
        tube: 5,
        radialSegments: 200,
        tubularSegments: 200,
        p: 2,
        q: 3
    })
    const TorusKnotGeometry = new THREE.TorusKnotGeometry(form.radius, form.tube, Math.round(
        form.tubularSegments), Math.round(form.radialSegments), Math.round(
        form.p), Math.round(form.q))
    const TorusKnotMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let torusKnot = new THREE.Mesh(TorusKnotGeometry, TorusKnotMaterial)
    torusKnot.castShadow = true
    torusKnot.position.set(0,0,0)
    scene.add(torusKnot)

    watch(form, (val) => {
        TorusKnotMaterial.wireframe = val.wireframe
        let newTorusKnotGeometry = new THREE.TorusKnotGeometry(form.radius, form.tube, Math.round(
            form.tubularSegments), Math.round(form.radialSegments), Math.round(
            form.p), Math.round(form.q))
        scene.remove(torusKnot)
        torusKnot = new THREE.Mesh(newTorusKnotGeometry, TorusKnotMaterial)
        scene.add(torusKnot)
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
