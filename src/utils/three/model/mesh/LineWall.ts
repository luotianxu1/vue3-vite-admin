import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/utils/three/shader/lineWallShader/vertex.glsl?raw'
import fragment from '@/utils/three/shader/lineWallShader/fragment.glsl?raw'

export default class LineWall {
    geometry
    material
    mesh

    constructor() {
        this.geometry = new THREE.CylinderBufferGeometry(5, 5, 2, 32, 1, true)
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            side: THREE.DoubleSide
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(0, 1, 0)

        this.mesh.geometry.computeBoundingBox()
        let { min, max } = this.mesh.geometry.boundingBox
        //   获取物体的高度差
        let uHeight = max.y - min.y
        this.material.uniforms.uHeight = {
            value: uHeight
        }

        // 光墙动画
        gsap.to(this.mesh.scale, {
            x: 2,
            z: 2,
            duration: 1,
            repeat: -1,
            yoyo: true
        })
    }
}
