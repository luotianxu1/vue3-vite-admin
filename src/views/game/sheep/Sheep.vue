<template>
    <div id="app">
        <div id="storageBox"></div>
    </div>
</template>

<script lang="ts" setup>
    import Block from '@/views/game/sheep/components/Block'
    import img1 from '@/assets/img/open/game/img1.png'
    import img2 from '@/assets/img/open/game/img2.png'
    import img3 from '@/assets/img/open/game/img3.png'
    import img4 from '@/assets/img/open/game/img4.png'

    // 图片宽高
    const imgWidth = 50
    const imgHeight = 50
    // 组数 3的倍数
    const bockNums = 12
    // 存放block的数组
    const allBlock:any = []
    // 图片地址
    const imgs = [img1,img2,img3,img4]
    // 游戏状态
    const gameOver = false

    // 打乱数组
    const randomSort = () => {
        return Math.random() > 0.5 ? -1 : 1
    }

    const drawBlock = (gloup) => {
        let virtualArr:any = []
        for (let i = 0; i < gloup; i++) {
            virtualArr.push(...imgs.sort(randomSort))
        }
        virtualArr.forEach((item,index) => {
            const vBlock = new Block(imgWidth,imgHeight,item,index)
            allBlock.push(vBlock)
        })
    }
    drawBlock(bockNums)
    console.log(allBlock )

    // 设置样式
    const setStyle = (d, styleObject) => {
        for (const key in styleObject) {
            d['style'][key] = styleObject[key]
        }
        d['style']['transition'] = '.225s'
    }

    // 生成随机坐标
    const randomPosition = (min, max) => {
        return randomKey(min, max)
    }

    // 生成随机数字
    const randomKey = (min, max) => {
        return Number(Math.random() * (max - min + 1) + min)
    }

</script>

<style scoped lang="scss">
    #app {
        width: 500px;
        height: 600px;
        margin: 50px auto;
        background-color: blue;
        background-size: 100% auto;
        background-position: center;
        position: relative;
        border: 5px;
    }

    .imgGlobal {
        position: absolute;
        border-radius: 5px;
        cursor: pointer;
    }

    .imgFilter {
        filter: brightness(30%);
    }

    #storage {
        height: 50px;
        width: 350px;
        position: absolute;
        border-radius: 5px;
        bottom: 40px;
        left: 75px;
    }
</style>
