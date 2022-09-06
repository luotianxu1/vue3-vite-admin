<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import basicVertexShader from './shader/vertex.glsl?raw'
    import basicFragmentShader from './shader/fragment.glsl?raw'
    import WebGl from '@/utils/three/modelNew/webGl'
    import ca from '@/assets/textures/ca.jpeg'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(ca)

    // 创建原始着色器材质
    const rawShaderMaterial = new THREE.RawShaderMaterial({
        vertexShader: basicVertexShader,
        fragmentShader: basicFragmentShader,
        side: THREE.DoubleSide,
        transparent: true,

        uniforms: {
            uTime: {
                value: 0
            },
            uTexture: {
                value: texture
            }
        }
    })

    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 64, 64),
        rawShaderMaterial
    )

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.camera.position.set(0, 0, 3)
        web.scene.add(floor)
        renderScene()
    }

    const clock = new THREE.Clock()
    const renderScene = () => {
        rawShaderMaterial.uniforms.uTime.value = clock.getElapsedTime()
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
