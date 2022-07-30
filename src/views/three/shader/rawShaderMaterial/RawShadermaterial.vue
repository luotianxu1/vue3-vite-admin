<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { initAxes, initCameraControl, initStats } from '@/utils/three/util'

    import basicVertexShader from './shader/vertex.glsl?raw'
    import basicFragmentShader from './shader/fragment.glsl?raw'
    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    // 创建坐标轴并设置轴线粗细为20
    initAxes(scene)
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(0, 0, 5)
    camera.lookAt(scene.position)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)

    // 创建原始着色器材质
    const rawShaderMaterial = new THREE.RawShaderMaterial({
        vertexShader: basicVertexShader,
        fragmentShader: basicFragmentShader
    })

    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        rawShaderMaterial
    )
    scene.add(floor)

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

    const renderScene = () => {
        cameraControls.update()
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
