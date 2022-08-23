import scene from '@/utils/three/model/sceneFactory'
import Factory from '@/utils/three/model/mesh/factory'

let factory

export default function createFactory() {
    factory = new Factory(scene)
}
export function updateMesh(time) {
    factory.update(time)
}
