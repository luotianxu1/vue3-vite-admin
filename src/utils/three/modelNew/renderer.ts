import * as THREE from 'three'

export default class Renderer{
    renderer

    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            // 抗锯齿
            antialias: true,
            // 深度 防止闪烁
            logarithmicDepthBuffer: true
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 1.5
    }
}
