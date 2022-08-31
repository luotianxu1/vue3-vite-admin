import * as THREE from 'three'

/**
 * 正交相机
 * @param x
 * @param y
 * @param z
 * @param left 摄像机视锥体左侧面
 * @param right 摄像机视锥体右侧面
 * @param top 摄像机视锥体上侧面
 * @param bottom 摄像机视锥体下侧面
 * @param near 摄像机视锥体近端面
 * @param far 摄像机视锥体远端面
 */
export default function OrthographicCamera(
    x,
    y,
    z,
    left,
    right,
    top,
    bottom,
    near = 0.1,
    far = 2000
) {
    const orthographicCamera = new THREE.OrthographicCamera(
        left,
        right,
        top,
        bottom,
        near,
        far
    )
    orthographicCamera.position.set(x, y, z)
    return
}
