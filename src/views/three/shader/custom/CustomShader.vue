<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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
    camera.position.set(0, 0, 10)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    scene.add(camera)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    const controls = initCameraControl(camera, webGLRenderer.domElement)

    // 添加环境纹理
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    const envMapTexture = cubeTextureLoader.load([
        './textures/environmentMaps/0/px.jpg',
        './textures/environmentMaps/0/nx.jpg',
        './textures/environmentMaps/0/py.jpg',
        './textures/environmentMaps/0/ny.jpg',
        './textures/environmentMaps/0/pz.jpg',
        './textures/environmentMaps/0/nz.jpg'
    ])
    scene.environment = envMapTexture
    scene.background = envMapTexture

    const directionLight = new THREE.DirectionalLight('#ffffff', 1)
    directionLight.castShadow = true
    directionLight.position.set(0, 0, 200)
    scene.add(directionLight)

    const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(20, 20),
        new THREE.MeshStandardMaterial()
    )
    plane.position.set(0, 0, -6)
    plane.receiveShadow = true
    scene.add(plane)

    // 创建纹理加载器对象
    const textureLoader = new THREE.TextureLoader()
    // 加载模型纹理
    const modelTexture = textureLoader.load(
        './model/glb/LeePerrySmith/color.jpg'
    )
    // 加载模型的法向纹理
    const normalTexture = textureLoader.load(
        './model/glb/LeePerrySmith/normal.jpg'
    )
    const material = new THREE.MeshStandardMaterial({
        map: modelTexture,
        normalMap: normalTexture
    })

    const customUniforms = {
        uTime: {
            value: 0
        }
    }
    material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = customUniforms.uTime
        shader.vertexShader = shader.vertexShader.replace(
            '#include <common>',
            `
                #include <common>
                mat2 rotate2d(float _angle){
                    return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
                }
                uniform float uTime;`
        )
        shader.vertexShader = shader.vertexShader.replace(
            '#include <beginnormal_vertex>',
            `
                #include <beginnormal_vertex>
                float angle = sin(position.y + uTime) * 0.5;
                mat2 rotateMatrix = rotate2d(angle);
                objectNormal.xz = rotateMatrix * objectNormal.xz;`
        )
        shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `
                #include <begin_vertex>
                transformed.xz = rotateMatrix * transformed.xz;`
        )
    }

    const depthMaterial = new THREE.MeshDepthMaterial({
        depthPacking: THREE.RGBADepthPacking
    })

    depthMaterial.onBeforeCompile = (shader) => {
        shader.vertexShader = shader.vertexShader.replace(
            '#include <common>',
            `
                #include <common>
                mat2 rotate2d(float _angle){
                    return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
                }
                uniform float uTime;`
        )
        shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `
                #include <begin_vertex>
                float angle = sin(position.y + uTime) * 0.5;
                mat2 rotateMatrix = rotate2d(angle);
                transformed.xz = rotateMatrix * transformed.xz;`
        )
    }

    // 模型加载
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/glb/LeePerrySmith/LeePerrySmith.glb', (gltf) => {
        const mesh = gltf.scene.children[0] as THREE.Mesh
        mesh.material = material
        mesh.castShadow = true
        // 设定自定义的深度材质
        mesh.customDepthMaterial = depthMaterial
        scene.add(mesh)
    })

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
        customUniforms.uTime.value = clock.getElapsedTime()
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
