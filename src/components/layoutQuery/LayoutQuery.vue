<template>
    <div v-loading.fullscreen.lock="props.loading" element-loading-text="加载中..." class="layout">
        <div class="query">
            <div class="fl">
                <slot name="fl"></slot>
            </div>
            <div class="fr">
                <slot name="fr"></slot>
            </div>
        </div>
        <div class="table">
            <slot name="table"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        loading: {
            required: false,
            type: Boolean,
            default: false
        }
    })
</script>

<style scoped lang="scss">
    .layout {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px 10px 0 10px;
        overflow: hidden;

        .query {
            display: block;
            padding-bottom: 5px;

            .fl {
                float: left;
                display: flex;
                align-items: center;
            }

            .fr {
                float: right;
                display: flex;
                align-items: center;
            }
        }

        .table {
            position: relative;
            flex-grow: 1;
            overflow: auto;
            height: 100%;
        }

        .footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
</style>
