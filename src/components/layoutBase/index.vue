<template>
    <div class="layoutBase">
        <Header></Header>
        <div class="bottom">
            <Sidebar></Sidebar>
            <Connect></Connect>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Header from './components/header/Header.vue'
    import Sidebar from './components/sidebar/Sidebar.vue'
    import Connect from './components/content/Content.vue'
</script>

<style lang="scss" scoped>
    .layoutBase {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .bottom {
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: row;
        }
    }
</style>
