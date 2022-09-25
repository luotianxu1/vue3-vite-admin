<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'
    import { addHouseAndTree } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const sphereLight = new THREE.SphereGeometry(0.2)
    const sphereLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xac6c25
    })
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)
    sphereLightMesh.castShadow = true
    sphereLightMesh.position.set(3, 0, 5)

    const form = reactive({
        pointLightColor: '#ccffcc',
        distance: 0,
        intensity: 1,
        decay: 1
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight('#0c0c0c')
        web.addPointLight(0, 0, 0, '#ccffcc', 1)
        web.addPointLightHelper(web.pointLight)

        web.addGUI()
        web.addStats()

        addHouseAndTree(web.scene)
        web.scene.add(sphereLightMesh)

        web.gui.addColor(form, 'pointLightColor')
        web.gui.add(form, 'distance', 0, 100)
        web.gui.add(form, 'intensity', 0, 3)
        web.gui.add(form, 'decay', 0, 3)

        renderScene()
    }

    let invert = 1
    let phase = 0
    const clock = new THREE.Clock()
    const renderScene = () => {
        const time = clock.getDelta()
        web.pointLight.position.copy(sphereLightMesh.position)

        if (phase > 2 * Math.PI) {
            invert = invert * -1
            phase -= 2 * Math.PI
        } else {
            phase += time
        }
        sphereLightMesh.position.z = Number(25 * Math.sin(phase))
        sphereLightMesh.position.x = Number(14 * Math.cos(phase))
        sphereLightMesh.position.y = 5

        if (invert < 0) {
            const pivot = 14
            sphereLightMesh.position.x =
                invert * (sphereLightMesh.position.x - pivot) + pivot
        }

        web.update()
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        web.pointLight.color = new THREE.Color(val.pointLightColor)
        web.pointLight.distance = val.distance
        web.pointLight.intensity = val.intensity
        web.pointLight.decay = val.decay
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
