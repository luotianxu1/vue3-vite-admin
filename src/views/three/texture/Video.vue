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

// 创建canvas对象
const canvas = document.createElement("canvas")
canvas.width = 1080
canvas.height = 1080
canvas.style.position = "absolute"
canvas.style.top = "0px"
canvas.style.left = "0px"
canvas.style.zIndex = "1"
canvas.style.transformOrigin = "0 0"
canvas.style.transform = "scale(0.1)"
const context = canvas.getContext("2d")

// 添加视频纹理
const video = document.createElement("video")
video.src = "./video/ui_chat.mp4"
video.muted = true
video.loop = true
video.play()
const texture = new THREE.CanvasTexture(canvas)

// 创建一个平面
const planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const planeMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	side: THREE.DoubleSide,
	transparent: true,
	depthWrite: false,
	blending: THREE.AdditiveBlending,
	map: texture,
	alphaMap: texture
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.scene.background = new THREE.Color(0x88ccee)
	web.camera.position.set(0, 0, 10)
	web.addAxesHelper()
	web.scene.add(plane)

	renderScene()
}

const renderScene = () => {
	web.update()
	drawVideoText()
	requestAnimationFrame(renderScene)
}

function drawVideoText() {
	if (!context) {
		return
	}
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.drawImage(video, 0, 0, canvas.width, canvas.height)

	context.textAlign = "center"
	context.textBaseline = "middle"
	context.font = "bold 100px Arial"
	context.fillStyle = "rgba(255,255,255,1)"
	context.fillText("Hello World", canvas.width / 2, canvas.height / 2)

	texture.needsUpdate = true
	planeMaterial.needsUpdate = true
}
</script>

<style scoped lang="scss">
.webGl {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
