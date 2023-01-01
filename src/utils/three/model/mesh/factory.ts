import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"
import gsap from "gsap"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer"
import eventHub from "@/utils/eventHub"
import vertexShader from "@/utils/three/shader/fighter/vertexShader.glsl?raw"
import fragmentShader from "@/utils/three/shader/fighter/fragmentShader.glsl?raw"

export default class Factory {
	scene
	loader
	action
	floor1Group
	floor2Group
	floor2Tags: any = []
	wallGroup
	fighterGroup
	mouse
	raycaster
	fighterPointsGroup

	constructor(scene, camera) {
		// 载入模型
		this.scene = scene
		this.loader = new GLTFLoader()
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath("./draco/")
		this.loader.setDRACOLoader(dracoLoader)

		this.loader.load("./model/glb/floor1.glb", gltf => {
			this.floor1Group = gltf.scene
			gltf.scene.traverse(child => {
				if (child.isMesh) {
					child.material.emissiveIntensity = 5
				}
			})
			this.floor1Group.visible = false
			this.scene.add(this.floor1Group)
		})

		this.loader.load("./model/glb/floor2.glb", gltf => {
			this.floor2Group = gltf.scene
			gltf.scene.traverse(child => {
				if (child.isMesh) {
					child.material.emissiveIntensity = 5
				}

				if (child.type === "Object3D" && child.children.length === 0) {
					const css3dObject = this.createTag(child)
					css3dObject.visible = false
					this.floor2Tags.push(css3dObject)
					this.floor2Group.add(css3dObject)
				}
			})
			this.floor2Group.visible = false
			this.scene.add(this.floor2Group)
		})

		this.loader.load("./model/glb/wall.glb", gltf => {
			this.wallGroup = gltf.scene
			this.scene.add(this.wallGroup)
		})

		this.loader.load("./model/glb/Fighter1.glb", gltf => {
			this.fighterGroup = gltf.scene

			this.fighterGroup.visible = false
			this.scene.add(this.fighterGroup)
			this.fighterGroup.position.set(3, 42, 68)
			this.fighterGroup.traverse(child => {
				if (child.isMesh) {
					child.material.emissiveIntensity = 15
					child.position2 = child.position.clone()
				}
			})
			this.mouse = new THREE.Vector2()
			this.raycaster = new THREE.Raycaster()
			// 事件监听
			window.addEventListener("click", (event: any) => {
				//   对时间对象进行加工
				// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
				this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
				this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)

				//通过摄像机和鼠标位置更新射线
				this.raycaster.setFromCamera(this.mouse, camera)

				//进行检测
				const intersects = this.raycaster.intersectObject(this.fighterGroup)
				if (intersects.length > 0) {
					if (this.floor2Group.visible) {
						this.floor2Group.visible = false
						this.floor2Tags.forEach(tag => {
							tag.visible = false
						})
					} else {
						this.floor2Group.visible = true
						this.floor2Tags.forEach(tag => {
							tag.visible = true
						})
					}
				}
			})
		})

		this.initEvent()
	}

	createTag(object3d) {
		const element = document.createElement("div")
		element.className = "elementTag"
		element.innerHTML = `
            <div class="elementContent">
                <h3>${object3d.name}</h3>
                <p>温度：26°</p>
                <p>湿度：50%</p>
            </div>
        `

		const objectCSS3D = new CSS3DObject(element)
		objectCSS3D.scale.set(0.2, 0.2, 0.2)
		objectCSS3D.position.copy(object3d.position)
		return objectCSS3D
	}

	showFloor1() {
		this.floor1Group.visible = true
	}

	showFloor2() {
		this.floor2Group.visible = true
		this.fighterGroup.visible = true
		this.floor2Tags.forEach(tag => {
			tag.visible = true
		})
	}

	hideFloor1() {
		this.floor1Group.visible = false
	}

	hideFloor2() {
		this.floor2Group.visible = false
		this.fighterGroup.visible = false
		this.floor2Tags.forEach(tag => {
			tag.visible = false
		})
	}

	showWall() {
		this.wallGroup.visible = true
	}

	hideWall() {
		this.wallGroup.visible = false
	}

	initEvent() {
		eventHub.on("showFloor1", () => {
			this.showFloor1()
			this.hideWall()
			this.hideFloor2()
		})
		eventHub.on("showFloor2", () => {
			this.showFloor2()
			this.hideWall()
			this.hideFloor1()
		})
		eventHub.on("showWall", () => {
			this.showWall()
			this.hideFloor1()
			this.hideFloor2()
		})
		eventHub.on("showAll", () => {
			this.showFloor1()
			this.showFloor2()
			this.showWall()
			gsap.to(this.wallGroup.position, {
				y: 200,
				duration: 1
			})
			gsap.to(this.floor2Group.position, {
				y: 50,
				duration: 1,
				delay: 1
			})
		})
		eventHub.on("hideAll", () => {
			gsap.to(this.wallGroup.position, {
				y: 0,
				duration: 1,
				delay: 1,
				onComplete: () => {
					this.hideFloor1()
					this.hideFloor2()
				}
			})
			gsap.to(this.floor2Group.position, {
				y: 0,
				duration: 1
			})
		})
		eventHub.on("flatFighter", () => {
			// 将飞机展成立方体
			// 获取立方体点的位置
			const positions: Array<THREE.Vector3> = []
			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 5; j++) {
					positions.push(new THREE.Vector3(i * 2 - 2, j * 2 - 2, 0))
				}
			}

			let n = 0
			this.fighterGroup.traverse(child => {
				if (child.isMesh) {
					positions[n].multiplyScalar(10)

					gsap.to(child.position, {
						x: "+=" + positions[n].x,
						y: "+=" + positions[n].y,
						z: "+=" + positions[n].z,
						duration: 1
					})
					n++
				}
			})
		})
		eventHub.on("recoverFighter", () => {
			this.fighterGroup.traverse(child => {
				if (child.isMesh) {
					gsap.to(child.position, {
						x: child.position2.x,
						y: child.position2.y,
						z: child.position2.z,
						duration: 1
					})
				}
			})
		})
		eventHub.on("pointsFighter", () => {
			this.createPoints(this.fighterGroup)
		})
		eventHub.on("pointsBlast", () => {
			this.pointsBlast()
		})
		eventHub.on("pointsBack", () => {
			this.pointsBack()
		})
	}

	showFighter() {
		this.floor1Group && (this.floor1Group.visible = false)
		this.floor2Group && (this.floor2Group.visible = false)
		this.wallGroup && (this.wallGroup.visible = false)
		this.fighterGroup.visible = true
	}

	createPoints(object3d) {
		if (!this.fighterPointsGroup) {
			this.fighterPointsGroup = this.transformPoints(object3d)
			this.scene.add(this.fighterPointsGroup)
		}
	}

	transformPoints(object3d) {
		// 创建纹理图像
		const texture = new THREE.TextureLoader().load("./textures/particles/1.png")
		const group = new THREE.Group()

		function createPoints(object, newObject3d) {
			if (object.children.length > 0) {
				object.children.forEach(child => {
					if (child.isMesh) {
						// 随机生成颜色
						const color = new THREE.Color(Math.random(), Math.random(), Math.random())

						const material = new THREE.ShaderMaterial({
							uniforms: {
								uColor: { value: color },
								uTexture: { value: texture },
								uTime: {
									value: 0
								}
							},
							vertexShader: vertexShader,
							fragmentShader: fragmentShader,
							blending: THREE.AdditiveBlending,
							transparent: true,
							depthTest: false
						})
						const points = new THREE.Points(child.geometry, material)
						points.position.copy(child.position)
						points.rotation.copy(child.rotation)
						points.scale.copy(child.scale)
						newObject3d.add(points)
						createPoints(child, points)
					}
				})
			}
		}

		createPoints(object3d, group)
		return group
	}

	pointsBlast() {
		this.fighterPointsGroup.traverse(child => {
			if (child.isPoints) {
				let randomPositionArray = new Float32Array(child.geometry.attributes.position.count * 3)
				for (let i = 0; i < child.geometry.attributes.position.count; i++) {
					randomPositionArray[i * 3] = (Math.random() * 2 - 1) * 10
					randomPositionArray[i * 3 + 1] = (Math.random() * 2 - 1) * 10
					randomPositionArray[i * 3 + 2] = (Math.random() * 2 - 1) * 10
				}

				child.geometry.setAttribute("aPosition", new THREE.BufferAttribute(randomPositionArray, 3))

				gsap.to(child.material.uniforms.uTime, {
					value: 10,
					duration: 10
				})
			}
		})
	}

	pointsBack() {
		this.fighterPointsGroup.traverse(child => {
			if (child.isPoints) {
				gsap.to(child.material.uniforms.uTime, {
					value: 0,
					duration: 10
				})
			}
		})
	}
}
