import * as THREE from 'three'
import controls from '@/utils/three/model/controlsFactory'
import renderModule from '@/utils/three/model/rendererFactory'
import scene from '@/utils/three/model/sceneFactory'
import camera from '@/utils/three/model/cameraFactory'

const clock = new THREE.Clock()
const animate = () => {
    const time = clock.getDelta()
    controls.update()
    requestAnimationFrame(animate)
    renderModule.renderer.render(scene, camera)
    renderModule.css3drender.render(scene, camera)
}

export default animate
