<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/model/webGl'
    import * as THREE from 'three'

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
    })

    // 创建平面并定义平面大小
    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
    // 创建平面材质
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    })
    // 创建平面
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // 将平面绕x轴旋转90度
    plane.rotation.x = Math.PI * -0.5
    // 设置平面位置
    plane.position.set(15, 0, 0)
    plane.receiveShadow = true

    const form = reactive({
        添加: function () {
            const cubeSize = Math.ceil(Math.random() * 3)
            const cubeGeoMetry = new THREE.BoxGeometry(
                cubeSize,
                cubeSize,
                cubeSize
            )
            const cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffff
            })
            const cube = new THREE.Mesh(cubeGeoMetry, cubeMaterial)
            cube.castShadow = true
            cube.name = 'cube-' + (web.scene.children.length - 4)
            cube.position.x =
                -30 + Math.round(Math.random() * planeGeometry.parameters.width)
            cube.position.y = Math.round(Math.random() * 5)
            cube.position.z =
                -20 +
                Math.round(Math.random() * planeGeometry.parameters.height)
            web.scene.add(cube)
        },
        根据名称打印物体: function () {
            let nameCube = web.scene.getObjectByName('cube-1')
            console.log(nameCube)
        },
        删除物体: function () {
            const allChildren = web.scene.children
            const lastObject = allChildren[allChildren.length - 1]
            if (lastObject instanceof THREE.Mesh) {
                web.scene.remove(lastObject)
            }
        },
        指定同一属性: function () {
            web.scene.overrideMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff
            })
        }
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAxesHelper(20)
        web.addAmbientLight(0x3c3c3c)
        web.addSpotLight(-40, 60, -10, 0xffffff, 1, true)
        web.addStats()

        web.scene.add(plane)

        // scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
        web.scene.fog = new THREE.FogExp2(0xffffff, 0.015)

        web.addGUI()
        web.gui.add(form, '添加')
        web.gui.add(form, '根据名称打印物体')
        web.gui.add(form, '删除物体')
        web.gui.add(form, '指定同一属性')

        render()
    }

    const clock = new THREE.Clock()
    const render = () => {
        const time = clock.getDelta()
        web.scene.traverse(function (obj) {
            if (obj instanceof THREE.Mesh && obj !== plane) {
                obj.rotation.x += time
                obj.rotation.y += time
                obj.rotation.z += time
            }
        })
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
