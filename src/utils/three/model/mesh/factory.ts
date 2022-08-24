import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import gsap from 'gsap'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default class Factory {
    scene
    loader
    action
    floor1Group
    floor2Group
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
                    this.floor2Group.add(css3dObject)
                }
            })
            scene.add(this.floor2Group)
        })

        this.loader.load('./model/glb/wall.glb', (gltf) => {
            this.wallGroup = gltf.scene
            scene.add(this.wallGroup)
        })
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
        // this.scene.add(objectCSS3D)
        return objectCSS3D
    }
}
