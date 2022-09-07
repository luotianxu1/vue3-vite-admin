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
        size: 4,
        transparent: true,
        opacity: 0.6,
        color: '#ccffcc',
        sizeAttenuation: true,
        rotate: true
    })

    let cloud
    const createParticles = () => {
        const geometry = new THREE.BufferGeometry()
        const material = new THREE.PointsMaterial({
            size: form.size,
            transparent: form.transparent,
            opacity: form.opacity,
            sizeAttenuation: form.sizeAttenuation,
            color: new THREE.Color(form.color)
        })
        const range = 500
        let positions: any = []
        for (let i = 0; i < 15000; i++) {
            let x = Math.random() * range - range / 2
            let y = Math.random() * range - range / 2
            let z = Math.random() * range - range / 2
            positions.push(x, y, z)
        }
        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        )
        cloud = new THREE.Points(geometry, material)
        web.scene.add(cloud)
    }

    watch(form, () => {
        if (cloud) {
            web.scene.remove(cloud)
        }
        createParticles()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.addAmbientLight(0x343434)

        createParticles()

        web.addGUI()
        web.gui.add(form, 'size', 0, 10)
        web.gui.add(form, 'transparent')
        web.gui.add(form, 'opacity', 0, 1)
        web.gui.addColor(form, 'color')
        web.gui.add(form, 'sizeAttenuation')
        web.gui.add(form, 'rotate')

        renderScene()
    }

    let step = 0
    const renderScene = () => {
        if (form.rotate) {
            step += 0.01
            cloud.rotation.x = step
            cloud.rotation.z = step
        }
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
