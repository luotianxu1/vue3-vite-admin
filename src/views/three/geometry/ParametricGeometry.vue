<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="slices">
                        <el-slider
                            v-model="form.slices"
                            :min="10"
                            :max="120"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="stacks">
                        <el-slider
                            v-model="form.stacks"
                            :min="10"
                            :max="120"
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
    import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'
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
        slices: 50,
        stacks: 50,
        type: 'radialWave'
    })
    const options = [
        {
            value: 'radialWave',
            label: 'radialWave'
        },
        {
            value: 'klein',
            label: 'klein'
        }
    ]

    const radialWave = function (u, v, optionalTarget) {
        const result = optionalTarget || new THREE.Vector3()
        const r = 50
        const x = Math.sin(u) * r
        const z = Math.sin(v / 2) * 2 * r
        const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8
        return result.set( x, y, z )
    }

    const klein = function (u, v, optionalTarget) {
        const result = optionalTarget || new THREE.Vector3()
        u *= Math.PI
        v *= 2 * Math.PI
        u = u * 2
        let x, y, z
        if (u < Math.PI) {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v)
            z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
        } else {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI)
            z = -8 * Math.sin(u)
        }
        y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v)
        return result.set( x, y, z )
    }

    const normalMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    const geometry = new ParametricGeometry( radialWave, form.slices, form.stacks )
    let shape = new THREE.Mesh( geometry, normalMaterial )
    scene.add( shape )

    watch(form, (val) => {
        if (shape) {
            scene.remove(shape)
        }
        let newGeometry
        switch (val.type) {
            case 'radialWave':
                newGeometry = new ParametricGeometry( radialWave, form.slices, form.stacks )
                break
            case 'klein':
                newGeometry = new ParametricGeometry( klein, form.slices, form.stacks )
                break
            default:
                newGeometry = new ParametricGeometry( radialWave, form.slices, form.stacks )
        }
        shape = new THREE.Mesh(newGeometry, normalMaterial)
        scene.add(shape)
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
