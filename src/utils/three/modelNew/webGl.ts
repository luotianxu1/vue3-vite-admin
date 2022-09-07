import Scene from '@/utils/three/modelNew/scene'
import PerspectiveCamera from '@/utils/three/modelNew/perspectiveCamera'
import AmbientLight from '@/utils/three/modelNew/ambientLight'
import DirectionalLight from '@/utils/three/modelNew/directionLight'
import PointLight from '@/utils/three/modelNew/pointLight'
import SpotLight from '@/utils/three/modelNew/spotLight'
import Renderer from '@/utils/three/modelNew/renderer'
import AxesHelper from '@/utils/three/modelNew/axesHelper'
import Controls from '@/utils/three/modelNew/controls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import * as THREE from 'three'
import HemisphereLight from '@/utils/three/modelNew/hemisphereLight'

export default class WebGl {
    domElement
    scene
    camera
    ambientLight
    directionalLight
    pointLight
    spotLight
    hemisphereLight
    renderer
    axesHelper
    controls
    stats
    gui
    cameraHelper
    spotLightHelper
    pointLightHelper

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

        window.addEventListener('resize', () => {
            this.resize(domElement)
        })
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
    addAmbientLight(color: string | number = 0xffffff, intensity = 1) {
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
        color: number | string = 0xffffff,
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
    addPointLight(
        x = 0,
        y = 300,
        z = 300,
        color: number | string = 0xffffff,
        intensity = 1
    ) {
        this.pointLight = PointLight(x, y, z, color, intensity)
        this.scene.add(this.pointLight)
    }

    addPointLightHelper(light) {
        this.pointLightHelper = new THREE.PointLightHelper(light)
        this.scene.add(this.pointLightHelper)
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
    addSpotLight(
        x = 100,
        y = 100,
        z = 100,
        color: number | string = 0xffffff,
        intensity = 1,
        isCastShadow = true
    ) {
        this.spotLight = SpotLight(x, y, z, color, intensity, isCastShadow)
        this.scene.add(this.spotLight)
    }

    addSpotLightHelper(light) {
        this.spotLightHelper = new THREE.SpotLightHelper(light)
        this.scene.add(this.spotLightHelper)
    }

    /**
     * 半球光
     * @param x
     * @param y
     * @param z
     * @param skyColor 空中发出光线的颜色
     * @param groundColor 地面发出光线的颜色
     * @param intensity 强度
     */
    addHemisphereLight(
        x,
        y,
        z,
        skyColor = 0x0000ff,
        groundColor = 0x00ff00,
        intensity = 1
    ) {
        this.hemisphereLight = HemisphereLight(
            x,
            y,
            z,
            skyColor,
            groundColor,
            intensity
        )
        this.scene.add(this.hemisphereLight)
    }

    addStats() {
        this.stats = Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        this.stats.dom.style.position = 'absolute'
        this.stats.dom.style.left = '0px'
        this.stats.dom.style.top = '0px'
        this.domElement.appendChild(this.stats.dom)
    }

    addDebugCamera(light) {
        this.cameraHelper = new THREE.CameraHelper(light.shadow.camera)
        this.scene.add(this.cameraHelper)
    }

    addGUI() {
        this.gui = new GUI()
        this.gui.domElement.style.position = 'absolute'
        this.gui.domElement.style.right =
            window.innerWidth -
            this.domElement.getBoundingClientRect().right +
            'px'
        this.gui.domElement.style.top =
            this.domElement.getBoundingClientRect().top + 'px'
    }

    // 监听页面变化
    resize(domElement) {
        this.camera.aspect = domElement.offsetWidth / domElement.offsetHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(
            this.domElement.offsetWidth,
            this.domElement.offsetHeight
        )
        this.renderer.setPixelRatio(window.devicePixelRatio)
    }

    // 销毁
    remove() {
        if (this.gui) {
            this.gui.destroy()
        }
        window.removeEventListener('resize', this.resize)
    }
}
