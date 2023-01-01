<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import WebGl from "@/utils/three/model/webGl"
import { addLargeGroundPlane } from "@/utils/three/util"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

const textureLoader = new THREE.TextureLoader()
const sphere = new THREE.SphereGeometry(8, 180, 180)
const alpha = textureLoader.load("./textures/alpha/partial-transparency.png")
alpha.wrapS = THREE.RepeatWrapping
alpha.wrapT = THREE.RepeatWrapping
alpha.repeat.set(8, 8)
const sphereMaterial = new THREE.MeshStandardMaterial({
	alphaMap: alpha,
	metalness: 0.02,
	roughness: 0.07,
	color: 0xffffff,
	alphaTest: 0.5
})

const cube2 = new THREE.Mesh(sphere, sphereMaterial)
cube2.castShadow = true

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	web.addAmbientLight(0x444444)
	web.addSpotLight(-10, 30, 40, 0xffffff)
	web.camera.position.set(0, 20, 40)

	const groundPlane = addLargeGroundPlane(web.scene, true)
	groundPlane.position.y = -10
	web.scene.add(cube2)

	renderScene()
}

const renderScene = () => {
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
