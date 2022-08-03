<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    // import vertexShader from './shader/vertex.glsl?raw'
    // import fragmentShader from './shader/fragment.glsl?raw'
    import { initAxes, initCameraControl, initStats } from '@/utils/three/util'
    import { Water } from 'three/examples/jsm/objects/Water2'
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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
    camera.position.set(0, 5, 5)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    scene.add(camera)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)

    const controls = initCameraControl(camera, webGLRenderer.domElement)

    // 加载场景背景
    const rgbeLoader = new RGBELoader()
    rgbeLoader.loadAsync('./textures/hdr/050.hdr').then((texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.background = texture
        scene.environment = texture
    })

    // 加载浴缸
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/glb/yugang.glb', (gltf) => {
        const yugang = gltf.scene.children[0]
        yugang.material.side = THREE.DoubleSide

        const waterGeometry = gltf.scene.children[1].geometry
        const water = new Water(waterGeometry, {
            color: '#fff',
            scale: 1,
            flowDirection: new THREE.Vector2(1, 1),
            textureHeight: 1024,
            textureWidth: 1024
        })
        scene.add(gltf.scene)
        scene.add(water)
    })

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(directionalLight)

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
