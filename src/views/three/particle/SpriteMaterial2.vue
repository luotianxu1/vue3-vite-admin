<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/modelNew/webGl'
    import { createGhostTexture } from '@/utils/three/util'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    const createSprites = () => {
        for (let x = -15; x < 15; x++) {
            for (let y = -10; y < 10; y++) {
                let material = new THREE.SpriteMaterial({
                    map: createGhostTexture(),
                    color: Math.random() * 0xffffff
                })
                let sprite = new THREE.Sprite(material)
                sprite.position.set(x * 4, y * 4, 0)
                web.scene.add(sprite)
            }
        }
    }

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()

        createSprites()

        renderScene()
    }

    const renderScene = () => {
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
