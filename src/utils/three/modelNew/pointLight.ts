import * as THREE from 'three'

/**
 * 点光源
 * @param x
 * @param y
 * @param z
 * @param color 颜色
 * @param intensity 光照强度
 */
export default function PointLight(
    x = 0,
    y = 300,
    z = 300,
    color = 0xffffff,
    intensity = 1
) {
    const pointLight = new THREE.PointLight(color, intensity)
    pointLight.position.set(x, y, z)
    return pointLight
}
