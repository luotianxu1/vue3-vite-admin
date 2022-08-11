import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerHeight / window.innerWidth,
    1,
    50000
)
camera.position.set(0,0,10)

export default camera
