<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import vertexShader from "./shader/vertex.glsl?raw"
import fragmentShader from "./shader/fragment.glsl?raw"
import WebGl from "@/utils/three/model/webGl"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

const shadermaterial = new THREE.ShaderMaterial({
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	side: THREE.DoubleSide,
	transparent: true,
	uniforms: {
		uWaresFrequency: {
			value: 14
		},
		uScale: {
			value: 0.03
		},
		uxzScale: {
			value: 1.5
		},
		uNoiseFrequency: {
			value: 10
		},
		uNoiseScale: {
			value: 1.5
		},
		uTime: {
			value: 1
		},
		uLowColor: {
			value: new THREE.Color("#ff0000")
		},
		uHighColor: {
			value: new THREE.Color("#ffff00")
		},
		uXspeed: {
			value: 1
		},
		uZspeed: {
			value: 1
		},
		uNoiseSpeed: {
			value: 1
		},
		uOpacity: {
			value: 1
		}
	}
})

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1024, 1024), shadermaterial)
plane.rotation.x = -Math.PI / 2

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	web.camera.position.set(2, 2, 2)
	web.scene.add(plane)
	renderScene()
}

const clock = new THREE.Clock()
const renderScene = () => {
	shadermaterial.uniforms.uTime.value = clock.getElapsedTime()
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
