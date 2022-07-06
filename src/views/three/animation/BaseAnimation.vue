<template>
    <div class='page'>
        <div class='form'>
            <div class='form-item'></div>
        </div>
        <div id='webgl' class='webgl'></div>
    </div>
</template>

<script lang='ts' setup>
    import * as THREE from 'three'
    import {
        initAxes,
        initCamera,
        initCameraControl,
        initDefaultLighting,
        initStats,
        addGroundPlane
    } from '@/utils/three/util'

    onMounted(() => {
        init()
        document.addEventListener('mousemove', onDocumentMouseMove, false)
    })

    // 创建场景
    const scene = new THREE.Scene()
    // 创建坐标轴并设置轴线粗细为20
    initAxes(scene)
    // 创建相机
    const camera = initCamera()
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    const groundPlane = addGroundPlane(scene)
    groundPlane.position.y = 0

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 'rgb(0,0,0)',
        metalness: 0.5,
        roughness: 0.5
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.position.x = -10
    cube.position.y = 4
    cube.position.z = 0
    scene.add(cube)

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x7777ff,
        emissive: 'rgb(0,0,0)',
        metalness: 0.5,
        roughness: 0.5
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = 20
    sphere.position.y = 0
    sphere.position.z = 2
    sphere.castShadow = true
    scene.add(sphere)

    const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20)
    const cylinderMaterial = new THREE.MeshStandardMaterial({
        color: 0x77ff77,
        emissive: 'rgb(0,0,0)',
        metalness: 0.5,
        roughness: 0.5
    })
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
    cylinder.castShadow = true
    cylinder.position.set(0, 0, 1)
    scene.add(cylinder)

    const ambienLight = new THREE.AmbientLight(0x353535)
    scene.add(ambienLight)

    let tube
    const onDocumentMouseMove = (event) => {
        let vector = new THREE.Vector3((event.clientX / (window.innerWidth + 470)) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5)
        vector = vector.unproject(camera)

        const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize())
        const intersects = raycaster.intersectObjects([sphere, cylinder, cube])

        if (intersects.length > 0) {
            const points: any = []
            points.push(new THREE.Vector3(-30, 39.8, 30))
            points.push(intersects[0].point)
            const mat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.6 })
            const tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 60, 0.001)

            if (tube) {
                scene.remove(tube)
            }
            tube = new THREE.Mesh(tubeGeometry, mat)
            scene.add(tube)
        }
    }

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    // 创建灯光
    initDefaultLighting(scene)

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
    let scalingStep = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        cube.rotation.x += 0.02
        cube.rotation.y += 0.02
        cube.rotation.z += 0.02

        step += 0.03
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))

        // scale the cylinder
        scalingStep += 0.03
        const scaleX = Math.abs(Math.sin(scalingStep / 4))
        const scaleY = Math.abs(Math.cos(scalingStep / 5))
        const scaleZ = Math.abs(Math.sin(scalingStep / 7))
        cylinder.scale.set(scaleX, scaleY, scaleZ)
        cameraControls.update(delta)
        stats.update()
        requestAnimationFrame(renderScene)
        webGLRenderer.render(scene, camera)
    }
</script>

<style scoped lang='scss'>
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
