<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="环境光">
                        <el-color-picker v-model="form.ambientLightColor" />
                    </el-form-item>
                    <el-form-item label="平行光">
                        <el-color-picker v-model="form.directionalColor" />
                    </el-form-item>
                    <el-form-item label="强度">
                        <el-slider
                            v-model="form.intensity"
                            :min="0"
                            :max="5"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="shadowDebug" label-width='110px'>
                        <el-checkbox v-model="form.shadowDebug" size="large" />
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
    // import Stats from 'stats.js'
    import Stats from 'three/examples/jsm/libs/stats.module'
    import { addDefaultCubeAndSphere, addGroundPlane } from '@/utils/three/util'
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

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

    const target = new THREE.Object3D()
    target.position.set(5, 0, 0)

    const directionalLight = new THREE.DirectionalLight('#ff5808')
    directionalLight.position.set(-40, 60, -10)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.near = 2
    directionalLight.shadow.camera.far = 80
    directionalLight.shadow.camera.left = -30
    directionalLight.shadow.camera.right = 30
    directionalLight.shadow.camera.top = 30
    directionalLight.shadow.camera.bottom = -30
    directionalLight.intensity = 0.5
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    const debugCamera = new THREE.CameraHelper(directionalLight.shadow.camera)
    scene.add(debugCamera)

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

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
    const clock = new THREE.Clock()

    // 创建坐标轴并设置轴线粗细为20
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    let stats
    const initStats = (el: HTMLElement) => {
        stats = Stats()
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
    const renderScene = () => {
        const delta = clock.getDelta()
        stats.update()
        controls.update()
        cube.rotation.x += delta
        cube.rotation.y += delta
        cube.rotation.z += delta
        step += delta
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
        sphereLightMesh.position.z = -8
        sphereLightMesh.position.y = +(27 * Math.sin(step / 3))
        sphereLightMesh.position.x = 10 + 26 * Math.cos(step / 3)
        directionalLight.position.copy(sphereLightMesh.position)
        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    const form = reactive({
        ambientLightColor: '#1c1c1c',
        directionalColor: '#ff5808',
        intensity: 1,
        shadowDebug: true,
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
        directionalLight.color = new THREE.Color(val.directionalColor)
        directionalLight.intensity = val.intensity
        val.shadowDebug ? scene.add(debugCamera) : scene.remove(debugCamera)
        switch (val.target) {
            case 'Plane':
                directionalLight.target = plane
                break
            case 'Sphere':
                directionalLight.target = sphere
                break
            case 'Cube':
                directionalLight.target = cube
                break
            default:
                directionalLight.target = plane
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
