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
        <div class="sidebarBox" @click="changAside">
            <MyIcon
                :icon="isCollapse ? 'xiangyou' : 'xiangzuo'"
                :font="14"
            ></MyIcon>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { Key } from '@/store'
    import { computed } from 'vue'

    const store = useStore(Key)
    const isCollapse = computed(() => store.state.system?.SYSTEM_COLLAPSE)

    const changAside = () => {
        store.commit('system/SET_SYSTEM_COLLAPSE', !isCollapse.value)
    }
</script>

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

        .sidebarBox {
            width: 10px;
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            cursor: pointer;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #dadbe0;
        }
    }
</style>
