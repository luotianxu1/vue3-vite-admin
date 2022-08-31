import * as THREE from 'three'

export default class DirectionLight {
    directionLight
    directionLightCameraHelper

    /**
     * 平行光
     * @param x
     * @param y
     * @param z
     * @param color 颜色
     * @param intensity 光照强度
     * @param isCastShadow 是否产生阴影
     */
    constructor(x, y, z, color, intensity = 1, isCastShadow = true) {
        this.directionalLight = new THREE.DirectionalLight(color, intensity)
        this.directionalLight.position.set(x, y, z)
        this.directionalLight.castShadow = isCastShadow
        this.directionalLight.shadow.camera.far = 1000
        this.directionalLight.shadow.camera.near = 0.5
        this.directionalLight.shadow.camera.left = 1000
        this.directionalLight.shadow.camera.right = -1000
        this.directionalLight.shadow.camera.top = 1000
        this.directionalLight.shadow.camera.bottom = -1000
    }

    addHelper() {
        this.directionLightCameraHelper = new THREE.CameraHelper(
            this.directionLight.shadow.camera
        )
    }
}
