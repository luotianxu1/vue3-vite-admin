import * as THREE from "three"

export default function Renderer(domElement, antialias?: true, alpha?: false) {
	const renderer = new THREE.WebGLRenderer({
		// 抗锯齿
		antialias: antialias,
		alpha: alpha,
		// 深度 防止闪烁
		logarithmicDepthBuffer: true
	})
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(domElement.offsetWidth, domElement.offsetHeight)
	renderer.shadowMap.enabled = true
	// renderer.shadowMap.type = THREE.VSMShadowMap
	// renderer.outputEncoding = THREE.sRGBEncoding
	// renderer.toneMapping = THREE.ACESFilmicToneMapping
	// renderer.physicallyCorrectLights = true
	// renderer.toneMappingExposure = 0.75
	domElement.appendChild(renderer.domElement)
	return renderer
}
