<template>
    <Map ref="mapRef"></Map>
</template>

<script lang="ts" setup>
    import Map from '@/components/myMap/index.vue'

    const mapRef = ref()

    let map: AMap.Map
    onMounted(async () => {
        map = await mapRef.value.initMap()
    })
</script>

<style scoped lang="scss"></style>
