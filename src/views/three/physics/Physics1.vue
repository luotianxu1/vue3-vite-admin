<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import * as CANNON from "cannon-es"
import WebGl from "@/utils/three/model/webGl"

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true

const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20), new THREE.MeshStandardMaterial())
floor.position.set(0, -5, 0)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true

// 创建物理世界
const world = new CANNON.World()
// 设置作用力
world.gravity.set(0, -9.8, 0)

// 设置物体材质
const sphereWorldMaterial = new CANNON.Material("sphere")
// 创建物理小球形状
const sphereShape = new CANNON.Sphere(1)
// 创建物理世界的物体
const shpereBody = new CANNON.Body({
	shape: sphereShape,
	position: new CANNON.Vec3(0, 0, 0),
	// 小球质量
	mass: 1,
	// 物体材质
	material: sphereWorldMaterial
})
// 将物体添加到世界
world.addBody(shpereBody)

// 创建物理世界地面
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
const floorMaterial = new CANNON.Material("floor")
floorBody.material = floorMaterial
// 当质量为0的时候，可以使得物体保持不动
floorBody.mass = 0
floorBody.addShape(floorShape)
// 地面位置
floorBody.position.set(0, -5, 0)
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(floorBody)

const defaultContactMaterial = new CANNON.ContactMaterial(sphereWorldMaterial, floorMaterial, {
	// 摩擦力
	friction: 0.1,
	// 弹性
	restitution: 0.7
})
// 将材质的关联设置添加到物理世界
world.addContactMaterial(defaultContactMaterial)
// 设置世界碰撞的默认材料，如果材料没有设置，都用这个
world.defaultContactMaterial = defaultContactMaterial

// 创建击打声音
const hitSound = new Audio("./sound/metalHit.mp3")
// 添加监听碰撞事件
const HitEvent = e => {
	// 获取碰撞强度
	const impactStrength = e.contact.getImpactVelocityAlongNormal()
	if (impactStrength > 2) {
		// 重新从零开始播放
		hitSound.currentTime = 0
		hitSound.play()
	}
}
shpereBody.addEventListener("collide", HitEvent)

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	web.addAmbientLight(0xffffff, 0.5)
	web.addDirectionalLight(50, 100, 50, 0xffffff, 0.5)
	web.camera.position.set(0, 0, 18)

	web.scene.add(sphere)
	web.scene.add(floor)

	renderScene()
}

const clock = new THREE.Clock()
const renderScene = () => {
	let deltaTime = clock.getDelta()
	// 更新物理引擎
	world.step(1 / 60, deltaTime)
	sphere.position.set(shpereBody.position.x, shpereBody.position.y, shpereBody.position.z)
	web.update()
	requestAnimationFrame(renderScene)
}
</script>

<style scoped lang="scss">
.webGl {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
