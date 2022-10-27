<template>
    <div class="page">
        <div class="single">
            <div class="circle">
                <div class="inner">
                    <h3>Broke John</h3>
                    <p>Web Designer</p>
                    <div class="image">
                        <img src="../../../assets/img/style/card/card7.jpeg" alt="" />
                    </div>
                    <div class="social">
                        <span class="icon">
                            <i class="iconfont icon-caidan1"></i>
                        </span>
                        <span class="icon">
                            <i class="iconfont icon-caidan1"></i>
                        </span>
                        <span class="icon">
                            <i class="iconfont icon-caidan1"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        color: #737789;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        .single {
            width: 300px;
            margin-left: 10px;
            border-radius: 5px;
            box-shadow: 0 10px 60px 0 rgba(46, 61, 98, 0.1);
            text-align: center;
            position: relative;
            padding-bottom: 60px;
            padding-top: 57px;
            transform: scaleY(1);
            transform-origin: top;
            transition: transform 500ms ease;

            &:before {
                content: '';
                border-radius: 5px;
                background-image: linear-gradient(90deg, hotpink 0%, #33495e 100%);
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                transform: scale(1, 0);
                transform-origin: bottom;
                transition: transform 500ms ease;
            }

            &:hover {
                transform: scaleY(1.2);

                &:before {
                    transform: scale(1, 1);
                    transform-origin: top;
                }

                .circle {
                    &:before {
                        opacity: 0.3;
                        transform: perspective(200px) scaleX(1) scaleY(0.8);
                    }
                }

                .inner {
                    transform: scaleY(0.8);

                    .image {
                        border: 5px solid white;
                    }

                    .social {
                        opacity: 1;
                        visibility: visible;
                    }
                }
            }

            .inner {
                transform-origin: top;
                transition: transform 500ms ease;
                transform: scaleY(1);

                .image {
                    width: 250px;
                    height: 250px;
                    margin-left: auto;
                    margin-right: auto;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 5px solid white;
                    transition: all 500ms ease;

                    img {
                        width: 250px;
                        height: 250px;
                    }
                }

                .social {
                    position: absolute;
                    bottom: -70px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 11;
                    visibility: hidden;
                    opacity: 0;
                    transition: all 500ms ease;

                    .icon {
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        background-color: white;
                        opacity: 0.3;
                        transition: all 500ms ease;
                        margin-left: 5px;

                        &:first-child {
                            margin-left: 0;
                        }

                        &:hover {
                            opacity: 1;

                            i {
                                color: #fd632f;
                            }
                        }

                        i {
                            color: #737789;
                            transition: all 500ms ease;
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
</style>
