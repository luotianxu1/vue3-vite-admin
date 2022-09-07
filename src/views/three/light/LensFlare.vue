<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import {
        Lensflare,
        LensflareElement
    } from 'three/examples/jsm/objects/Lensflare'
    import { Clock } from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const textureGrass = new THREE.TextureLoader().load(
        '../../src/assets/img/three/ground/grasslight-big.jpg'
    )
    textureGrass.wrapS = THREE.RepeatWrapping
    textureGrass.wrapT = THREE.RepeatWrapping
    textureGrass.repeat.set(10, 10)

    const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20)
    const planeMaterial = new THREE.MeshLambertMaterial({
        map: textureGrass
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    const sphereGeometry = new THREE.SphereGeometry(4, 25, 25)
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x7777ff
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = 10
    sphere.position.y = 5
    sphere.position.z = 10
    sphere.castShadow = true

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff3333
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    const textureFlare0 = THREE.ImageUtils.loadTexture(
        '../../src/assets/img/three/flares/lensflare0.png'
    )
    const textureFlare3 = THREE.ImageUtils.loadTexture(
        '../../src/assets/img/three/flares/lensflare3.png'
    )
    const flareColor = new THREE.Color(0xffaacc)
    const lensFlare = new Lensflare()
    lensFlare.addElement(
        new LensflareElement(textureFlare0, 350, 0.0, flareColor)
    )
    lensFlare.addElement(
        new LensflareElement(textureFlare3, 60, 0.6, flareColor)
    )
    lensFlare.addElement(
        new LensflareElement(textureFlare3, 70, 0.7, flareColor)
    )
    lensFlare.addElement(
        new LensflareElement(textureFlare3, 120, 0.9, flareColor)
    )
    lensFlare.addElement(
        new LensflareElement(textureFlare3, 70, 1.0, flareColor)
    )

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)

        web.scene.add(plane)
        web.scene.add(sphere)
        web.scene.add(cube)

        web.camera.position.set(-50,10,50)
        web.camera.lookAt(0,0,0)
        web.addAmbientLight('#1c1c1c')
        web.addSpotLight(-40, 60, -10,0xcccccc)
        web.addDirectionalLight(30, 10, -50,'#ffffff')
        web.directionalLight.add(lensFlare)
        web.addAxesHelper()

        renderScene()
    }

    let step = 0
    const clock = new Clock()
    const renderScene = () => {
        const delta = clock.getDelta()
        cube.rotation.x += delta
        cube.rotation.y += delta
        cube.rotation.z += delta

        step += delta
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
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
