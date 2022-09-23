<template>
    <div ref='webGl' class='webGl'></div>
</template>

<script lang='ts' setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
        window.addEventListener( )
    })

    let cameraPos = {
        next: new THREE.Vector3(0,0,0),
        curr: new THREE.Vector3()
    }

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.renderer.setClearColor('#282828')
        web.camera.position.set(5, 5, 5)
        web.camera.lookAt(cameraPos.curr)
        web.addStats()
        web.addAxesHelper()
        web.addDirectionalLight(10, 10, -10, '#e0e0e0', 0.4)
        web.addAmbientLight('#a6a6a6')
        createBox()
        createBox()
        render()
    }

    // 添加立方体
    let cubes: Array<THREE.Mesh> = []
    const createBox = () => {
        const geometry = new THREE.BoxGeometry(1, 0.5, 1)
        const material = new THREE.MeshPhysicalMaterial({
            color: '#f1f1f1'
        })
        const cube = new THREE.Mesh(geometry, material)
        const position = Math.random() > 0.5 ? 'left' : 'right'
        const x = cubes[cubes.length - 1].position.x
        const y = cubes[cubes.length - 1].position.y
        const z = cubes[cubes.length - 1].position.z
        if (cubes.length) {
            if (position === 'left') {
                cube.position.x = x - 2
            } else {
                cube.position.z = z - 2
            }
        }
        cubes.push(cube)
        web.scene.add(cube)
    }

    // 设置相机位置
    const setCameraPos = () => {
        const lastIndex = cubes.length - 1
        const start = {
            x: cubes[lastIndex - 1].position.x,
            z: cubes[lastIndex - 1].position.z
        }
        const end = {
            x: cubes[lastIndex].position.x,
            z: cubes[lastIndex].position.z
        }
        const pos = new THREE.Vector3()
        pos.x = (start.x + end.x) / 2
        pos.y = 0
        pos.z = (start.z + end.z) / 2
        cameraPos.next = pos
        updateCamera()
    }

    // 更新相机
    const updateCamera = () => {
        web.camera.lookAt(cameraPos.next)
    }

    const render = () => {
        web.update()
        requestAnimationFrame(render)
    }
</script>

<style scoped lang='scss'>
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
