import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import camera from '@/utils/three/model/camera'
import renderer from '@/utils/three/model/renderer'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

export default controls
