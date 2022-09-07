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

    const loader = new THREE.TextureLoader()
    let particlesTexture = loader.load(`./public/textures/particles/1.png`)

    const params = {
        count: 10000,
        size: 0.1,
        radius: 5,
        branch: 3,
        color: '#ff6030',
        rotateScale: 0.3,
        endColor: '#1b3984'
    }

    let geometry: any = null
    let material: any = null
    let points: any = null
    const centerColor = new THREE.Color(params.color)
    const endColor = new THREE.Color(params.endColor)
    const generateGalaxy = () => {
        // 生成顶点
        geometry = new THREE.BufferGeometry()
        //   随机生成位置和
        const positions = new Float32Array(params.count * 3)
        // 设置顶点颜色
        const colors = new Float32Array(params.count * 3)

        //   循环生成点
        for (let i = 0; i < params.count; i++) {
            // 当前的点应该在那一条分支的角度上
            const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch)

            // 当前点距离圆心的距离
            const distance = Math.random() * params.radius * Math.pow(Math.random(), 3)
            const current = i * 3
            const randomX = Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance) / 5
            const randomY = Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance) / 5
            const randomZ = Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance) / 5
            positions[current] = Math.cos(branchAngel + distance * params.rotateScale) * distance + randomX
            positions[current + 1] = randomY
            positions[current + 2] = Math.sin(branchAngel + distance * params.rotateScale) * distance + randomZ

            // 混合颜色形成渐变色
            const mixColor = centerColor.clone()
            mixColor.lerp(endColor, distance / params.radius)
            colors[current] = mixColor.r
            colors[current + 1] = mixColor.g
            colors[current + 2] = mixColor.b
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        //   设置点材质
        material = new THREE.PointsMaterial({
            // color: new THREE.Color(params.color),
            size: params.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            map: particlesTexture,
            alphaMap: particlesTexture,
            transparent: true,
            vertexColors: true
        })

        points = new THREE.Points(geometry, material)
        web.scene.add(points)
    }

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.addAmbientLight(0x343434)
        web.camera.position.set(5,5,5)
        generateGalaxy()
        renderScene()
    }

    const renderScene = () => {
        web.stats.update()
        web.controls.update()
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
