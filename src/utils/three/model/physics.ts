import * as THREE from 'three'
import { Octree } from 'three/examples/jsm/math/Octree'
import { Capsule } from 'three/examples/jsm/math/Capsule'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Physics {
    eventPositionList
    worldOctree
    playerCollider
    mixer
    actions
    activeAction
    robot
    capsule
    capsuleBodyControl
    gravity
    playerVelocity
    playerDirection
    keyStates
    playerOnFloor
    prevAction
    camera

    constructor(planeGroup, web) {
        this.camera = web.camera
        this.eventPositionList = []
        this.worldOctree = new Octree()
        this.worldOctree.fromGraphNode(planeGroup)

        // 创建一个人的碰撞体
        this.playerCollider = new Capsule(
            new THREE.Vector3(0, 0.35, 0),
            new THREE.Vector3(0, 1.35, 0),
            0.35
        )

        // 加载机器人模型
        const loader = new GLTFLoader()
        // 设置动作混合器
        this.actions = {}
        // 设置激活动作
        loader.load('./model/glb/RobotExpressive.glb', (gltf) => {
            this.robot = gltf.scene
            this.robot.scale.set(0.5, 0.5, 0.5)
            this.robot.position.set(0, -0.88, 0)

            this.capsule.add(this.robot)
            this.mixer = new THREE.AnimationMixer(this.robot)
            for (let i = 0; i < gltf.animations.length; i++) {
                let name = gltf.animations[i].name
                this.actions[name] = this.mixer.clipAction(gltf.animations[i])
                if (
                    name === 'Idle' ||
                    name === 'Walking' ||
                    name === 'Running'
                ) {
                    this.actions[name].clampWhenFinished = false
                    this.actions[name].loop = THREE.LoopRepeat
                } else {
                    this.actions[name].clampWhenFinished = true
                    this.actions[name].loop = THREE.LoopOnce
                }
            }
            this.activeAction = this.actions['Idle']
            this.activeAction.play()
        })

        this.capsule = new THREE.Object3D()
        this.capsule.position.set(0, 0.85, 0)
        const backCamera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        )
        // 将相机作为胶囊的子元素，就可以实现跟随
        web.camera.position.set(0, 2, -5)
        web.camera.lookAt(this.capsule.position)
        backCamera.position.set(0, 2, 5)
        backCamera.lookAt(this.capsule.position)
        // 控制旋转上下的空3d对象
        this.capsuleBodyControl = new THREE.Object3D()
        this.capsuleBodyControl.add(web.camera)
        this.capsuleBodyControl.add(backCamera)
        this.capsule.add(this.capsuleBodyControl)

        web.scene.add(this.capsule)

        // 设置重力
        this.gravity = -9.8
        // 玩家的速度
        this.playerVelocity = new THREE.Vector3(0, 0, 0)
        // 方向向量
        this.playerDirection = new THREE.Vector3(0, 0, 0)
        // 键盘按下事件
        this.keyStates = {
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false,
            Space: false,
            isDown: false
        }

        // 玩家是否在地面上
        this.playerOnFloor = false

        // 根据键盘按下的键来更新键盘的状态
        document.addEventListener(
            'keydown',
            (event) => {
                this.keyStates[event.code] = true
                this.keyStates.isDown = true
            },
            false
        )

        document.addEventListener(
            'keyup',
            (event) => {
                this.keyStates[event.code] = false
                this.keyStates.isDown = false
                if (event.code === 'KeyV') {
                    web.camera =
                        web.camera === this.camera ? backCamera : this.camera
                }
                if (event.code === 'KeyT') {
                    // 打招呼
                    this.fadeToAction('Wave')
                }
            },
            false
        )
        document.addEventListener(
            'mousedown',
            () => {
                // 锁定鼠标指针
                document.body.requestPointerLock()
            },
            false
        )
        // 根据鼠标在屏幕移动，来旋转胶囊
        window.addEventListener(
            'mousemove',
            (event) => {
                this.capsule.rotation.y -= event.movementX * 0.003

                this.capsuleBodyControl.rotation.x += event.movementY * 0.003
                if (this.capsuleBodyControl.rotation.x > Math.PI / 8) {
                    this.capsuleBodyControl.rotation.x = Math.PI / 8
                } else if (this.capsuleBodyControl.rotation.x < -Math.PI / 8) {
                    this.capsuleBodyControl.rotation.x = -Math.PI / 8
                }
            },
            false
        )
    }

    updatePlayer(deltaTime) {
        let damping = -0.25
        if (this.playerOnFloor) {
            this.playerVelocity.y = 0

            this.keyStates.isDown ||
                this.playerVelocity.addScaledVector(
                    this.playerVelocity,
                    damping
                )
        } else {
            this.playerVelocity.y += this.gravity * deltaTime
        }

        // 计算玩家移动的距离
        const playerMoveDistance = this.playerVelocity
            .clone()
            .multiplyScalar(deltaTime)
        this.playerCollider.translate(playerMoveDistance)
        // 将胶囊的位置进行设置
        this.playerCollider.getCenter(this.capsule.position)

        // 进行碰撞检测
        this.playerCollisions()

        // 如果有水平的运动，则设置运动的动作
        if (
            Math.abs(this.playerVelocity.x) + Math.abs(this.playerVelocity.z) >
                0.1 &&
            Math.abs(this.playerVelocity.x) + Math.abs(this.playerVelocity.z) <=
                3
        ) {
            this.fadeToAction('Walking')
        } else if (
            Math.abs(this.playerVelocity.x) + Math.abs(this.playerVelocity.z) >
            3
        ) {
            this.fadeToAction('Running')
        } else {
            this.fadeToAction('Idle')
        }
    }

    playerCollisions() {
        // 人物碰撞检测
        const result = this.worldOctree.capsuleIntersect(this.playerCollider)
        this.playerOnFloor = false
        if (result) {
            this.playerOnFloor = result.normal.y > 0
            this.playerCollider.translate(
                result.normal.multiplyScalar(result.depth)
            )
        }
    }

    resetPlayer() {
        if (this.capsule.position.y < -20) {
            this.playerCollider.start.set(0, 2.35, 0)
            this.playerCollider.end.set(0, 3.35, 0)
            this.playerCollider.radius = 0.35
            this.playerVelocity.set(0, 0, 0)
            this.playerDirection.set(0, 0, 0)
        }
    }

    fadeToAction(actionName) {
        this.prevAction = this.activeAction
        this.activeAction = this.actions[actionName]
        if (this.prevAction !== this.activeAction) {
            this.prevAction.fadeOut(0.3)
            this.activeAction
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(0.3)
                .play()

            this.mixer.addEventListener('finished', () => {
                this.prevAction = this.activeAction
                this.activeAction = this.actions['Idle']
                this.prevAction.fadeOut(0.3)
                this.activeAction
                    .reset()
                    .setEffectiveTimeScale(1)
                    .setEffectiveWeight(1)
                    .fadeIn(0.3)
                    .play()
            })
        }
    }

    controlPlayer(deltaTime) {
        if (this.keyStates['KeyW']) {
            this.playerDirection.z = 1
            //获取胶囊的正前面方向
            const capsuleFront = new THREE.Vector3(0, 0, 0)
            this.capsule.getWorldDirection(capsuleFront)
            // 计算玩家的速度
            // 当速度超过最大速度时，不操作
            if (
                this.playerVelocity.x * this.playerVelocity.x +
                    this.playerVelocity.z * this.playerVelocity.z <=
                200
            ) {
                this.playerVelocity.add(
                    capsuleFront.multiplyScalar(deltaTime * 5)
                )
            }
        }
        if (this.keyStates['KeyS']) {
            this.playerDirection.z = 1
            //获取胶囊的正前面方向
            const capsuleFront = new THREE.Vector3(0, 0, 0)
            this.capsule.getWorldDirection(capsuleFront)
            // 计算玩家的速度
            this.playerVelocity.add(capsuleFront.multiplyScalar(-deltaTime))
        }
        if (this.keyStates['KeyA']) {
            this.playerDirection.x = 1
            //获取胶囊的正前面方向
            const capsuleFront = new THREE.Vector3(0, 0, 0)
            this.capsule.getWorldDirection(capsuleFront)

            // 侧方的方向，正前面的方向和胶囊的正上方求叉积，求出侧方的方向
            capsuleFront.cross(this.capsule.up)
            // 计算玩家的速度
            this.playerVelocity.add(capsuleFront.multiplyScalar(-deltaTime))
        }
        if (this.keyStates['KeyD']) {
            this.playerDirection.x = 1
            //获取胶囊的正前面方向
            const capsuleFront = new THREE.Vector3(0, 0, 0)
            this.capsule.getWorldDirection(capsuleFront)

            // 侧方的方向，正前面的方向和胶囊的正上方求叉积，求出侧方的方向
            capsuleFront.cross(this.capsule.up)
            // 计算玩家的速度
            this.playerVelocity.add(capsuleFront.multiplyScalar(deltaTime))
        }
        if (this.keyStates['Space']) {
            this.playerVelocity.y = 5
        }
    }

    update(delta) {
        this.controlPlayer(delta)
        this.updatePlayer(delta)
        this.resetPlayer()
        if (this.mixer) {
            this.mixer.update(delta)
        }
        this.emitPositionEvent()
    }

    emitPositionEvent() {
        this.eventPositionList.forEach((item) => {
            // 计算胶囊距离某个点的距离，是否触发事件
            const distanceToSquared = this.capsule.position.distanceToSquared(
                item.localPosition
            )
            if (
                distanceToSquared < item.radius * item.radius &&
                item.isInner === false
            ) {
                item.isInner = true
                item.callback && item.callback(item)
            }

            if (
                distanceToSquared >= item.radius * item.radius &&
                item.isInner === true
            ) {
                item.isInner = false
                item.outCallback && item.outCallback(item)
            }
        })
    }

    // 监测位置
    onPosition(position, callback, outCallback, radius = 2) {
        let localPosition = position.clone()
        this.eventPositionList.push({
            localPosition,
            callback,
            outCallback,
            isInner: false,
            radius
        })
    }
}
