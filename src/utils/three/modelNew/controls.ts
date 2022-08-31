import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Controls {
    controls

    constructor(camera, renderer) {
        this.controls = new OrbitControls(camera, renderer.domElement)
        this.controls.enableDamping = true
        this.controls.update()
    }
}
