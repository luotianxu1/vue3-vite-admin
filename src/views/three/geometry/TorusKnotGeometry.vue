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
        radius: 8,
        tube: 5,
        radialSegments: 200,
        tubularSegments: 200,
        p: 2,
        q: 3
    })
    const TorusKnotGeometry = new THREE.TorusKnotGeometry(
        form.radius,
        form.tube,
        Math.round(form.tubularSegments),
        Math.round(form.radialSegments),
        Math.round(form.p),
        Math.round(form.q)
    )
    const TorusKnotMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let torusKnot = new THREE.Mesh(TorusKnotGeometry, TorusKnotMaterial)
    torusKnot.castShadow = true
    torusKnot.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(torusKnot)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'radius', 0, 10)
        web.gui.add(form, 'tube', 0, 10)
        web.gui.add(form, 'radialSegments', 1, 40)
        web.gui.add(form, 'tubularSegments', 1, 20)
        web.gui.add(form, 'p', 1, 10)
        web.gui.add(form, 'q', 1, 10)

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        web.renderer.render(web.scene, web.camera)
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        TorusKnotMaterial.wireframe = val.wireframe
        let newTorusKnotGeometry = new THREE.TorusKnotGeometry(
            form.radius,
            form.tube,
            Math.round(form.tubularSegments),
            Math.round(form.radialSegments),
            Math.round(form.p),
            Math.round(form.q)
        )
        web.scene.remove(torusKnot)
        torusKnot = new THREE.Mesh(newTorusKnotGeometry, TorusKnotMaterial)
        web.scene.add(torusKnot)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
