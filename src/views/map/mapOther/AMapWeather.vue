<template>
	<div class="container">
		<div class="btn">
			{{ info }}
		</div>
		<div id="map" class="map"></div>
	</div>
</template>

<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader"

const map = shallowRef<AMap.Map>()
const Map = shallowRef()
let info: any = ref([])

onMounted(() => {
	initMap()
})

const initMap = () => {
	AMapLoader.load({
		key: "cb7590d4af790e30ab7f2e51d9778391",
		version: "2.0",
		plugins: ["AMap.Weather"]
	})
		.then(AMap => {
			Map.value = AMap
			map.value = new AMap.Map("map", {
				resizeEnable: true,
				center: [116.486409, 39.921489],
				zoom: 12
			})

			let weather = new AMap.Weather()
			weather.getLive("朝阳区", function (err, data) {
				if (!err) {
					let str: any = []
					str.push("<h4 >实时天气" + "</h4><hr>")
					str.push("<p>城市/区：" + data.city + "</p>")
					str.push("<p>天气：" + data.weather + "</p>")
					str.push("<p>温度：" + data.temperature + "℃</p>")
					str.push("<p>风向：" + data.windDirection + "</p>")
					str.push("<p>风力：" + data.windPower + " 级</p>")
					str.push("<p>空气湿度：" + data.humidity + "</p>")
					str.push("<p>发布时间：" + data.reportTime + "</p>")
					if (!map.value) {
						return
					}
					let marker = new AMap.Marker({
						map: map.value,
						position: map.value.getCenter()
					})
					let infoWin = new AMap.InfoWindow({
						content:
							'<div class="info" style="position:inherit;margin-bottom:0;">' + str.join("") + '</div><div class="sharp"></div>',
						isCustom: true,
						offset: new AMap.Pixel(0, -37)
					})
					infoWin.open(map.value, marker.getPosition())
				}
			})

			weather.getForecast("朝阳区", function (err, data) {
				if (err) {
					return
				}
				for (let i = 0, dayWeather; i < data.forecasts.length; i++) {
					dayWeather = data.forecasts[i]
					info.value.push(dayWeather)
				}
				console.log(info.value)
			})
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

::v-deep(.info) {
	height: 10rem;
	width: 10rem;
	background-color: white;
	box-shadow: 2px 2px 3px rgba(114, 124, 245, 0.5);
	position: inherit;
	font-size: 12px;
}
</style>
