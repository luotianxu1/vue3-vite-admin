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

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.scene.background = new THREE.Color(0x88ccee)
	web.camera.position.set(0, 0, 10)
	web.addAxesHelper()

	// 创建一个平面
	const planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
	const planeMaterial = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide,
		transparent: true,
		depthWrite: false
	})
	const plane = new THREE.Mesh(planeGeometry, planeMaterial)
	web.scene.add(plane)

	const canvas = document.createElement("canvas")
	canvas.width = 1080
	canvas.height = 1080
	canvas.style.position = "absolute"
	canvas.style.top = "0px"
	canvas.style.left = "0px"
	canvas.style.zIndex = "1"
	canvas.style.transform = "scale(0.1)"
	const context = canvas.getContext("2d")
	if (!context) {
		return
	}
	let image = new Image()
	image.src = "./textures/chat/chat.png"
	image.onload = function () {
		context.drawImage(image, 0, 0, 1080, 1080)
		context.textAlign = "center"
		context.textBaseline = "middle"
		context.font = "bold 100px Arial"
		context.fillStyle = "rgba(0,255,255,1)"
		context.fillText("Hello World", canvas.width / 2, canvas.height / 2)
		let texture = new THREE.CanvasTexture(canvas)
		plane.material.map = texture
		plane.material.alphaMap = texture
		plane.material.needsUpdate = true
	}
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
