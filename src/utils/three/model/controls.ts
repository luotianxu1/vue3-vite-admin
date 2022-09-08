import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Controls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.update()
    return controls
}
