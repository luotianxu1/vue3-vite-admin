import * as THREE from 'three'
import controlsModule from '@/utils/three/model/controlsPark'
import renderer from '@/utils/three/model/renderer'
import scene from '@/utils/three/model/scenePark'
import cameraModule from '@/utils/three/model/cameraPark'
import { updateMesh } from '@/utils/three/model/createPark'

const clock = new THREE.Clock()
const animate = () => {
    const time = clock.getDelta()
    updateMesh(time * 2)
    controlsModule.controls.update(time)
    requestAnimationFrame(animate)
    renderer.render(scene, cameraModule.activeCamera)
}

export default animate
