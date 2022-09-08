<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/model/webGl'
    import { Vector3 } from 'three/src/math/Vector3'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const form = reactive({
        segments: 64,
        radius: 1,
        radiusSegments: 8
    })

    let mesh
    let points: any = []
    for (let i = 0; i < 20; i++) {
        let randomX = -15 + Math.round(Math.random() * 30)
        let randomY = -15 + Math.round(Math.random() * 30)
        let randomZ = -15 + Math.round(Math.random() * 30)
        points.push(new Vector3(randomX, randomY, randomZ))
    }
    const generatePoints = () => {
        if (mesh) {
            web.scene.remove(mesh)
        }
        const normalMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        })

        const geometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(points),
            form.segments,
            form.radius,
            form.radiusSegments,
            false
        )
        mesh = new THREE.Mesh(geometry, normalMaterial)
        mesh.castShadow = true
        web.scene.add(mesh)
    }

    watch(form, () => {
        generatePoints()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        generatePoints()

        web.addGUI()
        web.gui.add(form, 'segments', 0, 200)
        web.gui.add(form, 'radius', 0, 10)
        web.gui.add(form, 'radiusSegments', 0, 100)

        renderScene()
    }

    const renderScene = () => {
        web.update()
        requestAnimationFrame(renderScene)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
