<template>
    <div class="page">
        <div id="webgl" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import * as CANNON from 'cannon-es'
    import { initAxes, initCameraControl, initStats } from '@/utils/three/util'

    const scene = new THREE.Scene()

    initAxes(scene)

    const webGLRender = new THREE.WebGLRenderer()
    webGLRender.setClearColor(new THREE.Color(0x000000))
    webGLRender.setSize(window.innerWidth, window.innerHeight)
    webGLRender.shadowMap.enabled = true

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        300
    )
    camera.position.set(0, 0, 18)
    scene.add(camera)

    const cameraControls = initCameraControl(camera, webGLRender.domElement)

    const cubeArr: any = []
    const createCube = () => {
        const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshStandardMaterial()
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.castShadow = true
        scene.add(cube)

        // 创建物理形状
        const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
        // 创建物理世界的物体
        const cubeBody = new CANNON.Body({
            shape: cubeShape,
            position: new CANNON.Vec3(0, 0, 0),
            // 质量
            mass: 1,
            // 物体材质
            material: cubeWorldMaterial
        })
        cubeBody.applyLocalForce(
            new CANNON.Vec3(180, 0, 0), // 添加的力
            new CANNON.Vec3(0, 0, 0) // 施加的所在的位置
        )
        // 将物体添加到世界
        world.addBody(cubeBody)

        // 创建击打声音
        const hitSound = new Audio('./sound/metalHit.mp3')
        // 添加监听碰撞事件
        const HitEvent = (e) => {
            // 获取碰撞强度
            const impactStrength = e.contact.getImpactVelocityAlongNormal()
            if (impactStrength > 2) {
                // 重新从零开始播放
                hitSound.currentTime = 0
                hitSound.volume = impactStrength / 20
                hitSound.play()
            }
        }
        cubeBody.addEventListener('collide', HitEvent)
        cubeArr.push({
            mesh: cube,
            body: cubeBody
        })
    }

    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(20, 20),
        new THREE.MeshStandardMaterial()
    )
    floor.position.set(0, -5, 0)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(dirLight)
    dirLight.castShadow = true

    // 创建物理世界
    const world = new CANNON.World()
    // 设置作用力
    world.gravity.set(0, -9.8, 0)

    // 设置物体材质
    const cubeWorldMaterial = new CANNON.Material('cube')

    // 创建物理世界地面
    const floorShape = new CANNON.Plane()
    const floorBody = new CANNON.Body()
    const floorMaterial = new CANNON.Material('floor')
    floorBody.material = floorMaterial
    // 当质量为0的时候，可以使得物体保持不动
    floorBody.mass = 0
    floorBody.addShape(floorShape)
    // 地面位置
    floorBody.position.set(0, -5, 0)
    // 旋转地面的位置
    floorBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
    )
    world.addBody(floorBody)

    const defaultContactMaterial = new CANNON.ContactMaterial(
        cubeWorldMaterial,
        floorMaterial,
        {
            // 摩擦力
            friction: 0.1,
            // 弹性
            restitution: 0.7
        }
    )
    // 将材质的关联设置添加到物理世界
    world.addContactMaterial(defaultContactMaterial)
    // 设置世界碰撞的默认材料，如果材料没有设置，都用这个
    world.defaultContactMaterial = defaultContactMaterial

    window.addEventListener('click', createCube)

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        window.removeEventListener('click', createCube)
    })

    let stats
    const init = () => {
        const body = document.getElementById('webgl')
        if (!body) {
            return
        }
        body.appendChild(webGLRender.domElement)
        stats = initStats(body)
        renderScene()
    }

    const clock = new THREE.Clock()
    const renderScene = () => {
        let deltaTime = clock.getDelta()
        // 更新物理引擎
        world.step(1 / 60, deltaTime)
        cubeArr.forEach((item) => {
            // 设置位置
            item.mesh.position.copy(item.body.position)
            // 设置旋转
            item.mesh.quaternion.copy(item.body.quaternion)
        })
        cameraControls.update()
        stats.update()
        webGLRender.render(scene, camera)
        requestAnimationFrame(renderScene)
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
