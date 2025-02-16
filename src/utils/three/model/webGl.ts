import Scene from "@/utils/three/model/scene"
import Renderer from "@/utils/three/model/renderer"
import PerspectiveCamera from "@/utils/three/model/perspectiveCamera"
import AmbientLight from "@/utils/three/model/ambientLight"
import DirectionalLight from "@/utils/three/model/directionLight"
import PointLight from "@/utils/three/model/pointLight"
import SpotLight from "@/utils/three/model/spotLight"
import HemisphereLight from "@/utils/three/model/hemisphereLight"
import AxesHelper from "@/utils/three/model/axesHelper"
import Controls from "@/utils/three/model/controls"
import Stats from "three/examples/jsm/libs/stats.module"
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import VideoPlane from "@/utils/three/model/mesh/videoPlane"
import LightCircle from "@/utils/three/model/mesh/lightCircle"
import CanvasPlane from "@/utils/three/model/mesh/canvasPlane"
import TextVideo from "@/utils/three/model/mesh/textVideo"
import FireSprite from "@/utils/three/model/mesh/fireSprite"
import SphereSky from "@/utils/three/model/mesh/sphereSky"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import gsap from "gsap"

export default class WebGl {
	domElement: HTMLDivElement
	scene: THREE.Scene
	camera
	ambientLight: THREE.AmbientLight | undefined
	directionalLight: THREE.DirectionalLight | undefined
	pointLight: THREE.PointLight | undefined
	spotLight: THREE.SpotLight | undefined
	hemisphereLight: THREE.HemisphereLight | undefined
	renderer: THREE.WebGLRenderer
	axesHelper: THREE.AxesHelper | undefined
	controls
	stats
	gui
	cameraHelper: THREE.CameraHelper | undefined
	spotLightHelper: THREE.SpotLightHelper | undefined
	pointLightHelper: THREE.PointLightHelper | undefined
	effectComposer
	clock: THREE.Clock
	textVideoArrays: any = []
	updateMeshArr: any = []
	isDay: Boolean | undefined

	constructor(domElement, controls = true, config: any = {}) {
		this.domElement = domElement
		this.scene = Scene()
		this.camera = PerspectiveCamera(domElement.offsetWidth, domElement.offsetHeight)
		this.scene.add(this.camera)
		this.camera.lookAt(this.scene)
		this.renderer = Renderer(domElement, config.antialias, config.alpha)
		this.renderer.render(this.scene, this.camera)
		if (controls) {
			this.controls = Controls(this.camera, this.renderer)
		}
		this.clock = new THREE.Clock()
		this.addEffect()
		window.addEventListener("resize", () => {
			this.resize(domElement)
		})
	}

	/**
	 * 添加坐标轴
	 * @param size 长度
	 * @constructor
	 */
	addAxesHelper(size = 15) {
		this.axesHelper = AxesHelper(size)
		this.scene.add(this.axesHelper)
	}

	/**
	 * 添加环境光
	 * @param color 颜色
	 * @param intensity 光照的强度
	 */
	addAmbientLight(color: string | number = 0xffffff, intensity = 1) {
		this.ambientLight = AmbientLight(color, intensity)
		this.scene.add(this.ambientLight)
	}

	/**
	 * 添加平行光
	 * @param x
	 * @param y
	 * @param z
	 * @param color 颜色
	 * @param intensity 光照强度
	 * @param isCastShadow 是否产生阴影
	 */
	addDirectionalLight(x = 50, y = 100, z = 50, color: number | string = 0xffffff, intensity = 1, isCastShadow = true) {
		this.directionalLight = DirectionalLight(x, y, z, color, intensity, isCastShadow)
		this.scene.add(this.directionalLight)
	}

	/**
	 * 添加点光源
	 * @param x
	 * @param y
	 * @param z
	 * @param color 颜色
	 * @param intensity 光照强度
	 */
	addPointLight(x = 0, y = 300, z = 300, color: number | string = 0xffffff, intensity = 1) {
		this.pointLight = PointLight(x, y, z, color, intensity)
		this.scene.add(this.pointLight)
	}

	addPointLightHelper(light) {
		this.pointLightHelper = new THREE.PointLightHelper(light)
		this.scene.add(this.pointLightHelper)
	}

	/**
	 * 聚光灯光源
	 * @param x
	 * @param y
	 * @param z
	 * @param color 颜色
	 * @param intensity 强度
	 * @param isCastShadow 阴影
	 */
	addSpotLight(x = 100, y = 100, z = 100, color: number | string = 0xffffff, intensity = 1, isCastShadow = true) {
		this.spotLight = SpotLight(x, y, z, color, intensity, isCastShadow)
		this.scene.add(this.spotLight)
	}

	addSpotLightHelper(light) {
		this.spotLightHelper = new THREE.SpotLightHelper(light)
		this.scene.add(this.spotLightHelper)
	}

	/**
	 * 半球光
	 * @param x
	 * @param y
	 * @param z
	 * @param skyColor 空中发出光线的颜色
	 * @param groundColor 地面发出光线的颜色
	 * @param intensity 强度
	 */
	addHemisphereLight(x, y, z, skyColor = 0x0000ff, groundColor = 0x00ff00, intensity = 1) {
		this.hemisphereLight = HemisphereLight(x, y, z, skyColor, groundColor, intensity)
		this.scene.add(this.hemisphereLight)
	}

	addStats() {
		this.stats = Stats()
		this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
		this.stats.dom.style.position = "absolute"
		this.stats.dom.style.left = "0px"
		this.stats.dom.style.top = "0px"
		this.domElement.appendChild(this.stats.dom)
	}

	addDebugCamera(light) {
		this.cameraHelper = new THREE.CameraHelper(light.shadow.camera)
		this.scene.add(this.cameraHelper)
	}

	addGUI() {
		this.gui = new GUI()
		this.gui.domElement.style.position = "absolute"
		this.gui.domElement.style.right = window.innerWidth - this.domElement.getBoundingClientRect().right + "px"
		this.gui.domElement.style.top = this.domElement.getBoundingClientRect().top + "px"
	}

	/**
	 * 合成效果
	 */
	addEffect() {
		this.effectComposer = new EffectComposer(this.renderer)
		this.effectComposer.setSize(this.domElement.offsetWidth, this.domElement.offsetHeight)

		// 添加渲染通道
		const renderPass = new RenderPass(this.scene, this.camera)
		this.effectComposer.addPass(renderPass)
	}

	/**
	 * 设置背景颜色
	 * @param color
	 */
	setBgColor(color) {
		this.scene.background = new THREE.Color(color)
	}

	setbgPicture(url) {
		let envTexture = new THREE.TextureLoader().load(url)
		envTexture.mapping = THREE.EquirectangularRefractionMapping
		this.scene.background = envTexture
		this.scene.environment = envTexture
	}

	/**
	 * 监听页面变化
	 * @param domElement
	 */
	resize(domElement) {
		this.camera.aspect = domElement.offsetWidth / domElement.offsetHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(this.domElement.offsetWidth, this.domElement.offsetHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio)
	}

	/**
	 * 加载hdr
	 * @param url
	 */
	hdrLoader(url) {
		const hdrLoader = new RGBELoader()
		return new Promise(resolve => {
			hdrLoader.load(url, hdr => {
				resolve(hdr)
			})
		})
	}

	/**
	 * 设置hdr背景
	 * @param url
	 */
	setHdrBg(url) {
		return new Promise(resolve => {
			this.hdrLoader(url).then(res => {
				let texture = res as any
				texture.mapping = THREE.EquirectangularReflectionMapping
				texture.anisotropy = 16
				texture.format = THREE.RGBAFormat
				this.scene.background = texture
				this.scene.environment = texture
				resolve(texture)
			})
		})
	}

	gltfLoader(url) {
		const gltfLoader = new GLTFLoader()
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath("./draco/gltf/")
		dracoLoader.setDecoderConfig({ type: "js" })
		dracoLoader.preload()
		gltfLoader.setDRACOLoader(dracoLoader)

		return new Promise(resolve => {
			gltfLoader.load(url, gltf => {
				resolve(gltf)
			})
		})
	}

	/**
	 * 添加视频
	 * @param url 视频链接
	 * @param size 宽高
	 * @param position 位置
	 */
	addVideo(url, size, position?) {
		let videoPlane = new VideoPlane(url, size, position)
		this.scene.add(videoPlane.mesh)
		return videoPlane
	}

	/**
	 * 添加光环
	 * @param position
	 * @param scale
	 */
	addLightCircle(position, scale?) {
		return new LightCircle(this.scene, position, scale)
	}

	/**
	 * 添加canvas框
	 * @param text 文本
	 * @param position 位置
	 * @param euler 旋转角度
	 */
	addCanvasPlane(text, position, euler) {
		return new CanvasPlane(this.scene, text, position, euler)
	}

	/**
	 * 添加视频框
	 * @param text
	 * @param position 位置
	 * @param euler 旋转角度
	 */
	addTextVideo(text, position, euler) {
		let textVideo = new TextVideo(this.scene, text, position, euler)
		this.textVideoArrays.push(textVideo)
		return textVideo
	}

	/**
	 * 添加火焰
	 * @param position
	 * @param scale
	 */
	addFireSprite(position, scale) {
		let fireSprite = new FireSprite(this.camera, position, scale)
		this.scene.add(fireSprite.mesh)
		this.updateMeshArr.push(fireSprite)
		return fireSprite
	}

	addSphereSky(dayCallback, nightCallback) {
		let uTime = {
			value: 0
		}
		this.isDay = true
		let sphereSky = new SphereSky(10000, uTime, this.scene.environment)
		this.scene.add(sphereSky.mesh, sphereSky.sun)

		gsap.to(uTime, {
			value: 24,
			duration: 24,
			repeat: -1,
			ease: "linear",
			onUpdate: () => {
				sphereSky.updateSun(uTime.value)
				if (uTime.value > 6 && uTime.value <= 18 && this.isDay === false) {
					sphereSky.sun.visible = true
					this.isDay = true
					dayCallback()
				}
				if ((uTime.value > 18 || uTime.value <= 6) && this.isDay === true) {
					this.isDay = false
					sphereSky.sun.visible = false
					nightCallback()
				}
				if (Math.abs(uTime.value - 12) < 4) {
					this.renderer.toneMappingExposure = 1
				}
				if (Math.abs(uTime.value - 12) > 6) {
					this.renderer.toneMappingExposure = 0.3
				}
				if (Math.abs(uTime.value - 12) >= 4 && Math.abs(uTime.value - 12) <= 6) {
					let strength = 1 - (Math.abs(uTime.value - 12) - 4) / 2
					strength < 0.3 || (strength = 0.3)
					this.renderer.toneMappingExposure = strength
				}
			}
		})
		return sphereSky
	}

	update() {
		let deltaTime = this.clock.getDelta()
		if (this.stats) {
			this.stats.update()
		}
		if (this.controls) {
			this.controls.update()
		}
		if (this.cameraHelper) {
			this.cameraHelper.update()
		}
		if (this.spotLightHelper) {
			this.spotLightHelper.update()
		}
		if (this.pointLightHelper) {
			this.pointLightHelper.update()
		}
		this.effectComposer.render()
		if (this.textVideoArrays.length > 0) {
			for (let i = 0; i < this.textVideoArrays.length; i++) {
				this.textVideoArrays[i].update(deltaTime)
			}
		}
		if (this.updateMeshArr.length > 0) {
			for (let i = 0; i < this.updateMeshArr.length; i++) {
				this.updateMeshArr[i].update(deltaTime)
			}
		}
		this.renderer.render(this.scene, this.camera)
	}

	/**
	 * 销毁
	 */
	remove() {
		if (this.gui) {
			this.gui.destroy()
		}
		window.removeEventListener("resize", this.resize)
	}
}
