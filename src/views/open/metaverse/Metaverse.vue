<template>
	<div id="container"></div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import Stats from "three/examples/jsm/libs/stats.module.js"
import { Octree } from "three/examples/jsm/math/Octree"
import { Capsule } from "three/examples/jsm/math/Capsule"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

onMounted(() => {
	const clock = new THREE.Clock()

	const scene = new THREE.Scene()
	scene.background = new THREE.Color(0x88ccee)
	scene.fog = new THREE.Fog(0x88ccee, 0, 50)

	const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000)
	camera.position.set(0, 5, 10)

	const backCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000)
	camera.position.set(0, 5, -10)

	const container = document.getElementById("container")

	const renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.VSMShadowMap
	renderer.outputEncoding = THREE.sRGBEncoding
	renderer.toneMapping = THREE.ACESFilmicToneMapping

	const stats = Stats()
	stats.domElement.style.position = "absolute"
	stats.domElement.style.top = "0px"
	if (!container) {
		return
	}
	container.appendChild(stats.domElement)
	container.appendChild(renderer.domElement)

	let activeCamera = camera

	function animate() {
		let delta = clock.getDelta()
		controlPlayer(delta)
		updatePlayer(delta)
		resetPlayer()
		stats.update()
		// 更新动作
		if (mixer) {
			mixer.update(delta)
		}
		renderer.render(scene, activeCamera)
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

	// 创建立方体叠楼梯效果
	for (let i = 0; i < 10; i++) {
		const boxGeometry = new THREE.BoxGeometry(1, 1, 0.15)
		const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		const box = new THREE.Mesh(boxGeometry, boxMaterial)
		box.position.y = 0.15 + i * 0.15
		box.position.z = i * 0.3
		plane.add(box)
	}

	// 创建一个octree
	const group = new THREE.Group()
	group.add(plane)
	scene.add(group)
	const worldOctree = new Octree()
	worldOctree.fromGraphNode(group)

	// 创建一个人的碰撞体
	const playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1.35, 0), 0.35)

	// 添加半球光源
	const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
	scene.add(hemisphereLight)

	// 加载机器人模型
	const loader = new GLTFLoader()
	let mixer
	let actions = {}
	// 设置激活动作
	let activeAction
	loader.load("./model/glb/RobotExpressive.glb", gltf => {
		const robot = gltf.scene
		robot.scale.set(0.5, 0.5, 0.5)
		robot.position.set(0, -0.88, 0)
		capsule.add(robot)
		mixer = new THREE.AnimationMixer(robot)
		for (let i = 0; i < gltf.animations.length; i++) {
			let name = gltf.animations[i].name
			actions[gltf.animations[i].name] = mixer.clipAction(gltf.animations[i])
			if (name === "Idle" || name === "Running" || name === "Walking") {
				actions[name].clampWhenFinished = false
				actions[name].loop = THREE.LoopRepeat
			} else {
				actions[name].clampWhenFinished = true
				actions[name].loop = THREE.LoopOnce
			}
		}
		activeAction = actions["Idle"]
		activeAction.play()
	})

	// 创建一个胶囊物体
	const capsule = new THREE.Object3D()
	capsule.position.set(0, 0.85, 0)
	scene.add(capsule)

	// 将相机作为胶囊的子元素，就可以实现跟随
	camera.position.set(0, 2, -5)
	camera.lookAt(capsule.position)
	backCamera.position.set(0, 2, 5)
	backCamera.lookAt(capsule.position)
	// 控制旋转上下的空3d对象
	const capsuleBodyControl = new THREE.Object3D()
	capsuleBodyControl.add(camera)
	capsuleBodyControl.add(backCamera)
	capsule.add(capsuleBodyControl)

	// 设置重力
	const gravity = -9.8
	// 玩家的速度
	const playerVelocity = new THREE.Vector3(0, 0, 0)
	// 方向向量
	const playerDirection = new THREE.Vector3(0, 0, 0)
	// 键盘按下事件
	const keyStates = {
		KeyW: false,
		KeyA: false,
		KeyS: false,
		KeyD: false,
		Space: false,
		isDown: false
	}

	// 玩家是否在地面上
	let playerOnFloor = false

	function updatePlayer(deltaTime) {
		let damping = -0.05
		if (playerOnFloor) {
			playerVelocity.y = 0
			keyStates.isDown || playerVelocity.addScaledVector(playerVelocity, damping)
		} else {
			playerVelocity.y += gravity * deltaTime
		}
		// 计算玩家移动的距离
		const playerMoveDistance = playerVelocity.clone().multiplyScalar(deltaTime)
		playerCollider.translate(playerMoveDistance)
		// 将胶囊的位置进行设置
		playerCollider.getCenter(capsule.position)
		// 进行碰撞检测
		playerCollisions()

		// 如果有水平的运动，则色湖之运动的动作
		if (
			Math.abs(playerVelocity.x) + Math.abs(playerVelocity.z) > 0.1 &&
			Math.abs(playerVelocity.x) + Math.abs(playerVelocity.z) <= 3
		) {
			fadeToAction("Walking")
		} else if (Math.abs(playerVelocity.x) + Math.abs(playerVelocity.z) > 3) {
			fadeToAction("Running")
		} else {
			fadeToAction("Idle")
		}
	}

	// 人物碰撞检测
	function playerCollisions() {
		const result = worldOctree.capsuleIntersect(playerCollider)
		playerOnFloor = false
		if (result) {
			playerOnFloor = result.normal.y > 0
			playerCollider.translate(result.normal.multiplyScalar(result.depth))
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
		"keydown",
		event => {
			keyStates[event.code] = true
			keyStates.isDown = true
		},
		false
	)
	document.addEventListener(
		"keyup",
		event => {
			keyStates[event.code] = false
			keyStates.isDown = false
			if (event.code === "KeyV") {
				activeCamera = activeCamera === camera ? backCamera : camera
			}
			if (event.code === "KeyT") {
				fadeToAction("Wave")
			}
		},
		false
	)

	// 动作
	function fadeToAction(name) {
		let prevAction = activeAction
		activeAction = actions[name]
		if (prevAction !== activeAction) {
			prevAction.fadeOut(0.3)
			activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.3).play()

			mixer.addEventListener("finished", () => {
				let action = activeAction
				activeAction = actions["Idle"]
				action.fadeOut(0.3)
				activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.3).play()
			})
		}
	}

	document.addEventListener("mousedown", () => {
		// 锁定鼠标指针
		document.body.requestPointerLock()
	})

	// 根据键盘状态更新玩家的速度
	function controlPlayer(deltaTime) {
		if (keyStates["KeyW"]) {
			playerDirection.z = 1
			//获取胶囊的正前面方向
			const capsuleFront = new THREE.Vector3(0, 0, 0)
			capsule.getWorldDirection(capsuleFront)
			// console.log(capsuleFront);
			// 计算玩家的速度
			playerVelocity.add(capsuleFront.multiplyScalar(deltaTime * 2))
		}
		if (keyStates["KeyS"]) {
			playerDirection.z = 1
			//获取胶囊的正前面方向
			const capsuleFront = new THREE.Vector3(0, 0, 0)
			capsule.getWorldDirection(capsuleFront)
			// console.log(capsuleFront);
			// 计算玩家的速度
			playerVelocity.add(capsuleFront.multiplyScalar(-deltaTime))
		}
		if (keyStates["KeyA"]) {
			playerDirection.x = 1
			//获取胶囊的正前面方向
			const capsuleFront = new THREE.Vector3(0, 0, 0)
			capsule.getWorldDirection(capsuleFront)

			// 侧方的方向，正前面的方向和胶囊的正上方求叉积，求出侧方的方向
			capsuleFront.cross(capsule.up)
			// console.log(capsuleFront);
			// 计算玩家的速度
			playerVelocity.add(capsuleFront.multiplyScalar(-deltaTime))
		}
		if (keyStates["KeyD"]) {
			playerDirection.x = 1
			//获取胶囊的正前面方向
			const capsuleFront = new THREE.Vector3(0, 0, 0)
			capsule.getWorldDirection(capsuleFront)

			// 侧方的方向，正前面的方向和胶囊的正上方求叉积，求出侧方的方向
			capsuleFront.cross(capsule.up)
			// console.log(capsuleFront);
			// 计算玩家的速度
			playerVelocity.add(capsuleFront.multiplyScalar(deltaTime))
		}
		if (keyStates["Space"]) {
			playerVelocity.y = 15
		}
	}

	// 根据鼠标在屏幕移动，来旋转胶囊
	window.addEventListener("mousemove", event => {
		capsule.rotation.y -= event.movementX * 0.003
		capsuleBodyControl.rotation.x += event.movementY * 0.003
		if (capsuleBodyControl.rotation.x > Math.PI / 8) {
			capsuleBodyControl.rotation.x = Math.PI / 8
		} else if (capsuleBodyControl.rotation.x < -Math.PI / 8) {
			capsuleBodyControl.rotation.x = -Math.PI / 8
		}
	})

	// 多层次细节展示
	let lod = new THREE.LOD()
	const material = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		wireframe: true
	})
	for (let i = 0; i < 5; i++) {
		const geometry = new THREE.SphereGeometry(1, 22 - i * 5, 22 - i * 5)
		const mesh = new THREE.Mesh(geometry, material)
		lod.addLevel(mesh, i * 5)
	}
	lod.position.set(10, 0, 10)
	scene.add(lod)

	animate()
})
</script>

<style lang="scss">
#container {
	width: 100vw;
	height: 100vh;
}
</style>
