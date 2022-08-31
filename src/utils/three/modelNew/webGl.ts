import Scene from '@/utils/three/modelNew/scene'
import PerspectiveCamera from '@/utils/three/modelNew/perspectiveCamera'
import AmbientLight from '@/utils/three/modelNew/ambientLight'
import DirectionalLight from '@/utils/three/modelNew/directionLight'
import PointLight from '@/utils/three/modelNew/pointLight'
import Renderer from '@/utils/three/modelNew/renderer'
import AxesHelper from '@/utils/three/modelNew/axesHelper'
import Controls from '@/utils/three/modelNew/controls'

export default class WebGl {
    scene
    camera
    ambientLight
    directionalLight
    pointLight
    renderer
    axesHelper
    controls

    constructor(domElement) {
        this.scene = Scene()
        this.camera = PerspectiveCamera(
            domElement.offsetWidth,
            domElement.offsetHeight
        )
        this.scene.add(this.camera)
        this.ambientLight = AmbientLight()
        this.scene.add(this.ambientLight)
        this.directionalLight = DirectionalLight()
        this.scene.add(this.directionalLight)
        this.pointLight = PointLight()
        this.scene.add(this.pointLight)
        this.renderer = Renderer(domElement)
        this.renderer.render(this.scene, this.camera)
        this.axesHelper = AxesHelper()
        this.scene.add(this.axesHelper)
        this.controls = Controls(this.camera, this.renderer)
        this.controls.update()
        console.log(this.scene)
    }
}
