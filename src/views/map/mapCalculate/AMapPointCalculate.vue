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
			let m1 = new AMap.Marker({
				map: map.value,
				draggable: true,
				position: new AMap.LngLat(116.368904, 39.923423)
			})
			let m2 = new AMap.Marker({
				map: map.value,
				draggable: true,
				position: new AMap.LngLat(116.387271, 39.922501)
			})
			map.value.setFitView([m1, m2])

			let line = new AMap.Polyline({
				strokeColor: "#80d8ff",
				isOutline: true,
				outlineColor: "white"
			})
			line.setMap(map.value)
			let text = new AMap.Text({
				text: "",
				style: {
					"background-color": "#29b6f6",
					"border-color": "#e1f5fe",
					"font-size": "12px"
				}
			})
			text.setMap(map.value)

			let p1 = m1.getPosition()
			let p2 = m2.getPosition()
			let textPos = p1.divideBy(2).add(p2.divideBy(2))
			let distance = Math.round(p1.distance(p2))
			let path = [p1, p2]
			line.setPath(path)
			text.setText("两点相距" + distance + "米")
			text.setPosition(textPos)
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
