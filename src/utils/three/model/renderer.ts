import * as THREE from 'three'

export default function Renderer(domElement) {
    const renderer = new THREE.WebGLRenderer({
        // 抗锯齿
        antialias: true,
        // 深度 防止闪烁
        logarithmicDepthBuffer: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(domElement.offsetWidth, domElement.offsetHeight)
    renderer.shadowMap.enabled = true
    domElement.appendChild(renderer.domElement)
    return renderer
}
