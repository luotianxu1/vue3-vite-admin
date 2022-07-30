<template>
    <div class="page">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
    onMounted(() => {
        // 获取canvas
        const canvas: any = document.getElementById('canvas')
        if (!canvas) {
            return
        }
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // 获取webgl绘图上下文
        const gl = canvas.getContext('webgl')
        // 第一次创建webgl绘图上下文，需要设置视口大小
        gl.viewport(0, 0, canvas.width, canvas.height)

        // 创建顶点着色器
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        // 创建顶点着色器的源码，需要编写glsl代码
        gl.shaderSource(
            vertexShader,
            `
            attribute vec4 a_Position;
            void main() {
                gl_Position = a_Position;
            }
        `
        )
        // 编译顶点着色器
        gl.compileShader(vertexShader)

        // 创建片元着色器
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(
            fragmentShader,
            `
            void main() {
                gl_FragColor = vec4(1.0,0.0,0.0,1.0);
            }
        `
        )
        // 编译片元着色器
        gl.compileShader(fragmentShader)

        // 创建程序链接顶点着色器和片元着色器
        const program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        // 链接程序
        gl.linkProgram(program)
        // use程序进行渲染
        gl.useProgram(program)

        // 创建顶点缓冲区对象
        const vertexBuffer = gl.createBuffer()
        // 绑定顶点缓冲区对象
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        // 向顶点缓冲区对象中写入数据
        const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
        // 表示数据不会改变
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
        // 获取顶点着色器中的a_Position变量的位置
        const aPosition = gl.getAttribLocation(program, 'a_Position')
        // 将顶点缓冲区对象分配给a_Position变量
        // 告诉openGL如何解析顶点数据
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aPosition)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    })
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;

        canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
