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

    const form = reactive({
        spotColor: '#ffffff',
        intensity: 0.5,
        distance: 0,
        angle: 0.4,
        penumbra: 0,
        decy: 1,
        castShadow: true,
        movingLight: true,
        target: 'Plane'
    })

    let cube
    let sphere
    let sphereLightMesh
    let plane
    let targetList
    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight('#1c1c1c', 3)
        web.addSpotLight(-40, 20, -10, form.spotColor, form.intensity)
        web.spotLight.distance = form.distance
        web.spotLight.angle = form.angle
        web.spotLight.penumbra = form.penumbra
        web.spotLight.decy = form.decy

        web.addSpotLightHelper(web.spotLight)

        web.addGUI()
        web.addStats()

        // 创建物体
        const cubeAndSphere = addDefaultCubeAndSphere(web.scene)
        cube = cubeAndSphere.cube
        sphere = cubeAndSphere.sphere
        plane = addGroundPlane(web.scene)
        web.spotLight.target = plane

        const sphereLight = new THREE.SphereGeometry(0.2)
        const sphereLightMaterial = new THREE.MeshBasicMaterial({
            color: 0xac6c25
        })
        sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)
        sphereLightMesh.castShadow = true
        sphereLightMesh.position.set(3, 3, 3)
        web.scene.add(sphereLightMesh)

        targetList = {
            Plane: plane,
            Sphere: sphere,
            Cube: cube
        }

        web.gui.addColor(form, 'spotColor')
        web.gui.add(form, 'angle', 0, Math.PI / 2)
        web.gui.add(form, 'intensity', 0, 5)
        web.gui.add(form, 'penumbra', 0, 1)
        web.gui.add(form, 'distance', 0, 200)
        web.gui.add(form, 'decy', 0, 2)
        web.gui.add(form, 'castShadow')
        web.gui.add(form, 'target', ['Plane', 'Sphere', 'Cube'])

        render()
    }

    watch(form, (val) => {
        web.spotLight.color = new THREE.Color(val.spotColor)
        web.spotLight.angle = val.angle
        web.spotLight.intensity = val.intensity
        web.spotLight.penumbra = form.penumbra
        web.spotLight.distance = form.distance
        web.spotLight.decy = form.decy
        web.spotLight.castShadow = form.castShadow
        web.spotLight.target = targetList[form.target]
    })

    let step = 0
    let invert = 1
    let phase = 0
    const clock = new THREE.Clock()
    const render = () => {
        const delta = clock.getDelta()
        cube.rotation.x += delta
        cube.rotation.y += delta
        cube.rotation.z += delta
        step += delta
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))

        if (form.movingLight) {
            if (phase > 2 * Math.PI) {
                invert = invert * -1
                phase -= 2 * Math.PI
            } else {
                phase += delta
            }
            sphereLightMesh.position.z = +(7 * Math.sin(phase))
            sphereLightMesh.position.x = +(14 * Math.cos(phase))
            sphereLightMesh.position.y = 15
            if (invert < 0) {
                let pivot = 14
                sphereLightMesh.position.x =
                    invert * (sphereLightMesh.position.x - pivot) + pivot
            }
            web.spotLight.position.copy(sphereLightMesh.position)
        }

        web.update()
        requestAnimationFrame(render)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
