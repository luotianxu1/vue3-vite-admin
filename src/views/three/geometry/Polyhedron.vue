<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width='70px'>
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
                    <el-form-item label="detail">
                        <el-slider
                            v-model="form.detail"
                            :min="0"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="种类">
                        <el-select
                            v-model="form.type"
                            class="m-2"
                            placeholder="Select"
                            size="large"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
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
        detail: 0,
        type: 'Icosahedron'
    })
    const options = [
        {
            value: 'Icosahedron',
            label: '二十面体'
        },
        {
            value: 'Tetrahedron',
            label: '四面体'
        },
        {
            value: 'Octahedron',
            label: '八面体'
        },
        {
            value: 'Dodecahedron',
            label: '十二面体'
        },
        {
            value: 'polyhedron',
            label: '多面体'
        }
    ]
    const Geometry = new THREE.IcosahedronGeometry(form.radius, form.detail)
    const Material = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let polyhedron = new THREE.Mesh(Geometry, Material)
    polyhedron.castShadow = true
    polyhedron.position.set(0,0,0)
    scene.add(polyhedron)

    watch(form, (val) => {
        let newGeometry
        let vertices
        let indices
        scene.remove(polyhedron)
        Material.wireframe = val.wireframe
        switch (val.type) {
            case 'Icosahedron':
                newGeometry = new THREE.IcosahedronGeometry(form.radius, form.detail)
                break
            case 'Tetrahedron':
                newGeometry = new THREE.TetrahedronGeometry(form.radius, form.detail)
                break
            case 'Octahedron':
                newGeometry = new THREE.OctahedronGeometry(form.radius, form.detail)
                break
            case 'Dodecahedron':
                newGeometry = new THREE.DodecahedronGeometry(form.radius, form.detail)
                break
            case 'polyhedron':
                vertices = [
                    1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
                ]
                indices = [
                    2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
                ]
                newGeometry = new THREE.PolyhedronGeometry(vertices, indices, form.radius, form.detail)
                break
            default:
                newGeometry = new THREE.IcosahedronGeometry(form.radius, form.detail)
        }
        polyhedron = new THREE.Mesh(newGeometry, Material)
        scene.add(polyhedron)
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
