<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import WebGl from '@/utils/three/model/webGl'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
        window.removeEventListener('mousemove',detect)
    })

    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({
        wireframe: true
    })
    const redMaterial = new THREE.MeshBasicMaterial({
        color: '#ff0000'
    })
    let cubeArr: any = []

    // 创建投射光纤对象
    const raycaster = new THREE.Raycaster()
    // 鼠标位置对象
    const mouse = new THREE.Vector2()
    const detect = (e) => {
        mouse.x = ((e.clientX - webGl.value.getBoundingClientRect().x) / webGl.value.offsetWidth) * 2 - 1
        mouse.y = -(((e.clientY - webGl.value.getBoundingClientRect().y) / webGl.value.offsetHeight) * 2 - 1)
        raycaster.setFromCamera(mouse, web.camera)
        const result = raycaster.intersectObjects(cubeArr)
        if (result.length) {
            result.forEach((item) => {
                item.object.material = redMaterial
            })
        }
    }
    // 监听鼠标的位置
    window.addEventListener('mousemove', detect)

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addStats()
        web.addAxesHelper()
        web.camera.position.set(0, 0, 20)
        web.addAmbientLight(0x343434)

        for (let i = -5; i < 5; i++) {
            for (let j = -5; j < 5; j++) {
                for (let k = -5; k < 5; k++) {
                    const cube = new THREE.Mesh(cubeGeometry, material)
                    cube.position.set(i, j, k)
                    web.scene.add(cube)
                    cubeArr.push(cube)
                }
            }
        }

        renderScene()
    }

    const renderScene = () => {
        web.update()
        requestAnimationFrame(renderScene)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
