<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const form = reactive({
        slices: 50,
        stacks: 50,
        type: 'radialWave'
    })
    const options = [
        {
            value: 'radialWave',
            label: 'radialWave'
        },
        {
            value: 'klein',
            label: 'klein'
        }
    ]

    const radialWave = function (u, v, optionalTarget) {
        const result = optionalTarget || new THREE.Vector3()
        const r = 50
        const x = Math.sin(u) * r
        const z = Math.sin(v / 2) * 2 * r
        const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8
        return result.set(x, y, z)
    }

    const klein = function (u, v, optionalTarget) {
        const result = optionalTarget || new THREE.Vector3()
        u *= Math.PI
        v *= 2 * Math.PI
        u = u * 2
        let x, y, z
        if (u < Math.PI) {
            x =
                3 * Math.cos(u) * (1 + Math.sin(u)) +
                2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v)
            z =
                -8 * Math.sin(u) -
                2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
        } else {
            x =
                3 * Math.cos(u) * (1 + Math.sin(u)) +
                2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI)
            z = -8 * Math.sin(u)
        }
        y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v)
        return result.set(x, y, z)
    }

    const normalMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    const geometry = new ParametricGeometry(
        radialWave,
        form.slices,
        form.stacks
    )
    let shape = new THREE.Mesh(geometry, normalMaterial)

    watch(form, (val) => {
        if (shape) {
            web.scene.remove(shape)
        }
        let newGeometry
        switch (val.type) {
            case 'radialWave':
                newGeometry = new ParametricGeometry(
                    radialWave,
                    form.slices,
                    form.stacks
                )
                break
            case 'klein':
                newGeometry = new ParametricGeometry(
                    klein,
                    form.slices,
                    form.stacks
                )
                break
            default:
                newGeometry = new ParametricGeometry(
                    radialWave,
                    form.slices,
                    form.stacks
                )
        }
        shape = new THREE.Mesh(newGeometry, normalMaterial)
        web.scene.add(shape)
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(shape)

        web.addGUI()
        web.gui.add(form, 'slices', 10, 120)
        web.gui.add(form, 'stacks', 10, 120)
        web.gui.add(form, 'type', ['radialWave', 'klein'])

        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
