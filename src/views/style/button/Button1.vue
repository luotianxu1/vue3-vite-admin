<template>
    <div class="page">
        <div class="icons">
            <div class="item">
                <div class="layer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="iconfont facebook"></span>
                </div>
                <div class="text">Facebook</div>
            </div>
            <div class="item">
                <div class="layer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="iconfont twitter"></span>
                </div>
                <div class="text">Twitter</div>
            </div>
            <div class="item">
                <div class="layer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="iconfont linkedin"></span>
                </div>
                <div class="text">Linkedin</div>
            </div>
            <div class="item">
                <div class="layer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="iconfont instagram"></span>
                </div>
                <div class="text">Instagram</div>
            </div>
            <div class="item">
                <div class="layer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="iconfont youtube"></span>
                </div>
                <div class="text">Youtube</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;

        .icons {
            display: flex;

            .item {
                position: relative;
                margin: 0 25px;
                color: #fff;
                display: block;
                &:hover {
                    .layer {
                        transform: rotate(-35deg) skew(20deg);
                        span {
                            &:nth-child(1) {
                                opacity: 0.2;
                            }
                            &:nth-child(2) {
                                opacity: 0.4;
                                transform: translate(5px, -5px);
                            }
                            &:nth-child(3) {
                                opacity: 0.6;
                                transform: translate(10px, -10px);
                            }
                            &:nth-child(4) {
                                opacity: 0.8;
                                transform: translate(15px, -15px);
                            }
                            &:nth-child(5) {
                                opacity: 1;
                                transform: translate(20px, -20px);
                            }
                        }
                    }

                    .text {
                        bottom: -20px;
                        opacity: 1;
                    }
                }

                &:nth-child(1) {
                    .layer {
                        span {
                            color: #4267b2;
                            border-color: #4267b2;
                        }
                    }
                    .text {
                        color: #4267b2;
                        border-color: #4267b2;
                    }
                }

                &:nth-child(2) {
                    .layer {
                        span {
                            color: #1da1f2;
                            border-color: #1da1f2;
                        }
                    }
                    .text {
                        color: #1da1f2;
                        border-color: #1da1f2;
                    }
                }

                &:nth-child(3) {
                    .layer {
                        span {
                            color: #e1306c;
                            border-color: #e1306c;
                        }
                    }
                    .text {
                        color: #e1306c;
                        border-color: #e1306c;
                    }
                }

                &:nth-child(4) {
                    .layer {
                        span {
                            color: #2867b2;
                            border-color: #2867b2;
                        }
                    }
                    .text {
                        color: #2867b2;
                        border-color: #2867b2;
                    }
                }

                &:nth-child(5) {
                    .layer {
                        span {
                            color: #ff0000;
                            border-color: #ff0000;
                        }
                    }
                    .text {
                        color: #ff0000;
                        border-color: #ff0000;
                    }
                }

                .layer {
                    width: 55px;
                    height: 55px;
                    transition: transform 0.3s;

                    span {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        border: 1px solid #fff;
                        border-radius: 5px;
                    }

                    .iconfont {
                        font-size: 30px;
                        line-height: 55px;
                        text-align: center;
                    }
                }

                .text {
                    position: absolute;
                    left: 50%;
                    bottom: -5px;
                    opacity: 0;
                    transition: bottom 0.3s ease, opacity 0.3s ease;
                    transform: translateX(-50%);
                }
            }
        }
    }
</style>
