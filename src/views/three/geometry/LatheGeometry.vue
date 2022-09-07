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
        segments: 12,
        phiStart: 0,
        phiLength: 2 * Math.PI
    })
    let spGroup

    watch(form, (val) => {
        generatePoints(val.segments, val.phiStart, val.phiLength)
    })

    const generatePoints = (segments, phiStart, phiLength) => {
        if (spGroup) {
            web.scene.remove(spGroup)
        }

        let points: any = []
        let height = 5
        let count = 30
        for (let i = 0; i < count; i++) {
            points.push(
                new THREE.Vector2(
                    (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12,
                    i - count + count / 2
                )
            )
        }

        spGroup = new THREE.Object3D()
        let material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: false
        })
        points.forEach(function (point) {
            let spGeom = new THREE.SphereGeometry(0.2)
            let spMesh = new THREE.Mesh(spGeom, material)
            spMesh.position.set(point.x, point.y, 0)

            spGroup.add(spMesh)
        })
        web.scene.add(spGroup)

        let latheGeometry = new THREE.LatheGeometry(
            points,
            segments,
            phiStart,
            phiLength
        )
        let latheMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        })
        const lathe = new THREE.Mesh(latheGeometry, latheMaterial)
        spGroup.add(lathe)
    }

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        generatePoints(form.segments, form.phiStart, form.phiLength)

        web.addGUI()
        web.gui.add(form, 'segments', 1, 50)
        web.gui.add(form, 'phiStart', 0, 2 * Math.PI)
        web.gui.add(form, 'phiLength', 0, 2 * Math.PI)

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
