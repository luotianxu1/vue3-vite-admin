<template>
    <div class="page">
        <div class="form"></div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import CameraControls from 'camera-controls'
    import Stats from 'stats.js'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    // 创建坐标轴并设置轴线粗细为20
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    // 创建平面并定义平面大小
    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
    // 创建平面材质
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    })
    // 创建平面
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // 将平面绕x轴旋转90度
    plane.rotation.x = Math.PI * -0.5
    // 设置平面位置
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true
    scene.add(plane)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x3c3c3c)
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.shadowMap.enabled = true

    CameraControls.install({ THREE })
    const cameraControls = new CameraControls(camera, renderer.domElement)
    cameraControls.draggingDampingFactor = 5 // 拖动阻尼惯性
    const clock = new THREE.Clock()

    let stats
    const initStats = (el: HTMLElement) => {
        stats = new Stats()
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

    const renderScene = () => {
        const delta = clock.getDelta()
        cameraControls.update(delta)
        stats.update()
        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .form {
            width: 200px;
        }

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
