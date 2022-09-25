<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'
    import { addDefaultCubeAndSphere, addGroundPlane } from '@/utils/three/util'

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
    sphereLightMesh.position.set(3, 3, 3)

    const form = reactive({
        color: '#ff5808',
        intensity: 1,
        target: 'Plane'
    })

    let web
    let cube
    let sphere
    let plane
    let targetList
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight('#1c1c1c')

        web.addDirectionalLight(-40, 60, -10, form.color, form.intensity)
        web.directionalLight.shadow.camera.near = 2
        web.directionalLight.shadow.camera.far = 80
        web.directionalLight.shadow.camera.left = -30
        web.directionalLight.shadow.camera.right = 30
        web.directionalLight.shadow.camera.top = 30
        web.directionalLight.shadow.camera.bottom = -30
        web.directionalLight.shadow.mapSize.width = 1024
        web.directionalLight.shadow.mapSize.height = 1024

        web.addDebugCamera(web.directionalLight)

        const cubeAndSphere = addDefaultCubeAndSphere(web.scene)
        cube = cubeAndSphere.cube
        sphere = cubeAndSphere.sphere
        plane = addGroundPlane(web.scene)
        web.scene.add(sphereLightMesh)

        web.addStats()
        web.addGUI()

        targetList = {
            Plane: plane,
            Sphere: sphere,
            Cube: cube
        }

        web.gui.addColor(form, 'color')
        web.gui.add(form, 'intensity', 0, 5)
        web.gui.add(form, 'target', ['Plane', 'Sphere', 'Cube'])

        renderScene()
    }

    let step = 0
    const clock = new THREE.Clock()
    const renderScene = () => {
        const delta = clock.getDelta()
        cube.rotation.x += delta
        cube.rotation.y += delta
        cube.rotation.z += delta
        step += delta
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
        sphereLightMesh.position.z = -8
        sphereLightMesh.position.y = +(27 * Math.sin(step / 3))
        sphereLightMesh.position.x = 10 + 26 * Math.cos(step / 3)
        web.directionalLight.position.copy(sphereLightMesh.position)

        web.update()
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        web.directionalLight.color = new THREE.Color(val.color)
        web.directionalLight.intensity = val.intensity
        web.directionalLight.target = targetList[form.target]
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
