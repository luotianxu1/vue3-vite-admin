<template>
    <div class="main">
        <canvas id="c1" width="800" height="600"></canvas>
        <el-button type="primary" @click="boldBtn">粗线条</el-button>
        <el-button type="primary" @click="thinBtn">细线条</el-button>
        <el-button type="primary" @click="saveBtn">保存</el-button>
        <el-button type="primary" @click="clearBtn">橡皮擦</el-button>
        <el-button type="primary" @click="nullBtn">清空画布</el-button>
    </div>
</template>

<script setup lang="ts">
    let c1: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D
    let isDraw = false
    onMounted(() => {
        c1 = document.getElementById('c1') as HTMLCanvasElement
        ctx = c1.getContext('2d') as CanvasRenderingContext2D
        if (!ctx) {
            return
        }
        // 连接处圆润
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        if (!ctx) {
            return
        }

        c1.onmousedown = (e) => {
            isDraw = true
            ctx.beginPath()
            let x = e.pageX - c1.offsetLeft
            let y = e.pageY - c1.offsetTop
            ctx.moveTo(x, y)
        }

        c1.onmouseleave = () => {
            isDraw = false
            ctx.closePath()
        }

        c1.onmouseup = () => {
            isDraw = false
            ctx.closePath()
        }

        c1.onmousemove = (e) => {
            if (isDraw && ctx) {
                let x = e.pageX - c1.offsetLeft
                let y = e.pageY - c1.offsetTop
                ctx.lineTo(x, y)
                ctx.stroke()
            }
        }
    })

    const boldBtn = () => {
        ctx.lineWidth = 20
    }
    const thinBtn = () => {
        ctx.lineWidth = 2
    }
    const saveBtn = () => {
        let urlData = c1.toDataURL()
        let downloadA = document.createElement('a')
        downloadA.setAttribute('download', '签名')
        downloadA.href = urlData
        downloadA.click()
    }
    const clearBtn = () => {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = 30
    }
    const nullBtn = () => {
        ctx.clearRect(0, 0, 800, 600)
    }
</script>

<style scoped lang="scss">
    canvas {
        border: 1px solid #ccc;
    }
</style>
