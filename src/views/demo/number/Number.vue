<template>
    <div class="page">
        <div class="counter-container">
            <Icon icon="bilibili" :font="48"></Icon>
            <div ref="counter" class="counter" data-num="500">{{ num }}</div>
            <span>粉丝数</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const counter = ref()
    let num = ref(0)
    onMounted(() => {
        const target = counter.value.dataset.num
        const increnment = Math.round(target / 50)
        let i = 0
        const plus = () => {
            i += increnment
            num.value = i
            if (i < target) {
                requestAnimationFrame(plus)
            } else {
                num.value = i
            }
        }
        plus()
    })
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .counter-container {
            display: flex;
            width: 100px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;

            .counter {
                font-size: 48px;
                letter-spacing: 3px;
            }

            span {
                font-size: 20px;
                letter-spacing: 5px;
            }
        }
    }
</style>
