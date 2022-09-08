<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAxesHelper(20)

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
        web.scene.add(plane)

        // 创建球体
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        const cubeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-4, 3, 0)
        web.scene.add(cube)

        // 创建方块
        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x7777ff,
            wireframe: true
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(20, 4, 2)
        web.scene.add(sphere)

        web.camera.position.set(-30, 40, 30)
        web.camera.lookAt(web.scene.position)

        render()
    }

    const render = () => {
        web.update()
        requestAnimationFrame(render)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
    }
</style>
