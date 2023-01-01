import * as THREE from "three"

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
	x = 50,
	y = 1500,
	z = 50,
	color: number | string = 0xffffff,
	intensity = 1,
	isCastShadow = true
) {
	const directionalLight = new THREE.DirectionalLight(color, intensity)
	directionalLight.position.set(x, y, z)
	directionalLight.castShadow = isCastShadow
	directionalLight.shadow.camera.far = 200
	directionalLight.shadow.camera.near = 0.5
	directionalLight.shadow.camera.left = -50
	directionalLight.shadow.camera.right = 50
	directionalLight.shadow.camera.top = 50
	directionalLight.shadow.camera.bottom = -50
	directionalLight.shadow.mapSize.width = 2048
	directionalLight.shadow.mapSize.height = 2048
	return directionalLight
}
