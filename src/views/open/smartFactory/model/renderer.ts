// 初始化渲染器
import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
    // 深度 防止闪烁
    logarithmicDepthBuffer: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.5

export default renderer
