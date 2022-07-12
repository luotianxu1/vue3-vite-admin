<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
import polyheTexture from '../../../assets/img/three/texture/general/brick-wall.jpg'
import sphereTexture from '../../../assets/img/three/texture/general/floor-wood.jpg'
import * as THREE from 'three'
import {
    initAxes,
    initCamera,
    initCameraControl,
    initStats,
    initDefaultLighting,
    addGeometry,
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
scene.add(new THREE.AmbientLight(0x444444))

const textureLoader = new THREE.TextureLoader()

const sphere = new THREE.SphereGeometry(8, 180, 180)
const alpha = textureLoader.load('./textures/alpha/partial-transparency.png')
alpha.wrapS = THREE.RepeatWrapping
alpha.wrapT = THREE.RepeatWrapping
alpha.repeat.set(8, 8)
const sphereMaterial = new THREE.MeshStandardMaterial({
    alphaMap: alpha,
    metalness: 0.02,
    roughness: 0.07,
    color: 0xffffff,
    alphaTest: 0.5
})

const cube2 = new THREE.Mesh(sphere, sphereMaterial)
cube2.castShadow = true
scene.add(cube2)

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

    .webgl {
        flex: 1;
        position: relative;
    }
}
</style>
