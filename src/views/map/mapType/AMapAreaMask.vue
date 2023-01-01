<template>
	<div id="container"></div>
</template>
<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader"

onMounted(() => {
	initMap()
})

const initMap = () => {
	AMapLoader.load({
		key: "cb7590d4af790e30ab7f2e51d9778391",
		version: "2.0",
		plugins: ["AMap.DistrictSearch"]
	})
		.then(AMap => {
			const opts = {
				subdistrict: 0,
				extensions: "all",
				level: "city"
			}
			const district = new AMap.DistrictSearch(opts)

			district.search("北京市", function (status, result) {
				const bounds = result.districtList[0].boundaries
				if (!bounds.length) {
					return
				}
				const mask: any[] = []
				for (let i = 0; i < bounds.length; i += 1) {
					mask.push([bounds[i]])
				}
				const map = new AMap.Map("container", {
					mask: mask,
					center: [116.472804, 39.995725],
					viewMode: "3D",
					showLabel: true,
					labelzIndex: 130,
					pitch: 40,
					zoom: 9,
					layers: [
						new AMap.TileLayer.RoadNet({
							//rejectMapMask:true
						}),
						new AMap.TileLayer.Satellite()
					]
				})
				// const maskerIn = new AMap.Marker({
				//     position: [116.501415, 39.926055],
				//     map: map
				// })
				// const maskerOut = new AMap.Marker({//区域外的不会显示
				//     position: [117.001415, 39.926055],
				//     map: map
				// })
				//添加描边
				for (let i = 0; i < bounds.length; i += 1) {
					new AMap.Polyline({
						path: bounds[i],
						strokeColor: "#99ffff",
						strokeWeight: 4,
						map: map
					})
				}
			})
		})
		.catch(e => {
			console.log(e)
		})
}
</script>
<style lang="scss" scoped>
#container {
	height: 100%;
	width: 100%;
	padding: 0;
	margin: 0;
}
</style>
