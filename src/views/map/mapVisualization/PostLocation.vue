<template>
	<div class="container">
		<div id="map" class="map"></div>
	</div>
</template>

<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader"

const map = shallowRef<AMap.Map>()
const Map = shallowRef()

onMounted(() => {
	initMap()
})

const initMap = () => {
	AMapLoader.load({
		key: "cb7590d4af790e30ab7f2e51d9778391",
		version: "2.0",
		AMapUI: {
			// 是否加载 AMapUI，缺省不加载
			version: "1.1", // AMapUI 缺省 1.1
			plugins: ["overlay/SimpleMarker"] // 需要加载的 AMapUI ui插件
		},
		Loca: {
			version: "2.0.0" // Loca 版本，缺省 1.3.2
		}
	})
		.then(AMap => {
			Map.value = AMap
			map.value = new AMap.Map("map", {
				zoom: 11.7,
				center: [113.97199630737305, 22.5807295363949],
				pitch: 40,
				showLabel: false,
				mapStyle: "amap://styles/dark"
			})
			if (!map.value) {
				return
			}
			let loca = new Loca.Container({
				map: map.value
			})

			// 蓝色普通点
			let geo = new Loca.GeoJSONSource({
				url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road.json"
			})
			let scatter = new Loca.ScatterLayer({
				zIndex: 111,
				opacity: 1,
				visible: true,
				zooms: [2, 22]
			})
			scatter.setSource(geo)
			scatter.setStyle({
				color: "rgba(43,156,75,1)",
				unit: "meter",
				size: [150, 150],
				borderWidth: 0
			})
			loca.add(scatter)

			// 红色呼吸点
			let geoLevelF = new Loca.GeoJSONSource({
				url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_F.json"
			})
			let breathRed = new Loca.ScatterLayer({
				loca,
				zIndex: 113,
				opacity: 1,
				visible: true,
				zooms: [2, 22]
			})
			breathRed.setSource(geoLevelF)
			breathRed.setStyle({
				unit: "meter",
				size: [2600, 2600],
				borderWidth: 0,
				texture: "https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png",
				duration: 500,
				animate: true
			})

			// 黄色呼吸点
			let geoLevelE = new Loca.GeoJSONSource({
				url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_E.json"
			})
			let breathYellow = new Loca.ScatterLayer({
				loca,
				zIndex: 112,
				opacity: 1,
				visible: true,
				zooms: [2, 22]
			})
			breathYellow.setSource(geoLevelE)
			breathYellow.setStyle({
				unit: "meter",
				size: [1000, 1000],
				borderWidth: 0,
				texture: "https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png",
				duration: 1000,
				animate: true
			})
			loca.animate.start()
		})
		.catch(e => {
			console.log(e)
		})
}
</script>

<style lang="scss" scoped>
.container {
	height: 100%;
	width: 100%;
	display: flex;

	.map {
		height: 100%;
		width: 100%;
	}

	.btn {
		width: 320px;
		padding: 10px;
		display: flex;
		flex-direction: column;

		.el-button {
			margin: 0 0 5px 0;
		}
	}
}
</style>
