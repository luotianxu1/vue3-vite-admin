<template>
    <div class="main">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <transition appear name="fade-transform" mode="out-in">
                    <component
                        :is="Component"
                        v-if="$route.meta.keepAlive"
                        :key="$route.name"
                    />
                </transition>
            </keep-alive>
            <transition appear name="fade-transform" mode="out-in">
                <component
                    :is="Component"
                    v-if="!$route.meta.keepAlive"
                    :key="$route.name"
                />
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .main {
        height: 100%;
        &::-webkit-scrollbar {
            background-color: white;
        }
    }

    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 0.2s;
    }
    .fade-transform-enter-from {
        opacity: 0;
        transition: all 0.2s;
        transform: translateX(-30px);
    }
    .fade-transform-leave-to {
        opacity: 0;
        transition: all 0.2s;
        transform: translateX(30px);
    }
</style>
