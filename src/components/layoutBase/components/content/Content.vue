<template>
    <div class="main">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component
                    :is="Component"
                    :key="$route.name"
                    v-if="$route.meta.keepAlive"
                />
            </keep-alive>
            <component
                :is="Component"
                :key="$route.name"
                v-if="!$route.meta.keepAlive"
            />
        </router-view>
        <div class="sidebarBox" @click="changAside">
            <div class="top box"></div>
            <div class="center">
                <Icon
                    :icon="isCollapse ? 'xiangyou' : 'xiangzuo'"
                    :font="14"
                ></Icon>
            </div>
            <div class="bottom box"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/icon/Icon.vue'
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
        flex-grow: 1;
        overflow: hidden;
        position: relative;

        .sidebarBox {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            cursor: pointer;

            .box {
                width: 10px;
                height: 10px;
                background-color: #dadbe0;
            }

            .top {
                border-top-right-radius: 10px;
            }

            .center {
                width: 10px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #dadbe0;
            }

            .bottom {
                border-bottom-right-radius: 10px;
            }
        }
    }
</style>
