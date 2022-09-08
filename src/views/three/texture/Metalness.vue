<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/model/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const sphereLight = new THREE.SphereGeometry(0.2)
    const sphereLightMaterial = new THREE.MeshStandardMaterial({
        color: 0xff5808
    })
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAmbientLight(0x888888)
        web.addPointLight(
            sphereLightMesh.position.x,
            sphereLightMesh.position.y,
            sphereLightMesh.position.z,
            '#ffffff'
        )
        web.scene.add(sphereLightMesh)

        const cubeLoader = new THREE.CubeTextureLoader()
        const urls = [
            './textures/cubemap/car/right.png',
            './textures/cubemap/car/left.png',
            './textures/cubemap/car/top.png',
            './textures/cubemap/car/bottom.png',
            './textures/cubemap/car/front.png',
            './textures/cubemap/car/back.png'
        ]
        web.scene.background = cubeLoader.load(urls)

        const cubeMaterial = new THREE.MeshStandardMaterial({
            envMap: web.scene.background,
            color: 0xffffff,
            metalness: 1,
            roughness: 0.5
        })
        const textureLoader = new THREE.TextureLoader()
        const cubeMaterialWithMetalMap = cubeMaterial.clone()
        cubeMaterialWithMetalMap.metalnessMap = textureLoader.load(
            './textures/engraved/roughness-map.jpg'
        )
        const cubeMaterialWithRoughnessMap = cubeMaterial.clone()
        cubeMaterialWithRoughnessMap.roughnessMap = textureLoader.load(
            './textures/engraved/roughness-map.jpg'
        )

        const sphere = new THREE.SphereGeometry(8, 50, 50)
        const cube1 = new THREE.Mesh(sphere, cubeMaterialWithMetalMap)
        cube1.castShadow = true
        cube1.position.x = -10
        cube1.rotation.y = (1 / 3) * Math.PI
        web.scene.add(cube1)

        const cube2 = new THREE.Mesh(sphere, cubeMaterialWithRoughnessMap)
        cube2.castShadow = true
        cube2.position.x = 10
        cube2.rotation.y = (-1 / 3) * Math.PI
        web.scene.add(cube2)
        renderScene()
    }

    let invert = 1
    let phase = 0
    const clock = new THREE.Clock()
    const renderScene = () => {
        const time = clock.getDelta()
        if (phase > 2 * Math.PI) {
            invert = invert * -1
            phase -= 2 * Math.PI
        } else {
            phase += time
        }
        sphereLightMesh.position.z = +(21 * Math.sin(phase))
        sphereLightMesh.position.x = -14 + 14 * Math.cos(phase)
        sphereLightMesh.position.y = 5
        if (invert < 0) {
            let pivot = 0
            sphereLightMesh.position.x =
                invert * (sphereLightMesh.position.x - pivot) + pivot
        }
        web.pointLight.position.copy(sphereLightMesh.position)
        web.update()
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
