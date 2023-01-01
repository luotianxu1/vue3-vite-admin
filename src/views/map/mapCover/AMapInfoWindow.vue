<template>
	<div class="container">
		<div class="btn">
			<el-select v-model="anchor" class="m-2" placeholder="Select" size="large" @change="change">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>
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

let infoWindow
const initMap = () => {
	AMapLoader.load({
		key: "cb7590d4af790e30ab7f2e51d9778391",
		version: "2.0"
	})
		.then(AMap => {
			Map.value = AMap
			map.value = new AMap.Map("map", {
				center: [116.402023, 39.906977],
				zoom: 13,
				viewMode: "3D"
			})

			infoWindow = new AMap.InfoWindow({
				anchor: "top-left",
				content: "这是信息窗体！这是信息窗体！"
			})
			infoWindow.open(map.value, [116.401337, 39.907886])
			new AMap.Marker({
				position: [116.401337, 39.907886],
				map: map.value
			})
		})
		.catch(e => {
			console.log(e)
		})
}

const anchor = ref("top-left")
const options = [
	{
		value: "top-left",
		label: "top-left"
	},
	{
		value: "top-center",
		label: "top-center"
	},
	{
		value: "top-right",
		label: "top-right"
	},
	{
		value: "middle-left",
		label: "middle-left"
	},
	{
		value: "center",
		label: "center"
	},
	{
		value: "middle-right",
		label: "middle-right"
	},
	{
		value: "bottom-left",
		label: "bottom-left"
	},
	{
		value: "bottom-center",
		label: "bottom-center"
	},
	{
		value: "bottom-right",
		label: "bottom-right"
	}
]
const change = () => {
	infoWindow.setAnchor(anchor.value)
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
		width: 200px;
		padding: 10px;
		display: flex;
		flex-direction: column;

		.el-button {
			margin: 0 0 5px 0;
		}
	}
}
</style>
