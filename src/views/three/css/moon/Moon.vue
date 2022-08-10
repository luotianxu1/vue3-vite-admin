<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { initAxes, initCameraControl, initStats } from '@/utils/three/util'
    import {
        CSS2DRenderer,
        CSS2DObject
    } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    initAxes(scene)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        (window.innerWidth - 200) / (window.innerHeight - 90),
        0.1,
        200
    )
    camera.position.set(0, 5, -10)
    camera.aspect = (window.innerWidth - 200) / (window.innerHeight - 90)
    camera.updateProjectionMatrix()
    scene.add(camera)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setSize(window.innerWidth - 200, window.innerHeight - 90)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(0, 0, 1)
    scene.add(dirLight)
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    scene.add(light)

    const textureLoader = new THREE.TextureLoader()
    const EARTH_RADIUS = 1
    const MOON_RADIUS = 0.27
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16)
    const earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('./textures/planets/earth_atmos_2048.jpg'),
        specularMap: textureLoader.load(
            './textures/planets/earth_specular_2048.jpg'
        ),
        normalMap: textureLoader.load(
            './textures/planets/earth_normal_2048.jpg'
        ),
        normalScale: new THREE.Vector2(0.85, 0.85)
    })

    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    let moon
    const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16)
    const moonMaterial = new THREE.MeshPhongMaterial({
        shininess: 5,
        map: textureLoader.load('./textures/planets/moon_1024.jpg')
    })
    moon = new THREE.Mesh(moonGeometry, moonMaterial)
    scene.add(moon)

    // 实例化CSS2d渲染器
    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(window.innerWidth - 200, window.innerHeight - 90)
    document.body.appendChild(labelRenderer.domElement)
    labelRenderer.domElement.style.position = 'fixed'
    labelRenderer.domElement.style.top = '90px'
    labelRenderer.domElement.style.left = '200px'
    labelRenderer.domElement.style.zIndex = '10'

    // 添加标签
    const earthDiv = document.createElement('div')
    earthDiv.className = 'label'
    earthDiv.innerHTML = '地球'
    earthDiv.style.color = '#fff'
    const earthLabel = new CSS2DObject(earthDiv)
    earthLabel.position.set(0, 1, 0)
    earth.add(earthLabel)

    let chinaLabel
    const chinaDiv = document.createElement('div')
    chinaDiv.className = 'label1'
    chinaDiv.innerHTML = '中国'
    chinaDiv.style.color = '#fff'
    chinaLabel = new CSS2DObject(chinaDiv)
    chinaLabel.position.set(-0.3, 0.5, -0.9)
    earth.add(chinaLabel)
    console.log(chinaLabel)

    const moonDiv = document.createElement('div')
    moonDiv.className = 'label'
    moonDiv.innerHTML = '月球'
    moonDiv.style.color = '#fff'
    const moonLabel = new CSS2DObject(moonDiv)
    moonLabel.position.set(0, 0.3, 0)
    moon.add(moonLabel)

    const controls = initCameraControl(camera, labelRenderer.domElement)

    let stats
    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        body.appendChild(webGLRenderer.domElement)
        stats = initStats(body)
        renderScene()
    }

    const clock = new THREE.Clock()
    const renderScene = () => {
        const elapsed = clock.getElapsedTime()
        moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)
        controls.update()
        stats.update()
        requestAnimationFrame(renderScene)
        labelRenderer.render(scene, camera)
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
