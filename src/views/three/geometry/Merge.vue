<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="100px">
                    <el-form-item label="cubePosX">
                        <el-slider
                            v-model="form.numberOfObjects"
                            :min="1"
                            :max="20000"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="combined">
                        <el-checkbox v-model="form.combined" size="small" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
    import {
        initAxes,
        initCamera,
        initCameraControl,
        initDefaultLighting,
        initLargeGroundPlane,
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
    camera.position.set(-30, 40, 30)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true
    // 创建灯光
    initDefaultLighting(scene)
    // 创建平面
    const groundPlane = initLargeGroundPlane(scene)
    groundPlane.position.y = -10

    const form = reactive({
        numberOfObjects: 500,
        combined: false
    })

    const cubeMaterial = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.5
    })
    const addcube = () => {
        let cubeSize = 1.0
        let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.castShadow = true
        cube.position.x = -60 + Math.round((Math.random() * 100))
        cube.position.y = Math.round((Math.random() * 10))
        cube.position.z = -150 + Math.round((Math.random() * 175))
        return cube
    }
    const generate = () => {
        const toRemove:any = []
        scene.traverse(function (e) {
            if (e instanceof THREE.Mesh) {
                toRemove.push(e)
            }
        })
        toRemove.forEach(function (e) {
            scene.remove(e)
        })

        if (form.combined) {
            let geometryArray:any = []
            for (let i = 0; i < form.numberOfObjects; i++) {
                let cubeMesh = addcube()
                cubeMesh.updateMatrix()
                const newGeometry = cubeMesh.geometry.applyMatrix4(cubeMesh.matrix)
                geometryArray.push(newGeometry)
            }

            // 合并模型
            let merged = mergeBufferGeometries(geometryArray)
            let mergeMesh = new THREE.Mesh(merged, cubeMaterial)
            scene.add(mergeMesh)
        } else {
            for (let i = 0; i < form.numberOfObjects; i++) {
                let cubeMesh = addcube()
                scene.add(cubeMesh)
            }
        }
    }

    generate()

    watch(form, () => {
        generate()
    })

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
            width: 200px;
            margin-right: 10px;

            .form-item {
                text-align: center;
                margin-top: 5px;
            }
        }

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
