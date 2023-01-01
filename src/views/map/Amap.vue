<template>
	<Map ref="mapRef"></Map>
</template>

<script lang="ts" setup>
import Map from "@/components/myMap/index.vue"

const mapRef = ref()

let map: AMap.Map
onMounted(async () => {
	map = await mapRef.value.initMap()
	console.log(map)
})
</script>

<style scoped lang="scss"></style>
