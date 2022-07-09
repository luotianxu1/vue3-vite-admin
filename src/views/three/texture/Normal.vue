<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import cubeNoMap from '../../../assets/img/three/texture/general/plaster-normal.jpg'
    import cubeMap from '../../../assets/img/three/texture/general/plaster.jpg'
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

    const cube = new THREE.BoxGeometry(16, 16, 16)
    const cubeMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(cubeMap),
        metalness: 0.2,
        roughness: 0.07
    })
    const cubeMaterialWithNormalMap = cubeMaterial.clone()
    cubeMaterialWithNormalMap.normalMap = textureLoader.load(cubeNoMap)

    const cube1 = new THREE.Mesh(cube, cubeMaterial)
    cube1.position.x = -17
    cube1.rotation.y = (1 / 3) * Math.PI
    scene.add(cube1)

    const cube2 = new THREE.Mesh(cube, cubeMaterialWithNormalMap)
    cube2.position.x = 17
    cube2.rotation.y = (-1 / 3) * Math.PI
    scene.add(cube2)

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

    let invert = 1
    let phase = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        if (phase > 2 * Math.PI) {
            invert = invert * -1
            phase -= 2 * Math.PI
        } else {
            phase += 0.02
        }
        sphereLightMesh.position.z = Number(21 * Math.sin(phase))
        sphereLightMesh.position.x = -14 + 14 * Math.cos(phase)
        sphereLightMesh.position.y = 5
        if (invert < 0) {
            let pivot = 0
            sphereLightMesh.position.x =
                invert * (sphereLightMesh.position.x - pivot) + pivot
        }
        pointLight.position.copy(sphereLightMesh.position)
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

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
