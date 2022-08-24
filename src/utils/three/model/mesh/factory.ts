import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import gsap from 'gsap'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import eventHub from '@/utils/eventHub'

export default class Factory {
    scene
    loader
    action
    floor1Group
    floor2Group
    floor2Tags: any = []
    wallGroup

    constructor(scene) {
        // 载入模型
        this.scene = scene
        this.loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        this.loader.setDRACOLoader(dracoLoader)

        this.loader.load('./model/glb/floor1.glb', (gltf) => {
            this.floor1Group = gltf.scene
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.emissiveIntensity = 5
                }
            })
            this.floor1Group.visible = false
            scene.add(this.floor1Group)
        })

        this.loader.load('./model/glb/floor2.glb', (gltf) => {
            this.floor2Group = gltf.scene
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.emissiveIntensity = 5
                }

                if (child.type === 'Object3D' && child.children.length === 0) {
                    const css3dObject = this.createTag(child)
                    css3dObject.visible = false
                    this.floor2Tags.push(css3dObject)
                    this.floor2Group.add(css3dObject)
                }
            })
            this.floor2Group.visible = false
            scene.add(this.floor2Group)
        })

        this.loader.load('./model/glb/wall.glb', (gltf) => {
            this.wallGroup = gltf.scene
            scene.add(this.wallGroup)
        })

        this.initEvent()
    }

    createTag(object3d) {
        const element = document.createElement('div')
        element.className = 'elementTag'
        element.innerHTML = `
            <div class="elementContent">
                <h3>${object3d.name}</h3>
                <p>温度：26°</p>
                <p>湿度：50%</p>
            </div>
        `

        const objectCSS3D = new CSS3DObject(element)
        objectCSS3D.scale.set(0.2, 0.2, 0.2)
        objectCSS3D.position.copy(object3d.position)
        return objectCSS3D
    }

    showFloor1() {
        this.floor1Group.visible = true
    }

    showFloor2() {
        this.floor2Group.visible = true
        this.floor2Tags.forEach((tag) => {
            tag.visible = true
        })
    }

    hideFloor1() {
        this.floor1Group.visible = false
    }

    hideFloor2() {
        this.floor2Group.visible = false
        this.floor2Tags.forEach((tag) => {
            tag.visible = false
        })
    }

    showWall() {
        this.wallGroup.visible = true
    }

    hideWall() {
        this.wallGroup.visible = false
    }

    initEvent() {
        eventHub.on('showFloor1', () => {
            this.showFloor1()
            this.hideWall()
            this.hideFloor2()
        })
        eventHub.on('showFloor2', () => {
            this.showFloor2()
            this.hideWall()
            this.hideFloor1()
        })
        eventHub.on('showWall', () => {
            this.showWall()
            this.hideFloor1()
            this.hideFloor2()
        })
        eventHub.on('showAll', () => {
            this.showFloor1()
            this.showFloor2()
            this.showWall()
            gsap.to(this.wallGroup.position, {
                y: 200,
                duration: 1
            })
            gsap.to(this.floor2Group.position, {
                y: 50,
                duration: 1,
                delay: 1
            })
        })
    }
}
