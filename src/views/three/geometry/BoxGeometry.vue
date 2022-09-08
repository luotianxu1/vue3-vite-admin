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
        width: 4,
        height: 10,
        depth: 10,
        widthSegments: 4,
        heightSegments: 4,
        depthSegments: 4
    })
    const BoxGeometry = new THREE.BoxGeometry(
        form.width,
        form.height,
        form.depth,
        Math.round(form.widthSegments),
        Math.round(form.heightSegments),
        Math.round(form.depthSegments)
    )
    const BoxMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let box = new THREE.Mesh(BoxGeometry, BoxMaterial)
    box.castShadow = true
    box.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(box)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'width', 0, 40)
        web.gui.add(form, 'height', 0, 40)
        web.gui.add(form, 'depth', 0, 20)
        web.gui.add(form, 'widthSegments', 0, 20)
        web.gui.add(form, 'heightSegments', 0, 20)
        web.gui.add(form, 'depthSegments', 0, 20)
        renderScene()
    }

    const renderScene = () => {
        web.update()
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        BoxMaterial.wireframe = val.wireframe
        let newBoxGeometry = new THREE.BoxGeometry(
            form.width,
            form.height,
            form.depth,
            Math.round(form.widthSegments),
            Math.round(form.heightSegments),
            Math.round(form.widthSegments)
        )
        web.scene.remove(box)
        box = new THREE.Mesh(newBoxGeometry, BoxMaterial)
        web.scene.add(box)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
