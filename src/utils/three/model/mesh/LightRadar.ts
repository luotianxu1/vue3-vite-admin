import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/utils/three/shader/lightRadar/vertex.glsl?raw'
import fragment from '@/utils/three/shader/lightRadar/fragment.glsl?raw'

export default class LightRadar {
    geometry
    material
    mesh

    constructor() {
        this.geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            side: THREE.DoubleSide,
            uniforms: {
                uColor: {
                    value: new THREE.Color('#ff0000')
                },
                uTime: {
                    value: 0
                }
            }
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(-8, 1, 8)
        this.mesh.rotation.x = -Math.PI / 2

        gsap.to(this.material.uniforms.uTime, {
            value: 1,
            duration: 1,
            repeat: -1,
            ease: 'none'
        })
    }
}
