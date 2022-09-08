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

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.camera.position.set(0, 0, 10)

        for (let i = 0; i < 50; i++) {
            const geometry = new THREE.BufferGeometry()
            const positionArray = new Float32Array(9)
            // 每一个三角形，需要3个顶点，每个顶点需要3个值
            for (let j = 0; j < 9; j++) {
                positionArray[j] = Math.random() * 10 - 5
            }
            geometry.setAttribute(
                'position',
                new THREE.BufferAttribute(positionArray, 3)
            )
            let color = new THREE.Color(
                Math.random(),
                Math.random(),
                Math.random()
            )
            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.5
            })
            const mesh = new THREE.Mesh(geometry, material)
            web.scene.add(mesh)
        }

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
