import * as THREE from 'three'

// 初始化场景
const scene = new THREE.Scene()

// 场景天空盒
const textureCubeLoader = new THREE.CubeTextureLoader()
const textureCube = textureCubeLoader.load([
    './textures/environmentMaps/4/1.jpg',
    './textures/environmentMaps/4/2.jpg',
    './textures/environmentMaps/4/3.jpg',
    './textures/environmentMaps/4/4.jpg',
    './textures/environmentMaps/4/5.jpg',
    './textures/environmentMaps/4/6.jpg'
])
scene.background = textureCube
scene.environment = textureCube

export default scene
