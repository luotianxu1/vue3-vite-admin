import eventHub from "@/utils/eventHub"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default class Ribbit {
	game
	scene
	camera
	target
	chest
	animations
	mixer

	constructor(game, chest) {
		this.game = game
		this.scene = game.scene
		this.camera = game.camera
		this.target = null
		this.chest = chest
		this.init()
	}
	setVisible(visible = false) {
		this.target && (this.target.visible = visible)
	}
	init() {
		let loader = new GLTFLoader()
		loader.load("./model/gltf/rabbit/scene.gltf", gltf => {
			this.target = gltf.scene
			this.setVisible(false)
			this.animations = gltf.animations
			this.target.scale.set(5.5, 5.5, 5.5)
			this.target.position.set(1.65, 0.12, -5.5)
			this.target.traverse(c => {
				c.castShadow = true
				c.receiveShadow = true
				if (c.material && c.material.map) {
					c.material.map.encoding = THREE.sRGBEncoding
				}
			})
			this.mixer = new THREE.AnimationMixer(this.target)
			this.scene.add(this.target)
			eventHub.emit("loaded", "rabbit")
		})
	}
	play() {
		this.mixer.stopAllAction()
		let anim = this.animations[0]
		let curAction = this.mixer.clipAction(anim)
		curAction.enabled = true
		curAction.time = 0.0
		curAction.clampWhenFinished = true
		curAction.setEffectiveTimeScale(0.75)
		curAction.setEffectiveWeight(1.0)
		curAction.setLoop(THREE.LoopOnce, 1)
		curAction.play()
		setTimeout(() => {
			this.chest.close()
		}, 4500)
	}
	update(delta) {
		this.mixer && this.mixer.update(delta)
	}
}
