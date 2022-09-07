<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
    import { Vector3 } from 'three/src/math/Vector3'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    let spGroup
    const form = reactive({
        draw: function () {
            if (spGroup) {
                web.scene.remove(spGroup)
            }

            let points: any = []
            for (let i = 0; i < 20; i++) {
                let randomX = -15 + Math.round(Math.random() * 30)
                let randomY = -15 + Math.round(Math.random() * 30)
                let randomZ = -15 + Math.round(Math.random() * 30)
                points.push(new Vector3(randomX, randomY, randomZ))
            }

            spGroup = new THREE.Object3D()

            const material = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                transparent: false
            })
            const normalMaterial = new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            })
            points.forEach(function (point) {
                let spGeom = new THREE.SphereGeometry(0.2)
                let spMesh = new THREE.Mesh(spGeom, material)
                spMesh.position.copy(point)
                spGroup.add(spMesh)
            })

            let convexGeometry = new ConvexGeometry(points)
            const mesh2 = new THREE.Mesh(convexGeometry, normalMaterial)
            mesh2.material.side = THREE.FrontSide
            mesh2.renderOrder = 1
            spGroup.add(mesh2)

            web.scene.add(spGroup)
        }
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.addGUI()
        web.gui.add(form, 'draw')

        form.draw()

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        web.renderer.render(web.scene, web.camera)
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
