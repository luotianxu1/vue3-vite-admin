<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import sphereMap from '../../../assets/img/three/texture/general/w_c.jpg'
    import displacementMap from '../../../assets/img/three/texture/general/w_d.png'
    import WebGl from '@/utils/three/modelNew/webGl'
    import * as THREE from 'three'
    import { addLargeGroundPlane } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    const sphereLight = new THREE.SphereGeometry(0.2)
    const sphereLightMaterial = new THREE.MeshStandardMaterial({
        color: 0xff5808
    })
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)

    const textureLoader = new THREE.TextureLoader()

    const sphere = new THREE.SphereGeometry(8, 180, 180)

    const form = reactive({
        displacementScale: 1,
        displacementBias: 1
    })
    let sphereMesh
    const change = () => {
        if (sphereMesh) {
            web.scene.remove(sphereMesh)
        }
        const sphereMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load(sphereMap),
            displacementMap: textureLoader.load(displacementMap),
            metalness: 0.02,
            roughness: 0.07,
            color: 0xffffff,
            displacementScale: form.displacementScale,
            displacementBias: form.displacementBias
        })
        sphereMesh = new THREE.Mesh(sphere, sphereMaterial)
        sphereMesh.castShadow = true
        web.scene.add(sphereMesh)
    }

    watch(form, () => {
        change()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        const groundPlane = addLargeGroundPlane(web.scene, true)
        groundPlane.position.y = -10
        web.addAmbientLight(0x343434)
        web.addSpotLight(-10, 30, 40, 0xffffff)
        web.scene.add(sphereLightMesh)
        web.camera.position.set(0, 5, 40)

        change()

        web.addGUI()
        web.gui.add(form, 'displacementScale', -5, 5)
        web.gui.add(form, 'displacementBias', -5, 5)

        renderScene()
    }

    const renderScene = () => {
        sphereMesh.rotation.y += 0.01
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
