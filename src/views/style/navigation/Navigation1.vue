<template>
    <div class="page">
        <div class="navigation">
            <ul>
                <li
                    class="list"
                    :class="active === 0 ? 'active' : ''"
                    @click="change(0)"
                >
                    <span class="item">
                        <span class="icon">
                            <MyIcon icon="yonghu" :width="800" :font="22"></MyIcon>
                        </span>
                        <span class="text">用户</span>
                    </span>
                </li>
                <li
                    class="list"
                    :class="active === 1 ? 'active' : ''"
                    @click="change(1)"
                >
                    <span class="item">
                        <span class="icon">
                            <MyIcon icon="caidan1" :width="800" :font="22"></MyIcon>
                        </span>
                        <span class="text">菜单</span>
                    </span>
                </li>
                <li
                    class="list"
                    :class="active === 2 ? 'active' : ''"
                    @click="change(2)"
                >
                    <span class="item">
                        <span class="icon">
                            <MyIcon icon="rili" :width="800" :font="22"></MyIcon>
                        </span>
                        <span class="text">日历</span>
                    </span>
                </li>
                <li
                    class="list"
                    :class="active === 3 ? 'active' : ''"
                    @click="change(3)"
                >
                    <span class="item">
                        <span class="icon">
                            <MyIcon icon="gongju" :width="800" :font="22"></MyIcon>
                        </span>
                        <span class="text">工具</span>
                    </span>
                </li>
                <li
                    class="list"
                    :class="active === 4 ? 'active' : ''"
                    @click="change(4)"
                >
                    <span class="item">
                        <span class="icon">
                            <MyIcon icon="ditu" :width="800" :font="22"></MyIcon>
                        </span>
                        <span class="text">地图</span>
                    </span>
                </li>
                <div ref="box" class="indicator"></div>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const active = ref(0)
    const box = ref()
    onMounted(() => {
        box.value.style.left = '0px'
    })

    const change = (val: number) => {
        active.value = val
        box.value.style.left = 70 * active.value + 'px'
    }
</script>

<style scoped lang="scss">
    .page {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100%;
        background-color: #222327;

        .navigation {
            width: 400px;
            height: 70px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;

            ul {
                display: flex;
                width: 350px;
                position: relative;

                li {
                    position: relative;
                    width: 70px;
                    height: 70px;
                    list-style: none;

                    .item {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        width: 100%;
                        text-align: center;

                        .icon {
                            position: relative;
                            display: block;
                            line-height: 75px;
                            font-size: 1.5em;
                            text-align: center;
                            transition: 0.5s;
                            color: #222327;
                            z-index: 999;
                        }

                        .text {
                            position: absolute;
                            color: #222327;
                            font-weight: 400;
                            font-size: 0.75em;
                            letter-spacing: 0.05em;
                            transition: 0.5s;
                            opacity: 0;
                            transform: translateY(20px);
                        }
                    }

                    &:nth-child(1) {
                        .active ~ {
                            .indicator {
                                transform: translateX(calc(70px * 0));
                            }
                        }
                    }

                    &:nth-child(2) {
                        .active ~ {
                            .indicator {
                                transform: translateX(calc(70px * 1));
                            }
                        }
                    }
                }

                .active {
                    .item {
                        .icon {
                            transform: translateY(-18px);
                        }

                        .text {
                            opacity: 1;
                            transform: translateY(10px);
                        }
                    }
                }

                .indicator {
                    position: absolute;
                    top: -35px;
                    width: 70px;
                    height: 70px;
                    background: #29fd53;
                    border-radius: 50%;
                    border: 6px solid #222327;
                    transition: 0.5s;

                    &:before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: -22px;
                        width: 20px;
                        height: 20px;
                        background: transparent;
                        border-top-right-radius: 20px;
                        box-shadow: 0px -10px 0 0 #222327;
                    }

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        right: -22px;
                        width: 20px;
                        height: 20px;
                        background: transparent;
                        border-top-left-radius: 20px;
                        box-shadow: 0px -10px 0 0 #222327;
                    }
                }
            }
        }
    }
</style>
