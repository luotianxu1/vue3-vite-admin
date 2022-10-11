<template>
    <div class="home1">
        <div ref="screenDom" class="canvas-container"></div>
        <div ref="pages" class="pages">
            <div class="page">
                <h2 class="title">前端</h2>
                <p>轻松、好玩、有趣掌握前沿硬核前端技术</p>
            </div>
            <div class="page">
                <h2 class="title">WEB 3D可视化</h2>
                <p>领略WEB 3D的魅力,让页面无比酷炫</p>
            </div>
            <div class="page">
                <h2 class="title">ThreeJS框架</h2>
                <p>让前端开发3D效果更方便</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/model/webGl'
    import { gsap } from 'gsap'

    let screenDom = ref()
    let pages = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    let web
    const init = () => {
        if (!screenDom.value) {
            return
        }
        web = new WebGl(screenDom.value)
        web.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100000
        )
        web.camera.position.set(0, 0, 10)
        web.addDirectionalLight(0, 0, 1, 0xffffff, 1)
        web.addDirectionalLight(0, 0, -1, 0xffffff, 0.5)
        web.addAmbientLight(0xffffff, 0.5)
        web.setbgPicture('./textures/bg/25s.jpg')

        web.gltfLoader('./model/glb/xz.glb').then((gltf) => {
            gltf.scene.scale.set(0.1, 0.1, 0.1)
            gltf.scene.position.set(3, 0, 0)
            web.scene.add(gltf.scene)

            window.addEventListener('mousemove', (e) => {
                let x = (e.clientX / window.innerWidth) * 2 - 1
                let y = (e.clientY / window.innerHeight) * 2 - 1

                let timeline = gsap.timeline()
                timeline.to(gltf.scene.rotation, {
                    duration: 0.5,
                    x: y,
                    y: x
                })
            })
        })
        web.gltfLoader('./model/glb/xq6.glb').then((gltf) => {
            gltf.scene.scale.set(0.1, 0.1, 0.1)
            gltf.scene.position.set(3, -8, 0)
            web.scene.add(gltf.scene)

            window.addEventListener('mousemove', (e) => {
                let x = (e.clientX / window.innerWidth) * 2 - 1
                let y = (e.clientY / window.innerHeight) * 2 - 1

                let timeline = gsap.timeline()
                timeline.to(gltf.scene.rotation, {
                    duration: 0.5,
                    x: y,
                    y: x
                })
            })
        })
        web.gltfLoader('./model/glb/gr75.glb').then((gltf) => {
            gltf.scene.position.set(3, -16, 0)
            web.scene.add(gltf.scene)

            window.addEventListener('mousemove', (e) => {
                let x = (e.clientX / window.innerWidth) * 2 - 1
                let y = (e.clientY / window.innerHeight) * 2 - 1

                let timeline = gsap.timeline()
                timeline.to(gltf.scene.rotation, {
                    duration: 0.5,
                    x: y,
                    y: x
                })
            })
        })

        let page = 0
        let timeline2 = gsap.timeline()
        window.addEventListener('mousewheel', (e: any) => {
            if (e.wheelDelta < 0) {
                page++
                if (page > 2) {
                    page = 2
                }
            }
            if (e.wheelDelta > 0) {
                page--
                if (page < 0) {
                    page = 0
                }
            }
            if (!timeline2.isActive()) {
                timeline2.to(web.camera.position, {
                    duration: 0.5,
                    y: page * -8
                })
                gsap.to(pages.value, {
                    duration: 1,
                    y: -page * window.innerHeight
                })
            }
        })

        web.gltfLoader('./model/glb/moon.glb').then((gltf) => {
            let moon = gltf.scene.children[0] as THREE.Mesh
            for (let j = 0; j < 10; j++) {
                let moonInstance = new THREE.InstancedMesh(
                    moon.geometry,
                    moon.material,
                    100
                )

                // scene.add(moon);
                for (let i = 0; i < 100; i++) {
                    let x = Math.random() * 1000 - 500
                    let y = Math.random() * 1000 - 500
                    let z = Math.random() * 1000 - 500

                    let matrix = new THREE.Matrix4()
                    let size = Math.random() * 20 - 8
                    matrix.makeScale(size, size, size)
                    matrix.makeTranslation(x, y, z)
                    moonInstance.setMatrixAt(i, matrix)
                }

                gsap.to(moonInstance.position, {
                    duration: Math.random() * 10 + 2,
                    z: -1000,
                    ease: 'linear',
                    repeat: -1
                })
                web.scene.add(moonInstance)
            }
        })

        render()
    }

    const render = () => {
        web.update()
        requestAnimationFrame(render)
    }
</script>

<style>
    .home1 {
        width: 100vw;
        height: 100vh;
        transform-origin: 0 0;
    }
    .canvas-container {
        width: 100%;
        height: 100%;
    }

    .pages {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
    }
    .pages .page {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        color: #fff;
        padding: 15%;
        box-sizing: border-box;
    }
    .pages .page .title {
        font-size: 50px;
        font-weight: 900;
        margin-bottom: 20px;
    }
    .pages .page p {
        font-size: 25px;
    }
</style>
