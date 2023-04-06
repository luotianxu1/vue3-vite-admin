<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import WebGl from "@/utils/three/model/webGl"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load("./textures/door/color.jpg")
// doorColorTexture.offset.x = 0.5
// doorColorTexture.offset.y = 0.5
// doorColorTexture.center.set(0.5, 0.5)
// doorColorTexture.rotation = Math.PI / 4
// 设置纹理重复
// doorColorTexture.repeat.set(2,2)
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping
// doorColorTexture.wrapT = THREE.RepeatWrapping

// 透明纹理
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg")
// ao贴图
const doorAoTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg")
// 置换贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg")
// 粗糙度贴图
const doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg")
// 金属贴图
const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg")
// 法线贴图
const normalTexture = textureLoader.load("./textures/door/normal.jpg")

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200)
const material = new THREE.MeshStandardMaterial({
	map: doorColorTexture,
	alphaMap: doorAlphaTexture,
	transparent: true,
	aoMap: doorAoTexture,
	aoMapIntensity: 1,
	displacementMap: doorHeightTexture,
	displacementScale: 0.05,
	roughnessMap: doorRoughnessTexture,
	roughness: 1,
	metalnessMap: doorMetalnessTexture,
	metalness: 1,
	normalMap: normalTexture,
	side: THREE.DoubleSide
})
const cube = new THREE.Mesh(cubeGeometry, material)
cubeGeometry.setAttribute("uv2", new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))

const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(2, 0, 0)

// 给平面设置第二组uv
planeGeometry.setAttribute("uv2", new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	web.addAmbientLight(0xffffff, 0.5)
	web.addDirectionalLight(10, 10, 10, 0xffffff, 0.5)
	web.camera.position.set(0, 0, 5)

	web.scene.add(cube)
	web.scene.add(plane)

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
