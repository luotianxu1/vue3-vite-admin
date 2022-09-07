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
        width: 20,
        height: 20,
        widthSegments: 1,
        heightSegments: 1
    })
    const planeGeometry = new THREE.PlaneGeometry(20, 20)
    const planeMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.castShadow = true
    plane.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(plane)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'width', 0, 100)
        web.gui.add(form, 'height', 0, 100)
        web.gui.add(form, 'widthSegments', 1, 40)
        web.gui.add(form, 'heightSegments', 1, 40)

        renderScene()
    }

    let step = 0
    const renderScene = () => {
        plane.rotation.y = step += 0.01
        web.stats.update()
        web.controls.update()
        web.renderer.render(web.scene, web.camera)
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        planeMaterial.wireframe = val.wireframe
        let newPlaneGeometry = new THREE.PlaneGeometry(
            form.width,
            form.height,
            form.widthSegments,
            form.heightSegments
        )
        web.scene.remove(plane)
        plane = new THREE.Mesh(newPlaneGeometry, planeMaterial)
        web.scene.add(plane)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
