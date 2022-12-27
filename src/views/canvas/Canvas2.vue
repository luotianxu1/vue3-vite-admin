<template>
    <div class="main">
        <div id="ggk">{{ ggkDiv }}</div>
        <canvas id="c1" width="600" height="400"></canvas>
    </div>
</template>

<script setup lang="ts">
    import { GlobalStore } from '@/store/modules/global'

    let ggkDiv = ''
    let random = Math.random()
    if (random < 0.1) {
        ggkDiv = '恭喜你中奖了'
    } else {
        ggkDiv = '谢谢惠顾'
    }

    const globalStore = GlobalStore()
    const width = computed(() => {
        if (globalStore.SYSTEM_COLLAPSE) {
            return 24
        }
        return 200
    })

    let isDraw = false
    onMounted(() => {
        let c1 = document.getElementById('c1') as HTMLCanvasElement
        let ctx = c1.getContext('2d')
        if (!ctx) {
            return
        }
        let img = new Image()
        img.src = './textures/bg/25s.jpg'
        img.onload = function () {
            if (!ctx) {
                return
            }
            ctx.drawImage(img, 0, 0, 600, 400)
        }

        c1.onmousedown = function () {
            isDraw = true
        }

        c1.onmouseup = function () {
            isDraw = false
        }

        c1.onmousemove = function (e) {
            if (isDraw && ctx) {
                let x = e.pageX - width.value
                let y = e.pageY - 90
                ctx.globalCompositeOperation = 'destination-out'
                ctx.arc(x, y, 20, 0, Math.PI * 2)
                ctx.fill()
            }
        }
    })
</script>

<style scoped lang="scss">
    .main {
        position: relative;

        canvas {
            position: absolute;
            top: 0;
            left: 0;
        }

        #ggk {
            width: 600px;
            height: 400px;
            font-size: 30px;
            font-weight: 900;
            text-align: center;
            line-height: 400px;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
</style>
