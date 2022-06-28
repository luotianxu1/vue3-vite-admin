<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="100px">
                    <el-form-item label="cubePosX">
                        <el-slider
                            v-model="form.cubePosX"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="cubePosY">
                        <el-slider
                            v-model="form.cubePosY"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="cubePosZ">
                        <el-slider
                            v-model="form.cubePosZ"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="spherePosX">
                        <el-slider
                            v-model="form.spherePosX"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="spherePosY">
                        <el-slider
                            v-model="form.spherePosY"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="spherePosZ">
                        <el-slider
                            v-model="form.spherePosZ"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="groupPosX">
                        <el-slider
                            v-model="form.groupPosX"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="groupPosY">
                        <el-slider
                            v-model="form.groupPosY"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="groupPosZ">
                        <el-slider
                            v-model="form.groupPosZ"
                            :min="-20"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="grouping">
                        <el-checkbox v-model="form.grouping" size="small" />
                    </el-form-item>
                    <el-form-item label="rotate">
                        <el-checkbox v-model="form.rotate" size="small" />
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
        cubePosX: 0,
        cubePosY: 3,
        cubePosZ: 10,
        spherePosX: 10,
        spherePosY: 5,
        spherePosZ: 0,
        groupPosX: 10,
        groupPosY: 5,
        groupPosZ: 0,
        grouping: false,
        rotate: false,
        cubeScale: 1,
        sphereScale: 1,
        groupScale: 1
    })

    const createMesh = (geom) => {
        const meshMaterial = new THREE.MeshNormalMaterial()
        meshMaterial.side = THREE.DoubleSide
        return new THREE.Mesh(geom, meshMaterial)
    }

    let sphere
    let cube
    let group
    const generate = () => {
        scene.remove(group)
        sphere = createMesh(new THREE.SphereGeometry(5, 10, 10))
        cube = createMesh(new THREE.BoxGeometry(6, 6, 6))
        sphere.position.set(form.spherePosX, form.spherePosY, form.spherePosZ)
        sphere.scale.set(form.sphereScale, form.sphereScale, form.sphereScale)
        cube.position.set(form.cubePosX, form.cubePosY, form.cubePosZ)
        cube.scale.set(form.cubeScale, form.cubeScale, form.cubeScale)
        group = new THREE.Group()
        group.position.set(form.groupPosX, form.groupPosY, form.groupPosZ)
        group.scale.set(form.groupScale, form.groupScale, form.groupScale)
        group.add(sphere)
        group.add(cube)
        scene.add(group)
    }

    generate()

    watch(form, () => {
        generate()
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

        if (form.grouping && form.rotate) {
            group.rotation.y = step += 0.01
        }

        if (form.rotate && !form.grouping) {
            sphere.rotation.y = step += 0.01
            cube.rotation.y = step += 0.01
        }
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
