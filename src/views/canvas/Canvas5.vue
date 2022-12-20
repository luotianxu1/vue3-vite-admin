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
        class Ball {
            x
            y
            r
            speedX
            speedY
            color
            constructor(x, y, r, speedX, speedY, color) {
                this.x = x
                this.y = y
                this.r = r
                this.speedX = speedX
                this.speedY = speedY
                this.color = color
            }

            draw() {
                if (ctx) {
                    ctx.beginPath()
                    ctx.fillStyle = this.color
                    ctx.arc(this.x, this.y, this.r, Math.PI * 2, 0)
                    ctx.fill()
                }
            }

            move() {
                this.x += this.speedX
                if (this.x > c1.width - this.r) {
                    this.speedX *= -1
                } else if (this.x < this.r) {
                    this.speedX *= -1
                }
                this.y += this.speedY
                if (this.y > c1.height - this.r) {
                    this.speedY *= -1
                } else if (this.y < this.r) {
                    this.speedY *= -1
                }
            }
        }
        let ball = new Ball(100, 100, 50, 2, 2, 'blue')
        ball.draw()

        function start() {
            if (ctx) {
                ctx.clearRect(0, 0, c1.width, c1.height)
                ball.draw()
                ball.move()
                window.requestAnimationFrame(start)
            }
        }
        start()
    })
</script>

<style scoped lang="scss">
    canvas {
        border: 1px solid #ccc;
    }
</style>
