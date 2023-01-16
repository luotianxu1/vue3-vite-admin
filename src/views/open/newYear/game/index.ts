import eventHub from "@/utils/eventHub"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Chest from "./chest"

export default class Game {
	parentEl
	renderer
	camera
	scene
	sun
	chest
	clock

	constructor(parentEl) {
		this.parentEl = parentEl
		this.init()
	}

	init() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		})
		this.renderer.outputEncoding = THREE.sRGBEncoding
		this.renderer.gammaFactor = 3
		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.domElement.id = "game-canvas"
		this.parentEl.appendChild(this.renderer.domElement)

		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1.0, 10000.0)
		this.camera.position.set(0, 1.3, 5)
		this.camera.rotation.set(-0.25, 0, 0)

		this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(0x000000)
		this.scene.fog = new THREE.FogExp2(0x89b2eb, 0.002)

		const hemiLight = new THREE.HemisphereLight(0xffffff, 0xfffffff, 1)
		hemiLight.color.setHSL(0.6, 1, 0.6)
		hemiLight.groundColor.setHSL(0.095, 1, 0.75)
		this.scene.add(hemiLight)

		this.sun = new THREE.DirectionalLight(0xffffff, 1)
		this.sun.position.set(-10, 200, 10)
		this.sun.target.position.set(0, 0, 0)
		this.sun.castShadow = true
		this.sun.shadow.bias = -0.001
		this.sun.shadow.mapSize.width = 4096
		this.sun.shadow.mapSize.height = 4096
		this.sun.shadow.camera.near = 0.1
		this.sun.shadow.camera.far = 1000.0
		this.sun.shadow.camera.left = 100
		this.sun.shadow.camera.right = -100
		this.sun.shadow.camera.top = 100
		this.sun.shadow.camera.bottom = -100
		this.scene.add(this.sun)

		// 添加地面
		this.addPlane()

		this.chest = new Chest(this)

		const loadModNameList: any = []
		eventHub.on("loaded", name => {
			loadModNameList.push(name)
			eventHub.emit("progress", ~~((loadModNameList.length / 3) * 100))
			if (loadModNameList.length >= 3) {
				setTimeout(() => {
					this.chest.playGame()
				}, 500)
			}
		})

		this.clock = new THREE.Clock()
		this.update()

		window.addEventListener(
			"resize",
			() => {
				this.resize()
			},
			false
		)
		this.resize()
	}

	addPlane() {
		let loader = new GLTFLoader()
		loader.load("./model/gltf/pokemon/scene.gltf", gltf => {
			let target = gltf.scene
			target.scale.set(1.2, 1.2, 1.2)
			target.position.set(3, 0, 6.5)
			target.rotation.set(0, -0.8, 0)
			target.traverse(c => {
				c.castShadow = true
				c.receiveShadow = true
				if ((c as any).material && (c as any).material.map) {
					;(c as any).material.map.encoding = THREE.sRGBEncoding
				}
			})
			this.scene.add(target)
			eventHub.emit("loaded", "scene")
		})
	}

	update() {
		requestAnimationFrame(() => {
			this.update()
			let delta = this.clock.getDelta()

			if (this.chest) {
				this.chest.update(delta)
			}

			this.renderer.render(this.scene, this.camera)
		})
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}
}
