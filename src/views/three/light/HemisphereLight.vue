<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import WebGl from "@/utils/three/model/webGl"
import * as THREE from "three"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

let plane
let sphere
let cube

// 创建地面
const textureGrass = new THREE.TextureLoader().load("../../src/assets/img/three/ground/grasslight-big.jpg")
textureGrass.wrapS = THREE.RepeatWrapping
textureGrass.wrapT = THREE.RepeatWrapping
textureGrass.repeat.set(10, 10)
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20)
const planeMaterial = new THREE.MeshLambertMaterial({
	map: textureGrass
})
plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
plane.rotation.x = -0.5 * Math.PI
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0

const sphereGeometry = new THREE.SphereGeometry(4, 25, 25)
const sphereMaterial = new THREE.MeshPhongMaterial({
	color: 0x7777ff
})
sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x = 10
sphere.position.y = 5
sphere.position.z = 10
sphere.castShadow = true

const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
const cubeMaterial = new THREE.MeshLambertMaterial({
	color: 0xff3333
})
cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.castShadow = true
cube.position.x = -4
cube.position.y = 3
cube.position.z = 0

const form = reactive({
	groundColor: 0x00ff00,
	skyColor: 0x0000ff,
	intensity: 1,
	disabled: false
})

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addSpotLight(-40, 60, -10, 0xcccccc)
	web.spotLight.lookAt(plane.position)
	web.addDirectionalLight(30, 10, -50, "#ffffff", 1, false)
	web.addHemisphereLight(0, 5, 0, form.skyColor, form.groundColor, 0.6)

	web.scene.add(plane)
	web.scene.add(sphere)
	web.scene.add(cube)

	web.addGUI()
	web.addStats()

	web.gui.add(form, "intensity", 0, 3)
	web.gui.add(form, "disabled")

	renderScene()
}

let step = 0
const clock = new THREE.Clock()
const renderScene = () => {
	const delta = clock.getDelta()
	cube.rotation.x += delta
	cube.rotation.y += delta
	cube.rotation.z += delta

	step += delta
	sphere.position.x = 20 + 10 * Math.cos(step)
	sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))

	web.update()
	requestAnimationFrame(renderScene)
}

watch(form, val => {
	web.hemisphereLight.visible = !val.disabled
	web.hemisphereLight.intensity = val.intensity
})
</script>

<style scoped lang="scss">
.webGl {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
