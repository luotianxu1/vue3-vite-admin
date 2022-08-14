import * as THREE from 'three'
import camera from '@/utils/three/model/camera'

export default class AlarmSprite {
    geometry
    material
    mesh
    fns
    raycaster
    mouse

    constructor() {
        const textureLoader = new THREE.TextureLoader()
        const map = textureLoader.load('./textures/alarm/warning.png')
        this.material = new THREE.SpriteMaterial({ map: map })
        this.mesh = new THREE.Sprite(this.material)

        this.mesh.position.set(-4.2, 3.5, -1)

        // 封装点击事件
        this.fns = []

        // 创建射线
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        // 事件监听
        window.addEventListener('click', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
            this.raycaster.setFromCamera(this.mouse, camera)
            ;(event as any).mesh = this.mesh
            ;(event as any).alarm = this
            const intersects = this.raycaster.intersectObject(this.mesh)
            if (intersects.length > 0) {
                this.fns.forEach((fn) => {
                    fn(event)
                })
            }
        })
    }

    onClick(fn) {
        this.fns.push(fn)
    }
}
