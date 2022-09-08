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
        radius: 4,
        thetaStart: 0.3 * Math.PI * 2,
        thetaLength: 0.3 * Math.PI * 2,
        segments: 10
    })
    const CircleGeometry = new THREE.CircleGeometry(
        form.radius,
        form.segments,
        form.thetaStart,
        form.thetaLength
    )
    const planeMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let circle = new THREE.Mesh(CircleGeometry, planeMaterial)
    circle.castShadow = true
    circle.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.camera.position.set(10,5,10)

        web.scene.add(circle)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'radius', 1, 40)
        web.gui.add(form, 'segments', 1, 40)
        web.gui.add(form, 'thetaStart', 0, 2 * Math.PI)
        web.gui.add(form, 'thetaLength', 0, 2 * Math.PI)

        renderScene()
    }

    const renderScene = () => {
        web.update()
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        planeMaterial.wireframe = val.wireframe
        let newPlaneGeometry = new THREE.CircleGeometry(
            form.radius,
            form.segments,
            form.thetaStart,
            form.thetaLength
        )
        web.scene.remove(circle)
        circle = new THREE.Mesh(newPlaneGeometry, planeMaterial)
        web.scene.add(circle)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
