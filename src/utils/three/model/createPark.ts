import Park from '@/utils/three/model/mesh/park'
import scenePark from '@/utils/three/model/scenePark'

let park

export default function createPark() {
    park = new Park(scenePark)
}
export function updateMesh(time) {
    park.update(time)
}