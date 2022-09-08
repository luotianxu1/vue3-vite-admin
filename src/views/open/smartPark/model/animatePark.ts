import * as THREE from 'three'
import controlsModule from '@/views/open/smartPark/model/controlsPark'
import renderer from '@/views/open/smartPark/model/renderer'
import scene from '@/views/open/smartPark/model/scenePark'
import cameraModule from '@/views/open/smartPark/model/cameraPark'
import { updateMesh } from '@/views/open/smartPark/model/createPark'

const clock = new THREE.Clock()
const animate = () => {
    const time = clock.getDelta()
    updateMesh(time * 2)
    controlsModule.controls.update(time)
    requestAnimationFrame(animate)
    renderer.render(scene, cameraModule.activeCamera)
}

export default animate
