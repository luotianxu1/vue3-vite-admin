<template>
	<div class="page">
		<div id="webgl" class="webgl"></div>
	</div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// 导入后期效果合成器
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
// three框架本身自带效果
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { initAxes, initCameraControl, initStats } from "@/utils/three/util"

onMounted(() => {
	init()
})

// 创建场景
const scene = new THREE.Scene()

initAxes(scene)

// 创建相机
const camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 3)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
scene.add(camera)

// 创建渲染器
const webGLRenderer = new THREE.WebGLRenderer()
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMap.enabled = true

const controls = initCameraControl(camera, webGLRenderer.domElement)

// 添加环境纹理
const cubeTextureLoader = new THREE.CubeTextureLoader()
const envMapTexture = cubeTextureLoader.load([
	"./textures/environmentMaps/0/px.jpg",
	"./textures/environmentMaps/0/nx.jpg",
	"./textures/environmentMaps/0/py.jpg",
	"./textures/environmentMaps/0/ny.jpg",
	"./textures/environmentMaps/0/pz.jpg",
	"./textures/environmentMaps/0/nz.jpg"
])
scene.environment = envMapTexture
scene.background = envMapTexture

const directionLight = new THREE.DirectionalLight("#ffffff", 1)
directionLight.castShadow = true
directionLight.position.set(0, 0, 200)
scene.add(directionLight)

// 模型加载
const gltfLoader = new GLTFLoader()
gltfLoader.load("./model/gltf/DamagedHelmet/DamagedHelmet.gltf", gltf => {
	const mesh = gltf.scene.children[0]
	scene.add(mesh)
})

// 合成效果
const effectComposer = new EffectComposer(webGLRenderer)
effectComposer.setSize(window.innerWidth, window.innerHeight)

// 添加渲染通道
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// 点效果
const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)

// 抗锯齿
const smaaPass = new SMAAPass(
	window.innerWidth * webGLRenderer.getPixelRatio(),
	window.innerHeight * webGLRenderer.getPixelRatio()
)
effectComposer.addPass(smaaPass)

// 发光
const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 1, 0)
effectComposer.addPass(unrealBloomPass)
webGLRenderer.toneMapping = THREE.ACESFilmicToneMapping
webGLRenderer.toneMappingExposure = 1

// 屏幕闪动
const glitchPass = new GlitchPass()
effectComposer.addPass(glitchPass)

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load("./model/gltf/DamagedHelmet/interfaceNormalMap.png")
const techPass = new ShaderPass({
	uniforms: {
		tDiffuse: {
			value: null
		},
		uNormalMap: {
			value: null
		},
		uTime: {
			value: 0
		}
	},
	vertexShader: `
            varying vec2 vUv;
            void main(){
                vUv = uv;
                gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
            }`,
	fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D tDiffuse;
            uniform sampler2D uNormalMap;
            uniform float uTime;
            void main(){
                vec2 newUv = vUv;
                newUv += sin(newUv.x*10.0+uTime*0.5)*0.03;
                vec4 color = texture2D(tDiffuse,newUv);
                vec4 normalColor = texture2D(uNormalMap,vUv);
                // 设置光线的角度
                vec3 lightDirection = normalize(vec3(-5,5,2)) ;
                float lightness = clamp(dot(normalColor.xyz,lightDirection),0.0,1.0) ;
                color.xyz+=lightness;
                gl_FragColor = color;
            }`
})
techPass.material.uniforms.uNormalMap.value = normalTexture
effectComposer.addPass(techPass)

let stats
const init = () => {
	const body = document.getElementById("webgl")
	if (!body) {
		return
	}
	// 创建渲染器
	const width = body.offsetWidth
	const height = body.offsetHeight
	webGLRenderer.setSize(width, height)
	body.appendChild(webGLRenderer.domElement)
	stats = initStats(body)
	renderScene()
}

const clock = new THREE.Clock()
const renderScene = () => {
	techPass.material.uniforms.uTime.value = clock.getElapsedTime()
	controls.update()
	stats.update()
	requestAnimationFrame(renderScene)
	// 使用熏染器将相机看到这个场景的内容渲染出来
	// webGLRenderer.render(scene, camera)
	effectComposer.render()
}
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
}
</style>
