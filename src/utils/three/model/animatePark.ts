import * as THREE from 'three'
import controls from '@/utils/three/model/controls'
import renderer from '@/utils/three/model/renderer'
import scene from '@/utils/three/model/scenePark'
import camera from '@/utils/three/model/camera'
import { updateMesh } from '@/utils/three/model/createPark'

const clock = new THREE.Clock()
const animate = () => {
    const time = clock.getDelta()
    updateMesh(time * 2)
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

export default animate
