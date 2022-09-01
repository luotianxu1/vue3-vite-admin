import * as THREE from 'three'

/**
 * 聚光灯光源
 * @param x
 * @param y
 * @param z
 * @param color 颜色
 * @param intensity 强度
 * @param isCastShadow 阴影
 * @constructor
 */
export default function SportLight(
    x = 100,
    y = 100,
    z = 100,
    color = 0xffffff,
    intensity = 1,
    isCastShadow = true
) {
    const spotLight = new THREE.SpotLight(color, intensity)
    spotLight.position.set(x, y, z)
    spotLight.castShadow = isCastShadow
    return spotLight
}
