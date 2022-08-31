import * as THREE from 'three'

export default class AmbientLight {
    ambientLight

    /**
     * 环境光
     * @param color 颜色
     * @param intensity 光照的强度
     */
    constructor(color, intensity = 1) {
        this.ambientLight = new THREE.AmbientLight(color, intensity)
    }
}
