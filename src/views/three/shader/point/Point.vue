<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import vertexShader from './shader/vertex.glsl?raw'
    import fragmentShader from './shader/fragment.glsl?raw'
    import WebGl from '@/utils/three/model/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    // 导入纹理
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./textures/particles/9.png')
    const texture1 = textureLoader.load('./textures/particles/10.png')
    const texture2 = textureLoader.load('./textures/particles/11.png')

    const params = {
        count: 1000,
        size: 0.1,
        radius: 5,
        branch: 4,
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
        if (points !== null) {
            geometry.dispose()
            material.dispose()
            web.scene.remove(points)
        }
        // 生成顶点
        geometry = new THREE.BufferGeometry()
        // 随机生成位置和
        const positions = new Float32Array(params.count * 3)
        // 设置顶点颜色
        const colors = new Float32Array(params.count * 3)
        const scales = new Float32Array(params.count)
        // 图案属性
        const imgIndex = new Float32Array(params.count)

        //   循环生成点
        for (let i = 0; i < params.count; i++) {
            // 当前的点应该在那一条分支的角度上
            const branchAngel =
                (i % params.branch) * ((2 * Math.PI) / params.branch)

            // 当前点距离圆心的距离
            const distance =
                Math.random() * params.radius * Math.pow(Math.random(), 3)
            const current = i * 3
            const randomX =
                (Math.pow(Math.random() * 2 - 1, 3) *
                    (params.radius - distance)) /
                5
            const randomY =
                (Math.pow(Math.random() * 2 - 1, 3) *
                    (params.radius - distance)) /
                5
            const randomZ =
                (Math.pow(Math.random() * 2 - 1, 3) *
                    (params.radius - distance)) /
                5
            positions[current] =
                Math.cos(branchAngel + distance * params.rotateScale) *
                    distance +
                randomX
            positions[current + 1] = randomY
            positions[current + 2] =
                Math.sin(branchAngel + distance * params.rotateScale) *
                    distance +
                randomZ

            // 混合颜色形成渐变色
            const mixColor = centerColor.clone()
            mixColor.lerp(endColor, distance / params.radius)
            colors[current] = mixColor.r
            colors[current + 1] = mixColor.g
            colors[current + 2] = mixColor.b

            // 顶点的大小
            scales[current] = Math.random()

            // 根据索引值设置不同的图案
            imgIndex[current] = i % 3
        }

        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute(
            'imgIndex',
            new THREE.BufferAttribute(imgIndex, 1)
        )

        //   设置点材质
        material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            vertexColors: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            transparent: true,
            uniforms: {
                uTexture: {
                    value: texture
                },
                uTexture1: {
                    value: texture1
                },
                uTexture2: {
                    value: texture2
                },
                uTime: {
                    value: 0
                },
                uColor: {
                    value: centerColor
                }
            }
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
        web.camera.position.set(5, 5, 5)

        generateGalaxy()

        renderScene()
    }

    const clock = new THREE.Clock()
    const renderScene = () => {
        material.uniforms.uTime.value = clock.getElapsedTime()
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
