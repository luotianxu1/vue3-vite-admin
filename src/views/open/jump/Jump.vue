<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'

    const webGl = ref()

    onMounted(() => {
        init()
        window.addEventListener('mousedown', handleTouchStart)
        window.addEventListener('mouseup', handleTouchEnd)
    })

    onUnmounted(() => {
        web.remove()
    })

    let cameraPos = {
        next: new THREE.Vector3(0, 0, 0),
        curr: new THREE.Vector3()
    }

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value, false)
        web.renderer.setClearColor('#282828')
        const s = 150
        web.camera = new THREE.OrthographicCamera(
            window.innerWidth / -s,
            window.innerWidth / s,
            window.innerHeight / s,
            window.innerHeight / -s
        )
        web.camera.position.set(100, 100, 100)
        web.camera.lookAt(cameraPos.curr)
        web.addStats()
        web.addAxesHelper()
        web.addDirectionalLight(10, 10, -10, '#e0e0e0', 0.4)
        web.addAmbientLight('#a6a6a6')
        createBox()
        createBox()
        createJumper()
        render()
    }

    // 添加立方体
    let cubes: Array<THREE.Mesh> = []
    // 立方体方向
    let cubeStat = {
        position: ''
    }
    const createBox = () => {
        const geometry = new THREE.BoxGeometry(1, 0.5, 1)
        const material = new THREE.MeshPhysicalMaterial({
            color: '#f1f1f1'
        })
        const cube = new THREE.Mesh(geometry, material)
        if (cubes.length) {
            const position = Math.random() > 0.5 ? 'left' : 'right'
            cubeStat.position = position
            cube.position.copy(cubes[cubes.length - 1].position)
            const x = cubes[cubes.length - 1].position.x
            const z = cubes[cubes.length - 1].position.z
            if (position === 'left') {
                cube.position.x = x - 2
            } else {
                cube.position.z = z - 2
            }
        }
        cubes.push(cube)
        web.scene.add(cube)
        if (cubes.length > 1) {
            setCameraPos()
        }
        // 只保留一个
        if (cubes.length > 2) {
            web.scene.remove(cubes.shift())
        }
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

    // 创建主角
    let jumper: THREE.Mesh
    let jumperStat = {
        ready: false,
        ySpeed: 0,
        xSpeed: 0
    }
    const createJumper = () => {
        const geometry = new THREE.BoxGeometry(0.25, 0.5, 0.25)
        const material = new THREE.MeshPhongMaterial({ color: '#000000' })
        jumper = new THREE.Mesh(geometry, material)
        geometry.translate(0, 0.25, 0)
        jumper.position.y = 0.25
        web.scene.add(jumper)
    }

    // 开始点击
    const handleTouchStart = () => {
        if (!jumperStat.ready && jumper && jumper.scale.y > 0.25) {
            jumperStat.ySpeed += 0.007
            jumperStat.xSpeed += 0.002
            jumper.scale.y -= 0.02
            requestAnimationFrame(() => handleTouchStart())
        }
    }

    // 结束点击
    const handleTouchEnd = () => {
        jumperStat.ready = true
        if (jumper && jumper.position.y >= 0.25) {
            jumper.position.y += jumperStat.ySpeed
            jumperStat.ySpeed -= 0.01
            if (jumper.scale.y < 1) {
                jumper.scale.y += 0.02
            }
            if (cubeStat.position === 'left') {
                jumper.position.x -= jumperStat.xSpeed
            } else {
                jumper.position.z -= jumperStat.xSpeed
            }
            requestAnimationFrame(() => handleTouchEnd())
        } else {
            jumper && (jumper.position.y = 0.25)
            jumperStat.ySpeed = 0
            jumperStat.xSpeed = 0
            jumperStat.ready = false
            checkInCube()
        }
    }

    // 位置监测
    const checkInCube = () => {
        // 角色位置
        const point0 = {
            x: jumper?.position.x,
            z: jumper?.position.z
        }
        // 跳跃时的立方体
        const pointC = {
            x: cubes[cubes.length - 1].position.x,
            z: cubes[cubes.length - 1].position.z
        }
        // 落下时的立方体
    }

    const render = () => {
        web.update()
        requestAnimationFrame(render)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
