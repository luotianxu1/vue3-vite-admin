<template>
    <canvas id="c1" width="600" height="400"></canvas>
    <!-- <video
        id="video"
        src="../../../public/video/arrow.mp4"
        style="width: 200px; height: 200px"
        controls
    ></video>
    <button id="btn">播放</button> -->
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
        // ctx.beginPath()
        // ctx.rect(100, 100, 200, 100)
        // ctx.fill()
        // ctx.closePath()
        // ctx.beginPath()
        // ctx.rect(200, 150, 200, 100)
        // ctx.stroke()
        // ctx.closePath()

        // 笑脸
        // ctx.beginPath()
        // ctx.arc(75, 75, 50, 0, Math.PI * 2)
        // ctx.moveTo(110, 75)
        // ctx.arc(75, 75, 35, 0, Math.PI)
        // ctx.moveTo(65, 65)
        // ctx.arc(60, 65, 5, 0, Math.PI * 2)
        // ctx.moveTo(95, 65)
        // ctx.arc(90, 65, 5, 0, Math.PI * 2)
        // ctx.closePath()
        // ctx.stroke()

        // 三角形
        // ctx.beginPath()
        // ctx.moveTo(300, 200)
        // ctx.lineTo(350, 250)
        // ctx.lineTo(350, 200)
        // ctx.lineTo(300, 200)
        // ctx.stroke()
        // ctx.closePath()

        // 圆弧
        // ctx.beginPath()
        // // 第一个点
        // ctx.moveTo(300, 200)
        // // 第二个点和圆弧半径
        // ctx.arcTo(300, 250, 250, 250, 50)
        // ctx.stroke()
        // ctx.closePath()

        // 聊天气泡框
        // ctx.beginPath()
        // ctx.moveTo(200, 300)
        // ctx.quadraticCurveTo(150, 300, 150, 200)
        // ctx.quadraticCurveTo(150, 100, 300, 100)
        // ctx.quadraticCurveTo(450, 100, 450, 200)
        // ctx.quadraticCurveTo(450, 300, 250, 300)
        // ctx.quadraticCurveTo(250, 350, 150, 350)
        // ctx.quadraticCurveTo(200, 350, 200, 300)
        // ctx.stroke()
        // ctx.closePath()

        // 爱心
        // ctx.beginPath()
        // // 起点
        // ctx.moveTo(300, 200)
        // // 2个控制点，1个终点
        // ctx.bezierCurveTo(350, 150, 400, 200, 300, 300)
        // ctx.bezierCurveTo(200, 200, 250, 150, 300, 200)
        // ctx.stroke()
        // ctx.closePath()

        // 封装路径
        // const heartPath = new Path2D()
        // heartPath.moveTo(300, 200)
        // heartPath.bezierCurveTo(350, 150, 400, 200, 300, 300)
        // heartPath.bezierCurveTo(200, 200, 250, 150, 300, 200)
        // ctx.stroke(heartPath)
        // const polyline = new Path2D('M10 10 h 80 v 80 h -80 z')
        // ctx.stroke(polyline)

        // 颜色
        // ctx.strokeStyle = 'red'
        // const heartPath = new Path2D()
        // heartPath.moveTo(300, 200)
        // heartPath.bezierCurveTo(350, 150, 400, 200, 300, 300)
        // heartPath.bezierCurveTo(200, 200, 250, 150, 300, 200)
        // ctx.stroke(heartPath)

        // 线性渐变
        // let linearGradient = ctx.createLinearGradient(100, 200, 400, 500)
        // linearGradient.addColorStop(0, 'red')
        // linearGradient.addColorStop(1, 'blue')
        // ctx.fillStyle = linearGradient
        // ctx.fillRect(100, 200, 300, 300)

        // 径向渐变
        // let rediaGradient = ctx.createRadialGradient(250, 150, 10, 300, 200, 100)
        // rediaGradient.addColorStop(0, '#ffcccc')
        // rediaGradient.addColorStop(1, 'red')
        // ctx.fillStyle = rediaGradient
        // ctx.arc(300, 200, 100, 0, Math.PI * 2)
        // ctx.fill()

        // 圆锥渐变
        // let coneGradient = ctx.createConicGradient(Math.PI / 4, 300, 200)
        // coneGradient.addColorStop(0, 'red')
        // coneGradient.addColorStop(1, 'blue')
        // ctx.fillStyle = coneGradient
        // ctx.fillRect(0, 0, 600, 400)

        // 图案样式
        // let img = new Image()
        // img.src = './textures/alarm/alarm.png'
        // img.onload = function () {
        //     if (!ctx) {
        //         return
        //     }
        //     let pattern = ctx.createPattern(img, 'repeat')
        //     ctx.fillStyle = pattern as CanvasPattern
        //     ctx.fillRect(0, 0, 600, 400)
        // }

        // 线条样式
        // ctx.moveTo(200, 150)
        // ctx.lineTo(300, 200)
        // ctx.lineTo(400, 150)
        // // 设置线条样式
        // ctx.lineWidth = 1
        // // 设置线条端点样式，butt平齐，round半圆,square正方形
        // ctx.lineCap = 'square'
        // // 设置2个线段连接处的样式，miter外侧相连的角，round角被磨圆了
        // ctx.lineJoin = 'miter'
        // // 对斜截面进行限制
        // ctx.miterLimit = 5
        // // 设置虚线
        // ctx.setLineDash([10, 5])
        // ctx.stroke()

        // 阴影
        // let polyline = new Path2D('M10 10 h 80 v 80 h -80 z')
        // ctx.shadowOffsetX = 10
        // ctx.shadowOffsetY = 10
        // ctx.shadowBlur = 5
        // ctx.shadowColor = 'rgba(255,200,200,0.5)'
        // ctx.stroke(polyline)

        // 图片
        // let img = new Image()
        // img.src = './textures/alarm/alarm.png'
        // img.onload = function () {
        //     if (!ctx) {
        //         return
        //     }
        //     // ctx.drawImage(img, 0, 0)
        //     // ctx.drawImage(img, 0, 0, 600, 400)
        //     ctx.drawImage(img, 10, 10, 1280, 720, 0, 0, 600, 400)
        // }

        // 视频
        // let video
        // let btn
        // let image = new Image()
        // image.src = './textures/alarm/alarm.png'
        // if (!ctx) {
        //     return
        // }
        // video = document.querySelector('#video')
        // btn = document.querySelector('#btn')
        // btn.onclick = function () {
        //     video.play()
        //     render()
        // }
        // const render = () => {
        //     if (!ctx) {
        //         return
        //     }
        //     ctx.drawImage(video, 0, 0, 600, 400)
        //     ctx.drawImage(image, 500, 350, 100, 50)
        //     requestAnimationFrame(render)
        // }

        // 文字
        // ctx.font = '50px Microsoft TaHei'
        // ctx.textAlign = 'center'
        // ctx.textBaseline = 'middle'
        // // 预测量
        // let text = ctx.measureText('Hello Word')
        // console.log(text)
        // // ctx.fillText('Hello Word', 300, 100, 100)
        // ctx.strokeText('Hello World', 300, 200)
        // ctx.arc(300, 200, 5, 0, 2 * Math.PI)
        // ctx.fill()

        // 变形
        // 位移
        // ctx.translate(100, 100)
        // 拉伸
        // ctx.scale(5, 2)
        // 旋转
        // ctx.rotate(Math.PI / 6)
        // ctx.fillRect(0, 0, 50, 50)

        // 合成
        // ctx.fillStyle = 'rgba(0,0,255,0.5)'
        // ctx.fillRect(300, 200, 100, 100)
        // ctx.globalCompositeOperation = 'source-in'
        // ctx.fillStyle = 'rgba(255,0,0,0.5)'
        // ctx.fillRect(250, 150, 100, 100)

        // 状态
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, 100, 100)
        ctx.save()
        ctx.fillStyle = 'blue'
        ctx.fillRect(100, 100, 100, 100)
        ctx.restore()
        ctx.fillRect(200, 200, 100, 100)

        // 清除
        // let height = 0
        // let t1 = setInterval(() => {
        //     height++
        //     if (!ctx) {
        //         return
        //     }
        //     ctx.clearRect(0, 0, c1.clientWidth, height)
        //     if (height > c1.clientHeight) {
        //         clearInterval(t1)
        //     }
        // }, 10)
    })
</script>

<style scoped lang="scss">
    canvas {
        border: 1px solid #ccc;
    }
</style>
