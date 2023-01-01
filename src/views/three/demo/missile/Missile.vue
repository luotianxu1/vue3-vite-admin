<template>
	<div class="page">
		<div ref="webGl" class="webGl"></div>
	</div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import WebGl from "@/utils/three/model/webGl"
import fragmentShader from "@/utils/three/shader/missile/fragmentShader.glsl?raw"
import { SpriteMaterial } from "three"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
	listener = null
	sound = null
})

let missile
let mapwkl
let mapels
let curvePath
let sprite
let listener
let sound
const params = {
	iTime: {
		value: 0
	}
}

// 添加声音
listener = new THREE.AudioListener()
sound = new THREE.Audio(listener)
const audioLoader = new THREE.AudioLoader()
audioLoader.load("./sound/bomb.mp3", buffer => {
	sound.setBuffer(buffer)
	sound.setVolume(0.5)
})

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.renderer.outputEncoding = THREE.sRGBEncoding
	web.renderer.toneMapping = THREE.ACESFilmicToneMapping
	web.renderer.toneMappingExposure = 1
	web.addStats()
	web.camera.position.set(0, 5, 10)
	web.addDirectionalLight(0, 10, 5)
	web.addDirectionalLight(0, -10, -5)

	let loader = new GLTFLoader()
	loader.load("./model/glb/missile.glb", gltf => {
		missile = gltf.scene.children[3]
		mapwkl = gltf.scene.children[1]
		mapels = gltf.scene.children[0]
		curvePath = gltf.scene.children[2]
		web.scene.add(missile)
		web.scene.add(mapwkl)
		web.scene.add(mapels)

		// 根据曲线的点创建曲线
		let points: Array<THREE.Vector3> = []
		for (let i = curvePath.geometry.attributes.position.count - 1; i >= 0; i--) {
			points.push(
				new THREE.Vector3(
					curvePath.geometry.attributes.position.array[i * 3],
					curvePath.geometry.attributes.position.array[i * 3 + 1],
					curvePath.geometry.attributes.position.array[i * 3 + 2]
				)
			)
		}
		curvePath = new THREE.CatmullRomCurve3(points)
	})

	// 创建精灵材质
	const spriteMaterial = new SpriteMaterial({
		color: 0xffffff,
		blending: THREE.AdditiveBlending,
		depthTest: false
	})
	spriteMaterial.onBeforeCompile = shader => {
		shader.uniforms.iResolution = {
			value: new THREE.Vector2(webGl.value.offsetWidth, webGl.value.offsetHeight)
		}
		shader.uniforms.iTime = params.iTime
		shader.uniforms.iChannel0 = {
			value: new THREE.TextureLoader().load("./textures/missile/ichannel0.png")
		}
		shader.uniforms.iChannel1 = {
			value: new THREE.TextureLoader().load("./textures/missile/ichannel1.png")
		}
		shader.uniforms.iChannel2 = {
			value: new THREE.TextureLoader().load("./textures/missile/ichannel2.png")
		}
		shader.uniforms.iMouse = { value: new THREE.Vector2(0, 0) }
		shader.vertexShader = shader.vertexShader.replace(
			"#include <common>",
			`
                #include <common>
                varying vec2 vUv;
                `
		)
		shader.vertexShader = shader.vertexShader.replace(
			"#include <uv_vertex>",
			`
                #include <uv_vertex>
                vUv = uv;
                `
		)
		shader.fragmentShader = fragmentShader
	}
	// 添加sprite
	sprite = new THREE.Sprite(spriteMaterial)
	sprite.renderOrder = 99
	sprite.position.set(-5.5, 0.8, 0)

	rendererScene()
}

const rendererScene = () => {
	let t = web.clock.getElapsedTime() % 5
	t = t / 5
	if (curvePath) {
		missile.position.copy(curvePath.getPointAt(t))
		if (t + 0.1 < 1) {
			missile.lookAt(curvePath.getPointAt(t + 0.01))
		}
	}
	if (t > 0.95) {
		web.scene.add(sprite)
		if (!sound.isPlaying) {
			sound.play()
		}
	}
	params.iTime.value = t * 10
	web.update()
	requestAnimationFrame(rendererScene)
}
</script>

<style scoped lang="scss">
.page {
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;

	.webGl {
		flex: 1;
		position: relative;
	}
}
</style>
