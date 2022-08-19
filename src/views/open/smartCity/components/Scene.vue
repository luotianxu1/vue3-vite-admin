<template>
    <div ref="sceneDiv" class="scene"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    // 导入场景
    import scene from '@/utils/three/model/scene'
    // 导入相机
    import camera from '@/utils/three/model/camera'
    // 导入gui
    import gui from '@/utils/three/model/gui'
    // 导入渲染器
    import renderer from '@/utils/three/model/renderer'
    // 导入坐标轴
    import axesHelper from '@/utils/three/model/axesHelper'
    // 导入控制器
    import controls from '@/utils/three/model/controls'
    // 初始化屏幕调整
    import '@/utils/three/model/init'
    // 导入执行函数
    import animate from '@/utils/three/model/animate'
    import createMesh from '@/utils/three/model/createMesh'
    import AlarmSprite from '@/utils/three/model/mesh/alarmSprite'
    import LightWall from '@/utils/three/model/mesh/lightWall'
    import FlyLineShader from '@/utils/three/model/mesh/flyLineShader'
    import LightRadar from '@/utils/three/model/mesh/lightRadar'

    const props = defineProps({
        eventList: {
            type: Object,
            default: () => {}
        }
    })

    scene.add(camera)
    scene.add(axesHelper)
    createMesh()

    // 场景元素div
    const sceneDiv = ref()

    onMounted(() => {
        sceneDiv.value.appendChild(renderer.domElement)
        animate()
    })

    const eventListMesh: any = []
    let mapFn = {
        // 光墙
        火警: (position) => {
            const lightWall = new LightWall(1, 2, position)
            scene.add(lightWall.mesh)
            eventListMesh.push(lightWall)
        },
        // 飞线
        治安: (position) => {
            // 生成随机颜色
            const color = new THREE.Color(
                Math.random(),
                Math.random(),
                Math.random()
            ).getHex()
            const flyLineShader = new FlyLineShader(position, color)
            scene.add(flyLineShader.mesh)
            eventListMesh.push(flyLineShader)
        },
        // 雷达
        电力: (position) => {
            const color = new THREE.Color(
                Math.random(),
                Math.random(),
                Math.random()
            ).getHex()
            const lightRadar = new LightRadar(2, position, color)
            scene.add(lightRadar.mesh)
            eventListMesh.push(lightRadar)
        }
    }

    watch(
        () => props.eventList,
        (val) => {
            eventListMesh.forEach((item) => {
                item.remove()
            })
            val.forEach((item) => {
                const position = {
                    x: item.position.x / 5 - 10,
                    z: item.position.y / 5 - 10
                }
                const alarmSprite = new AlarmSprite(item.name, position)
                eventListMesh.push(alarmSprite)
                scene.add(alarmSprite.mesh)

                if (mapFn[item.name]) {
                    mapFn[item.name](position)
                }
            })
        }
    )
</script>

<style lang="scss" scoped>
    .scene {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }
</style>
