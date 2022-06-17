<template>
    <div class="main">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component
                    :is="Component"
                    v-if="$route.meta.keepAlive"
                    :key="$route.name"
                />
            </keep-alive>
            <component
                :is="Component"
                v-if="!$route.meta.keepAlive"
                :key="$route.name"
            />
        </router-view>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .main {
        height: 100%;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        overflow: auto;
        overflow-x: hidden !important;
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

        &::-webkit-scrollbar {
            background-color: white;
        }
    }
</style>
