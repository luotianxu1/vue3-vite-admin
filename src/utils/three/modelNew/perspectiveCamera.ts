import * as THREE from 'three'

export default class PerspectiveCamera {
    perspectiveCamera

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
    constructor(x, y, z, width, height, fov = 45, near = 0.1, far = 1000) {
        this.perspectiveCamera = new THREE.PerspectiveCamera(fov, width / height, near, far)
        this.perspectiveCamera.set(x, y, z)
    }
}
