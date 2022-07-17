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
camera.position.set(0, 0, 10)

// 创建渲染器
const webGLRenderer = new THREE.WebGLRenderer()
webGLRenderer.setSize(window.innerWidth, window.innerHeight)

const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(9)
    // 每一个三角形，需要3个顶点，每个顶点需要3个值
    for (let j = 0; j < 9; j++) {
        positionArray[j] = Math.random() * 10 -5
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))
    let color = new THREE.Color(Math.random(),Math.random(),Math.random())
    const material = new THREE.MeshBasicMaterial({
        color:color,
        transparent: true,
        opacity: 0.5
    })
    const mesh = new THREE.Mesh(geometry,material)
    scene.add(mesh)
}

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
