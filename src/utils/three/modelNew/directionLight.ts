import * as THREE from 'three'

/**
 * 平行光
 * @param x
 * @param y
 * @param z
 * @param color 颜色
 * @param intensity 光照强度
 * @param isCastShadow 是否产生阴影
 */
export default function DirectionLight(
    color = 0xffffff,
    x = 50,
    y = 1500,
    z = 50,
    intensity = 1,
    isCastShadow = true
) {
    const directionalLight = new THREE.DirectionalLight(color, intensity)
    directionalLight.position.set(x, y, z)
    directionalLight.castShadow = isCastShadow
    directionalLight.shadow.camera.far = 1000
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.left = 1000
    directionalLight.shadow.camera.right = -1000
    directionalLight.shadow.camera.top = 1000
    directionalLight.shadow.camera.bottom = -1000
    return directionalLight
}
