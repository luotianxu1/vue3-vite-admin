<template>
    <div class="page">
        <div class="form">
            <div>
                <el-button @click="save">保存</el-button>
            </div>
            <div>
                <el-button @click="load">加载</el-button>
            </div>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import {
        initAxes,
        initCamera,
        initCameraControl,
        initDefaultLighting,
        initStats
    } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()
    // 创建坐标轴并设置轴线粗细为20
    initAxes(scene)
    // 创建相机
    const camera = initCamera()
    camera.position.set(0, 40, 50)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true
    // 创建灯光
    initDefaultLighting(scene)

    const createMesh = (geom) => {
        const meshMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
            wireframeLinewidth: 2,
            color: 0xaaaaaa
        })
        meshMaterial.side = THREE.DoubleSide
        const mesh = new THREE.Mesh(geom, meshMaterial)
        mesh.position.set(20, 0, 0)
        return mesh
    }
    const knot = createMesh(new THREE.TorusKnotGeometry(10, 1, 64, 8, 2, 3))
    scene.add(knot)

    let data
    const save = () => {
        data = knot.toJSON()
        console.log(data)
    }

    let mesh
    const load = () => {
        if (mesh) {
            scene.remove(mesh)
        }
        const loader = new THREE.ObjectLoader()
        mesh = loader.parse(data)
        mesh.position.x = -20
        scene.add(mesh)
    }

    const cameraControls = initCameraControl(camera, webGLRenderer.domElement)
    const clock = new THREE.Clock()
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
        const delta = clock.getDelta()
        knot.rotation.y += 0.01
        cameraControls.update(delta)
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

        .form {
            width: 100px;
            margin-right: 10px;
            display: flex;
            flex-direction: column;
        }

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
