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
    import zhCn from 'element-plus/lib/locale/lang/zh-cn'
    import en from 'element-plus/lib/locale/lang/en'
    import { useStore } from 'vuex'
    import { Key } from '@/store'

    const store = useStore(Key)
    const languages = computed(() => store.state.system?.SYSTEM_LANGUAGE)
    const localLanguage = computed(() => {
        switch (languages.value) {
            case 'en':
                return en
            case 'zh':
                return zhCn
            default:
                return zhCn
        }
    })

    const config = reactive({
        max: 3
    })

    const size = ref<'large' | 'default' | 'small'>('default')
</script>

<style></style>
