<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4)
    const groundMesh = new THREE.Mesh(
        groundGeom,
        new THREE.MeshBasicMaterial({
            color: 0x777777
        })
    )
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.position.y = -20

    const sphereGeometry = new THREE.SphereGeometry(14, 20, 20)
    const cubeGeometry = new THREE.BoxGeometry(15, 15, 15)
    const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4)
    const meshMaterial = new THREE.MeshLambertMaterial({
        color: '#fffddd'
    })
    const sphere = new THREE.Mesh(sphereGeometry, meshMaterial)
    const cube = new THREE.Mesh(cubeGeometry, meshMaterial)
    const plane = new THREE.Mesh(planeGeometry, meshMaterial)
    sphere.position.x = 0
    sphere.position.y = 3
    sphere.position.z = 2
    cube.position.copy(sphere.position)
    plane.position.copy(sphere.position)

    const form = reactive({
        wireframe: false,
        color: '#fffddd',
        emmissiveColor: 'rgb(0, 0, 0)',
        selectedMesh: 'cube'
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)

        web.addAmbientLight(0x0c0c0c)
        web.addSpotLight(-30, 60, 60, 0xffffff)
        web.addStats()
        web.addAxesHelper()

        web.scene.add(groundMesh)
        web.scene.add(cube)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.addColor(form, 'color')
        web.gui.addColor(form, 'emmissiveColor')
        web.gui.add(form, 'selectedMesh', ['cube', 'sphere', 'plane'])

        renderScene()
    }

    let step = 0
    const clock = new THREE.Clock()
    let selectedMesh: any = cube
    const renderScene = () => {
        const time = clock.getDelta()
        selectedMesh.rotation.y = step += time
        web.update()
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        web.scene.remove(plane)
        web.scene.remove(cube)
        web.scene.remove(sphere)
        switch (val.selectedMesh) {
            case 'cube':
                web.scene.add(cube)
                selectedMesh = cube
                break
            case 'sphere':
                web.scene.add(sphere)
                selectedMesh = sphere
                break
            case 'plane':
                web.scene.add(plane)
                selectedMesh = plane
                break
            default:
                web.scene.add(cube)
                selectedMesh = cube
        }
        meshMaterial.wireframe = val.wireframe
        meshMaterial.color.set(val.color)
        meshMaterial.emissive.set(form.emmissiveColor)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
