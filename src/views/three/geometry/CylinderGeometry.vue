<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width='80px'>
                    <el-form-item label="wireframe">
                        <el-checkbox v-model="form.wireframe" size="small"/>
                    </el-form-item>
                    <el-form-item label="顶部">
                        <el-slider
                            v-model="form.radiusTop"
                            :min="-40"
                            :max="40"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="底部">
                        <el-slider
                            v-model="form.radiusBottom"
                            :min="-40"
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
                    <el-form-item label="半径分段">
                        <el-slider
                            v-model="form.radialSegments"
                            :min="1"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="高度分段">
                        <el-slider
                            v-model="form.heightSegments"
                            :min="1"
                            :max="20"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="是否封闭">
                        <el-checkbox v-model="form.openEnded" size="small"/>
                    </el-form-item>
                    <el-form-item label="开始">
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
        radiusTop: 20,
        radiusBottom: 20,
        height: 20,
        radialSegments: 8,
        heightSegments: 8,
        openEnded: false,
        thetaStart: 0,
        thetaLength: 2 * Math.PI
    })
    const CylinderGeometry = new THREE.CylinderGeometry(form.radiusTop, form.radiusBottom,
        form.height, form.radialSegments, form.heightSegments, form.openEnded,
        form.thetaStart, form.thetaLength
    )
    const CylinderMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let cylinder = new THREE.Mesh(CylinderGeometry, CylinderMaterial)
    cylinder.castShadow = true
    cylinder.position.set(0,0,0)
    scene.add(cylinder)

    watch(form, (val) => {
        CylinderMaterial.wireframe = val.wireframe
        let newCylinderGeometry = new THREE.CylinderGeometry(form.radiusTop, form.radiusBottom,
            form.height, form.radialSegments, form.heightSegments, form.openEnded,
            form.thetaStart, form.thetaLength
        )
        scene.remove(cylinder)
        cylinder = new THREE.Mesh(newCylinderGeometry, CylinderMaterial)
        scene.add(cylinder)
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
