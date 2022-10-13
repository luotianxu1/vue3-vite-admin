<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'
    import Ocean from '@/utils/three/model/mesh/ocean'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.renderer.toneMappingExposure = 0.1
        web.camera.position.set(-117, 17, -140)
        let bgPromise = web.setHdrBg('./textures/hdr/023.hdr')
        web.addStats()

        // 添加水
        let ocean = new Ocean()
        web.scene.add(ocean.mesh)

        // 创建视频纹理
        let video = document.createElement('video')
        video.src = './video/sucai01.mp4'
        video.autoplay = true
        video.loop = true
        video.muted = true
        video.play()
        let videoTexture = new THREE.VideoTexture(video)

        web.gltfLoader('./model/glb/building-min02.glb').then((gltf) => {
            let vetroMaterial
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                    child.material.shadowSide = THREE.BackSide
                }
                if (child.isMesh && child.name === 'Plane') {
                    child.visible = false
                }
                if (child.isMesh && child.material.name === 'Vetro') {
                    vetroMaterial = child.material
                }
            })
            bgPromise.then(() => {
                web.addSphereSky(
                    () => {
                        vetroMaterial.emissive = new THREE.Color(0x000000)
                    },
                    () => {
                        vetroMaterial.emissive = new THREE.Color(0x99cc99)
                        vetroMaterial.emissiveMap = videoTexture
                        vetroMaterial.emissiveIntensity = 1
                    }
                )
            })

            web.scene.add(gltf.scene)
        })

        render()
    }

    const render = () => {
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
