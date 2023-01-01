import * as THREE from "three"
import fragmentShader from "@/utils/three/shader/fireSprite/fragmentShader.glsl?raw"
import vertexShader from "@/utils/three/shader/fireSprite/vertexShader.glsl?raw"

export default class FireSprite {
	sprite
	spriteMaterial
	mesh
	listener
	sound
	audioLoader
	camera
	analyser

	constructor(camera, position = new THREE.Vector3(-4.9, 1.8, 25.1), scale = 1) {
		this.camera = camera
		// 着色器创建精灵材质
		this.spriteMaterial = new THREE.ShaderMaterial({
			uniforms: {
				rotation: {
					value: 0
				},
				center: {
					value: new THREE.Vector2(0.5, 0.5)
				},
				iTime: {
					value: 0
				},
				iResolution: {
					value: new THREE.Vector2(1000, 1000)
				},
				iMouse: {
					value: new THREE.Vector2(0, 0)
				},
				uFrequency: {
					value: 0
				}
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			// depthTest: false,
			side: THREE.DoubleSide
		})
		this.sprite = new THREE.Sprite(this.spriteMaterial)
		this.sprite.scale.set(scale, scale, scale)
		this.sprite.renderOrder = 1
		this.sprite.position.copy(position)
		this.mesh = this.sprite

		// 创建音乐
		this.listener = new THREE.AudioListener() // 声音监听器
		this.sound = new THREE.PositionalAudio(this.listener) // 声音源
		this.audioLoader = new THREE.AudioLoader()
		this.audioLoader.load("./sound/gnzw.mp3", buffer => {
			this.sound.setBuffer(buffer)
			this.sound.setRefDistance(10)
			this.sound.setLoop(true)
			this.sound.play()
		})
		this.mesh.add(this.sound)
		this.analyser = new THREE.AudioAnalyser(this.sound, 32)
	}

	update(deltaTime) {
		let position = this.camera.localToWorld(new THREE.Vector3(0, 0, 0))
		let distanceSquared = position.distanceTo(this.mesh.position)
		this.sound.setVolume((1 / distanceSquared) * 10)
		this.spriteMaterial.uniforms.uFrequency.value = this.analyser.getAverageFrequency()
		this.spriteMaterial.uniforms.iTime.value += deltaTime
	}
}
