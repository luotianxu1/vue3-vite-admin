<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import {
    initAmbientLight,
    initAxes,
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
const camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth - 200) / (window.innerHeight-90),
    0.1,
    30
)
camera.position.set(0, 0, 10)
scene.add(camera)

// 创建渲染器
const webGLRenderer = new THREE.WebGLRenderer()
webGLRenderer.setClearColor(new THREE.Color(0x000000))
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMap.enabled = true
// 创建灯光
initAmbientLight(scene)

const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

const cubeGeometry = new THREE.BoxBufferGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
    wireframe: true
})
const redMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
})
let cubeArr:any = []
for (let i = -5; i < 5; i ++) {
    for (let j = -5; j < 5; j++) {
        for (let k = -5; k < 5; k++) {
            const cube = new THREE.Mesh(cubeGeometry,material)
            cube.position.set(i,j,k)
            scene.add(cube)
            cubeArr.push(cube)
        }
    }
}

// 创建投射光纤对象
const raycaster = new THREE.Raycaster()
// 鼠标位置对象
const mouse = new THREE.Vector2()
// 监听鼠标的位置
window.addEventListener('mousemove', (e) => {
    mouse.x = ((e.clientX - 200) / (window.innerWidth - 200)) * 2 - 1
    mouse.y = -(((e.clientY - 90) / (window.innerHeight - 90)) * 2 - 1)
    raycaster.setFromCamera(mouse,camera)
    const result = raycaster.intersectObjects(cubeArr)
    if (result.length) {
        result.forEach(item => {
            item.object.material = redMaterial
        })
    }
})

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
        width: 300px;
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
