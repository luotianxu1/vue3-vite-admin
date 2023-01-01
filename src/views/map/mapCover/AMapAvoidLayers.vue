<template>
	<div class="container">
		<div class="btn">
			<el-select v-model="allowCollision" class="m-2" placeholder="Select" size="large" @change="change">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>
		<div id="map" class="map"></div>
	</div>
</template>

<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader"
import "@amap/amap-jsapi-types"

const map = shallowRef<AMap.Map>()
const Map = shallowRef()

onMounted(() => {
	initMap()
})

const icon = {
	type: "image",
	image: "https://a.amap.com/jsapi_demos/static/demo-center/marker/express2.png",
	size: [64, 30],
	anchor: "center"
}
const textStyle = {
	fontSize: 12,
	fontWeight: "normal",
	fillColor: "#22886f",
	strokeColor: "#fff",
	strokeWidth: 2,
	fold: true,
	padding: "2, 5"
}
const LabelsData: any = [
	{
		name: "自提点1",
		position: [116.461009, 39.991443],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 10,
		fold: true,
		icon,
		text: {
			// 要展示的文字内容
			content: "中邮速递易",
			// 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
			direction: "right",
			// 在 direction 基础上的偏移量
			offset: [-20, -5],
			// 文字样式
			style: {
				// 字体大小
				fontSize: 12,
				// 字体颜色
				fillColor: "#22886f",
				//
				strokeColor: "#fff",
				strokeWidth: 2,
				fold: true,
				padding: "2, 5"
			}
		}
	},
	{
		name: "自提点2",
		position: [116.466994, 39.984904],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 16,
		icon,
		text: {
			content: "丰巢快递柜-花家地北里",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	},
	{
		name: "自提点3",
		position: [116.472914, 39.987093],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 8,
		icon,
		text: {
			content: "丰巢快递柜-中环南路11号院",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	},
	{
		name: "自提点4",
		position: [116.471814, 39.995856],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 23,
		icon,
		text: {
			content: "丰巢快递柜-合生麒麟社",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	},
	{
		name: "自提点5",
		position: [116.469639, 39.986889],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 6,
		icon,
		text: {
			content: "速递易快递柜-望京大厦",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	},
	{
		name: "自提点6",
		position: [116.467361, 39.996361],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 5,
		icon,
		text: {
			content: "E栈快递柜-夏都家园",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	},
	{
		name: "自提点7",
		position: [116.462327, 39.996071],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 4,
		icon,
		text: {
			content: "丰巢自提柜-圣馨大地家园",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	},
	{
		name: "自提点8",
		position: [116.462349, 39.996067],
		zooms: [10, 20],
		opacity: 1,
		zIndex: 3,
		icon,
		text: {
			content: "丰巢快递-圣馨大地家园",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	},
	{
		name: "自提点9",
		position: [116.456474, 39.991563],
		zooms: [10, 20],
		zIndex: 2,
		opacity: 1,
		icon,
		text: {
			content: "E栈快递柜-南湖渠西里",
			direction: "right",
			offset: [-20, -5],
			style: textStyle
		}
	}
]

const markers: any = []
const allowCollision = ref(true)
let layer
const initMap = () => {
	AMapLoader.load({
		key: "cb7590d4af790e30ab7f2e51d9778391",
		version: "2.0"
	})
		.then(AMap => {
			Map.value = AMap
			map.value = new AMap.Map("map", {
				zoom: 15.8,
				center: [116.469881, 39.993599],
				showIndoorMap: false
			})

			layer = new AMap.LabelsLayer({
				zooms: [3, 20],
				zIndex: 1000,
				// collision: false,
				// 设置 allowCollision：true，可以让标注避让用户的标注
				allowCollision: true
			})
			layer.add(markers)
			if (map.value) {
				map.value.add(layer)
			}

			// 初始化 labelMarker
			for (let i = 0; i < LabelsData.length; i++) {
				let curData = LabelsData[i]
				curData.extData = {
					index: i
				}

				let labelMarker = new AMap.LabelMarker(curData)

				if (labelMarker) {
					markers.push(labelMarker)
				}
			}
			// 将 marker 添加到图层
			layer.add(markers)
		})
		.catch(e => {
			console.log(e)
		})
}

const options = [
	{
		value: true,
		label: "标注避让图层"
	},
	{
		value: false,
		label: "标注不避让图层"
	}
]

const change = () => {
	layer.setAllowCollision(allowCollision.value)
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
