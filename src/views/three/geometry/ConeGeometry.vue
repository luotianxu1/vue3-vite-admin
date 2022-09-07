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
        radius: 20,
        height: 20,
        radialSegments: 8,
        heightSegments: 8,
        openEnded: false,
        thetaStart: 0,
        thetaLength: 2 * Math.PI
    })
    const ConeGeometry = new THREE.ConeGeometry(
        form.radius,
        form.height,
        form.radialSegments,
        form.heightSegments,
        form.openEnded,
        form.thetaStart,
        form.thetaLength
    )
    const ConeMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let cone = new THREE.Mesh(ConeGeometry, ConeMaterial)
    cone.castShadow = true
    cone.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(cone)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'radius', -40, 40)
        web.gui.add(form, 'height', 0, 40)
        web.gui.add(form, 'radialSegments', 1, 20)
        web.gui.add(form, 'heightSegments', 1, 20)
        web.gui.add(form, 'openEnded')
        web.gui.add(form, 'thetaStart', 0, 2 * Math.PI)
        web.gui.add(form, 'thetaLength', 0, 2 * Math.PI)

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        web.renderer.render(web.scene, web.camera)
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        ConeMaterial.wireframe = val.wireframe
        let newConeGeometry = new THREE.ConeGeometry(
            form.radius,
            form.height,
            form.radialSegments,
            form.heightSegments,
            form.openEnded,
            form.thetaStart,
            form.thetaLength
        )
        web.scene.remove(cone)
        cone = new THREE.Mesh(newConeGeometry, ConeMaterial)
        web.scene.add(cone)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
