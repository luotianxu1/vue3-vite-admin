import * as THREE from 'three'
import gsap from 'gsap'

export default class Clouds {
    mesh
    height
    num
    scale
    autoRotate

    constructor(
        height = 20,
        num = 100,
        size = 400,
        scale = 100,
        autoRotate = true
    ) {
        this.height = height
        this.num = num
        this.scale = scale
        this.autoRotate = autoRotate
        let textureLoader = new THREE.TextureLoader()
        const map1 = textureLoader.load('./textures/cloud/cloud1.jfif')
        const map2 = textureLoader.load('./textures/cloud/cloud2.jfif')
        const map3 = textureLoader.load('./textures/cloud/cloud3.jpg')

        let materials: Array<THREE.PointsMaterial> = []
        let material1 = new THREE.PointsMaterial({
            color: 0xffffff,
            map: map1,
            alphaMap: map2,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
            size: 0.5 * size
        })
        let material2 = new THREE.PointsMaterial({
            color: 0xffffff,
            map: map2,
            alphaMap: map3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
            size: 0.5 * size
        })
        let material3 = new THREE.PointsMaterial({
            color: 0xffffff,
            map: map3,
            alphaMap: map1,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
            size: 0.5 * size
        })
        let material4 = new THREE.PointsMaterial({
            color: 0xffffff,
            map: map2,
            alphaMap: map1,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
            size: size
        })
        materials.push(material1, material2, material3, material4)
        this.mesh = new THREE.Group()
        for (let i = 0; i < materials.length; i++) {
            let material = materials[i]
            let geometry = this.generateGeometry(this.num)
            let points = new THREE.Points(geometry, material)
            this.mesh.add(points)
        }

        if (this.autoRotate) {
            this.animate()
        }
    }

    generateGeometry(num = 300) {
        const vertices: Array<number> = []
        for (let i = 0; i < num; i++) {
            let randomX = (Math.random() - 0.5) * 2 * this.scale
            let randomY = Math.random() * (this.height / 2) + this.height
            let randomZ = (Math.random() - 0.5) * 2 * this.scale
            vertices.push(randomX, randomY, randomZ)
        }
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(vertices, 3)
        )
        return geometry
    }

    animate() {
        let i = 1
        this.mesh.traverse((item) => {
            let speed = 40 * i

            if (item instanceof THREE.Points) {
                gsap.to(item.rotation, {
                    duration: speed,
                    repeat: -1,
                    y: Math.PI * 2
                })
            }
            i++
        })
    }
}
