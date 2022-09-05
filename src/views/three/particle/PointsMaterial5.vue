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

    const creatPoints = (url, size = 0.5) => {
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load(
            `./public/textures/particles/${url}.png`
        )
        const pointsMaterial = new THREE.PointsMaterial()
        pointsMaterial.size = size
        pointsMaterial.sizeAttenuation = true
        pointsMaterial.map = texture
        pointsMaterial.alphaMap = texture
        pointsMaterial.transparent = true
        pointsMaterial.depthWrite = false
        pointsMaterial.blending = THREE.AdditiveBlending
        // 启动顶点材质
        pointsMaterial.vertexColors = true

        const particleGeometry = new THREE.BufferGeometry()
        const count = 5000
        // 设置缓冲区数组
        const positions = new Float32Array(count * 3)
        // 设置顶点颜色
        const colors = new Float32Array(count * 3)
        // 设置顶点
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100
            colors[i] = Math.random()
        }
        particleGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )
        particleGeometry.setAttribute(
            'color',
            new THREE.BufferAttribute(colors, 3)
        )
        const points = new THREE.Points(particleGeometry, pointsMaterial)
        web.scene.add(points)
        return points
    }

    // const points = creatPoints('zs2')
    let points2

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        points2 = creatPoints('xh', 1)
        renderScene()
    }

    // 设置时钟
    const clock = new THREE.Clock()
    const renderScene = () => {
        let time = clock.getElapsedTime()
        // points.rotation.x = time * 0.3
        points2.rotation.x = time * 0.2
        points2.rotation.y = time * 0.05
        web.stats.update()
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
