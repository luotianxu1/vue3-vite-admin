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

    let group = new THREE.Mesh()
    let mats: any = []
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0x009e60
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0x0051ba
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xffd500
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xff5800
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xc41e3a
        })
    )
    mats.push(
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        })
    )

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                let cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9)
                let cube = new THREE.Mesh(cubeGeom, mats)
                cube.position.set(x * 3 - 3, y * 3 - 3, z * 3 - 3)
                group.add(cube)
            }
        }
    }
    group.scale.copy(new THREE.Vector3(2, 2, 2))

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight(0x0c0c0c)
        web.addSpotLight(-40, 60, -10, 0xffffff)
        web.addStats()

        web.scene.add(group)

        renderScene()
    }

    const clock = new THREE.Clock()
    let step = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        web.controls.update()
        web.stats.update()
        group.rotation.y = step += delta
        group.rotation.z = step -= delta
        group.rotation.x = step += delta
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
