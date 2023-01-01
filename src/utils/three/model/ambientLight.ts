import * as THREE from "three"

/**
 * 环境光
 * @param color 颜色
 * @param intensity 光照的强度
 */
export default function AmbientLight(color: string | number = 0xffffff, intensity = 1) {
	return new THREE.AmbientLight(color, intensity)
}
