<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="displacementScale">
                        <el-slider
                            v-model="form.displacementScale"
                            :min="-5"
                            :max="5"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="displacementBias">
                        <el-slider
                            v-model="form.displacementBias"
                            :min="-5"
                            :max="5"
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
import sphereMap from '../../../assets/img/three/texture/general/w_c.jpg'
import displacementMap from '../../../assets/img/three/texture/general/w_d.png'

import * as THREE from 'three'
import {
    initAxes,
    initCamera,
    initCameraControl,
    initStats,
    initDefaultLighting,
    addLargeGroundPlane
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
camera.position.set(0, 20, 40)

// 创建渲染器
const webGLRenderer = new THREE.WebGLRenderer()
webGLRenderer.setClearColor(new THREE.Color(0x000000))
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMap.enabled = true

const groundPlane = addLargeGroundPlane(scene, true)
groundPlane.position.y = -10

initDefaultLighting(scene)
// scene.add(new THREE.AmbientLight(0x444444))

const pointLight = new THREE.PointLight('#ff5808')
scene.add(pointLight)
const sphereLight = new THREE.SphereGeometry(0.2)
const sphereLightMaterial = new THREE.MeshStandardMaterial({
    color: 0xff5808
})
const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)
scene.add(sphereLightMesh)

const textureLoader = new THREE.TextureLoader()

const sphere = new THREE.SphereGeometry(8, 180, 180)

const form = reactive({
    displacementScale: 1,
    displacementBias: 1
})
let sphereMesh
const change = () => {
    if (sphereMesh) {
        scene.remove(sphereMesh)
    }
    const sphereMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(sphereMap),
        displacementMap: textureLoader.load(displacementMap),
        metalness: 0.02,
        roughness: 0.07,
        color: 0xffffff,
        displacementScale: form.displacementScale,
        displacementBias: form.displacementBias
    })
    groundPlane.receiveShadow = true
    sphereMesh = new THREE.Mesh(sphere, sphereMaterial)
    sphereMesh.castShadow = true
    scene.add(sphereMesh)
}

change()
watch(form, () => {
    change()
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
    sphereMesh.rotation.y += 0.01
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
