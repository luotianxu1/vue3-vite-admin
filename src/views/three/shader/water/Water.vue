<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import vertexShader from './shader/vertex.glsl?raw'
    import fragmentShader from './shader/fragment.glsl?raw'
    import { initAxes, initCameraControl, initStats } from '@/utils/three/util'
    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    initAxes(scene)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        90,
        window.innerHeight / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(0, 0, 2)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    scene.add(camera)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)

    const controls = initCameraControl(camera, webGLRenderer.domElement)

    const shadermaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {
            uWaresFrequency: {
                value: 14
            },
            uScale: {
                value: 0.03
            },
            uxzScale: {
                value: 1.5
            },
            uNoiseFrequency: {
                value: 10
            },
            uNoiseScale: {
                value: 1.5
            },
            uTime: {
                value: 1
            },
            uLowColor: {
                value: new THREE.Color('#ff0000')
            },
            uHighColor: {
                value: new THREE.Color('#ffff00')
            },
            uXspeed: {
                value: 1
            },
            uZspeed: {
                value: 1
            },
            uNoiseSpeed: {
                value: 1
            },
            uOpacity: {
                value: 1
            }
        }
    })

    const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 1024, 1024),
        shadermaterial
    )
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)

    let stats
    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        // 创建渲染器
        const width = body.offsetWidth
        const height = body.offsetHeight
        webGLRenderer.setSize(width, height)
        body.appendChild(webGLRenderer.domElement)
        stats = initStats(body)
        renderScene()
    }

    const clock = new THREE.Clock()
    const renderScene = () => {
        const elapsedTime = clock.getElapsedTime()
        shadermaterial.uniforms.uTime.value = elapsedTime
        controls.update()
        stats.update()
        requestAnimationFrame(renderScene)
        webGLRenderer.render(scene, camera)
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
