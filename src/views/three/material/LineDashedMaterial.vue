<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/model/webGl'
    import { gosper } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const points = gosper(4, 60)
    const lines = new THREE.BufferGeometry()
    lines.setFromPoints(points)
    const material = new THREE.LineDashedMaterial({
        color: 'rgb(119,119,255)',
        dashSize: 10,
        scale: 0.1,
        gapSize: 1
    })

    let line = new THREE.Line(lines, material)
    line.computeLineDistances()
    line.position.set(25, -30, -60)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight(0x0c0c0c)
        web.addSpotLight(-40, 60, -10, 0x0c0c0c)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(line)

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
