<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="环境光">
                        <el-color-picker v-model="form.ambientLightColor" />
                    </el-form-item>
                    <el-form-item label="点光源">
                        <el-color-picker v-model="form.spotColor" />
                    </el-form-item>
                    <el-form-item label="角度">
                        <el-slider
                            v-model="form.angle"
                            :min="0"
                            :max="Math.PI * 2"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="强度">
                        <el-slider
                            v-model="form.intensity"
                            :min="0"
                            :max="5"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="递减">
                        <el-slider
                            v-model="form.penumbra"
                            :min="0"
                            :max="1"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="距离">
                        <el-slider
                            v-model="form.distance"
                            :min="0"
                            :max="200"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="shadowDebug">
                        <el-checkbox v-model="form.shadowDebug" size="large" />
                    </el-form-item>
                    <el-form-item label="阴影">
                        <el-checkbox v-model="form.castShadow" size="large" />
                    </el-form-item>
                    <el-form-item label="转动">
                        <el-checkbox v-model="form.movingLight" size="large" />
                    </el-form-item>
                    <el-form-item label="指向">
                        <el-select
                            v-model="form.target"
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
    import CameraControls from 'camera-controls'
    import Stats from 'stats.js'
    import { addDefaultCubeAndSphere, addGroundPlane } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    // 创建物体
    const cubeAndSphere = addDefaultCubeAndSphere(scene)
    const cube = cubeAndSphere.cube
    const sphere = cubeAndSphere.sphere
    const plane = addGroundPlane(scene)

    // 创建光源
    const ambiColor = '#1c1c1c'
    const ambientLight = new THREE.AmbientLight(ambiColor)
    scene.add(ambientLight)

    const spotLight0 = new THREE.SpotLight(0xcccccc)
    spotLight0.position.set(-40, 30, -10)
    spotLight0.lookAt(plane.position)
    scene.add(spotLight0)

    const target = new THREE.Object3D()
    target.position.set(5, 0, 0)

    const spotLight = new THREE.SpotLight('#ffffff')
    spotLight.position.set(-40, 20, -10)
    spotLight.castShadow = true
    spotLight.shadow.camera.near = 1
    spotLight.shadow.camera.far = 100
    spotLight.target = plane
    spotLight.distance = 0
    spotLight.angle = 0.4
    spotLight.shadow.camera.fov = 120
    scene.add(spotLight)

    const debugCamera = new THREE.CameraHelper(spotLight.shadow.camera)
    scene.add(debugCamera)
    const pp = new THREE.SpotLightHelper(spotLight)
    scene.add(pp)

    const sphereLight = new THREE.SphereGeometry(0.2)
    const sphereLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xac6c25
    })
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)
    sphereLightMesh.castShadow = true
    sphereLightMesh.position.set(3, 3, 3)
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
    camera.lookAt(scene.position)

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

    let step = 0
    let invert = 1
    let phase = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        cameraControls.update(delta)
        stats.update()
        cube.rotation.x += delta
        cube.rotation.y += delta
        cube.rotation.z += delta
        step += delta
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))

        if (form.movingLight) {
            if (phase > 2 * Math.PI) {
                invert = invert * -1
                phase -= 2 * Math.PI
            } else {
                phase += delta
            }
            sphereLightMesh.position.z = +(7 * Math.sin(phase))
            sphereLightMesh.position.x = +(14 * Math.cos(phase))
            sphereLightMesh.position.y = 15
            if (invert < 0) {
                let pivot = 14
                sphereLightMesh.position.x =
                    invert * (sphereLightMesh.position.x - pivot) + pivot
            }
            spotLight.position.copy(sphereLightMesh.position)
        }
        pp.update()
        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    const form = reactive({
        ambientLightColor: '#1c1c1c',
        spotColor: '#ffffff',
        angle: 0.4,
        intensity: 1,
        penumbra: 0,
        distance: 0,
        shadowDebug: true,
        castShadow: true,
        movingLight: true,
        target: 'Plane'
    })
    const options = [
        {
            value: 'Plane',
            label: 'Plane'
        },
        {
            value: 'Sphere',
            label: 'Sphere'
        },
        {
            value: 'Cube',
            label: 'Cube'
        }
    ]
    watch(form, (val) => {
        ambientLight.color = new THREE.Color(val.ambientLightColor)
        spotLight.color = new THREE.Color(val.spotColor)
        spotLight.angle = val.angle
        spotLight.intensity = val.intensity
        spotLight.penumbra = val.penumbra
        spotLight.distance = val.distance
        console.log(val.distance)
        val.shadowDebug ? scene.add(debugCamera) : scene.remove(debugCamera)
        spotLight.castShadow = val.castShadow
        switch (val.target) {
            case 'Plane':
                spotLight.target = plane
                break
            case 'Sphere':
                spotLight.target = sphere
                break
            case 'Cube':
                spotLight.target = cube
                break
            default:
                spotLight.target = plane
        }
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
