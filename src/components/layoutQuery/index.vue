<template>
    <div
        v-loading.fullscreen.lock="props.loading"
        element-loading-text="加载中..."
        class="layout"
    >
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
            default: () => {
                return false
            }
        }
    })

    // const set = () => {
    //     let canvas = document.createElement('canvas')
    //     canvas.width = 300
    //     canvas.height = 200
    //     canvas.style.display = 'none'
    //     let ctx = canvas.getContext('2d')
    //     ctx.font = '16px Microsoft JhengHei'
    //     ctx.fillStyle = 'raga(0,0,0,.3)'
    //     ctx.rotate(-0.3)
    //     ctx.fillText('罗天旭', canvas.width / 8, canvas.height / 4)
    //     let img = canvas.toDataURL('img/png')
    //     main.value.setAttribute('style', `background-image:url(${img});z-index:999999`)
    // }
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
