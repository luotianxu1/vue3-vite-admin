import * as THREE from 'three'
import controls from '@/utils/three/model/controls'
import renderer from '@/utils/three/model/renderer'
import scene from '@/utils/three/model/scene'
import camera from '@/utils/three/model/camera'

const clock = new THREE.Clock()
const animate = () => {
    const time = clock.getElapsedTime()
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

export default animate