<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import {
        initDefaultLighting,
        initLargeGroundPlane
    } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    const webGl = ref()

    const drawShape = () => {
        var shape = new THREE.Shape()
        shape.moveTo(10, 10)
        shape.lineTo(10, 40)
        shape.bezierCurveTo(15, 25, 25, 25, 30, 40)
        shape.splineThru([
            new THREE.Vector2(32, 30),
            new THREE.Vector2(28, 20),
            new THREE.Vector2(30, 10)
        ])
        shape.quadraticCurveTo(20, 15, 10, 10)
        let hole1 = new THREE.Path()
        hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true)
        shape.holes.push(hole1)
        let hole2 = new THREE.Path()
        hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true)
        shape.holes.push(hole2)
        let hole3 = new THREE.Path()
        hole3.absarc(20, 16, 2, 0, Math.PI, true)
        shape.holes.push(hole3)
        return shape
    }
    const ShapeMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    const ShapeGeometry = new THREE.ShapeGeometry(drawShape())
    let shape = new THREE.Mesh(ShapeGeometry, ShapeMaterial)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.scene.add(shape)

        // 创建灯光
        initDefaultLighting(web.scene)
        // 创建平面
        const groundPlane = initLargeGroundPlane(web.scene)
        groundPlane.position.y = -10

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
