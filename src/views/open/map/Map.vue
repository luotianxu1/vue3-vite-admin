<template>
    <div ref="webGl" class="webGl"></div>
    <div id="info"></div>
</template>

<script lang="ts" setup>
    import * as THREE from 'three'
    import * as d3 from 'd3'
    import WebGl from '@/utils/three/model/webGl'

    const map = new THREE.Object3D()
    const operationData = (jsonData) => {
        const features = jsonData.features
        features.forEach((feature) => {
            // 创建省份的物体
            const province = new THREE.Object3D()
            province.properties = feature.properties.name
            // 获取经纬度坐标
            const coordinates = feature.geometry.coordinates

            if (feature.geometry.type === 'Polygon') {
                coordinates.forEach((coordinate) => {
                    const mesh = createMesh(coordinate)
                    mesh.properties = feature.properties.name
                    province.add(mesh)
                    const line = createLine(coordinate)
                    province.add(line)
                })
            }

            if (feature.geometry.type === 'MultiPolygon') {
                coordinates.forEach((item) => {
                    item.forEach((coor) => {
                        const mesh = createMesh(coor)
                        mesh.properties = feature.properties.name
                        province.add(mesh)
                        const line = createLine(coor)
                        province.add(line)
                    })
                })
            }

            map.add(province)
        })
        web.scene.add(map)
    }
    const projection = d3
        .geoMercator()
        .center([116.5, 38.5])
        .translate([0, 0, 0])

    const createMesh = (polygon) => {
        const shape = new THREE.Shape()
        polygon.forEach((row, i) => {
            const [longitude, latitude] = projection(row)
            if (i === 0) {
                shape.moveTo(longitude, -latitude)
            }
            shape.lineTo(longitude, -latitude)
        })

        const color = new THREE.Color(
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5
        )
        const geometry = new THREE.ExtrudeBufferGeometry(shape, {
            depth: 5
        })
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.5
        })
        return new THREE.Mesh(geometry, material)
    }

    // 根据经纬度画线
    const createLine = (polygon) => {
        const lineGeometry = new THREE.BufferGeometry()
        const pointsArray: any = []
        polygon.forEach((row) => {
            const [longitude, latitude] = projection(row)
            pointsArray.push(new THREE.Vector3(longitude, -latitude, 0))
        })
        // 通过点生成线几何体
        lineGeometry.setFromPoints(pointsArray)
        const lineMaterial = new THREE.LineBasicMaterial({
            color: '#fff'
        })
        return new THREE.Line(lineGeometry, lineMaterial)
    }

    // 监听鼠标
    window.addEventListener('pointermove', onRay)
    // 全局对象
    let lastPick
    function onRay(event) {
        // 获取鼠标位置
        const mouse = new THREE.Vector2()
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
        const info:any = document.querySelector('#info')
        if (!info) {
            return
        }

        // 获取鼠标点击位置
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, web.camera)
        const intersects = raycaster.intersectObjects(map.children)
        if (intersects.length > 0) {
            if (lastPick) {
                lastPick.material.color.copy(lastPick.material.oldColor)
            }
            lastPick = intersects[0].object
            lastPick.material.oldColor = lastPick.material.color.clone()
            lastPick.material.color.set('#d13a34')

            info.style.left = event.clientX + 'px'
            info.style.top = event.clientY + 'px'
            info.style.display = 'block'
            info.innerHTML = intersects[0].object.properties
        } else if (lastPick) {
            lastPick.material.color.copy(lastPick.material.oldColor)

            info.style.display = 'none'
        }
    }

    const webGl = ref()

    onMounted(() => {
        init()
    })

    onUnmounted(() => {
        web.remove()
        window.removeEventListener('pointermove', onRay)
    })

    let web
    const init = () => {
        if (!webGl.value) {
            return
        }
        web = new WebGl(webGl.value)
        web.camera.position.set(0, 0, 150)

        // 载入JSON文件
        const loader = new THREE.FileLoader()
        loader.load('./json/china.json', (data) => {
            const jsonData = JSON.parse(data as string)
            operationData(jsonData)
        })

        renderScene()
    }

    const renderScene = () => {
        web.controls.update()
        requestAnimationFrame(renderScene)
        web.renderer.render(web.scene, web.camera)
    }
</script>

<style scoped lang="scss">
    .webGl {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #info {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 5px 10px;
        display: none;
        pointer-events: none;
    }
</style>
