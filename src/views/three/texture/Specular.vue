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

initDefaultLighting(scene)

const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

const textureLoader = new THREE.TextureLoader()
const earthMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load('./textures/earth/Earth.png'),
    normalMap: textureLoader.load('./textures/earth/EarthNormal.png'),
    specularMap: textureLoader.load('./textures/earth/EarthSpec.png'),
    normalScale: new THREE.Vector2(6,6)
})
const sphere = new THREE.SphereGeometry(9, 50, 50)
const sphere1 = new THREE.Mesh(sphere,earthMaterial)
sphere1.rotation.y = 1/6*Math.PI
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
    sphere1.rotation.y -= 0.01
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
