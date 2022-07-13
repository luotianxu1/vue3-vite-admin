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

const groundPlane = addLargeGroundPlane(scene, true)
groundPlane.position.y = -10

initDefaultLighting(scene)
const spotLight = scene.getObjectByName('spotLight')
spotLight.intensity = 0.1
const ambientLight = scene.getObjectByName('ambientLight')
scene.remove(ambientLight)

const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

const textureLoader = new THREE.TextureLoader()
const cubeMaterial = new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveMap: textureLoader.load('./textures/emissive/lava.png'),
    normalMap: textureLoader.load('./textures/emissive/lava-normals.png'),
    metalnessMap: textureLoader.load('./textures/emissive/lava-smoothness.png'),
    metalness: 1,
    roughness: 0.4,
    normalScale: new THREE.Vector2(4,4)
})
const cube = new THREE.BoxGeometry(16, 16, 16)
const cube1 = new THREE.Mesh(cube,cubeMaterial)
cube1.rotation.y = 1/3*Math.PI
cube1.position.x = -12
scene.add(cube1)

const sphere = new THREE.SphereGeometry(9, 50, 50)
const sphere1 = new THREE.Mesh(sphere,cubeMaterial)
sphere1.rotation.y = 1/6*Math.PI
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
    cube1.rotation.y += 0.01
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
