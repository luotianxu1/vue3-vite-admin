import * as THREE from "three"

/**
 * 半球光
 * @param x
 * @param y
 * @param z
 * @param skyColor 空中发出光线的颜色
 * @param groundColor 地面发出光线的颜色
 * @param intensity 光照强度
 * @constructor
 */
export default function HemisphereLight(
	x,
	y,
	z,
	skyColor: number | string = 0x0000ff,
	groundColor: number | string = 0x00ff00,
	intensity = 1
) {
	const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity)
	hemisphereLight.position.set(x, y, z)
	return hemisphereLight
}
