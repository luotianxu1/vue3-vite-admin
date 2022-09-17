import * as THREE from 'three'

/**
 * 透视相机
 * @param x
 * @param y
 * @param z
 * @param width 宽
 * @param height 高
 * @param fov 摄像机视锥体垂直视野角度
 * @param near 摄像机视锥体近端面
 * @param far 摄像机视锥体远端面
 */
export default function PerspectiveCamera(
    width,
    height,
    x = 50,
    y = 50,
    z = 50,
    fov = 45,
    near = 0.000001,
    far = 10000
) {
    const perspectiveCamera = new THREE.PerspectiveCamera(
        fov,
        width / height,
        near,
        far
    )
    perspectiveCamera.position.set(x, y, z)
    return perspectiveCamera
}
