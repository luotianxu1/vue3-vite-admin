<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-form :model="form" label-width="50px">
<!--                    <el-form-item label="地面">-->
<!--                        <el-color-picker v-model="form.groundColor" />-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="天空">-->
<!--                        <el-color-picker v-model="form.color" />-->
<!--                    </el-form-item>-->
                    <el-form-item label="禁用">
                        <el-checkbox v-model="form.disabled" size="large" />
                    </el-form-item>
                    <el-form-item label="强度">
                        <el-slider
                            v-model="form.intensity"
                            :min="0"
                            :max="3"
                            :step="0.1"
                        />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    // import Stats from 'stats.js'
    import Stats from 'three/examples/jsm/libs/stats.module'
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

    onMounted(() => {
        init()
    })

    // 创建场景
    const scene = new THREE.Scene()

    // create the ground plane
    const textureGrass = new THREE.TextureLoader().load(
        '../../src/assets/img/three/ground/grasslight-big.jpg'
    )
    textureGrass.wrapS = THREE.RepeatWrapping
    textureGrass.wrapT = THREE.RepeatWrapping
    textureGrass.repeat.set(10, 10)

    const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20)
    const planeMaterial = new THREE.MeshLambertMaterial({
        map: textureGrass
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    scene.add(plane)

    const sphereGeometry = new THREE.SphereGeometry(4, 25, 25)
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x7777ff
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = 10
    sphere.position.y = 5
    sphere.position.z = 10
    sphere.castShadow = true
    scene.add(sphere)

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff3333
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0
    scene.add(cube)

    const spotLight0 = new THREE.SpotLight(0xcccccc)
    spotLight0.position.set(-40, 60, -10)
    spotLight0.lookAt(plane.position)
    scene.add(spotLight0)

    const target = new THREE.Object3D()
    target.position.set(5, 0, 0)

    const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6)
    hemiLight.position.set(0, 500, 0)
    scene.add(hemiLight)

    const pointColor = '#ffffff'
    const dirLight = new THREE.DirectionalLight(pointColor)
    dirLight.position.set(30, 10, -50)
    dirLight.castShadow = true
    dirLight.target = plane
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 200
    dirLight.shadow.camera.left = -50
    dirLight.shadow.camera.right = 50
    dirLight.shadow.camera.top = 50
    dirLight.shadow.camera.bottom = -50
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    scene.add(dirLight)

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.setClearColor(new THREE.Color(0x000000))

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
    const clock = new THREE.Clock()

    // 创建坐标轴并设置轴线粗细为20
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    let stats
    const initStats = (el: HTMLElement) => {
        stats = Stats()
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

    let step = 0
    const renderScene = () => {
        const delta = clock.getDelta()
        stats.update()
        controls.update()
        cube.rotation.x += delta
        cube.rotation.y += delta
        cube.rotation.z += delta

        step += delta
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
        requestAnimationFrame(renderScene)
        renderer.render(scene, camera)
    }

    const form = reactive({
        groundColor: '0x00ff00',
        color: '0x0000ff',
        intensity: 1,
        disabled: false
    })
    watch(form, (val) => {
        // hemiLight.groundColor = new THREE.Color(val.groundColor)
        // hemiLight.color = new THREE.Color(val.color)
        hemiLight.visible = !val.disabled
        hemiLight.intensity = val.intensity
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
