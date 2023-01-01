<template>
	<div class="container">
		<div id="map" class="map"></div>
	</div>
</template>

<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader"

const map = shallowRef<AMap.Map>()
const Map = shallowRef()
let marker
let polyline
let path = [
	[116.368904, 39.913423],
	[116.382122, 39.901176],
	[116.387271, 39.912501],
	[116.398258, 39.9046]
]
onMounted(() => {
	initMap()
})

const initMap = () => {
	AMapLoader.load({
		key: "cb7590d4af790e30ab7f2e51d9778391",
		version: "2.0"
	})
		.then(AMap => {
			Map.value = AMap
			map.value = new AMap.Map("map", {
				resizeEnable: true,
				zoom: 13 //地图显示的缩放级别
			})
			if (!map.value) {
				return
			}
			polyline = new AMap.Polyline({
				map: map.value,
				path: path,
				strokeColor: "#80d8ff",
				strokeWeight: 5
			})

			// 创建marker
			marker = new AMap.Marker({
				map: map.value,
				draggable: true,
				position: [116.377904, 39.915423]
			})
			pointOnSegment()
			map.value.setFitView([polyline, marker])
			marker.on("dragging", pointOnSegment)
		})
		.catch(e => {
			console.log(e)
		})
}

const pointOnSegment = () => {
	if (!map.value) {
		return
	}
	let pos = marker.getPosition()
	// mp = getResolution() 获取指定位置的地图分辨率，单位：米/像素
	let mp = map.value.getResolution()
	// m 为Polyline宽度的米数
	let m = 5 * mp
	// 判断 marker 是否在线段上，最后一个参数为 m米 的误差
	let inLine = Map.value.GeometryUtil.isPointOnSegment(pos, path[0], path[1], m)
	let text = "点不在第一条线段上"
	if (inLine) {
		text = "点在第一条线段上"
	}
	marker.setLabel({
		direction: "",
		offset: new Map.value.Pixel(20, 20),
		content: text
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
