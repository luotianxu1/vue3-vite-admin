<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { initAxes, initCameraControl, initStats } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    // 创建坐标轴并设置轴线粗细为20
    initAxes(scene)
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        20,
        1000
    )
    camera.position.set(-50, 40, 50)
    camera.lookAt(scene.position)

    let group = new THREE.Mesh()
    let mats: any = []
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0x009e60
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0x0051ba
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xffd500
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xff5800
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xc41e3a
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        })
    )

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                let cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9)
                let cube = new THREE.Mesh(cubeGeom, mats)
                cube.position.set(x * 3 - 3, y * 3 - 3, z * 3 - 3)
                group.add(cube)
            }
        }
    }
    group.scale.copy(new THREE.Vector3(2, 2, 2))
    scene.add(group)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    const ambientLight = new THREE.AmbientLight(0x0c0c0c)
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

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

    let step = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        cameraControls.update(delta)
        stats.update()
        group.rotation.y = step += delta
        group.rotation.z = step -= delta
        group.rotation.x = step += delta
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
