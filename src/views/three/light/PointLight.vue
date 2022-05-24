<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="环境光">
                        <el-color-picker v-model="form.ambientLightColor" />
                    </el-form-item>
                    <el-form-item label="点光源">
                        <el-color-picker v-model="form.pointLightColor" />
                    </el-form-item>
                    <el-form-item label="距离">
                        <el-slider
                            v-model="form.distance"
                            :min="0"
                            :max="100"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="强度">
                        <el-slider
                            v-model="form.intensity"
                            :min="0"
                            :max="3"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="衰减">
                        <el-slider
                            v-model="form.decay"
                            :min="0"
                            :max="3"
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
    import CameraControls from 'camera-controls'
    import Stats from 'stats.js'
    import { addHouseAndTree } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    addHouseAndTree(scene)

    // 创建光源
    const ambientLight = new THREE.AmbientLight('#0c0c0c')
    scene.add(ambientLight)

    const pointColor = '#ccffcc'
    const pointLight = new THREE.PointLight(pointColor)
    pointLight.decay = 0.1
    pointLight.castShadow = true
    scene.add(pointLight)

    const helper = new THREE.PointLightHelper(pointLight)
    scene.add(helper)
    const shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera)
    scene.add(shadowHelper)

    const sphereLight = new THREE.SphereGeometry(0.2)
    const sphereLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xac6c25
    })
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)
    sphereLightMesh.castShadow = true
    sphereLightMesh.position.set(3, 0, 5)
    scene.add(sphereLightMesh)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.setClearColor(new THREE.Color(0x000000))

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    camera.position.set(-30, 40, 30)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    CameraControls.install({ THREE })
    const cameraControls = new CameraControls(camera, renderer.domElement)
    cameraControls.draggingDampingFactor = 5 // 拖动阻尼惯性
    const clock = new THREE.Clock()

    // 创建坐标轴并设置轴线粗细为20
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    let stats
    const initStats = (el: HTMLElement) => {
        stats = new Stats()
        stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        stats.dom.style.position = 'absolute'
        stats.dom.style.left = '0px'
        stats.dom.style.top = '0px'
        el && el.appendChild(stats.dom)
    }

    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        // 创建渲染器
        const width = body.offsetWidth
        const height = body.offsetHeight
        renderer.setSize(width, height)
        body.appendChild(renderer.domElement)
        initStats(body)
        renderScene()
    }

    let invert = 1
    let phase = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        cameraControls.update(delta)
        helper.update()
        shadowHelper.update()
        stats.update()
        pointLight.position.copy(sphereLightMesh.position)

        // move the light simulation
        if (phase > 2 * Math.PI) {
            invert = invert * -1
            phase -= 2 * Math.PI
        } else {
            phase += 0.01
        }
        sphereLightMesh.position.z = +(25 * Math.sin(phase))
        sphereLightMesh.position.x = +(14 * Math.cos(phase))
        sphereLightMesh.position.y = 5

        if (invert < 0) {
            const pivot = 14
            sphereLightMesh.position.x =
                invert * (sphereLightMesh.position.x - pivot) + pivot
        }

        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    const form = reactive({
        ambientLightColor: '#1c1c1c',
        pointLightColor: '#ccffcc',
        distance: 0,
        intensity: 1,
        decay: 1
    })

    watch(form, (val) => {
        ambientLight.color = new THREE.Color(val.ambientLightColor)
        pointLight.color = new THREE.Color(val.pointLightColor)
        pointLight.distance = val.distance
        pointLight.intensity = val.intensity
        pointLight.decay = val.decay
    })
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
