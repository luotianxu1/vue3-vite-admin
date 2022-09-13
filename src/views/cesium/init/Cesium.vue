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

    // 生成position是天安门位置
    // const position = Cesium.Cartesian3.fromDegrees(
    //     116.397428,
    //     39.90923,
    //     100
    // )
    const position2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000)

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
            imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211',
                layer: 'tdtBasicLayer',
                style: 'default',
                format: 'image/jpeg',
                tileMatrixSetID: 'GoogleMapsCompatible'
            })
            // OSM地图,
            // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
            //     url: 'https://a.tile.openstreetmap.org/'
            // })
            // 高德矢量地图,
            // imageryProvider: new Cesium.UrlTemplateI mageryProvider({
            //     url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
            // })
        })

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
                image: './texture/gzt.png',
                width: 50,
                height: 50,
                // 设置广告牌的显示位置
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                // 设置广告牌的显示位置
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER
            }
        })

        // 1 屏幕坐标系统，二维笛卡尔坐标系，Cartesian2类型
        // 2 地理坐标系统，WGS-84坐标系，Cartographic类型
        // 3 笛卡尔空间执教坐标系，Cartesian3类型

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

        // 设置图层叠加
        // const imageryLayers = viewer.imageryLayers
        // const layer = imageryLayers.addImageryProvider(
        //     new Cesium.UrlTemplateImageryProvider({
        //         url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        //     })
        // )
        // layer.alpha = 0.5

        // viewer.camera.setView({
        //     // 指定相机位置
        //     destination: position,
        //     orientation: {
        //         // 指定相机的朝向
        //         heading: Cesium.Math.toRadians(0),
        //         // 指定相机的俯仰角
        //         pitch: Cesium.Math.toRadians(-90),
        //         // 指定相机的滚转角
        //         roll: 0
        //     }
        // })
        viewer.camera.flyTo({
            destination: position2,
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-90),
                roll: 0
            }
        })

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
