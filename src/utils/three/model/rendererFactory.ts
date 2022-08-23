// 初始化渲染器
import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

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

const css3drender = new CSS3DRenderer()
css3drender.setSize(window.innerWidth, window.innerHeight)
if (document.querySelector('#cssrender')) {
    // eslint-disable-next-line no-unused-expressions
    document.querySelector('#cssrender')?.appendChild(css3drender.domElement)
}

export default { renderer, css3drender }
