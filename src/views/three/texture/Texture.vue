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
camera.position.set(0, 0, 5)

// 创建渲染器
const webGLRenderer = new THREE.WebGLRenderer()
webGLRenderer.setClearColor(new THREE.Color(0x000000))
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMap.enabled = true

initDefaultLighting(scene)

const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./textures/door/minecraft.png')

texture.minFilter = THREE.NearestFilter
texture.magFilter = THREE.NearestFilter
// texture.minFilter = THREE.LinearFilter
// texture.magFilter = THREE.LinearFilter

const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
const basicMaterial = new THREE.MeshBasicMaterial({
    map: texture
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)

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
