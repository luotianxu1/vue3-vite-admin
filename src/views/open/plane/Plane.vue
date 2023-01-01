<template>
	<div id="webgl" class="webgl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import {
	EffectComposer,
	RenderPass,
	SelectiveBloomEffect,
	BlendFunction,
	EffectPass,
	SMAAEffect,
	SSAOEffect,
	NormalPass
	// GodRaysEffect
} from "postprocessing"
import { SSREffect } from "screen-space-reflections"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

onMounted(() => {
	init()
})

// 初始化场景
const scene = new THREE.Scene()
// 初始化相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 1.5, 8)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	logarithmicDepthBuffer: true,
	powerPreference: "high-performance"
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// 添加环境纹理
let rbgeLoader = new RGBELoader()
rbgeLoader.load("./textures/hdr/noon_grass_1k.hdr", texture => {
	texture.mapping = THREE.EquirectangularReflectionMapping
	scene.background = texture
	scene.environment = texture
})

// 添加模型
let dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("./draco/")
let gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load("./model/glb/court-transformed.glb", gltf => {
	rbgeLoader.load("./textures/hdr/living.hdr", texture => {
		texture.mapping = THREE.EquirectangularReflectionMapping
		gltf.scene.traverse(child => {
			let obj = child as THREE.Mesh
			if (obj.isMesh && child.name !== "GymFloor_ParquetShader_0") {
				obj.castShadow = true
				obj.receiveShadow = true
				;(obj.material as THREE.MeshStandardMaterial).envMapIntensity = 0.2
				;(obj.material as THREE.MeshBasicMaterial).envMap = texture
			}
			if (obj.name === "GymFloor_ParquetShader_0") {
				obj.castShadow = true
				obj.receiveShadow = true
				;(obj.material as THREE.MeshStandardMaterial).envMapIntensity = 0.2
				;(obj.material as THREE.MeshBasicMaterial).envMap = scene.environment
			}
		})
		scene.add(gltf.scene)
	})
})

// 添加聚光灯充当太阳
const sun = new THREE.SpotLight(0xffffff)
sun.position.set(-200, 200, -100)
sun.castShadow = true
sun.shadow.mapSize.width = 2048
sun.shadow.mapSize.height = 2048
sun.shadow.bias = -0.00001
sun.angle = 0.1
sun.intensity = 5
scene.add(sun)

// 实例化后期处理效果
const composer = new EffectComposer(renderer)
// 添加renderPass
composer.addPass(new RenderPass(scene, camera))
// 实例化SelectiveBloomEffect
const bloomEffect = new SelectiveBloomEffect(scene, camera, {
	blendFunction: BlendFunction.ADD,
	mipmapBlur: true,
	luminanceThreshold: 0.5,
	luminanceSmoothing: 0.3,
	intensity: 30
})
// 提升抗锯齿效果
const smaaEffect = new SMAAEffect()

// 添加环境光遮蔽
const normalPass = new NormalPass(scene, camera)
const ssaoEffect = new SSAOEffect(camera, normalPass.texture, {
	blendFunction: BlendFunction.MULTIPLY,
	samples: 32,
	rings: 3,
	luminanceInfluence: 0.1,
	radius: 0.005,
	bias: 0,
	intensity: 1
})

// 体积光
// let roomLight = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshBasicMaterial({
//         color: 0xffffff
//     })
// )
// roomLight.position.set(0, 5, 0)
// const godRaysEffect = new GodRaysEffect(camera, roomLight)
// scene.add(roomLight)

// 添加屏幕空间反射
let options = {
	intensity: 0.62,
	exponent: 8,
	distance: 16.3,
	fade: 1.96,
	roughnessFade: 1,
	thickness: 10,
	ior: 1.45,
	maxRoughness: 0.5,
	maxDepthDifference: 80,
	blend: 0.9,
	correction: 0.6,
	correctionRadius: 1,
	blur: 0.38,
	blurKernel: 1,
	blurSharpness: 10,
	jitter: 0,
	jitterRoughness: 0,
	steps: 80,
	refineSteps: 3,
	missedRays: true,
	useNormalMap: true,
	useRoughnessMap: true,
	resolutionScale: 1,
	velocityResolutionScale: 1
}
const ssrEffect = new SSREffect(scene, camera, options)

// 创建效果通道
const effectPass = new EffectPass(camera, bloomEffect, smaaEffect, ssaoEffect, ssrEffect)
composer.addPass(effectPass)

const init = () => {
	const body = document.getElementById("webgl")
	if (!body) {
		return
	}
	// 创建渲染器
	const width = body.offsetWidth
	const height = body.offsetHeight
	renderer.setSize(width, height)
	body.appendChild(renderer.domElement)
	renderScene()
}
const renderScene = () => {
	composer.render()
	requestAnimationFrame(renderScene)
}
</script>

<style scoped lang="scss">
.webgl {
	width: 100%;
	height: 100%;
}
</style>
