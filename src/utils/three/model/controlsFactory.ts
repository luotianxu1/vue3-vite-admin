import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import camera from '@/utils/three/model/cameraFactory'
import rendererModule from '@/utils/three/model/rendererFactory'

const controls = new OrbitControls(camera, rendererModule.renderer.domElement)
controls.enableDamping = true

export default controls
