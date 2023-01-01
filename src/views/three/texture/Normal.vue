<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import cubeNoMap from "../../../assets/img/three/texture/general/plaster-normal.jpg"
import cubeMap from "../../../assets/img/three/texture/general/plaster.jpg"
import { addLargeGroundPlane } from "@/utils/three/util"
import WebGl from "@/utils/three/model/webGl"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

const sphereLight = new THREE.SphereGeometry(0.2)
const sphereLightMaterial = new THREE.MeshStandardMaterial({
	color: 0xff5808
})
const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial)

const textureLoader = new THREE.TextureLoader()

const cube = new THREE.BoxGeometry(16, 16, 16)
const cubeMaterial = new THREE.MeshStandardMaterial({
	map: textureLoader.load(cubeMap),
	metalness: 0.2,
	roughness: 0.07
})
const cubeMaterialWithNormalMap = cubeMaterial.clone()
cubeMaterialWithNormalMap.normalMap = textureLoader.load(cubeNoMap)

const cube1 = new THREE.Mesh(cube, cubeMaterial)
cube1.position.x = -17
cube1.rotation.y = (1 / 3) * Math.PI

const cube2 = new THREE.Mesh(cube, cubeMaterialWithNormalMap)
cube2.position.x = 17
cube2.rotation.y = (-1 / 3) * Math.PI

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()

	const groundPlane = addLargeGroundPlane(web.scene, true)
	groundPlane.position.y = -10
	web.addAmbientLight(0x343434)
	web.addSpotLight(-10, 30, 40, 0xffffff)
	web.scene.add(sphereLightMesh)
	web.scene.add(cube1)
	web.scene.add(cube2)
	web.addPointLight(0, 0, 0, "#ff5808")
	web.camera.position.set(0, 5, 40)

	renderScene()
}

let invert = 1
let phase = 0
const clock = new THREE.Clock()
const renderScene = () => {
	const time = clock.getDelta()
	if (phase > 2 * Math.PI) {
		invert = invert * -1
		phase -= 2 * Math.PI
	} else {
		phase += time
	}
	sphereLightMesh.position.z = Number(21 * Math.sin(phase))
	sphereLightMesh.position.x = -14 + 14 * Math.cos(phase)
	sphereLightMesh.position.y = 5
	if (invert < 0) {
		let pivot = 0
		sphereLightMesh.position.x = invert * (sphereLightMesh.position.x - pivot) + pivot
	}
	web.pointLight.position.copy(sphereLightMesh.position)
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
