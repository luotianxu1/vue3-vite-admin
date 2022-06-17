<template>
    <el-config-provider
        :z-index="3000"
        :locale="localLanguage"
        :message="config"
        :size="size"
    >
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
    import { GlobalStore } from '@/store'
    import zhCn from 'element-plus/lib/locale/lang/zh-cn'
    import en from 'element-plus/lib/locale/lang/en'

    const globalStore = GlobalStore()
    const localLanguage = computed((): any => {
        if (globalStore.SYSTEM_LANGUAGE && globalStore.SYSTEM_LANGUAGE === 'zh') { return zhCn }
        if (globalStore.SYSTEM_LANGUAGE === 'en') { return en }
        return ''
    })

    const config = reactive({
        max: 3
    })

    const size = ref<'large' | 'default' | 'small'>('default')
</script>

<style></style>
