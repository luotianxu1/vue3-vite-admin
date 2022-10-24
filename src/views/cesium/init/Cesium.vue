<template>
    <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup lang="ts">
    import * as Cesium from 'cesium'

    const cesiumContainer = ref()

    // 设置cesium token
    Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZGMzMTc3NS04MWEwLTQzZTQtYTg3Ny0yYTIxMDM4NTJiOWMiLCJpZCI6MTA3NTE3LCJpYXQiOjE2NjI2OTA4NzV9.tG47dqn9va2-8OzPZgNGsxUkvmNTcPFaxXRFIPzg2o4'

    // 设置默认视角
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
        89.5, // 西边的经度
        20.4, // 南边的维度
        110.4, // 东边经度
        61.2 // 北边维度
    )

    let viewer
    onMounted(() => {
        viewer = new Cesium.Viewer('cesiumContainer', {
            infoBox: false, // 是否显示信息窗口
            geocoder: false, // 搜索框
            homeButton: false, // home按钮
            sceneModePicker: false, // 显示模式
            baseLayerPicker: false, // 图层选择
            navigationHelpButton: false, // 帮助按钮
            animation: false, // 动画
            timeline: false, // 时间轴
            fullscreenButton: false, // 全屏按钮
            // 地形
            // terrainProvider: Cesium.createWorldTerrain({
            //     requestVertexNormals: true,
            //     requestWaterMask: true
            // }),
            // 天地图矢量路径图
            // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            //     url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211',
            //     layer: 'tdtBasicLayer',
            //     style: 'default',
            //     format: 'image/jpeg',
            //     tileMatrixSetID: 'GoogleMapsCompatible'
            // })
            //   天地图影像服务
            // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            //     url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211',
            //     layer: 'tdtBasicLayer',
            //     style: 'default',
            //     format: 'image/jpeg',
            //     tileMatrixSetID: 'GoogleMapsCompatible'
            // })
            // OSM地图,
            imageryProvider: new Cesium.OpenStreetMapImageryProvider({
                url: 'https://a.tile.openstreetmap.org/'
            })
            // 高德矢量地图,
            // imageryProvider: new Cesium.UrlTemplateI mageryProvider({
            //     url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
            // })
        })

        // 设置图层叠加
        // const imageryLayers = viewer.imageryLayers
        // const layer = imageryLayers.addImageryProvider(
        //     new Cesium.UrlTemplateImageryProvider({
        //         url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        //     })
        // )
        // layer.alpha = 0.5

        // 隐藏logo
        viewer.cesiumWidget.creditContainer.style.display = 'none'

        // 添加3D建模
        viewer.scene.primitives.add(Cesium.createOsmBuildings())
        // 添加文字标签和广告牌
        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 750),
            // 点
            point: {
                pixelSize: 10,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 4
            },
            label: {
                text: '广州塔',
                font: '24px sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 4,
                // FILL填充文字，OUTLINE勾勒标签，FILL_AND_OUTLINE填充文字和勾勒标签
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                // 设置文字的偏移量
                pixelOffset: new Cesium.Cartesian2(0, -24),
                // 设置文字的显示位置,LEFT /RIGHT /CENTER
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // 设置文字的显示位置
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            billboard: {
                image: './textures/gzt.png',
                width: 50,
                height: 50,
                // 设置广告牌的显示位置
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                // 设置广告牌的显示位置
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER
            }
        })

        // 添加3D模型
        viewer.entities.add({
            name: 'Airplane',
            position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1500),
            model: {
                uri: './model/glb/Air.glb',
                // 设置飞机最小像素
                minimumPixelSize: 128,
                // 设置飞机轮廓
                silhouetteSize: 5,
                silhouetteColor: Cesium.Color.WHITE,
                // 设置相机距离模型多远距离显示
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000)
            }
        })
        viewer.flyTo(viewer.entities)

        // 棋盘纹理
        // let material = new Cesium.CheckerboardMaterialProperty({
        //     evenColor: Cesium.Color.WHITE,
        //     oddColor: Cesium.Color.BLACK,
        //     repeat: new Cesium.Cartesian2(2, 4)
        // })
        // 条纹纹理
        // let material = new Cesium.StripeMaterialProperty({
        //     evenColor: Cesium.Color.WHITE,
        //     oddColor: Cesium.Color.BLACK,
        //     repeat: 8
        // })
        // 网格纹理
        let material = new Cesium.GridMaterialProperty({
            color: Cesium.Color.YELLOW,
            cellAlpha: 0.2,
            lineCount: new Cesium.Cartesian2(8, 8),
            lineThickness: new Cesium.Cartesian2(2.0, 2.0)
        })

        viewer.entities.add({
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(
                    // 西边的经度
                    90,
                    // 南边维度
                    20,
                    // 东边经度
                    110,
                    // 北边维度
                    30
                ),
                material: material
            }
        })

        // primivite创建矩形
        let rectGeometry = new Cesium.RectangleGeometry({
            rectangle: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
            height: 0,
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
        })
        // 创建几何体实例
        let instance = new Cesium.GeometryInstance({
            id: 'red',
            geometry: rectGeometry,
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    Cesium.Color.RED.withAlpha(0.5)
                )
            }
        })
        let rectGeometry2 = new Cesium.RectangleGeometry({
            rectangle: Cesium.Rectangle.fromDegrees(140, 20, 160, 30),
            height: 0,
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
        })
        let instance2 = new Cesium.GeometryInstance({
            id: 'blue',
            geometry: rectGeometry2,
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    Cesium.Color.BLUE.withAlpha(0.5)
                )
            }
        })
        // 设置外观
        // 使用instance的颜色去着色
        // let appearance = new Cesium.PerInstanceColorAppearance({
        //     flat: true
        // })
        let rectMaterial = Cesium.Material.fromType('Color', {
            color: Cesium.Color.AQUA.withAlpha(0.5)
        })
        // 设定几何体都是与地球的椭球体平行
        let appearance = new Cesium.EllipsoidSurfaceAppearance({
            material: rectMaterial
        })
        // 图元
        let primitive = new Cesium.Primitive({
            geometryInstances: [instance, instance2],
            appearance: appearance
        })
        viewer.scene.primitives.add(primitive)

        // 动态修改图元颜色
        setInterval(() => {
            let attribute = primitive.getGeometryInstanceAttributes('blue')
            attribute.color = Cesium.ColorGeometryInstanceAttribute.toValue(
                // Cesium.Color.YELLOW.withAlpha(0.5)
                Cesium.Color.fromRandom({
                    alpha: 0.5
                })
            )
        }, 2000)

        // 拾取并动态修改图元颜色
        let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction(function (movement) {
            let pickedObject = viewer.scene.pick(movement.position)

            if (Cesium.defined(pickedObject) && typeof pickedObject.id === 'string') {
                let attributes = primitive.getGeometryInstanceAttributes(pickedObject.id)
                attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
                    Cesium.Color.YELLOW.withAlpha(0.5)
                )
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

        // 虚线材质
        // let lineMaterial = new Cesium.PolylineDashMaterialProperty({
        //     dashLength: 30,
        //     color: Cesium.Color.RED
        // })

        // 箭头材质
        // let lineMaterial = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)

        // 设置发光飞线效果
        let lineMaterial = new Cesium.PolylineGlowMaterialProperty({
            // 设置发光程度
            glowPower: 0.8,
            // 尾椎缩小程度
            taperPower: 0.7,
            color: Cesium.Color.RED
        })
        // 折线
        viewer.entities.add({
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
                width: 20,
                material: lineMaterial
            }
        })

        // 1 屏幕坐标系统，二维笛卡尔坐标系，Cartesian2类型
        // 2 地理坐标系统，WGS-84坐标系，Cartographic类型
        // 3 笛卡尔空间直角坐标系，Cartesian3类型

        // 角度与弧度的转换
        // const radians = Cesium.Math.toRadians(90)
        // console.log(radians)
        // // 弧度转角度
        // const degrees = Cesium.Math.toDegrees(2 * Math.PI)
        // console.log(degrees)
        // // 将经纬度转为笛卡尔坐标
        // const cartesian3 = Cesium.Cartesian3.fromDegrees(89.5, 20.4, 100)
        // console.log(cartesian3)
        // // 将笛卡尔坐标转为经纬度
        // const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
        // console.log(cartographic)

        // const position2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000)

        // 生成position是天安门位置
        // const position = Cesium.Cartesian3.fromDegrees(
        //     116.397428,
        //     39.90923,
        //     100
        // )
        // viewer.camera.setView({
        //     // 指定相机位置
        //     destination: position,
        //     orientation: {
        //         // 指定相机的朝向
        //         heading: Cesium.Math.toRadians(0),
        //         // 指定相机的俯仰角，0度竖直向上，-90向下
        //         pitch: Cesium.Math.toRadians(-90),
        //         // 指定相机的滚转角
        //         roll: 0
        //     }
        // })

        // viewer.camera.flyTo({
        //     destination: position2,
        //     orientation: {
        //         heading: Cesium.Math.toRadians(0),
        //         pitch: Cesium.Math.toRadians(-90),
        //         roll: 0
        //     }
        // })

        document.addEventListener('keydown', controls)
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', controls)
    })

    const controls = (e) => {
        // 获取相机离地面的高度
        const height = viewer.camera.positionCartographic.height
        const moveRate = height / 100
        if (e.key === 'w') {
            // 设置相机向前移动
            viewer.camera.moveForward(moveRate)
        } else if (e.key === 's') {
            // 设置相机向后移动
            viewer.camera.moveBackward(moveRate)
        } else if (e.key === 'a') {
            // 设置相机向左移动
            viewer.camera.moveLeft(moveRate)
        } else if (e.key === 'd') {
            // 设置相机向右移动
            viewer.camera.moveRight(moveRate)
        } else if (e.key === 'q') {
            // 设置相机向左旋转
            viewer.camera.lookLeft(Cesium.Math.toRadians(0.1))
        } else if (e.key === 'e') {
            // 设置相机向右旋转
            viewer.camera.lookRight(Cesium.Math.toRadians(0.1))
        } else if (e.key === 'r') {
            // 设置相机向上旋转
            viewer.camera.lookUp(Cesium.Math.toRadians(0.1))
        } else if (e.key === 'f') {
            // 设置相机向下旋转
            viewer.camera.lookDown(Cesium.Math.toRadians(0.1))
        } else if (e.key === 'g') {
            // 设置向左逆时针翻滚
            viewer.camera.twistLeft(Cesium.Math.toRadians(0.1))
        } else if (e.key === 'h') {
            // 设置向右顺时针翻滚
            viewer.camera.twistRight(Cesium.Math.toRadians(0.1))
        }
    }
</script>

<style scoped lang="scss">
    #cesiumContainer {
        width: 100vw;
        height: 100vh;
    }
</style>
