<template>
    <div class="page">
        <div class="form">
            <div class='form-item'>
                <el-form :model="form" label-width="50px">
                    <el-form-item label="强度">
                        <el-slider v-model="form.intensity" :min='0' :max='3' :step='0.1'/>
                    </el-form-item>
                    <el-form-item label="颜色">
                        <el-color-picker v-model="form.color"/>
                    </el-form-item>
                    <el-form-item label="禁用">
                        <el-checkbox v-model="form.disabled" size="large" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import Stats from 'stats.js'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { addHouseAndTree } from '@/utils/three/util'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    // 创建坐标轴并设置轴线粗细为20
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    // 创建光源
    const ambientLight = new THREE.AmbientLight('#606008', 1)
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4)
    spotLight.shadow.mapSize.set(2048, 2048)
    spotLight.position.set(-30, 40, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // 添加物体
    addHouseAndTree(scene)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.setClearColor(new THREE.Color(0x000000))

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    let stats
    const initStats = (el: HTMLElement) => {
        stats = new Stats()
        stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        stats.dom.style.position = 'absolute'
        stats.dom.style.left = '0px'
        stats.dom.style.top = '0px'
        el && el.appendChild(stats.dom)
    }

    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        // 创建渲染器
        const width = body.offsetWidth
        const height = body.offsetHeight
        renderer.setSize(width, height)
        body.appendChild(renderer.domElement)
        initStats(body)
        renderScene()
    }

    const renderScene = () => {
        stats.update()
        controls.update()
        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    const form = reactive({
        intensity: 1,
        color: '#606008',
        disabled: false
    })

    watch(form, (val) => {
        ambientLight.intensity = val.intensity
        ambientLight.color = new THREE.Color(val.color)
        spotLight.visible = !val.disabled
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
