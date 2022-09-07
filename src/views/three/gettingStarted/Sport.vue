<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/modelNew/webGl'
    import * as THREE from 'three'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    // 创建平面并定义平面大小
    const planeGeometry = new THREE.PlaneGeometry(60, 20)
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

    // 创建球体
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(-4, 3, 0)
    cube.castShadow = true

    // 创建方块
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(20, 4, 2)
    sphere.castShadow = true

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAxesHelper(20)
        web.addStats()
        web.addSpotLight(-40, 40, -15, 0xffffff, 1, true)

        web.scene.add(plane)
        web.scene.add(cube)
        web.scene.add(sphere)

        render()
    }

    let step = 0
    const clock = new THREE.Clock()
    const render = () => {
        const elapsed = clock.getDelta()
        cube.rotation.x += elapsed
        cube.rotation.y += elapsed
        cube.rotation.z += elapsed
        step += elapsed
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
        web.stats.update()
        web.renderer.render(web.scene, web.camera)
        requestAnimationFrame(render)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
