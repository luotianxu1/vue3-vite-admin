<template>
    <div ref="webGl" class="webGl"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import gsap from 'gsap'
    import WebGl from '@/utils/three/modelNew/webGl'
    // 事件总线
    import eventHub from '@/utils/eventHub'
    import createCity from '@/utils/three/model/mesh/city'
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

    const webGl = ref()

    let web
    onMounted(() => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.camera.position.set(20, 20, 20)

        // 场景天空盒
        const textureCubeLoader = new THREE.CubeTextureLoader()
        const textureCube = textureCubeLoader.load([
            './textures/environmentMaps/4/1.jpg',
            './textures/environmentMaps/4/2.jpg',
            './textures/environmentMaps/4/3.jpg',
            './textures/environmentMaps/4/4.jpg',
            './textures/environmentMaps/4/5.jpg',
            './textures/environmentMaps/4/6.jpg'
        ])
        web.scene.background = textureCube
        web.scene.environment = textureCube

        createCity(web.scene)

        render()
    })

    const render = () => {
        web.renderer.render(web.scene, web.camera)
        requestAnimationFrame(render)
    }

    const eventListMesh: any = []
    let mapFn = {
        // 光墙
        火警: (position, i) => {
            const lightWall = new LightWall(1, 2, position)
            lightWall.eventListIndex = i
            web.scene.add(lightWall.mesh)
            eventListMesh.push(lightWall)
        },
        // 飞线
        治安: (position, i) => {
            // 生成随机颜色
            const color = new THREE.Color(
                Math.random(),
                Math.random(),
                Math.random()
            ).getHex()
            const flyLineShader = new FlyLineShader(position, color)
            flyLineShader.eventListIndex = i
            web.scene.add(flyLineShader.mesh)
            eventListMesh.push(flyLineShader)
        },
        // 雷达
        电力: (position, i) => {
            const color = new THREE.Color(
                Math.random(),
                Math.random(),
                Math.random()
            ).getHex()
            const lightRadar = new LightRadar(2, position, color)
            lightRadar.eventListIndex = i
            web.scene.add(lightRadar.mesh)
            eventListMesh.push(lightRadar)
        }
    }

    eventHub.on('eventToggle', (i) => {
        eventListMesh.forEach((item) => {
            item.mesh.visible = item.eventListIndex === i
        })
        const position = {
            x: props.eventList[i].position.x / 5 - 10,
            y: 0,
            z: props.eventList[i].position.y / 5 - 10
        }
        gsap.to(web.controls.target, {
            duration: 1,
            x: position.x,
            y: position.y,
            z: position.z
        })
    })

    watch(
        () => props.eventList,
        (val) => {
            eventListMesh.forEach((item) => {
                item.remove()
            })
            val.forEach((item, i) => {
                const position = {
                    x: item.position.x / 5 - 10,
                    z: item.position.y / 5 - 10
                }
                const alarmSprite = new AlarmSprite(item.name, position)
                web.scene.add(alarmSprite.mesh)
                alarmSprite.onClick(() => {
                    eventHub.emit('spriteClick', { event: item, i })
                })
                alarmSprite.eventListIndex = i
                eventListMesh.push(alarmSprite)

                if (mapFn[item.name]) {
                    mapFn[item.name](position, i)
                }
            })
        }
    )
</script>

<style lang="scss" scoped>
    .webGl {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }
</style>
