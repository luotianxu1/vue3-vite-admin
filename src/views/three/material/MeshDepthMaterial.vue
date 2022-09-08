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
    })

    const form = reactive({
        cameraNear: 50,
        cameraFar: 110,
        添加: function () {
            let cubeSize = Math.ceil(3 + Math.random() * 3)
            let cubeGeometry = new THREE.BoxGeometry(
                cubeSize,
                cubeSize,
                cubeSize
            )
            let cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffff
            })
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.castShadow = true

            cube.position.x = -60 + Math.round(Math.random() * 100)
            cube.position.y = Math.round(Math.random() * 10)
            cube.position.z = -100 + Math.round(Math.random() * 150)
            web.scene.add(cube)
        }
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAmbientLight(0x0c0c0c)
        web.addSpotLight(-40, 60, -10, 0xffffff)
        web.camera.near = form.cameraNear
        web.camera.far = form.cameraFar

        web.addAxesHelper()
        web.addStats()
        web.addGUI()

        web.gui.add(form, 'cameraNear', 1, 100)
        web.gui.add(form, 'cameraFar', 50, 200)
        web.gui.add(form, '添加')

        renderScene()
    }

    const renderScene = () => {
        web.update()
        requestAnimationFrame(renderScene)
    }

    watch(form, (val) => {
        web.camera.near = val.cameraNear
        web.camera.far = val.cameraFar
        web.camera.updateProjectionMatrix()
    })
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
