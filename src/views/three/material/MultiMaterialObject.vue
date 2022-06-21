<template>
    <div class="page">
        <div class="form">
            <el-button @click="addCube">添加物体</el-button>
            <el-form :model="form" label-width="100px">
                <el-form-item label="cameraNear">
                    <el-slider
                        v-model="form.cameraNear"
                        :min="0"
                        :max="100"
                        :step="1"
                    />
                </el-form-item>
                <el-form-item label="cameraFar">
                    <el-slider
                        v-model="form.cameraFar"
                        :min="50"
                        :max="200"
                        :step="1"
                    />
                </el-form-item>
                <el-form-item label="颜色">
                    <el-color-picker v-model="form.color" />
                </el-form-item>
            </el-form>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils'
    import { initAxes, initCameraControl, initStats } from '@/utils/three/util'

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
        50,
        110
    )
    camera.position.set(-50, 40, 50)
    camera.lookAt(scene.position)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    const ambientLight = new THREE.AmbientLight(0x0c0c0c)
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

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

    let cubeMaterial = new THREE.MeshDepthMaterial()
    let colorMaterial = new THREE.MeshBasicMaterial({
        color: '#fffddd',
        transparent: true,
        blending: THREE.MultiplyBlending
    })
    const addCube = () => {
        let cubeSize = Math.ceil(3 + Math.random() * 3)
        let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
        let cube = createMultiMaterialObject(cubeGeometry, [
            colorMaterial,
            cubeMaterial
        ])
        cube.children[1].scale.set(0.99, 0.99, 0.99)
        cube.castShadow = true

        cube.position.x = -60 + Math.round(Math.random() * 100)
        cube.position.y = Math.round(Math.random() * 10)
        cube.position.z = -100 + Math.round(Math.random() * 150)

        scene.add(cube)
    }

    const form = reactive({
        cameraNear: 50,
        cameraFar: 110,
        color: '#fffddd'
    })
    watch(form, (val) => {
        camera.near = val.cameraNear
        camera.far = val.cameraFar
        camera.updateProjectionMatrix()
        colorMaterial.color.set(val.color)
    })
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
