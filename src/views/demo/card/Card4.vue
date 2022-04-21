<template>
    <div class="page">
        <ul class="box">
            <li class="list">
                <h2>小霆</h2>
                <span>A man who comnines technology and beauty</span>
                <div class="light"></div>
            </li>
            <li class="list">
                <h2>小霆</h2>
                <span>A man who comnines technology and beauty</span>
                <div class="light"></div>
            </li>
            <li class="list">
                <h2>小霆</h2>
                <span>A man who comnines technology and beauty</span>
                <div class="light"></div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex'
    import { Key } from '@/store'

    const store = useStore(Key)

    const num = computed(() => {
        if (store.state.system?.SYSTEM_COLLAPSE) {
            return 24
        }
        return 200
    })

    onMounted(() => {
        let lis = document.querySelectorAll('.list')
        for (let i = 0; i < lis.length; i++) {
            let list = lis[i] as HTMLBodyElement
            list.addEventListener('mouseover', () => {
                let light = list.querySelector('.light') as HTMLBodyElement
                light.style.display = 'block'
                list.addEventListener('mousemove', (e) => {
                    let x =
                        e.pageX -
                        list.offsetLeft -
                        light.offsetWidth / 2 -
                        num.value
                    let y = e.pageY - list.offsetTop - light.offsetWidth / 2
                    light.style.left = x + 'px'
                    light.style.top = y + 'px'
                })
            })
            list.addEventListener('mouseout', () => {
                let light = lis[i].querySelector('.light') as HTMLBodyElement
                light.style.display = 'none'
            })
        }
    })
</script>

<style lang="scss" scoped>
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #19191b;
        position: relative;

        .box {
            display: flex;

            li {
                display: flex;
                flex-direction: column;
                position: relative;
                width: 300px;
                height: 300px;
                background-color: #303032;
                border: 1px solid #4c456e;
                border-radius: 10px;
                color: #fff;
                padding: 20px;
                margin: 8px;
                overflow: hidden;

                > h2,
                span {
                    margin-top: 30px;
                }

                .light {
                    display: none;
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    background-color: #4c16c4;
                    filter: blur(40px);
                }
            }
        }
    }
</style>
