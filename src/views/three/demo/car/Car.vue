<template>
	<div class="page">
		<div ref="webGl" class="webGl"></div>
		<div class="home-content">
			<div class="home-content-title">
				<h1>汽车展示与选配</h1>
			</div>
			<h2>选择车身颜色</h2>
			<div class="select">
				<div v-for="(item, index) in colors" :key="index" class="select-item" @click="selectColor(index)">
					<div class="select-item-color" :style="{ backgroundColor: item }"></div>
				</div>
			</div>

			<h2>选择贴膜材质</h2>
			<div class="select">
				<div v-for="(item, index) in materials" :key="index" class="select-item" @click="selectMaterial(index)">
					<div class="select-item-text">{{ item.name }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import WebGl from "@/utils/three/model/webGl"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

// 创建材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 1,
	roughness: 0.5,
	clearcoat: 1,
	clearcoatRoughness: 0
})

const frontMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 1,
	roughness: 0.5,
	clearcoat: 1,
	clearcoatRoughness: 0
})
const hoodMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 1,
	roughness: 0.5,
	clearcoat: 1,
	clearcoatRoughness: 0
})
const wheelsMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 1,
	roughness: 0.1
})
const glassMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xffffff,
	metalness: 0,
	roughness: 0,
	transmission: 1,
	transparent: true
})

let colors = ["red", "blue", "green", "gray", "orange", "purple"]
let selectColor = index => {
	bodyMaterial.color.set(colors[index])
	frontMaterial.color.set(colors[index])
	hoodMaterial.color.set(colors[index])
	wheelsMaterial.color.set(colors[index])
}

let materials = [
	{ name: "磨砂", value: 1 },
	{ name: "冰晶", value: 0 }
]
let selectMaterial = index => {
	bodyMaterial.clearcoatRoughness = materials[index].value
	frontMaterial.clearcoatRoughness = materials[index].value
	hoodMaterial.clearcoatRoughness = materials[index].value
}

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.camera.position.set(-3, 2, 1)

	web.renderer.setClearColor("#000")
	web.scene.background = new THREE.Color("#ccc")
	web.scene.background = new THREE.Color("#ccc")

	// 添加灯光
	const light1 = new THREE.DirectionalLight(0xffffff, 1)
	light1.position.set(0, 0, 10)
	web.scene.add(light1)
	const light2 = new THREE.DirectionalLight(0xffffff, 1)
	light2.position.set(0, 0, -10)
	web.scene.add(light2)
	const light3 = new THREE.DirectionalLight(0xffffff, 1)
	light3.position.set(10, 0, 0)
	web.scene.add(light3)
	const light4 = new THREE.DirectionalLight(0xffffff, 1)
	light4.position.set(-10, 0, 0)
	web.scene.add(light4)
	const light5 = new THREE.DirectionalLight(0xffffff, 1)
	light5.position.set(0, 10, 0)
	web.scene.add(light5)
	const light6 = new THREE.DirectionalLight(0xffffff, 0.3)
	light6.position.set(5, 10, 0)
	web.scene.add(light6)
	const light7 = new THREE.DirectionalLight(0xffffff, 0.3)
	light7.position.set(0, 10, 5)
	web.scene.add(light7)
	const light8 = new THREE.DirectionalLight(0xffffff, 0.3)
	light8.position.set(0, 10, -5)
	web.scene.add(light8)
	const light9 = new THREE.DirectionalLight(0xffffff, 0.3)
	light9.position.set(-5, 10, 0)
	web.scene.add(light9)

	// 添加网格地面
	const gridHelper = new THREE.GridHelper(10, 10)
	web.scene.add(gridHelper)

	// 添加gltf汽车模型
	const loader = new GLTFLoader()
	const dracoLoader = new DRACOLoader()
	dracoLoader.setDecoderPath("./draco/gltf/")
	loader.setDRACOLoader(dracoLoader)
	loader.load("./model/glb/bmw01.glb", gltf => {
		const bmw = gltf.scene
		web.scene.add(bmw)
		bmw.traverse(child => {
			// 判断是否是轮毂
			if (child instanceof THREE.Mesh && child.name.includes("轮毂")) {
				child.material = wheelsMaterial
			}
			// 判断是否是车身
			if (child instanceof THREE.Mesh && child.name.includes("Mesh002")) {
				child.material = bodyMaterial
			}
			// 判断是否是前脸
			if (child instanceof THREE.Mesh && child.name.includes("前脸")) {
				child.material = frontMaterial
			}
			// 判断是否是引擎盖
			if (child instanceof THREE.Mesh && child.name.includes("引擎盖_1")) {
				child.material = hoodMaterial
			}
			// 判断是否是挡风玻璃
			if (child instanceof THREE.Mesh && child.name.includes("挡风玻璃")) {
				child.material = glassMaterial
			}
		})
	})

	rendererScene()
}

const rendererScene = () => {
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

	.home-content {
		position: absolute;
		top: 0;
		right: 20px;

		.select-item-color {
			width: 50px;
			height: 50px;
			border: 1px solid #ccc;
			margin: 10px;
			display: inline-block;
			cursor: pointer;
			border-radius: 10px;
		}
		.select {
			display: flex;
		}
	}
}
</style>
