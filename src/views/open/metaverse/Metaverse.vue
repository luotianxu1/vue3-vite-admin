<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
    import * as THREE from 'three'
    import Stats from 'three/examples/jsm/libs/stats.module.js'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { Octree } from 'three/examples/jsm/math/Octree'
    import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper'
    import { Capsule } from 'three/examples/jsm/math/Capsule'

    onMounted(() => {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x88ccee)
        scene.fog = new THREE.Fog(0x88ccee, 0, 50)

        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        )
        camera.position.set(0, 5, 10)

        const container = document.getElementById('container')

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.VSMShadowMap
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.toneMapping = THREE.ACESFilmicToneMapping

        const stats = Stats()
        stats.domElement.style.position = 'absolute'
        stats.domElement.style.top = '0px'

        if (!container) {
            return
        }
        container.appendChild(renderer.domElement)
        container.appendChild(stats.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(0, 0, 0)

        const clock = new THREE.Clock()
        function animate() {
            let delta = clock.getDelta()
            // 计算玩家的方向向量
            controlsPlayer(delta)
            // 更新人物状态
            updatePlayer(delta)
            // 重置
            resetPlayer()
            stats.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        // 创建一个平面
        const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -Math.PI / 2

        // 创建一个octree
        const group = new THREE.Group()
        group.add(plane)
        scene.add(group)

        const wordOctree = new Octree()
        wordOctree.fromGraphNode(group)

        // 创建一个人的碰撞体
        const playerCollider = new Capsule(
            new THREE.Vector3(0, 0.35, 0),
            new THREE.Vector3(0, 1.35, 0),
            0.35
        )
        // 创建一个胶囊物体
        const capsuleGeometry = new THREE.CapsuleGeometry(0.35, 1, 32)
        const capsuleMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        })
        const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
        capsule.position.set(0, 0.85, 1)
        capsule.castShadow = true
        scene.add(capsule)

        // 设置重力
        const gravity = -9.8
        // 玩家速度
        const playerVelocity = new THREE.Vector3(0, 0, 0)
        // 方向向量
        const playerDirection = new THREE.Vector3(0, 0, 0)
        // 玩家是否在地面上
        let playerOnFloor = false
        // 键盘按下事件
        const keyStates = {
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false,
            Space: false,
            isDown: false
        }

        function updatePlayer(deltaTime) {
            let damping = -0.05
            if (playerOnFloor) {
                playerVelocity.y = 0
                keyStates['isDown'] || playerVelocity.addScaledVector(playerVelocity,damping)
            } else {
                playerVelocity.y += gravity * deltaTime
            }
            // 计算玩家移动距离
            const playerMoveDistance = playerVelocity
                .clone()
                .multiplyScalar(deltaTime)
            playerCollider.translate(playerMoveDistance)
            // 将胶囊的位置进行设置
            playerCollider.getCenter(capsule.position)

            // 碰撞检测
            playerCollisions()

        }

        // 人物碰撞检测
        function playerCollisions() {
            const result = wordOctree.capsuleIntersect(playerCollider)
            if (result) {
                playerOnFloor = result.normal.y > 0
                playerCollider.translate(
                    result.normal.multiplyScalar(result.depth)
                )
            }
        }

        function resetPlayer() {
            if (capsule.position.y < -20) {
                playerCollider.start.set(0, 2.35, 0)
                playerCollider.end.set(0, 3.35, 0)
                playerCollider.radius = 0.35
                playerVelocity.set(0, 0, 0)
                playerDirection.set(0, 0, 0)
            }
        }

        // 根据键盘按下的键更新键盘的状态
        document.addEventListener(
            'keydown',
            (event) => {
                keyStates[event.code] = true
                keyStates['isDown'] = true
            },
            false
        )
        document.addEventListener(
            'keyup',
            (event) => {
                keyStates[event.code] = false
                keyStates['isDown'] = false
            },
            false
        )

        // 根据键盘状态更新玩家的速度
        function controlsPlayer(deltaTime) {
            if (keyStates['KeyW']) {
                playerVelocity.z = 1
                // 获取胶囊的正前面方向
                const capsuleFront = new THREE.Vector3(0,0,0)
                capsule.getWorldDirection(capsuleFront)
                // 计算玩家速度
                playerVelocity.add(capsuleFront.multiplyScalar(deltaTime))
            }
        }

        animate()
    })
</script>

<style lang="scss">
    #container {
        width: 100vw;
        height: 100vh;
    }
</style>
