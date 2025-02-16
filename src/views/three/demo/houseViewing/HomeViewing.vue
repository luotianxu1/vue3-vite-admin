<template>
	<div class="page">
		<div id="webgl" ref="container" class="webgl"></div>
		<div class="map">
			<div ref="tagDiv" class="tag"></div>
			<img src="../../../../assets/img/open/homeViewing/map.gif" alt="" />
		</div>
		<div v-if="progress !== 100" class="loading"></div>
		<div v-if="progress !== 100" class="progress">
			<span>新房加载中：{{ progress }}%</span>
		</div>
		<div class="title">VR全景看房</div>
	</div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import SpriteCanvas from "@/utils/three/model/mesh/SpriteCanvas"
import gsap from "gsap"

const container = ref()
let tagDiv = ref()
let progress = ref(0)

onMounted(() => {
	init()
	if (tagDiv.value) {
		tagDiv.value.style.cssText = `
                transform: translate(100px,110px);
            `
	}
})

const moveTag = name => {
	let positions = {
		客厅: [100, 110],
		厨房: [180, 190],
		阳台: [50, 50],
		卧室: [160, 40],
		走廊: [150, 90]
	}
	if (positions[name]) {
		gsap.to(tagDiv.value, {
			duration: 1,
			x: positions[name][0],
			y: positions[name][1],
			ease: "power3.inOut"
		})
	}
}

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 0)
camera.updateProjectionMatrix()
scene.add(camera)

// 创建渲染器
const webGLRenderer = new THREE.WebGLRenderer()
webGLRenderer.setSize(window.innerWidth, window.innerHeight)

class Room {
	name

	constructor(name, roomIndex, textureUrl, position = new THREE.Vector3(0, 0, 0), eular = new THREE.Euler(0, 0, 0)) {
		this.name = name
		// 添加立方体
		const geometry = new THREE.BoxGeometry(10, 10, 10)
		geometry.scale(1, 1, -1)

		const arr = [`${roomIndex}_l`, `${roomIndex}_r`, `${roomIndex}_u`, `${roomIndex}_d`, `${roomIndex}_b`, `${roomIndex}_f`]
		const boxMaterials: Array<THREE.MeshBasicMaterial> = []
		arr.forEach(item => {
			// 纹理加载
			let texture = new THREE.TextureLoader().load(`${textureUrl}/${item}.jpg`)
			if (item === `${roomIndex}_u` || item === `${roomIndex}_d`) {
				texture.rotation = Math.PI
				texture.center = new THREE.Vector2(0.5, 0.5)
				boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
			} else {
				boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
			}
			// boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
		})
		const cube = new THREE.Mesh(geometry, boxMaterials)
		cube.position.copy(position)
		cube.rotation.copy(eular)
		scene.add(cube)

		THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
			console.log(item, loaded, total)
			progress.value = Number(((loaded / total) * 100).toFixed(2))
		}
	}
}

// 创建客厅
let livingIndex = 0
let livingUrl = "./textures/room/livingroom"
let livingPosition = new THREE.Vector3(0, 0, 0)
new Room("客厅", livingIndex, livingUrl, livingPosition)

// 创建厨房
let kitIndex = 3
let textureUrl = "./textures/room/kitchen"
let kitPosition = new THREE.Vector3(-5, 0, -10)
let kitEuler = new THREE.Euler(0, -Math.PI / 2, 0)
new Room("厨房", kitIndex, textureUrl, kitPosition, kitEuler)
// 创建厨房精灵文字
const text = new SpriteCanvas(camera, "厨房", new THREE.Vector3(-1, 0, -3))
scene.add(text.mesh)
text.onClick(() => {
	console.log("厨房")
	gsap.to(camera.position, {
		duration: 1,
		x: kitPosition.x,
		y: kitPosition.y,
		z: kitPosition.z
	})
	moveTag("厨房")
})

// 创建客厅文字精灵
const textLiving = new SpriteCanvas(camera, "客厅", new THREE.Vector3(-4, 0, -6))
scene.add(textLiving.mesh)
textLiving.onClick(() => {
	console.log("客厅")
	gsap.to(camera.position, {
		x: livingPosition.x,
		y: livingPosition.y,
		z: livingPosition.z,
		duration: 1
	})
	moveTag("客厅")
})

// 创建阳台
let balconyPosition = new THREE.Vector3(0, 0, 15)
let balconyIndex = 8
let balconyUrl = "./textures/room/balcony"
let balconyEuler = new THREE.Euler(0, Math.PI / 16, 0)
new Room("阳台", balconyIndex, balconyUrl, balconyPosition, balconyEuler)
// 创建阳台文字精灵
const textBalcony = new SpriteCanvas(camera, "阳台", new THREE.Vector3(0, 0, 3))
scene.add(textBalcony.mesh)
textBalcony.onClick(() => {
	console.log("阳台")
	gsap.to(camera.position, {
		x: balconyPosition.x,
		y: balconyPosition.y,
		z: balconyPosition.z,
		duration: 1
	})
	moveTag("阳台")
})
// 创建阳台回客厅文字精灵
const textBalconyToLiving = new SpriteCanvas(camera, "客厅", new THREE.Vector3(-1, 0, 11))
scene.add(textBalconyToLiving.mesh)
textBalconyToLiving.onClick(() => {
	console.log("客厅")
	gsap.to(camera.position, {
		x: livingPosition.x,
		y: livingPosition.y,
		z: livingPosition.z,
		duration: 1
	})
	moveTag("客厅")
})

// 创建走廊
let hallwayPosition = new THREE.Vector3(-15, 0, 0)
let hallwayIndex = 9
let hallwayUrl = "./textures/room/corridor"
let hallwayEuler = new THREE.Euler(0, -Math.PI + Math.PI / 16, 0)
new Room("走廊", hallwayIndex, hallwayUrl, hallwayPosition, hallwayEuler)
// 走廊文字精灵
const textCorridor = new SpriteCanvas(camera, "走廊", new THREE.Vector3(-4, 0, 0.5))
scene.add(textCorridor.mesh)
textCorridor.onClick(() => {
	console.log("走廊")
	gsap.to(camera.position, {
		x: hallwayPosition.x,
		y: hallwayPosition.y,
		z: hallwayPosition.z,
		duration: 1
	})
	moveTag("走廊")
})
// 创建走廊回客厅文字精灵
const textCorridorToLiving = new SpriteCanvas(camera, "客厅", new THREE.Vector3(-11, 0, 0))
scene.add(textCorridorToLiving.mesh)
textCorridorToLiving.onClick(() => {
	console.log("客厅")
	gsap.to(camera.position, {
		x: livingPosition.x,
		y: livingPosition.y,
		z: livingPosition.z,
		duration: 1
	})
	moveTag("客厅")
})

// 创建主卧
let mainPosition = new THREE.Vector3(-25, 0, 2)
let mainIndex = 18
let mainUrl = "./textures/room/bedroom"
new Room(
	"主卧",
	mainIndex,
	mainUrl,
	mainPosition
	// mainEuler
)
// 主卧文字精灵
const textMain = new SpriteCanvas(camera, "主卧", new THREE.Vector3(-19, 0, 2))
scene.add(textMain.mesh)
textMain.onClick(() => {
	console.log("主卧")
	gsap.to(camera.position, {
		x: mainPosition.x,
		y: mainPosition.y,
		z: mainPosition.z,
		duration: 1
	})
	moveTag("主卧")
})
// 创建主卧回走廊文字精灵
const textMainToCorridor = new SpriteCanvas(camera, "走廊", new THREE.Vector3(-23, 0, -2))
scene.add(textMainToCorridor.mesh)
textMainToCorridor.onClick(() => {
	console.log("走廊")
	gsap.to(camera.position, {
		x: hallwayPosition.x,
		y: hallwayPosition.y,
		z: hallwayPosition.z,
		duration: 1
	})
	moveTag("走廊")
})

// 添加球
// const geometry = new THREE.SphereGeometry(5, 32, 32)
// const loader = new RGBELoader()
// loader.load('./textures/room/hdr/Living.hdr', (texture) => {
//     const material = new THREE.MeshBasicMaterial({ map: texture })
//     const sphere = new THREE.Mesh(geometry, material)
//     sphere.geometry.scale(1, 1, -1)
//     scene.add(sphere)
// })

const init = () => {
	if (!container.value) {
		return
	}
	container.value.appendChild(webGLRenderer.domElement)
	renderScene()
}

const renderScene = () => {
	webGLRenderer.render(scene, camera)
	requestAnimationFrame(renderScene)
}

let isMouseDown = false
// 监听鼠标按下事件
window.addEventListener(
	"mousedown",
	() => {
		isMouseDown = true
	},
	false
)
// 监听鼠标抬起事件
window.addEventListener(
	"mouseup",
	() => {
		isMouseDown = false
	},
	false
)
// 监听鼠标移动事件
window.addEventListener(
	"mousemove",
	e => {
		if (isMouseDown) {
			camera.rotation.y += (e.movementX / window.innerWidth) * Math.PI
			// camera.rotation.x += (e.movementY / window.innerHeight) * Math.PI;
		}
	},
	false
)
</script>

<style scoped lang="scss">
.page {
	width: 100%;
	height: 100%;
	display: flex;

	.webgl {
		flex: 1;
		position: relative;
	}

	.map {
		width: 300px;
		height: 260px;
		position: absolute;
		left: 0;
		bottom: 0;
		overflow: hidden;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
	.map > img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.map > .tag {
		position: absolute;
		top: 0;
		left: 0;
		width: 30px;
		height: 30px;
		background-image: url("../../../../assets/img/open/homeViewing/location.png");
		background-size: cover;
		z-index: 1;
	}
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: url("../../../../assets/img/open/homeViewing/loading.png");
		background-size: cover;
		filter: blur(50px);
		z-index: 100;
	}
	.progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 101;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		color: #fff;
	}
	.progress > img {
		padding: 0 15px;
	}

	.title {
		width: 180px;
		height: 40px;
		position: fixed;
		right: 100px;
		top: 50px;
		background-color: rgba(0, 0, 0, 0.5);
		line-height: 40px;
		text-align: center;
		color: #fff;
		border-radius: 5px;
		z-index: 110;
	}
}
</style>
