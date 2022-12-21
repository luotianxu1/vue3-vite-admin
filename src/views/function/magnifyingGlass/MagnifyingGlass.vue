<template>
    <div class="wrapper">
        <MyMagifier
            :link="state.link"
            :blank="state.blank"
            :img-url="state.imgUrl"
            :img-width="state.imgWidth"
            :img-height="state.imgHeight"
            :mag-width="state.magWidth"
            :mag-height="state.magHeight"
        ></MyMagifier>
    </div>
</template>

<script lang="ts" setup>
    const state = reactive({
        imgUrl: '',
        blank: true,
        link: 'https://www.baidu.com',
        imgWidth: 375,
        imgHeight: 481,
        magWidth: 150,
        magHeight: 100
    })
</script>

<style scoped lang="scss">
    .wrapper {
        margin: 100px auto;
    }
</style>
