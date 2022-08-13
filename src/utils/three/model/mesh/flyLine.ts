import * as THREE from 'three'
import gsap from 'gsap'

export default class FlyLine {
    lineCurve
    geometry
    material
    mesh
    texture

    constructor() {
        let linePoints = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, 4, 0),
            new THREE.Vector3(10, 0, 0)
        ]
        // 1 创建曲线
        this.lineCurve = new THREE.CatmullRomCurve3(linePoints)
        // 2 根据曲线生成管道几何体
        this.geometry = new THREE.TubeBufferGeometry(
            this.lineCurve,
            100,
            0.4,
            2,
            false
        )
        // 3 设置飞线材质
        const textLoader = new THREE.TextureLoader()
        this.texture = textLoader.load('./textures/flyLine/z_11.png')
        this.texture.repeat.set(1, 2)
        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT = THREE.MirroredRepeatWrapping
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true
        })
        // 4 创建飞线物体
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        // 5 创建飞线动画
        gsap.to(this.texture.offset, {
            x: -1,
            duration: 1,
            repeat: -1,
            ease: 'none'
        })
    }
}
