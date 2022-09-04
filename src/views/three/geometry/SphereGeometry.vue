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

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const form = reactive({
        wireframe: false,
        radius: 4,
        widthSegments: 10,
        heightSegments: 10,
        phiStart: Math.PI,
        phiLength: Math.PI * 2,
        thetaStart: Math.PI,
        thetaLength: Math.PI
    })
    const SphereGeometry = new THREE.SphereGeometry(
        form.radius,
        form.widthSegments,
        form.heightSegments,
        form.phiStart,
        form.phiLength,
        form.thetaStart,
        form.thetaLength
    )
    const SphereMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let sphere = new THREE.Mesh(SphereGeometry, SphereMaterial)
    sphere.castShadow = true
    sphere.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        // 创建灯光
        initDefaultLighting(web.scene)
        // 创建平面
        const groundPlane = initLargeGroundPlane(web.scene)
        groundPlane.position.y = -10
        web.scene.add(sphere)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'radius', 0, 40)
        web.gui.add(form, 'widthSegments', 0, 20)
        web.gui.add(form, 'heightSegments', 0, 20)
        web.gui.add(form, 'phiStart', 0, 2 * Math.PI)
        web.gui.add(form, 'phiLength', 0, 2 * Math.PI)
        web.gui.add(form, 'thetaStart', 0, 2 * Math.PI)
        web.gui.add(form, 'thetaLength', 0, 2 * Math.PI)

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
    }

    watch(form, (val) => {
        SphereMaterial.wireframe = val.wireframe
        let newSphereGeometry = new THREE.SphereGeometry(
            form.radius,
            form.widthSegments,
            form.heightSegments,
            form.phiStart,
            form.phiLength,
            form.thetaStart,
            form.thetaLength
        )
        web.scene.remove(sphere)
        sphere = new THREE.Mesh(newSphereGeometry, SphereMaterial)
        web.scene.add(sphere)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
