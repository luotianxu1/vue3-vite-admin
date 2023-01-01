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
	bevelThickness: 2,
	bevelSize: 0.5,
	bevelEnabled: true,
	bevelSegments: 3,
	curveSegments: 12,
	steps: 1
})

const drawShape = () => {
	let shape = new THREE.Shape()
	shape.moveTo(10, 10)
	shape.lineTo(10, 40)
	shape.bezierCurveTo(15, 25, 25, 25, 30, 40)
	shape.splineThru([new THREE.Vector2(32, 30), new THREE.Vector2(28, 20), new THREE.Vector2(30, 10)])
	shape.quadraticCurveTo(20, 15, 10, 10)
	let hole1 = new THREE.Path()
	hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true, 0)
	shape.holes.push(hole1)
	let hole2 = new THREE.Path()
	hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true, 0)
	shape.holes.push(hole2)
	let hole3 = new THREE.Path()
	hole3.absarc(20, 16, 2, 0, Math.PI, true)
	shape.holes.push(hole3)
	return shape
}

const ExtrudeMaterial = new THREE.MeshNormalMaterial({
	side: THREE.DoubleSide
})
const ExtrudeGeometry = new THREE.ExtrudeGeometry(drawShape(), {
	bevelThickness: form.bevelThickness,
	bevelSize: form.bevelSize,
	bevelSegments: form.bevelSegments,
	bevelEnabled: form.bevelEnabled,
	curveSegments: form.curveSegments,
	steps: form.steps
})
let shape = new THREE.Mesh(ExtrudeGeometry, ExtrudeMaterial)
shape.castShadow = true

watch(form, val => {
	if (shape) {
		web.scene.remove(shape)
	}
	console.log(val)

	const newExtrudeGeometry = new THREE.ExtrudeGeometry(drawShape(), {
		bevelThickness: val.bevelThickness,
		bevelSize: val.bevelSize,
		bevelSegments: val.bevelSegments,
		bevelEnabled: val.bevelEnabled,
		curveSegments: val.curveSegments,
		steps: val.steps
	})
	shape = new THREE.Mesh(newExtrudeGeometry, ExtrudeMaterial)
	shape.castShadow = true
	web.scene.add(shape)
})

let web
const init = () => {
	if (!webGl.value) {
		return
	}
	web = new WebGl(webGl.value)
	web.addStats()
	web.addAxesHelper()

	web.scene.add(shape)

	web.addGUI()
	web.gui.add(form, "bevelThickness", 0, 10)
	web.gui.add(form, "bevelSize", 0, 10)
	web.gui.add(form, "bevelSegments", 0, 30)
	web.gui.add(form, "curveSegments", 0, 30)
	web.gui.add(form, "steps", 0, 5)

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
