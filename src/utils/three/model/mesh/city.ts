import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import scene from '@/utils/three/model/scene'
import modifyCityMaterial from '@/utils/three/modify/modifyCityMaterial'
import FlyLine from '@/utils/three/model/mesh/flyLine'
import FlyLineShader from '@/utils/three/model/mesh/flyLineShader'
import MeshLine from '@/utils/three/model/mesh/meshLine'
import LineWall from '@/utils/three/model/mesh/LineWall'

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
                if (item.name === 'Layerbuildings') {
                    const meshLine = new MeshLine((item as THREE.Mesh).geometry)
                    const size = (item as THREE.Mesh).scale.x * 1.001
                    meshLine.mesh.scale.set(size, size, size)
                    scene.add(meshLine.mesh)
                }
            }
        })
        scene.add(gltf.scene)

        // 添加飞线
        const flyLine = new FlyLine()
        scene.add(flyLine.mesh)

        // 添加着色器飞线
        const flyLineShader = new FlyLineShader()
        scene.add(flyLineShader.mesh)

        // 添加光墙
        const lineWall = new LineWall()
        scene.add(lineWall.mesh)
    })
}
