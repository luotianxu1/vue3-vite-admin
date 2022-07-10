<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-button type="primary" @click="addCube">添加物体</el-button>
            </div>
            <div class="form-item">
                <el-button type="primary" @click="logLastCube">
                    根据名称打印物体
                </el-button>
            </div>
            <div class="form-item">
                <el-button type="primary" @click="delCube">删除物体</el-button>
            </div>
            <div class="form-item">
                <el-button type="primary" @click="overrideMaterial">
                    指定同一属性
                </el-button>
            </div>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import Stats from 'stats.js'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()
    // scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
    scene.fog = new THREE.FogExp2(0xffffff, 0.015)

    // 创建坐标轴并设置轴线粗细为20
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    // 创建平面并定义平面大小
    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
    // 创建平面材质
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    })
    // 创建平面
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // 将平面绕x轴旋转90度
    plane.rotation.x = Math.PI * -0.5
    // 设置平面位置
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true
    scene.add(plane)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x3c3c3c)
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.shadowMap.enabled = true

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
        scene.traverse(function (obj) {
            if (obj instanceof THREE.Mesh && obj !== plane) {
                obj.rotation.x += 0.1
                obj.rotation.y += 0.1
                obj.rotation.z += 0.1
            }
        })
        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    const addCube = () => {
        const cubeSize = Math.ceil(Math.random() * 3)
        const cubeGeoMetry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
        const cubeMaterial = new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
        })
        const cube = new THREE.Mesh(cubeGeoMetry, cubeMaterial)
        cube.castShadow = true
        cube.name = 'cube-' + (scene.children.length - 3)
        cube.position.x =
            -30 + Math.round(Math.random() * planeGeometry.parameters.width)
        cube.position.y = Math.round(Math.random() * 5)
        cube.position.z =
            -20 + Math.round(Math.random() * planeGeometry.parameters.height)
        scene.add(cube)
    }

    const delCube = () => {
        const allChildren = scene.children
        const lastObject = allChildren[allChildren.length - 1]
        if (lastObject instanceof THREE.Mesh) {
            scene.remove(lastObject)
        }
    }

    const logLastCube = () => {
        let nameCube = scene.getObjectByName('cube-1')
        console.log(nameCube)
    }

    const overrideMaterial = () => {
        scene.overrideMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        })
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .form {
            width: 200px;

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
