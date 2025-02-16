<template>
	<div class="page">
		<div id="webgl" ref="webGl" class="webGl"></div>
	</div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import WebGl from "@/utils/three/model/webGl"
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

onBeforeUnmount(() => {
	document.body.removeChild(labelRenderer.domElement)
})

const textureLoader = new THREE.TextureLoader()
const EARTH_RADIUS = 1
const MOON_RADIUS = 0.27
const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16)
const earthMaterial = new THREE.MeshPhongMaterial({
	specular: 0x333333,
	shininess: 5,
	map: textureLoader.load("./textures/planets/earth_atmos_2048.jpg"),
	specularMap: textureLoader.load("./textures/planets/earth_specular_2048.jpg"),
	normalMap: textureLoader.load("./textures/planets/earth_normal_2048.jpg"),
	normalScale: new THREE.Vector2(0.85, 0.85)
})

const earth = new THREE.Mesh(earthGeometry, earthMaterial)
earth.name = "earth"

let moon
const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16)
const moonMaterial = new THREE.MeshPhongMaterial({
	shininess: 5,
	map: textureLoader.load("./textures/planets/moon_1024.jpg")
})
moon = new THREE.Mesh(moonGeometry, moonMaterial)
moon.name = "mooon"

// 实例化CSS2d渲染器
const labelRenderer = new CSS2DRenderer()
let controls

// 添加标签
const earthDiv = document.createElement("div")
earthDiv.className = "label1"
earthDiv.innerHTML = "地球"
earthDiv.style.color = "#fff"
const earthLabel = new CSS2DObject(earthDiv)
earthLabel.position.set(0, 1, 0)
earth.add(earthLabel)

let chinaLabel
const chinaDiv = document.createElement("div")
chinaDiv.className = "label"
chinaDiv.innerHTML = "中国"
chinaLabel = new CSS2DObject(chinaDiv)
chinaLabel.position.set(-0.3, 0.5, -0.9)
earth.add(chinaLabel)

const moonDiv = document.createElement("div")
moonDiv.className = "label1"
moonDiv.innerHTML = "月球"
moonDiv.style.color = "#fff"
const moonLabel = new CSS2DObject(moonDiv)
moonLabel.position.set(0, 0.3, 0)
moon.add(moonLabel)

// 实例化射线
const raycaster = new THREE.Raycaster()

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	web.camera.position.set(0, 5, -10)

	const dirLight = new THREE.DirectionalLight(0xffffff)
	dirLight.position.set(0, 0, 1)
	web.scene.add(dirLight)
	const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
	web.scene.add(light)

	web.scene.add(earth)
	web.scene.add(moon)

	labelRenderer.setSize(webGl.value.offsetWidth, webGl.value.offsetHeight)
	document.body.appendChild(labelRenderer.domElement)
	labelRenderer.domElement.style.position = "fixed"
	labelRenderer.domElement.style.top = "90px"
	labelRenderer.domElement.style.left = "200px"
	labelRenderer.domElement.style.zIndex = "10"

	controls = new OrbitControls(web.camera, labelRenderer.domElement)
	controls.enableDamping = true

	renderScene()
}

const clock = new THREE.Clock()
const renderScene = () => {
	const elapsed = clock.getElapsedTime()
	moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)
	const chainPosition = chinaLabel.position.clone()
	// 计算除标签和摄像机之间的距离
	const labelDistance = chainPosition.distanceTo(web.camera.position)
	// 检测射线的碰撞
	// 向量（坐标）从世界空间投影到相机的标准化设备坐标（NDC）空间
	chainPosition.project(web.camera)
	raycaster.setFromCamera(chainPosition, web.camera)
	const intersects = raycaster.intersectObjects(web.scene.children, true)

	// 如果没有碰撞到任何物体,那么让标签显示
	if (intersects.length === 0) {
		chinaLabel.element.classList.add("visible")
	} else {
		const minDistane = intersects[0].distance
		if (minDistane < labelDistance) {
			chinaLabel.element.classList.remove("visible")
		} else {
			chinaLabel.element.classList.add("visible")
		}
	}
	labelRenderer.render(web.scene, web.camera)

	controls.update()
	web.update()
	requestAnimationFrame(renderScene)
}
</script>

<style lang="scss">
.page {
	width: 100%;
	height: 100%;
	display: flex;

	.webGl {
		flex: 1;
		position: relative;
	}
}

.label {
	color: #fff;
	display: none;
	font-size: 0.2rem;
}

.visible {
	display: block;
}
</style>
