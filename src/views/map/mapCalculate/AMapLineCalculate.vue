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

			let pos = [116.377904, 39.915423]
			let marker = new AMap.Marker({
				draggable: true,
				position: pos
			})
			map.value.add(marker)
			let path = [
				[116.368904, 39.913423],
				[116.382122, 39.901176],
				[116.387271, 39.912501],
				[116.398258, 39.9046]
			]
			let polyline = new AMap.Polyline({
				path: path,
				strokeColor: "#80d8ff"
			})
			map.value.add(polyline)
			map.value.setFitView([polyline, marker])

			let polyline2 = new AMap.Polyline({
				strokeStyle: "dashed",
				strokeColor: "blue",
				strokeWeight: 2
			})
			map.value.add(polyline2)
			let text = new AMap.Text({
				text: "",
				style: {
					"background-color": "#ccccff",
					"border-color": "green",
					"font-size": "12px"
				}
			})
			map.value.add(text)
			let marker2 = new AMap.Marker({
				icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
				offset: new AMap.Pixel(-9, -31)
			})
			map.value.add(marker2)

			// 计算
			let data = marker.getPosition()
			let closestPositionOnLine = AMap.GeometryUtil.closestOnLine(data, path)
			marker2.setPosition(closestPositionOnLine)
			// 设置label标签
			marker2.setLabel({
				direction: "",
				offset: new AMap.Pixel(5, 0),
				content: "折线上离蓝色点最近的点"
			})
			polyline2.setPath([data, closestPositionOnLine])

			let distance = Math.round(AMap.GeometryUtil.distanceToLine(data, path))
			let textPos = [(data.lng + closestPositionOnLine[0]) / 2, (data.lat + closestPositionOnLine[1]) / 2]

			text.setPosition(textPos)
			text.setText("点线距离" + distance + "米")
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
