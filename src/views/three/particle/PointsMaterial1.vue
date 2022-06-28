<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width='120px'>
                    <el-form-item label="size">
                        <el-slider
                            v-model="form.size"
                            :min="0"
                            :max="10"
                            :step="1"
                        />
                    </el-form-item>
                    <el-form-item label="transparent">
                        <el-checkbox v-model="form.transparent" size="small"/>
                    </el-form-item>
                    <el-form-item label="opacity">
                        <el-slider
                            v-model="form.opacity"
                            :min="0"
                            :max="1"
                            :step="0.1"
                        />
                    </el-form-item>
                    <el-form-item label="color">
                        <el-color-picker v-model="form.color" />
                    </el-form-item>
                    <el-form-item label="sizeAttenuation">
                        <el-checkbox v-model="form.sizeAttenuation" size="small"/>
                    </el-form-item>
                    <el-form-item label="rotate">
                        <el-checkbox v-model="form.rotate" size="small"/>
                    </el-form-item>
                </el-form>
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
        initAmbientLight,
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
    camera.position.set(-30,40,30)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true
    // 创建灯光
    initAmbientLight(scene)

    const form = reactive({
        size:4,
        transparent: true,
        opacity: 0.6,
        color: '#ccffcc',
        sizeAttenuation: true,
        rotate: true
    })

    let cloud
    const createParticles = () => {
        const geometry = new THREE.BufferGeometry()
        const material = new THREE.PointsMaterial({
            size: form.size,
            transparent: form.transparent,
            opacity: form.opacity,
            sizeAttenuation: form.sizeAttenuation,
            color: new THREE.Color(form.color)
        })
        const range = 500
        let positions:any = []
        for (let i = 0; i < 15000; i++) {
            let x = Math.random() * range - range / 2
            let y = Math.random() * range - range / 2
            let z = Math.random() * range - range / 2
            positions.push(x, y, z)
        }
        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        )
        cloud = new THREE.Points(geometry, material)
        scene.add(cloud)
    }

    createParticles()

    watch(form, () => {
        if (cloud) {
            scene.remove(cloud)
        }
        createParticles()
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

    let step = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        if (form.rotate) {
            step += 0.01
            cloud.rotation.x = step
            cloud.rotation.z = step
        }
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
