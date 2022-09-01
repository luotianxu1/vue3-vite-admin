import * as THREE from 'three'

/**
 * 坐标轴
 * @param size 长度
 * @constructor
 */
export default function AxesHelper(size = 150) {
    return new THREE.AxesHelper(size)
}
