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
    const meshMaterial = new THREE.MeshPhongMaterial({
        color: 0x7777ff,
        emissive: 'rgb(0, 0, 0)',
        specular: 'rgb(17,17,17)',
        shininess: 100
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
        color: 'rgb(119,119,255)',
        emmissiveColor: 'rgb(0, 0, 0)',
        specularColor: 'rgb(17,17,17)',
        shiness: 30,
        selectedMesh: 'cube'
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addSpotLight(0, 30, 60, 0xffffff, 0.6)
        web.addStats()

        web.scene.add(groundMesh)
        web.scene.add(cube)

        web.addGUI()
        web.gui.add(form, 'wireframe')
        web.gui.addColor(form, 'color')
        web.gui.addColor(form, 'emmissiveColor')
        web.gui.addColor(form, 'specularColor')
        web.gui.add(form, 'shiness', 0, 100)
        web.gui.add(form, 'selectedMesh', ['cube', 'sphere', 'plane'])

        renderScene()
    }

    let step = 0
    let selectedMesh: any = cube
    const renderScene = () => {
        selectedMesh.rotation.y = step += 0.01
        web.stats.update()
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
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
        meshMaterial.color = new THREE.Color(form.color)
        meshMaterial.emissive = new THREE.Color(form.emmissiveColor)
        meshMaterial.specular = new THREE.Color(form.emmissiveColor)
        meshMaterial.shininess = form.shiness
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
