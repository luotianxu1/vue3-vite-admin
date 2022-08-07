<template>
    <div class="page">
        <div id="webgl" ref="container" class="webgl"></div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    // import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
    import { initCameraControl, initStats } from '@/utils/three/util'
    import gsap from 'gsap'

    const container = ref()

    onMounted(() => {
        init()

        // 射线获取鼠标点击的位置
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()
        const mouseDown = (e) => {
            e.preventDefault()
            mouse.x = ((e.clientX - 200) / (window.innerWidth - 200)) * 2 - 1
            mouse.y = -(((e.clientY - 90) / (window.innerHeight - 90)) * 2 - 1)
            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(scene.children)
            if (intersects.length > 0) {
                console.log(intersects)
                console.log(intersects[0])
                console.log(intersects[0])
                if (
                    intersects[0].object &&
                    intersects[0].object.name.includes('sprite')
                ) {
                    let name = intersects[0].object.name
                    console.log(name)
                    let key = name.split('_')[0]
                    if (home[key]) {
                        gsap.to(controls.target, {
                            duration: 0.5,
                            x: home[key].position.x,
                            y: home[key].position.y,
                            z: home[key].position.z,
                            onComplete: () => {
                                console.log('完成')
                                gsap.to(camera.position, {
                                    duration: 0.5,
                                    x: home[key].position.x - 1,
                                    y: home[key].position.y,
                                    z: home[key].position.z + 1
                                })
                            }
                        })
                    }
                }
            }
        }
        if (container.value) {
            container.value.addEventListener('mousedown', mouseDown)
        }

        // 创建精灵图
        const spriteMap = new THREE.TextureLoader().load(
            './textures/room/go.png'
        )
        const spriteMaterial = new THREE.SpriteMaterial({
            map: spriteMap,
            color: 0xffffff,
            transparent: true,
            blending: THREE.AdditiveBlending
        })
        const sprite = new THREE.Sprite(spriteMaterial)
        sprite.position.set(245, -12, -181)
        sprite.scale.set(25, 25, 25)
        sprite.name = 'kitchen_sprite'
        scene.add(sprite)
    })

    // 创建场景
    const scene = new THREE.Scene()

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        75,
        (window.innerWidth - 200) / (window.innerHeight - 90),
        0.1,
        1000
    )
    camera.position.z = 0.1
    camera.aspect = (window.innerWidth - 200) / (window.innerHeight - 90)
    camera.updateProjectionMatrix()
    scene.add(camera)

    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setSize((window.innerWidth - 200), (window.innerHeight - 90))

    const makeCube = (position, arrImg, imgPath, name) => {
        // 添加立方体
        const geometry = new THREE.BoxGeometry(500, 500, 500)
        geometry.scale(1, 1, -1)

        const arr = arrImg
        const boxMaterials: Array<THREE.MeshBasicMaterial> = []
        arr.forEach((item) => {
            // 纹理加载
            let texture = new THREE.TextureLoader().load(
                `${imgPath}/${item}.jpg`
            )
            // 创建材质
            if (item === arr[2] || item === arr[3]) {
                texture.rotation = Math.PI
                texture.center = new THREE.Vector2(0.5, 0.5)
                boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
            } else {
                boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
            }
        })
        const cube = new THREE.Mesh(geometry, boxMaterials)
        cube.position.set(position.x, position.y, position.z)
        scene.add(cube)
        cube.name = name
        return cube
    }

    let cube = makeCube(
        new THREE.Vector3(0, 0, 0),
        ['4_l', '4_r', '4_u', '4_d', '4_b', '4_f'],
        './textures/room/living',
        'livingRoom'
    )

    let kitchen = makeCube(
        new THREE.Vector3(500, 0, -360),
        ['0_l', '0_r', '0_u', '0_d', '0_b', '0_f'],
        './textures/room/kitchen',
        'kitchen'
    )

    let home = {
        livingRoom: cube,
        kitchen: kitchen
    }

    // 添加球
    // const geometry = new THREE.SphereGeometry(5, 32, 32)
    // const loader = new RGBELoader()
    // loader.load('./textures/room/hdr/Living.hdr', (texture) => {
    //     const material = new THREE.MeshBasicMaterial({ map: texture })
    //     const sphere = new THREE.Mesh(geometry, material)
    //     sphere.geometry.scale(1, 1, -1)
    //     scene.add(sphere)
    // })

    let stats
    let controls
    const init = () => {
        if (!container.value) {
            return
        }
        container.value.appendChild(webGLRenderer.domElement)
        controls = initCameraControl(camera, container.value)
        stats = initStats(container.value)
        renderScene()
    }

    const renderScene = () => {
        controls.update()
        stats.update()
        webGLRenderer.render(scene, camera)
        requestAnimationFrame(renderScene)
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .webgl {
            flex: 1;
            position: relative;
        }
    }
</style>
