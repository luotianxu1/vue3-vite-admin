<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import {
        initDefaultLighting
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
        radius: 10,
        tube: 10,
        radialSegments: 8,
        tubularSegments: 6,
        arc: 2 * Math.PI
    })
    const TorusGeometry = new THREE.TorusGeometry(
        form.radius,
        form.tube,
        Math.round(form.radialSegments),
        Math.round(form.tubularSegments),
        form.arc
    )
    const TorusMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let torus = new THREE.Mesh(TorusGeometry, TorusMaterial)
    torus.castShadow = true
    torus.position.set(0, 0, 0)

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
        web.scene.add(torus)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'radius', 0, 40)
        web.gui.add(form, 'tube', 0, 40)
        web.gui.add(form, 'radialSegments', 0, 40)
        web.gui.add(form, 'tubularSegments', 1, 20)
        web.gui.add(form, 'arc', 0, 2 * Math.PI)

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
    }

    watch(form, (val) => {
        TorusMaterial.wireframe = val.wireframe
        let newTorusGeometry = new THREE.TorusGeometry(
            form.radius,
            form.tube,
            Math.round(form.radialSegments),
            Math.round(form.tubularSegments),
            form.arc
        )
        web.scene.remove(torus)
        torus = new THREE.Mesh(newTorusGeometry, TorusMaterial)
        web.scene.add(torus)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
