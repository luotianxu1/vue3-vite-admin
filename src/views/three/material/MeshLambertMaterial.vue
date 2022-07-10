<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="wireframe">
                        <el-checkbox v-model="form.wireframe" size="small" />
                    </el-form-item>
                    <el-form-item label="颜色">
                        <el-color-picker v-model="form.color" />
                    </el-form-item>
                    <el-form-item label="自发光">
                        <el-color-picker v-model="form.emmissiveColor" color-format="rgb"/>
                    </el-form-item>
                    <el-form-item label="形状">
                        <el-select
                            v-model="form.selectedMesh"
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
    camera.position.x = -20
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(new THREE.Vector3(10, 0, 0))

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4)
    const groundMesh = new THREE.Mesh(
        groundGeom,
        new THREE.MeshBasicMaterial({
            color: 0x777777
        })
    )
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.position.y = -20
    scene.add(groundMesh)

    const sphereGeometry = new THREE.SphereGeometry(14, 20, 20)
    const cubeGeometry = new THREE.BoxGeometry(15, 15, 15)
    const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4)
    const meshMaterial = new THREE.MeshLambertMaterial({
        color: '#fffddd'
    })
    const sphere = new THREE.Mesh(sphereGeometry, meshMaterial)
    const cube = new THREE.Mesh(cubeGeometry, meshMaterial)
    const plane = new THREE.Mesh(planeGeometry, meshMaterial)
    sphere.position.x = 0
    sphere.position.y = 3
    sphere.position.z = 2
    cube.position.copy(sphere.position)
    plane.position.copy(sphere.position)
    scene.add(cube)

    const ambientLight = new THREE.AmbientLight(0x0c0c0c)
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-30, 60, 60)
    spotLight.castShadow = true
    scene.add(spotLight)

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

    let step = 0
    let selectedMesh:any = cube
    const renderScene = () => {
        cameraControls.update()
        selectedMesh.rotation.y = step += 0.01
        stats.update()
        requestAnimationFrame(renderScene)
        webGLRenderer.render(scene, camera)
    }

    const options = [
        {
            value: 'cube',
            label: 'cube'
        },
        {
            value: 'sphere',
            label: 'sphere'
        },
        {
            value: 'plane',
            label: 'plane'
        }
    ]
    const form = reactive({
        wireframe: false,
        color: '#fffddd',
        emmissiveColor: 'rgb(0, 0, 0)',
        selectedMesh: 'cube'
    })

    watch(form, (val) => {
        scene.remove(plane)
        scene.remove(cube)
        scene.remove(sphere)
        switch (val.selectedMesh) {
            case 'cube':
                scene.add(cube)
                selectedMesh = cube
                break
            case 'sphere':
                scene.add(sphere)
                selectedMesh = sphere
                break
            case 'plane':
                scene.add(plane)
                selectedMesh = plane
                break
            default:
                scene.add(cube)
                selectedMesh = cube
        }
        meshMaterial.wireframe = val.wireframe
        meshMaterial.color.set(val.color)
        meshMaterial.emissive.set(form.emmissiveColor)
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
