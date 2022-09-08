<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const form = reactive({
        wireframe: false,
        innerRadius: 3,
        outerRadius: 10,
        thetaSegments: 8,
        phiSegments: 8,
        thetaStart: 0,
        thetaLength: Math.PI * 2
    })
    const RingGeometry = new THREE.RingGeometry(
        form.innerRadius,
        form.outerRadius,
        form.thetaSegments,
        form.phiSegments,
        form.thetaStart,
        form.thetaLength
    )
    const RingMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let ring = new THREE.Mesh(RingGeometry, RingMaterial)
    ring.castShadow = true
    ring.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.camera.position.set(10, 5, 30)

        web.scene.add(ring)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'innerRadius', 0, 40)
        web.gui.add(form, 'outerRadius', 0, 40)
        web.gui.add(form, 'thetaSegments', 0, 20)
        web.gui.add(form, 'thetaStart', 0, 2 * Math.PI)
        web.gui.add(form, 'thetaLength', 0, 2 * Math.PI)

        renderScene()
    }

    const renderScene = () => {
        web.update()
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        RingMaterial.wireframe = val.wireframe
        let newPlaneGeometry = new THREE.RingGeometry(
            form.innerRadius,
            form.outerRadius,
            form.thetaSegments,
            form.phiSegments,
            form.thetaStart,
            form.thetaLength
        )
        web.scene.remove(ring)
        ring = new THREE.Mesh(newPlaneGeometry, RingMaterial)
        web.scene.add(ring)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
