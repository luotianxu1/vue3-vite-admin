<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/model/webGl'
    import Clouds from '@/utils/three/model/mesh/clouds'
    import Ocean from '@/utils/three/model/mesh/ocean'
    import Physics from '@/utils/three/model/physics'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    let web
    let physics
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value, false)
        web.camera.position.set(0, 2, 10)
        web.setHdrBg('./textures/hdr/sky11.hdr')
        web.addStats()

        // 添加云
        let clouds = new Clouds()
        web.scene.add(clouds.mesh)

        // 添加水
        let ocean = new Ocean()
        web.scene.add(ocean.mesh)

        // 加载模型
        web.gltfLoader('./model/glb/metaScene03.glb').then((gltf) => {
            let planeGroup = new THREE.Group()
            planeGroup.position.copy(gltf.scene.children[0].position)
            gltf.scene.add(planeGroup)
            gltf.scene.traverse((child) => {
                if (
                    child.isMesh &&
                    child.material &&
                    child.material.name.indexOf(
                        'KB3D_DLA_ConcreteRiverRock'
                    ) !== -1
                ) {
                    planeGroup.add(child.clone())
                    child.visible = false
                }
                if (
                    child.isMesh &&
                    child.material &&
                    child.material.name.indexOf(
                        'KB3D_DLA_ConcreteScreedTan'
                    ) !== -1
                ) {
                    planeGroup.add(child.clone())
                    child.visible = false
                }
                if (
                    child.isMesh &&
                    child.material &&
                    child.material.name.indexOf(
                        'KB3D_DLA_ConcretePittedGrayLight'
                    ) !== -1
                ) {
                    planeGroup.add(child.clone())
                    child.visible = false
                }
            })
            web.scene.add(gltf.scene)
            physics = new Physics(planeGroup, web)

            // 添加喷泉旁的光阵视频
            let lightPlane = web.addVideo(
                './video/arrow.mp4',
                new THREE.Vector2(5, 3),
                new THREE.Vector3(-3, -0.3, 15)
            )
            lightPlane.mesh.rotation.x = -Math.PI / 2

            let lightCirclePosition = new THREE.Vector3(-3, -0.3, 15)
            let lightCircle = web.addLightCircle(lightCirclePosition)
        })

        renderScene()
    }

    const clock = new THREE.Clock()
    const renderScene = () => {
        let time = clock.getDelta()
        web.update()
        if (physics) {
            physics.update(time)
        }
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
