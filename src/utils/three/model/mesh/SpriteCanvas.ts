import * as THREE from 'three'

export default class SpriteCanvas {
    fns
    context
    mesh
    raycaster
    mouse
    constructor(
        camera,
        text = 'helloworld',
        position = new THREE.Vector3(0, 0, 0),
        euler = new THREE.Euler(0, 0, 0)
    ) {
        this.fns = []
        // 创建canvas对象
        const canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 1024
        const context: any = canvas.getContext('2d')
        this.context = context
        context.fillStyle = 'rgba(100,100,100,1)'
        context.fillRect(0, 256, 1024, 512)
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.font = 'bold 200px Arial'
        context.fillStyle = 'rgba(255,255,255,1)'
        context.fillText(text, canvas.width / 2, canvas.height / 2)

        let texture = new THREE.CanvasTexture(canvas)

        const material = new THREE.SpriteMaterial({
            map: texture,
            color: 0xffffff,
            alphaMap: texture,
            side: THREE.DoubleSide,
            transparent: true
            // blending: THREE.AdditiveBlending,
        })
        this.mesh = new THREE.Sprite(material)
        this.mesh.scale.set(0.5, 0.5, 0.5)
        this.mesh.position.copy(position)

        // 创建射线
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        // 事件的监听
        window.addEventListener('click', (event: any) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)

            this.raycaster.setFromCamera(this.mouse, camera)

            event.mesh = this.mesh
            event.spriteCanvas = this

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
