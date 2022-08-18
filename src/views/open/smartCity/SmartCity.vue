<template>
    <Scene></Scene>
    <BigScreen :data-info="dataInfo" :event-list='eventList'></BigScreen>
</template>

<script lang="ts" setup>
    import gsap from 'gsap'
    import Scene from '@/views/open/smartCity/components/Scene.vue'
    import BigScreen from '@/views/open/smartCity/components/BigScreen.vue'

    import {
        getSmartCityEvent,
        getSmartCityInfo
    } from '@/api/open/smartCityApi'

    onMounted(() => {
        getInfo()
        setInterval(() => {
            getInfo()
        },5000)
        getEvent()
    })

    const dataInfo = reactive({
        iot: { number: 0, name: '', unit: '' },
        event: { number: 0, name: '', unit: '' },
        power: { number: 0, name: '', unit: '' },
        test: { number: 0, name: '', unit: '' }
    })
    const getInfo = async () => {
        const res = await getSmartCityInfo()
        for (let key in dataInfo) {
            dataInfo[key].name = res.data[key].name
            dataInfo[key].unit = res.data[key].unit
            gsap.to(dataInfo[key], {
                number: res.data[key].number,
                duration: 1
            })
        }
    }

    const eventList = ref([])
    const getEvent = async () => {
        const res = await getSmartCityEvent()
        eventList.value = res.data
        console.log(eventList.value)
    }
</script>

<style lang="scss" scoped></style>
