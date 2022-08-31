import * as THREE from 'three'

export default class PointLight {
    pointLight

    /**
     * 点光源
     * @param x
     * @param y
     * @param z
     * @param color 颜色
     * @param intensity 光照强度
     */
    constructor(x, y, z, color, intensity = 1) {
        this.pointLight = new THREE.PointLight(color, intensity)
        this.pointLight.position.set(x, y, z)
    }
}
