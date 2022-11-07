<template>
    <canvas id="c1" width="600" height="400"></canvas>
</template>

<script setup lang="ts">
    onMounted(() => {
        let c1 = document.getElementById('c1') as HTMLCanvasElement
        let ctx = c1.getContext('2d')
        if (!ctx) {
            return
        }
        // 绘制矩形
        // ctx.fillRect(100, 200, 300, 300)
        // 拆开写
        // ctx.rect(100, 200, 300, 300)
        // ctx.fill()

        // 路径绘制矩形
        // ctx.strokeRect(100, 100, 200, 100)
        // 拆开写
        // ctx.rect(100, 100, 200, 100)
        // ctx.stroke()

        // 路径分段
        ctx.beginPath()
        ctx.rect(100, 100, 200, 100)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(200, 150, 200, 100)
        ctx.stroke()
        ctx.closePath()

        // 清除
        let height = 0
        let t1 = setInterval(() => {
            height++
            if (!ctx) {
                return
            }
            ctx.clearRect(0, 0, c1.clientWidth, height)
            if (height > c1.clientHeight) {
                clearInterval(t1)
            }
        }, 10)
    })
</script>

<style scoped lang="scss"></style>
