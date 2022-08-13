import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import scene from '@/utils/three/model/scene'
import modifyCityMaterial from '@/utils/three/modify/modifyCityMaterial'
import FlyLine from '@/utils/three/model/mesh/flyLine'

export default function createCity() {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/glb/city.glb', (gltf) => {
        gltf.scene.traverse((item) => {
            if (item.type === 'Mesh') {
                const cityMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(0x0c0e33)
                })
                ;(item as THREE.Mesh).material = cityMaterial
                modifyCityMaterial(item)
            }
        })
        scene.add(gltf.scene)

        // 添加飞线
        const flyLine = new FlyLine()
        scene.add(flyLine.mesh)

        // 添加着色器飞线
    })
}
