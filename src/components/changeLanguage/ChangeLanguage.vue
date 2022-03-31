<template>
    <div class="changeLanguage">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <el-tooltip content="语言" placement="right" effect="light">
                    <i class="iconfont duoyuyan"></i>
                </el-tooltip>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="item in options"
                        :key="item.value"
                        :command="item.value"
                    >
                        {{ item.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
    import { shallowReadonly } from 'vue'
    import useCurrentInstance from '@/utils/useCurrentInstance'
    import { useStore } from 'vuex'
    import { Key } from '@/store'

    const store = useStore(Key)
    const { proxy } = useCurrentInstance()
    const options = shallowReadonly([
        {
            value: 'zh',
            label: '汉语'
        },
        {
            value: 'en',
            label: 'English'
        }
    ])

    const handleCommand = (command: string | number | object) => {
        selectLanguage(command)
    }

    function selectLanguage(val) {
        store.commit('system/SET_SYSTEM_LANGUAGE', val) // 存储
        proxy.$I18n.global.locale = val
    }
</script>

<style scoped lang="scss">
    .changeLanguage {
        cursor: pointer;
    }
</style>
