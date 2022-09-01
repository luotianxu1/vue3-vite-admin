import Scene from '@/utils/three/modelNew/scene'
import PerspectiveCamera from '@/utils/three/modelNew/perspectiveCamera'
import AmbientLight from '@/utils/three/modelNew/ambientLight'
import DirectionalLight from '@/utils/three/modelNew/directionLight'
import PointLight from '@/utils/three/modelNew/pointLight'
import SportLight from '@/utils/three/modelNew/sportLight'
import Renderer from '@/utils/three/modelNew/renderer'
import AxesHelper from '@/utils/three/modelNew/axesHelper'
import Controls from '@/utils/three/modelNew/controls'
import Stats from 'three/examples/jsm/libs/stats.module'

export default class WebGl {
    domElement
    scene
    camera
    ambientLight
    directionalLight
    pointLight
    sportLight
    renderer
    axesHelper
    controls
    stats

    constructor(domElement) {
        this.domElement = domElement
        this.scene = Scene()
        this.camera = PerspectiveCamera(
            domElement.offsetWidth,
            domElement.offsetHeight
        )
        this.scene.add(this.camera)
        this.camera.lookAt(this.scene)

        this.renderer = Renderer(domElement)
        this.renderer.render(this.scene, this.camera)

        this.controls = Controls(this.camera, this.renderer)
        this.controls.update()
    }

    /**
     * 添加坐标轴
     * @param size 长度
     * @constructor
     */
    addAxesHelper(size = 15) {
        this.axesHelper = AxesHelper(size)
        this.scene.add(this.axesHelper)
    }

    /**
     * 添加环境光
     * @param color 颜色
     * @param intensity 光照的强度
     */
    addAmbientLight(color:string | number = 0xffffff, intensity = 1) {
        this.ambientLight = AmbientLight(color, intensity)
        this.scene.add(this.ambientLight)
    }

    /**
     * 添加平行光
     * @param x
     * @param y
     * @param z
     * @param color 颜色
     * @param intensity 光照强度
     * @param isCastShadow 是否产生阴影
     */
    addDirectionalLight(
        x = 50,
        y = 100,
        z = 50,
        color = 0xffffff,
        intensity = 1,
        isCastShadow = true
    ) {
        this.directionalLight = DirectionalLight(
            x,
            y,
            z,
            color,
            intensity,
            isCastShadow
        )
        this.scene.add(this.directionalLight)
    }

    /**
     * 添加点光源
     * @param x
     * @param y
     * @param z
     * @param color 颜色
     * @param intensity 光照强度
     */
    addPointLight(x = 0, y = 300, z = 300, color = 0xffffff, intensity = 1) {
        this.pointLight = PointLight(x, y, z, color, intensity)
        this.scene.add(this.pointLight)
    }

    /**
     * 聚光灯光源
     * @param x
     * @param y
     * @param z
     * @param color 颜色
     * @param intensity 强度
     * @param isCastShadow 阴影
     */
    addSportLight(
        x = 100,
        y = 100,
        z = 100,
        color = 0xffffff,
        intensity = 1,
        isCastShadow = true
    ) {
        this.sportLight = SportLight(x, y, z, color, intensity, isCastShadow)
        this.scene.add(this.sportLight)
    }

    addStats() {
        this.stats = Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        this.stats.dom.style.position = 'absolute'
        this.stats.dom.style.left = '0px'
        this.stats.dom.style.top = '0px'
        this.domElement.appendChild(this.stats.dom)
    }
}
