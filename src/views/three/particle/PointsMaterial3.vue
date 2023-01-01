<template>
	<div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import WebGl from "@/utils/three/model/webGl"

const webGl = ref()

onMounted(() => {
	init()
})

onUnmounted(() => {
	web.remove()
})

const form = reactive({
	radius: 13,
	tube: 1.7,
	radialSegments: 156,
	tubularSegments: 12,
	p: 5,
	q: 4,
	asParticles: false
})

const generateSprite = () => {
	let canvas = document.createElement("canvas")
	canvas.width = 16
	canvas.height = 16
	let context: any = canvas.getContext("2d")
	let gradient = context.createRadialGradient(
		canvas.width / 2,
		canvas.height / 2,
		0,
		canvas.width / 2,
		canvas.height / 2,
		canvas.width / 2
	)
	gradient.addColorStop(0, "rgba(255,255,255,1)")
	gradient.addColorStop(0.2, "rgba(0,255,255,1)")
	gradient.addColorStop(0.4, "rgba(0,0,64,1)")
	gradient.addColorStop(1, "rgba(0,0,0,1)")
	context.fillStyle = gradient
	context.fillRect(0, 0, canvas.width, canvas.height)
	let texture = new THREE.Texture(canvas)
	texture.needsUpdate = true
	return texture
}

const createPoints = geom => {
	const material = new THREE.PointsMaterial({
		color: 0xffffff,
		size: 3,
		transparent: true,
		blending: THREE.AdditiveBlending,
		map: generateSprite(),
		depthWrite: false // instead of sortParticles
	})

	return new THREE.Points(geom, material)
}

let knot
const createParticles = () => {
	const geom = new THREE.TorusKnotGeometry(
		form.radius,
		form.tube,
		Math.round(form.radialSegments),
		Math.round(form.tubularSegments),
		Math.round(form.p),
		Math.round(form.q)
	)
	if (form.asParticles) {
		knot = createPoints(geom)
	} else {
		knot = new THREE.Mesh(geom, new THREE.MeshNormalMaterial())
	}
	web.scene.add(knot)
}

watch(form, () => {
	if (knot) {
		web.scene.remove(knot)
	}
	createParticles()
})

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()
	createParticles()

	web.addGUI()
	web.gui.add(form, "radius", 0, 40)
	web.gui.add(form, "tube", 0, 40)
	web.gui.add(form, "radialSegments", 0, 400)
	web.gui.add(form, "tubularSegments", 0, 20)
	web.gui.add(form, "p", 1, 10)
	web.gui.add(form, "q", 1, 15)
	web.gui.add(form, "asParticles")

	renderScene()
}

const renderScene = () => {
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
