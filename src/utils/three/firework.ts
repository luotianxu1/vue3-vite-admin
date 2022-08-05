import * as THREE from 'three'

export default class Fireworks {
    constructor(color, to, from = { x: 0, y: 0, z: 0 }) {
        console.log('创建烟花')
        // 创建烟花发射的点
        this.startGeometry = new THREE.BufferGeometry()
        const startPositionArray = new Float32Array(3)
        startPositionArray[0] = from.x
        startPositionArray[1] = from.y
        startPositionArray[2] = from.z
        this.startGeometry.setAttribute('position',new THREE.BufferAttribute(startPositionArray, 3))

        // 设置着色器材质
        this.startMaterial = new THREE.ShaderMaterial({

        })
    }

    // 添加到场景
    addScene() {
    }
}
