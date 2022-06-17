<template>
    <div class='header'>
        <BreadCrumb class='item'></BreadCrumb>
        <div class='right'>
            <Info class='item'></Info>
            <ScreenFull class='item'></ScreenFull>
            <ChangeLanguage class='item'></ChangeLanguage>
            <Setting class='item'></Setting>
            <Avatar class='item'></Avatar>
        </div>
    </div>
</template>

<script lang='ts' setup>
    import Avatar from './components/Avatar.vue'
    import Info from './components/Info.vue'
    import Setting from './components/Setting.vue'
    import ScreenFull from './components/Screenfull.vue'
    import BreadCrumb from './components/BreadCrumb.vue'
</script>

<style lang='scss' scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        width: 100%;
        padding: 0 10px;
        border-bottom: 1px solid #e4e4e4;
        flex-shrink: 0;

        .right {
            display: flex;
            align-items: center;

            .item {
                padding: 0 10px;
                cursor: pointer;
            }
        }
    }
</style>
