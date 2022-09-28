<template>
    <div id="app">
        <div ref='photoBox' class='photoBox'></div>
        <div ref='storageBox' class="storageBox"></div>
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

    const storageBox = ref<HTMLDivElement>()
    const photoBox = ref<HTMLDivElement>()

    onMounted(() => {
        if (!storageBox.value) {
            return
        }
        console.log(storageBox.value.offsetWidth)
        console.log(storageBox.value.offsetHeight)
        console.log()
    })

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
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: blue;
        background-size: 100% auto;
        background-position: center;
        border: 5px;

        .photoBox {
            height: 80%;
            width: 90%;
        }

        .storageBox {
            height: 10%;
            width: 80%;
            border-radius: 5px;
            margin-top: 20px;
        }
    }

    .imgGlobal {
        position: absolute;
        border-radius: 5px;
        cursor: pointer;
    }

    .imgFilter {
        filter: brightness(30%);
    }

</style>
