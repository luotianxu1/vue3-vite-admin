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
        radius: 10,
        detail: 0,
        type: 'Icosahedron'
    })
    const Geometry = new THREE.IcosahedronGeometry(form.radius, form.detail)
    const Material = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let polyhedron = new THREE.Mesh(Geometry, Material)
    polyhedron.castShadow = true
    polyhedron.position.set(0, 0, 0)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(polyhedron)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.add(form, 'radius', 0, 10)
        web.gui.add(form, 'detail', 0, 10)
        web.gui.add(form, 'type', [
            'Icosahedron',
            'Tetrahedron',
            'Octahedron',
            'Dodecahedron',
            'polyhedron'
        ])

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        web.renderer.render(web.scene, web.camera)
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        let newGeometry
        let vertices
        let indices
        web.scene.remove(polyhedron)
        Material.wireframe = val.wireframe
        switch (val.type) {
            case 'Icosahedron':
                newGeometry = new THREE.IcosahedronGeometry(
                    form.radius,
                    form.detail
                )
                break
            case 'Tetrahedron':
                newGeometry = new THREE.TetrahedronGeometry(
                    form.radius,
                    form.detail
                )
                break
            case 'Octahedron':
                newGeometry = new THREE.OctahedronGeometry(
                    form.radius,
                    form.detail
                )
                break
            case 'Dodecahedron':
                newGeometry = new THREE.DodecahedronGeometry(
                    form.radius,
                    form.detail
                )
                break
            case 'polyhedron':
                vertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1]
                indices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1]
                newGeometry = new THREE.PolyhedronGeometry(
                    vertices,
                    indices,
                    form.radius,
                    form.detail
                )
                break
            default:
                newGeometry = new THREE.IcosahedronGeometry(
                    form.radius,
                    form.detail
                )
        }
        polyhedron = new THREE.Mesh(newGeometry, Material)
        web.scene.add(polyhedron)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
