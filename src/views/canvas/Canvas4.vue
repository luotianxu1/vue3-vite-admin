<template>
    <div class="main">
        <canvas id="c1" width="800" height="600"></canvas>
    </div>
</template>

<script setup lang="ts">
    let c1: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D
    onMounted(() => {
        c1 = document.getElementById('c1') as HTMLCanvasElement
        ctx = c1.getContext('2d') as CanvasRenderingContext2D

        const render = () => {
            if (!ctx) {
                return
            }
            ctx.clearRect(0, 0, 800, 600)
            ctx.save()
            ctx.translate(400, 300)
            ctx.rotate(-Math.PI / 2)
            ctx.save()
            // 绘制小时的刻度
            for (let i = 0; i < 12; i++) {
                ctx.beginPath()
                ctx.moveTo(170, 0)
                ctx.lineTo(190, 0)
                ctx.lineWidth = 8
                ctx.strokeStyle = 'gray'
                ctx.stroke()
                ctx.closePath()
                ctx.rotate((2 * Math.PI) / 12)
            }
            ctx.restore()
            ctx.save()
            for (let i = 0; i < 60; i++) {
                ctx.beginPath()
                ctx.moveTo(180, 0)
                ctx.lineTo(190, 0)
                ctx.lineWidth = 2
                ctx.strokeStyle = 'gray'
                ctx.stroke()
                ctx.closePath()
                ctx.rotate((2 * Math.PI) / 60)
            }
            ctx.restore()
            ctx.save()

            // 获取当前时间
            let time = new Date()
            let hour = time.getHours()
            let min = time.getMinutes()
            let sec = time.getSeconds()
            hour = hour >= 12 ? hour - 12 : hour

            // 绘制秒针
            ctx.rotate(((2 * Math.PI) / 60) * sec)
            ctx.beginPath()
            ctx.moveTo(-30, 0)
            ctx.lineTo(190, 0)
            ctx.lineWidth = 2
            ctx.strokeStyle = 'red'
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
            ctx.save()

            // 绘制分针
            ctx.rotate(((2 * Math.PI) / 60) * min + ((2 * Math.PI) / 60 / 60) * sec)
            ctx.beginPath()
            ctx.moveTo(-20, 0)
            ctx.lineTo(130, 0)
            ctx.lineWidth = 4
            ctx.strokeStyle = '#999'
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
            ctx.save()

            // 绘制时针
            ctx.rotate(
                ((2 * Math.PI) / 12) * hour +
                    ((2 * Math.PI) / 12 / 60) * min +
                    ((2 * Math.PI) / 12 / 60 / 60) * sec
            )
            ctx.beginPath()
            ctx.moveTo(-15, 0)
            ctx.lineTo(130, 0)
            ctx.lineWidth = 8
            ctx.strokeStyle = '#333'
            ctx.stroke()
            ctx.closePath()
            ctx.restore()

            ctx.restore()

            requestAnimationFrame(render)
        }
        render()
    })
</script>

<style scoped lang="scss">
    canvas {
        border: 1px solid #ccc;
    }
</style>
