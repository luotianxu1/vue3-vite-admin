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
    const meshMaterial = new THREE.MeshBasicMaterial({
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
        opacity: 1,
        transparent: false,
        visible: true,
        wireframe: false,
        side: 'FrontSide',
        color: '#fffddd',
        selectedMesh: 'cube'
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.camera.position.set(-20, 50, 40)
        web.camera.lookAt(new THREE.Vector3(10, 0, 0))
        web.addAmbientLight(0x0c0c0c)
        web.addSpotLight(-40, 60, -10, 0xffffff)
        web.addAxesHelper()

        web.scene.add(groundMesh)
        web.scene.add(cube)

        web.addStats()
        web.addGUI()

        web.gui.add(form, 'opacity', 0, 1)
        web.gui.add(form, 'transparent')
        web.gui.add(form, 'visible')
        web.gui.add(form, 'side', ['FontSide', 'BackSide', 'DoubleSide'])
        web.gui.add(form, 'wireframe')
        web.gui.addColor(form, 'color')
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
        switch (val.side) {
            case 'FontSide':
                meshMaterial.side = THREE.FrontSide
                break
            case 'BackSide':
                meshMaterial.side = THREE.BackSide
                break
            case 'DoubleSide':
                meshMaterial.side = THREE.DoubleSide
                break
            default:
                meshMaterial.side = THREE.FrontSide
        }
        meshMaterial.opacity = val.opacity
        meshMaterial.transparent = val.transparent
        meshMaterial.visible = val.visible
        meshMaterial.wireframe = val.wireframe
        meshMaterial.color.set(val.color)
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
