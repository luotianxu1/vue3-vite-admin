<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import {
    initAxes,
    initCamera,
    initCameraControl,
    initStats,
    initDefaultLighting
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

initDefaultLighting(scene)

const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

const textureLoader = new THREE.TextureLoader()
const urls = [
    './textures/cubemap/flowers/right.png',
    './textures/cubemap/flowers/left.png',
    './textures/cubemap/flowers/top.png',
    './textures/cubemap/flowers/bottom.png',
    './textures/cubemap/flowers/front.png',
    './textures/cubemap/flowers/back.png'
]
const cubeLoader = new THREE.CubeTextureLoader()
scene.background = cubeLoader.load(urls)

const cubeMaterial = new THREE.MeshStandardMaterial({
    envMap: scene.background,
    color: 0xffffff,
    metalness: 1,
    roughness: 0
})
const sphereMaterial = cubeMaterial.clone()
sphereMaterial.normalMap = textureLoader.load('./textures/engraved/Engraved_Metal_003_NORM.jpg')
sphereMaterial.aoMap = textureLoader.load('./textures/engraved/Engraved_Metal_003_OCC.jpg')
sphereMaterial.shininessMap = textureLoader.load('./textures/engraved/Engraved_Metal_003_ROUGH.jpg')

const cube = new THREE.BoxGeometry(16, 12, 12)
const cube1 = new THREE.Mesh(cube,cubeMaterial)
cube1.position.x = -15
cube1.rotation.y = -1/3*Math.PI
scene.add(cube1)

const sphere = new THREE.SphereGeometry(10, 50, 50)
const sphere1 = new THREE.Mesh(sphere,sphereMaterial)
sphere1.position.x = 15
scene.add(sphere1)

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

    .webgl {
        flex: 1;
        position: relative;
    }
}
</style>
