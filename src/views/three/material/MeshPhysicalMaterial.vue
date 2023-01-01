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

const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4)
const groundMesh = new THREE.Mesh(
	groundGeom,
	new THREE.MeshBasicMaterial({
		color: 0x777777
	})
)
groundMesh.rotation.x = -Math.PI / 2
groundMesh.position.y = -20

const sphereGeometry = new THREE.SphereGeometry(14, 20, 20)
const cubeGeometry = new THREE.BoxGeometry(15, 15, 15)
const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4)
const meshMaterial = new THREE.MeshPhysicalMaterial({
	color: "rgb(119,119,255)",
	emissive: "rgb(0,0,0)",
	metalness: 0.5,
	roughness: 0.5,
	clearcoatRoughness: 0.5,
	reflectivity: 0.5,
	clearcoat: 0.5
})
const sphere = new THREE.Mesh(sphereGeometry, meshMaterial)
const cube = new THREE.Mesh(cubeGeometry, meshMaterial)
const plane = new THREE.Mesh(planeGeometry, meshMaterial)
sphere.position.x = 0
sphere.position.y = 3
sphere.position.z = 2
cube.position.copy(sphere.position)
plane.position.copy(sphere.position)

const form = reactive({
	wireframe: false,
	color: "rgb(119,119,255)",
	emmissiveColor: "rgb(0, 0, 0)",
	metalness: 0.5,
	roughness: 0.5,
	clearcoat: 0.5,
	reflectivity: 0.5,
	clearcoatRoughness: 0.5,
	selectedMesh: "cube"
})

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addSpotLight(0, 30, 60, 0xffffff, 0.6)
	web.addAmbientLight()
	web.addStats()
	web.addAxesHelper()

	web.scene.add(groundMesh)
	web.scene.add(cube)

	web.addGUI()
	web.gui.add(form, "wireframe")
	web.gui.addColor(form, "color")
	web.gui.addColor(form, "emmissiveColor")
	web.gui.add(form, "metalness", 0, 1)
	web.gui.add(form, "roughness", 0, 1)
	web.gui.add(form, "clearcoat", 0, 1)
	web.gui.add(form, "clearcoatRoughness", 0, 1)
	web.gui.add(form, "reflectivity", 0, 1)
	web.gui.add(form, "selectedMesh", ["cube", "sphere", "plane"])

	renderScene()
}

let step = 0
const clock = new THREE.Clock()
let selectedMesh: any = cube
const renderScene = () => {
	const time = clock.getDelta()
	selectedMesh.rotation.y = step += time
	web.update()
	requestAnimationFrame(renderScene)
}

watch(form, val => {
	web.scene.remove(plane)
	web.scene.remove(cube)
	web.scene.remove(sphere)
	switch (val.selectedMesh) {
		case "cube":
			web.scene.add(cube)
			selectedMesh = cube
			break
		case "sphere":
			web.scene.add(sphere)
			selectedMesh = sphere
			break
		case "plane":
			web.scene.add(plane)
			selectedMesh = plane
			break
		default:
			web.scene.add(cube)
			selectedMesh = cube
	}
	meshMaterial.wireframe = val.wireframe
	meshMaterial.color.set(val.color)
	meshMaterial.emissive.set(form.emmissiveColor)
	meshMaterial.metalness = form.metalness
	meshMaterial.roughness = form.roughness
	meshMaterial.clearcoat = form.clearcoat
	meshMaterial.clearcoatRoughness = form.clearcoatRoughness
	meshMaterial.reflectivity = form.reflectivity
})
</script>

<style scoped lang="scss">
.webGl {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
