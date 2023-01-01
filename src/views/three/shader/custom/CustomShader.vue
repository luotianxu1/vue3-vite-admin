<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import WebGl from "@/utils/three/model/webGl"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

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

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20), new THREE.MeshStandardMaterial())
plane.position.set(0, 0, -6)
plane.receiveShadow = true

// 创建纹理加载器对象
const textureLoader = new THREE.TextureLoader()
// 加载模型纹理
const modelTexture = textureLoader.load("./model/glb/LeePerrySmith/color.jpg")
// 加载模型的法向纹理
const normalTexture = textureLoader.load("./model/glb/LeePerrySmith/normal.jpg")
const material = new THREE.MeshStandardMaterial({
	map: modelTexture,
	normalMap: normalTexture
})

const customUniforms = {
	uTime: {
		value: 0
	}
}
material.onBeforeCompile = shader => {
	shader.uniforms.uTime = customUniforms.uTime
	shader.vertexShader = shader.vertexShader.replace(
		"#include <common>",
		`
                #include <common>
                mat2 rotate2d(float _angle){
                    return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
                }
                uniform float uTime;`
	)
	shader.vertexShader = shader.vertexShader.replace(
		"#include <beginnormal_vertex>",
		`
                #include <beginnormal_vertex>
                float angle = sin(position.y + uTime) * 0.5;
                mat2 rotateMatrix = rotate2d(angle);
                objectNormal.xz = rotateMatrix * objectNormal.xz;`
	)
	shader.vertexShader = shader.vertexShader.replace(
		"#include <begin_vertex>",
		`
                #include <begin_vertex>
                transformed.xz = rotateMatrix * transformed.xz;`
	)
}

const depthMaterial = new THREE.MeshDepthMaterial({
	depthPacking: THREE.RGBADepthPacking
})

depthMaterial.onBeforeCompile = shader => {
	shader.vertexShader = shader.vertexShader.replace(
		"#include <common>",
		`
                #include <common>
                mat2 rotate2d(float _angle){
                    return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
                }
                uniform float uTime;`
	)
	shader.vertexShader = shader.vertexShader.replace(
		"#include <begin_vertex>",
		`
                #include <begin_vertex>
                float angle = sin(position.y + uTime) * 0.5;
                mat2 rotateMatrix = rotate2d(angle);
                transformed.xz = rotateMatrix * transformed.xz;`
	)
}

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	web.addDirectionalLight(0, 0, 200, "#ffffff")
	web.camera.position.set(0, 0, 30)
	web.scene.environment = envMapTexture
	web.scene.background = envMapTexture
	web.scene.add(plane)

	// 模型加载
	const gltfLoader = new GLTFLoader()
	gltfLoader.load("./model/glb/LeePerrySmith/LeePerrySmith.glb", gltf => {
		const mesh = gltf.scene.children[0] as THREE.Mesh
		mesh.material = material
		mesh.castShadow = true
		// 设定自定义的深度材质
		mesh.customDepthMaterial = depthMaterial
		web.scene.add(mesh)
	})

	renderScene()
}

const clock = new THREE.Clock()
const renderScene = () => {
	customUniforms.uTime.value = clock.getElapsedTime()
	web.update()
	requestAnimationFrame(renderScene)
}
</script>

<style scoped lang="scss">
.webGl {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
