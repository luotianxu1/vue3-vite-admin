<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import WebGl from "@/utils/three/model/webGl"
import basicVertexShader from "./shader/vertex.glsl?raw"
import basicFragmentShader from "./shader/fragment.glsl?raw"
import ca from "@/assets/textures/ca.jpeg"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(ca)

// 创建原始着色器材质
const rawShaderMaterial = new THREE.RawShaderMaterial({
	vertexShader: basicVertexShader,
	fragmentShader: basicFragmentShader,
	side: THREE.DoubleSide,
	uniforms: {
		uTime: {
			value: 0
		},
		uTexture: {
			value: texture
		}
	}
})

const floor = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), rawShaderMaterial)

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	web.camera.position.set(0, 0, 5)

	web.scene.add(floor)

	renderScene()
}

const clock = new THREE.Clock()
const renderScene = () => {
	rawShaderMaterial.uniforms.uTime.value = clock.getElapsedTime()
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
