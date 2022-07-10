<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="70px">
                    <el-form-item label="分段">
                        <el-slider
                            v-model="form.segments"
                            :min="0"
                            :max="50"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="开始">
                        <el-slider
                            v-model="form.phiStart"
                            :min="0"
                            :max="2 * Math.PI"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="结束">
                        <el-slider
                            v-model="form.phiLength"
                            :min="0"
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
        segments: 12,
        phiStart: 0,
        phiLength: 2 * Math.PI
    })
    let spGroup

    watch(form, (val) => {
        generatePoints(val.segments, val.phiStart, val.phiLength)
    })

    const generatePoints = (segments, phiStart, phiLength) => {
        if (spGroup) {
            scene.remove(spGroup)
        }

        let points: any = []
        let height = 5
        let count = 30
        for (let i = 0; i < count; i++) {
            points.push(
                new THREE.Vector2(
                    (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12,
                    i - count + count / 2
                )
            )
        }

        spGroup = new THREE.Object3D()
        let material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: false
        })
        points.forEach(function (point) {
            let spGeom = new THREE.SphereGeometry(0.2)
            let spMesh = new THREE.Mesh(spGeom, material)
            spMesh.position.set(point.x, point.y, 0)

            spGroup.add(spMesh)
        })
        scene.add(spGroup)

        let latheGeometry = new THREE.LatheGeometry(
            points,
            segments,
            phiStart,
            phiLength
        )
        let latheMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        })
        const lathe = new THREE.Mesh(latheGeometry,latheMaterial)
        spGroup.add(lathe)
    }

    generatePoints(form.segments,form.phiStart, form.phiLength)

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
