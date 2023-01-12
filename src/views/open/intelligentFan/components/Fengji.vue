<template>
	<div class="scene" @click="closePop">
		<div ref="webGl" class="webGl"></div>
		<AlarmPop ref="alarmPop"></AlarmPop>
	</div>
</template>

<script setup lang="ts">
import AlarmPop from "./AlarmPop.vue"
import * as THREE from "three"
import gsap from "gsap"
import WebGl from "@/utils/three/model/webGl"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { reSetName } from "../utils/utils"

const props = defineProps({
	bbzShow: {
		type: Boolean,
		default: false
	}
})

const webGl = ref()
const alarmPop = ref()

// 场景风机动画
const arrTweenAn: Array<any> = []
let landform1, landform2, landform3
let txmaterial
let fengji = new THREE.Object3D()
let sceneOne = new THREE.Object3D()
let sceneTwo = new THREE.Object3D()
let flowfengye = new THREE.Object3D()
let flowfengji = new THREE.Object3D()
let arrNeedOutLine: Array<any> = []
let bLoaded = false

let textloader = new THREE.TextureLoader()
let textureFlow = textloader.load("./textures/light-animation.png")

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value, true, { alpha: true })
	web.addStats()

	web.renderer.setA
	web.camera.position.set(10, 7, 20)
	web.addDirectionalLight(-5.11643, 19.58311, -58.11632, 0xffffff, 2.2)
	web.addAmbientLight(0xffffff, 0.4)
	web.controls.minDistance = 0
	web.controls.maxDistance = 1000
	web.controls.minPolarAngle = 0
	web.controls.maxPolarAngle = Math.PI / 2

	rendererScene()
}

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("./draco/gltf/")
loader.setDRACOLoader(dracoLoader)
const addModel = () => {
	let p1 = new Promise(resolve => {
		loader.load("./model/glb/fengji/yepian.glb", function (gltf) {
			gltf.scene.position.set(-2.22, 99.65, 0)

			gltf.scene.traverse(function (child) {
				if (child.isMesh) {
					child.material.emissive = new THREE.Color(0x6bbee7)
				}
			})

			let an = gsap.to(gltf.scene.rotation, {
				duration: 5,
				repeat: -1,
				x: gltf.scene.rotation.x + Math.PI * 2
			})

			arrTweenAn.push(an)
			resolve(gltf.scene)
		})
	})
	let p2 = new Promise(resolve => {
		loader.load("./model/glb/fengji/zhuji2.glb", function (gltf) {
			gltf.scene.position.set(17.3, 2.73, -1.85)
			resolve(gltf.scene)
		})
	})
	let p3 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dixing1.glb", function (gltf) {
			landform1 = gltf.scene

			gltf.scene.traverse(function (child) {
				if (child.isMesh) {
					child.material.side = 2
					if (child.name.indexOf("地形") !== -1 || child.name.indexOf("山脉") !== -1) {
						child.material.transparent = true
						child.material.metalness = 0.8
						child.material.roughness = 0.71
						child.material.opacity = 1
						child.material.color = new THREE.Color(0x132441)
						child.material.emissive = new THREE.Color(0x132441)
					}
				}
			})
			resolve(gltf.scene)
		})
	})
	let p4 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dixing2.glb", function (gltf) {
			landform2 = gltf.scene
			gltf.scene.traverse(function (child) {
				if (child.isMesh) {
					child.material.side = 2
					if (child.name.indexOf("地形") !== -1 || child.name.indexOf("山脉") !== -1) {
						child.material.transparent = true
						child.material.metalness = 0.8
						child.material.roughness = 0.71
						child.material.opacity = 1
						child.material.color = new THREE.Color(0x132441)
						child.material.emissive = new THREE.Color(0x132441)
					}
				}
			})
			resolve(gltf.scene)
		})
	})
	let p5 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dixing3.glb", function (gltf) {
			landform3 = gltf.scene
			gltf.scene.traverse(function (child) {
				if (child.isMesh) {
					child.material.side = 2
					if (child.name.indexOf("地形") !== -1 || child.name.indexOf("山脉") !== -1) {
						child.material.transparent = true
						child.material.metalness = 0.8
						child.material.roughness = 0.71
						child.material.opacity = 1
						child.material.color = new THREE.Color(0x132441)
						child.material.emissive = new THREE.Color(0x132441)
					}
				}
			})
			resolve(gltf.scene)
		})
	})
	let p6 = new Promise(resolve => {
		loader.load("./model/glb/fengji/liuguang.glb", function (gltf) {
			txmaterial = gltf.scene.getObjectByName("模型").material
			txmaterial.map = textureFlow
			txmaterial.transparent = true
			txmaterial.map.wrapS = txmaterial.map.wrapT = THREE.RepeatWrapping
			gltf.scene.getObjectByName("模型").material = txmaterial
			gltf.scene.getObjectByName("模型_1").material = txmaterial
			gltf.scene.getObjectByName("模型_2").material = txmaterial

			gltf.scene.traverse(function (child) {
				if (child.isMesh) {
					child.material.side = 2
				}
			})
			resolve(gltf.scene)
		})
	})
	let p7 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dipan2.glb", function (gltf) {
			gltf.scene.scale.set(0.04, 0.04, 0.04)
			gltf.scene.position.set(0, -5, -0.7)
			gltf.scene.rotation.set(0, 90.43445, 0)
			resolve(gltf.scene)
		})
	})
	//风叶中电子元件
	let p8 = new Promise(resolve => {
		loader.load("./model/glb/fengji/toubu.glb", function (gltf) {
			gltf.scene.position.set(3.5, 0, 0)
			gltf.scene.rotation.set(10, 0, 0)
			resolve(gltf.scene)
		})
	})
	//尾部电子元件
	let p9 = new Promise(resolve => {
		loader.load("./model/glb/fengji/zhuzhou.glb", function (gltf) {
			gltf.scene.position.set(14.1, 100, -1.8)
			resolve(gltf.scene)
		})
	})
	let p10 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dizuo_2.glb", function (gltf) {
			gltf.scene.position.set(37, 95, -1.8)
			resolve(gltf.scene)
		})
	})
	let p11 = new Promise(resolve => {
		loader.load("./model/glb/fengji/fadongji.glb", function (gltf) {
			gltf.scene.position.set(26.4, 102, -1.8)
			resolve(gltf.scene)
		})
	})
	let p12 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dizuo_1.glb", function (gltf) {
			gltf.scene.position.set(20, 95, -1.8)
			resolve(gltf.scene)
		})
	})
	let p13 = new Promise(resolve => {
		loader.load("./model/glb/fengji/houzhuji1.glb", function (gltf) {
			gltf.scene.position.set(40, 102, -1.8)
			resolve(gltf.scene)
		})
	})
	let p14 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dianzi_3.glb", function (gltf) {
			gltf.scene.position.set(33.1, 99.5, -1.8)
			resolve(gltf.scene)
		})
	})
	let p15 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dizuo_3.glb", function (gltf) {
			gltf.scene.position.set(18, 92, -1.8)
			resolve(gltf.scene)
		})
	})
	let p16 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dizuo_4.glb", function (gltf) {
			gltf.scene.position.set(19.5, 95.8, -1.8)
			resolve(gltf.scene)
		})
	})
	let p17 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dianzi_1.glb", function (gltf) {
			gltf.scene.position.set(31, 98, -4.8)
			resolve(gltf.scene)
		})
	})
	let p18 = new Promise(resolve => {
		loader.load("./model/glb/fengji/dianzi_2.glb", function (gltf) {
			gltf.scene.position.set(39.5, 98.5, -4.8)
			resolve(gltf.scene)
		})
	})
	Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18]).then(result => {
		let zhujiClone = result[1].clone()
		zhujiClone.traverse(function (child) {
			if (child.isMesh) {
				child.material = child.material.clone()
				child.material.emissive = new THREE.Color(0x6bbee7)
			}
		})
		fengji.add(result[0], zhujiClone)
		fengji.scale.set(0.005, 0.005, 0.005)
		fengji.position.set(5.11, 0, 12.106)
		fengji.rotation.set(0, 89.5, 0)

		flowfengye.add(result[5], result[7])

		reSetName(result[8], "zhuzhou")
		reSetName(result[9], "dizuo_2")
		reSetName(result[10], "fadongji")
		reSetName(result[11], "dizuo_1")
		reSetName(result[12], "houzhuji1")
		reSetName(result[13], "dianzi_3")
		reSetName(result[14], "dizuo_3")
		reSetName(result[15], "dizuo_4")
		reSetName(result[16], "dianzi_1")
		reSetName(result[17], "dianzi_2")

		flowfengji.add(
			result[1].clone(),
			flowfengye,
			result[8],
			result[9],
			result[10],
			result[11],
			result[12],
			result[13],
			result[14],
			result[15],
			result[16],
			result[17]
		)

		// 添加轮廓线
		addOutLine(result[8], "zhuzhou", false)
		addOutLine(result[9], "dizuo_2", false)
		addOutLine(result[10], "fadongji", false)
		addOutLine(result[11], "dizuo_1", false)
		addOutLine(result[12], "houzhuji1", false)
		addOutLine(result[13], "dianzi_3", false)
		addOutLine(result[14], "dizuo_3", false)
		addOutLine(result[15], "dizuo_4", false)
		addOutLine(result[16], "dianzi_1", false)
		addOutLine(result[17], "dianzi_2", false)

		flowfengye.position.set(-2.2235, 99.65812, -1.5)
		flowfengji.scale.set(0.04, 0.04, 0.04)
		flowfengji.position.set(0, -1, 0)
		flowfengji.rotation.set(0, 89.5, 0)

		let an = gsap.to(flowfengye.rotation, {
			duration: 5,
			repeat: -1,
			x: flowfengye.rotation.x + Math.PI * 2
		})
		arrTweenAn.push(an)

		sceneTwo.add(result[6])
		sceneTwo.add(flowfengji)

		//风机
		cloneFan(0.74852, 2.56534, 7.44558)
		cloneFan(8.29076, 3.19363, 13.22294)
		cloneFan(5.24642, 3.49002, 10.11123)
		cloneFan(7.75871, 3.77725, 10.01902)
		cloneFan(-0.04669, 2.94419, 3.38853)
		cloneFan(6.58057, 3.38455, 0.83203)
		cloneFan(10.53541, 3.58002, -2.88202)
		cloneFan(-3.43544, 2.85505, 5.41173)
		cloneFan(-2.74084, 2.92708, 11.78238)
		cloneFan(-10.1402, 3.29675, 2.79538)
		cloneFan(-2.99843, 3.09172, -6.22022)
		cloneFan(15.37429, 3.50198, -0.2355)
		cloneFan(9.12926, 3.19598, -14.55305)
		cloneFan(3.46791, 2.56157, 0.53953)

		//地形1
		cloneLandform1(8.70549, 2.86865, -1.35901)
		cloneLandform1(18.70101, 2.64197, 10.13471)
		cloneLandform1(-5.72901, 2.8955, 15.39313)
		cloneLandform1(21.694, 2.56808, 18.92285)
		cloneLandform1(7.39948, 2.72258, -13.35363)
		cloneLandform1(14.23939, 2.75916, -27.02723)
		cloneLandform1(17.33572, 2.73076, -1.85427)
		cloneLandform1(17.33572, 2.73076, -14.2357)
		cloneLandform1(-10.18862, 2.90444, -18.9965)
		cloneLandform1(-15.615, 2.73076, -28.86956)
		cloneLandform1(-15.615, 2.73076, -9.47457)
		cloneLandform1(5.3932, 2.84328, -33.30284)
		cloneLandform1(9.75895, 2.73076, -46.883)
		cloneLandform1(17.33572, 2.73076, -37.66992)
		cloneLandform1(28.728, 2.89401, -26.29959)
		cloneLandform1(28.7608, 2.781, -1.85427)
		cloneLandform1(28.702, 2.73076, 18.6807)
		cloneLandform1(28.702, 2.73076, 33.284)
		cloneLandform1(11.26473, 2.8502, 33.284)
		cloneLandform1(-5.63942, 2.73076, 23.43441)
		cloneLandform1(-15.615, 2.94279, 33.284)
		cloneLandform1(-15.615, 2.73076, 13.04465)
		cloneLandform1(-15.615, 2.94475, 0.39202)
		cloneLandform1(-15.615, 2.73076, -19.4563)
		cloneLandform1(28.702, 2.73076, -46.883)
		cloneLandform1(-15.615, 2.73076, -46.883)

		//地形2
		cloneLandform2(-4.39732, 2.31106, -7.5534)
		cloneLandform2(-11.34043, 2.31106, 3.62787)
		cloneLandform2(7.58834, 2.31106, 24.15814)
		cloneLandform2(-0.14082, 2.31106, -18.75615)
		cloneLandform2(-5.01234, 2.31106, -32.15209)
		cloneLandform2(-4.23729, 2.0619, -46.883)
		cloneLandform2(21.94042, 2.31106, -46.88289)
		cloneLandform2(28.702, 2.31106, -36.6848)
		cloneLandform2(28.68036, 2.28686, -13.23737)
		cloneLandform2(28.716, 2.26106, 8.15521)
		cloneLandform2(18.61536, 2.31106, 33.284)
		cloneLandform2(-0.92105, 2.31106, 33.284)
		cloneLandform2(-15.615, 2.31106, 22.367)
		cloneLandform2(-15.615, 2.14719, -38.39289)
		sceneOne.add(landform1)
		sceneOne.add(landform2)
		sceneOne.add(landform3)

		landform1.position.set(17.33572, 2.7305, -1.85427)
		landform2.position.set(20.758, 1.73076, -3.13564)
		landform3.position.set(6.37, 2.578, 11.246)
		landform3.rotation.set(0, 29.87, 0)

		sceneTwo.visible = false
		bLoaded = true

		web.scene.add(sceneOne)
		web.scene.add(sceneTwo)
	})
}

/**
 * 切换风机播放暂停
 * @param isShow
 */
const startFan = isShow => {
	arrTweenAn.forEach(an => {
		isShow ? an.play() : an.pause()
	})
}

/**
 * 切换数字风机
 * @param isShow
 */
const changeView1 = isShow => {
	if (isShow) {
		gsap.to(web.camera.position, 5, {
			x: 9.536,
			y: 3.862,
			z: 15.19,
			repeat: 0,
			onComplete: () => {
				sceneOne.visible = false
				sceneTwo.visible = true
				web.directionalLight.position.set(10, 10, -10)
			}
		})
	} else {
		sceneOne.visible = true
		sceneTwo.visible = false
		web.directionalLight.position.set(-5.11643, 19.58311, -58.11632)
		gsap.to(web.camera.position, 5, {
			x: 10,
			y: 7,
			z: 20,
			repeat: 0,
			onComplete: () => {}
		})
	}
}

/**
 * 切换舱体视角
 */
const changeView2 = isShow => {
	if (isShow) {
		gsap.to(web.camera.position, 5, {
			x: 2.29,
			y: 0.66,
			z: 1.187,
			repeat: 0,
			onComplete: () => {
				web.directionalLight.position.set(10, 2, 0)
			}
		})
		gsap.to(flowfengji.position, 5, {
			x: -1,
			y: -4,
			z: 0,
			repeat: 0,
			onComplete: () => {}
		})
	} else {
		gsap.to(web.camera.position, 5, {
			x: 9.536,
			y: 3.862,
			z: 15.19,
			repeat: 0,
			onComplete: () => {}
		})
		gsap.to(flowfengji.position, 5, {
			x: 0,
			y: -1,
			z: 0,
			repeat: 0,
			onComplete: () => {
				web.directionalLight.position.set(10, 10, -10)
			}
		})
	}
}

/**
 * 切换爆炸分解
 * @param isShow
 */
const changeView3 = isShow => {
	if (isShow) {
		gsap.to(web.camera.position, 5, {
			x: 2.9941,
			y: 0.733,
			z: -2.37,
			repeat: 0
		})
		gsap.to(flowfengji.position, 5, {
			x: 0.5,
			y: -3.8,
			z: 0.5,
			repeat: 0
		})
		let keziL = flowfengji.children[0].getObjectByName("kezileft").position
		gsap.to(keziL, 1, {
			x: 0,
			y: 0,
			z: 100,
			repeat: 0
		})
		let keziR = flowfengji.children[0].getObjectByName("keziright").position
		gsap.to(keziR, 1, {
			x: 0,
			y: 0,
			z: -100,
			repeat: 0,
			onComplete: () => {
				gsap.to(flowfengji.children[4].position, 0.3, {
					x: 26,
					y: 109,
					z: -1.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_0").position, 0.3, {
					x: 0,
					y: -5,
					z: 0,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_1").position, 0.3, {
					x: 0,
					y: -5,
					z: 0,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_2").position, 0.3, {
					x: 0,
					y: -5,
					z: 0,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_3").position, 0.3, {
					x: 12.186,
					y: 3.8965,
					z: 0.0482,
					repeat: 0
				})
				gsap.to(flowfengji.children[7].position, 0.3, {
					x: 33.9,
					y: 99.5,
					z: -13.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[3].position, 0.3, {
					x: 37,
					y: 90,
					z: -1.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[10].position, 0.3, {
					x: 31,
					y: 93,
					z: -4.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[11].position, 0.3, {
					x: 39.5,
					y: 93.5,
					z: -4.8,
					repeat: 0
				})
			}
		})
	} else {
		gsap.to(web.camera.position, 5, {
			x: 2.29,
			y: 0.66,
			z: 1.187,
			repeat: 0
		})
		gsap.to(flowfengji.position, 5, {
			x: -1,
			y: -4,
			z: 0,
			repeat: 0
		})
		let keziL = flowfengji.children[0].getObjectByName("kezileft").position
		gsap.to(keziL, 1, {
			x: 0,
			y: 0,
			z: 0,
			repeat: 0
		})
		let keziR = flowfengji.children[0].getObjectByName("keziright").position
		gsap.to(keziR, 1, {
			x: 0,
			y: 0,
			z: 0,
			repeat: 0,
			onStart: () => {
				gsap.to(flowfengji.children[4].position, 0.3, {
					x: 26.4,
					y: 102,
					z: -1.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_0").position, 0.3, {
					x: 0,
					y: 0,
					z: 0,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_1").position, 0.3, {
					x: 0,
					y: 0,
					z: 0,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_2").position, 0.3, {
					x: 0,
					y: 0,
					z: 0,
					repeat: 0
				})
				gsap.to(flowfengji.children[6].getObjectByName("houzhuji1_3").position, 0.3, {
					x: 0.186025,
					y: 2.094589,
					z: 0.048225,
					repeat: 0
				})
				gsap.to(flowfengji.children[7].position, 0.3, {
					x: 33.1,
					y: 99.5,
					z: -1.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[3].position, 0.3, {
					x: 37,
					y: 95,
					z: -1.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[10].position, 0.3, {
					x: 31,
					y: 98,
					z: -4.8,
					repeat: 0
				})
				gsap.to(flowfengji.children[11].position, 0.3, {
					x: 39.5,
					y: 98.5,
					z: -4.8,
					repeat: 0
				})
			}
		})
	}
}

defineExpose({
	startFan,
	changeView1,
	changeView2,
	changeView3
})

/**
 * 添加轮廓线
 * @param obj
 * @param strName
 * @param bErr
 */
const addOutLine = (obj, strName, bErr) => {
	let cloneObj = obj.clone()
	cloneObj.position.x = obj.position.x + 0.1
	cloneObj.scale.set(1.02, 1.02, 1.02)
	cloneObj.visible = false
	stroke(cloneObj, bErr)
	arrNeedOutLine.push({
		name: strName,
		obj: cloneObj,
		err: bErr
	})
	flowfengji.add(cloneObj)
}
const stroke = (obj, bErr) => {
	let meshMaterial = new THREE.MeshBasicMaterial()
	obj.traverse(function (child) {
		if (child.isMesh) {
			child.material = meshMaterial
			child.material.side = 1
			child.material.color = bErr ? new THREE.Color(0xff0000) : new THREE.Color(0xffffff)
		}
	})
}
const cloneFan = (x, y, z) => {
	let fengji_clone = fengji.clone()
	fengji_clone.position.set(x, y, z)
	let an = gsap.to(fengji_clone.children[0].rotation, {
		duration: 5,
		repeat: -1,
		x: fengji_clone.children[0].rotation.x + Math.PI * 2
	})
	arrTweenAn.push(an)
	sceneOne.add(fengji_clone)
}
const cloneLandform1 = (x, y, z) => {
	let landform1_clone = landform1.clone()
	landform1_clone.position.set(x, y, z)
	sceneOne.add(landform1_clone)
}
const cloneLandform2 = (x, y, z) => {
	let landform2_clone = landform2.clone()
	landform2_clone.position.set(x, y, z)
	sceneOne.add(landform2_clone)
}

const rendererScene = () => {
	web.update()
	if (bLoaded) {
		txmaterial.map.offset.x += 0.01
	}
	requestAnimationFrame(rendererScene)
}

/**
 * 模型轮廓线
 * @param cloneObj
 * @param bEnter
 */
const changeStatus = (cloneObj, bEnter) => {
	cloneObj.visible = bEnter
}

/**
 * 选中的模型
 */
let nowSelected
const findModelSelected = strName => {
	let nSize = arrNeedOutLine.length
	for (let i = 0; i < nSize; ++i) {
		if (strName.indexOf(arrNeedOutLine[i].name) !== -1) {
			nowSelected = arrNeedOutLine[i].obj
			changeStatus(arrNeedOutLine[i].obj, true)
			return arrNeedOutLine[i].name
		}
	}
}

/**
 * 鼠标点击
 */
const mouseClick = e => {
	if (props.bbzShow) {
		return
	}
	const mouse = new THREE.Vector2()
	mouse.x = (e.offsetX / web.renderer.domElement.offsetWidth) * 2 - 1
	mouse.y = -(e.offsetY / web.renderer.domElement.offsetHeight) * 2 + 1
	const raycaster = new THREE.Raycaster()
	raycaster.setFromCamera(mouse, web.camera)
	let intersects = raycaster.intersectObjects(flowfengji.children, true)

	if (nowSelected !== undefined) {
		changeStatus(nowSelected, false)
	}
	if (intersects[0] === undefined) return
	let strSelectName = findModelSelected(intersects[0].object.name)
	alarmPop.value.show(strSelectName, e.offsetX, e.offsetY)
}

const closePop = () => {
	alarmPop.value.close()
}

onMounted(() => {
	init()
	addModel()
	window.addEventListener("click", mouseClick)
})

onUnmounted(() => {
	web.remove()
})
</script>

<style scoped lang="scss">
.scene {
	width: 100%;
	height: 100%;
}
.webGl {
	width: 100%;
	height: 100%;
}
</style>
