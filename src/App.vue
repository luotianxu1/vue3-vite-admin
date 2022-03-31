<template>
    <el-config-provider
        size="small"
        :z-index="3000"
        :locale="localLanguage"
        :message="config"
    >
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
    import { computed, reactive } from 'vue'
    import zhCn from 'element-plus/lib/locale/lang/zh-cn'
    import en from 'element-plus/lib/locale/lang/en'
    import { useStore } from 'vuex'
    import { Key } from '@/store'
    import useCurrentInstance from '@/utils/useCurrentInstance'

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
    const { proxy } = useCurrentInstance()
    proxy.$I18n.global.locale = languages.value

    const config = reactive({
        max: 3
    })
</script>

<style></style>
