<template>
    <div class="page">
        <div class="form">
            <div class="form-item">
                <el-button type="primary" @click="addCube">添加物体</el-button>
            </div>
            <div class="form-item">
                <el-button type="primary" @click="logLastCube">
                    根据名称打印物体
                </el-button>
            </div>
            <div class="form-item">
                <el-button type="primary" @click="delCube">删除物体</el-button>
            </div>
            <div class="form-item">
                <el-button type="primary" @click="overrideMaterial">
                    指定同一属性
                </el-button>
            </div>
        </div>
        <div ref="webGl" class="webGl"></div>
    </div>
</template>

<script lang="ts" setup>
    import WebGl from '@/utils/three/modelNew/webGl'
    import * as THREE from 'three'

    const webGl = ref()

    onMounted(() => {
        init()
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

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.addAxesHelper(20)
        web.addAmbientLight(0x3c3c3c)
        web.addSpotLight(-40,60,-10,0xffffff,1,true)
        web.addStats()

        web.scene.add(plane)

        // scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
        web.scene.fog = new THREE.FogExp2(0xffffff, 0.015)

        render()
    }

    const render = () => {
        web.scene.traverse(function (obj) {
            if (obj instanceof THREE.Mesh && obj !== plane) {
                obj.rotation.x += 0.1
                obj.rotation.y += 0.1
                obj.rotation.z += 0.1
            }
        })
        web.stats.update()
        requestAnimationFrame(render)
        web.renderer.render(web.scene, web.camera)
    }

    const addCube = () => {
        const cubeSize = Math.ceil(Math.random() * 3)
        const cubeGeoMetry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
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
            -20 + Math.round(Math.random() * planeGeometry.parameters.height)
        web.scene.add(cube)
    }

    const delCube = () => {
        const allChildren = web.scene.children
        const lastObject = allChildren[allChildren.length - 1]
        if (lastObject instanceof THREE.Mesh) {
            web.scene.remove(lastObject)
        }
    }

    const logLastCube = () => {
        let nameCube = web.scene.getObjectByName('cube-1')
        console.log(nameCube)
    }

    const overrideMaterial = () => {
        web.scene.overrideMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        })
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;

        .form {
            width: 200px;

            .form-item {
                text-align: center;
                margin-top: 5px;
            }
        }

        .webGl {
            flex: 1;
            position: relative;
        }
    }
</style>
