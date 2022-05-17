<template>
    <div id="webgl" class="webgl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'

    onMounted(() => {
        init()
    })

    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }

        // 创建场景
        const scene = new THREE.Scene()

        // 创建坐标轴并设置轴线粗细为20
        const axes = new THREE.AxesHelper(20)
        scene.add(axes)

        // 创建平面并定义平面大小
        const planeGeometry = new THREE.PlaneGeometry(60, 20)
        // 创建平面材质
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa
        })
        // 创建平面
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        // 将平面绕x轴旋转90度
        plane.rotation.x = Math.PI * -0.5
        // 设置平面位置
        plane.position.set(15, 0, 0)
        scene.add(plane)

        // 创建球体
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        const cubeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-4, 3, 0)
        scene.add(cube)

        // 创建方块
        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x7777ff,
            wireframe: true
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(20, 4, 2)
        scene.add(sphere)

        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.set(-30, 40, 30)
        camera.lookAt(scene.position)

        // 创建渲染器
        const width = body.offsetWidth
        const height = body.offsetHeight
        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(new THREE.Color(0x000000))
        renderer.setSize(width, height)
        body.appendChild(renderer.domElement)
        renderer.render(scene, camera)
    }
</script>

<style scoped lang="scss">
    .webgl {
        width: 100%;
        height: 100vh;
    }
</style>
