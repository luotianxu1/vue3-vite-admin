import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import scene from '@/utils/three/model/scene'
import modifyCityMaterial from '@/utils/three/modify/modifyCityMaterial'
import MeshLine from '@/utils/three/model/mesh/meshLine'

export default function createCity() {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/glb/city.glb', (gltf) => {
        gltf.scene.traverse((item) => {
            if (item.type === 'Mesh') {
                ;(item as THREE.Mesh).material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(0x0c0e33)
                })
                modifyCityMaterial(item)
                if (item.name === 'Layerbuildings') {
                    const meshLine = new MeshLine((item as THREE.Mesh).geometry)
                    const size = (item as THREE.Mesh).scale.x * 1.001
                    meshLine.mesh.scale.set(size, size, size)
                    scene.add(meshLine.mesh)
                }
            }
        })
        scene.add(gltf.scene)
    })
}
