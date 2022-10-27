<template>
    <div class="page">
        <nav class="menu">
            <input id="menu_toggle" type="checkbox" class="menu-toggle" checked />
            <label for="menu_toggle"></label>
            <ul>
                <li class="menu-item">
                    <a href="#"><i class="iconfont icon-configure"></i></a>
                </li>
                <li class="menu-item">
                    <a href="#"><i class="iconfont icon-configure"></i></a>
                </li>
                <li class="menu-item">
                    <a href="#"><i class="iconfont icon-configure"></i></a>
                </li>
                <li class="menu-item">
                    <a href="#"><i class="iconfont icon-configure"></i></a>
                </li>
                <li class="menu-item">
                    <a href="#"><i class="iconfont icon-configure"></i></a>
                </li>
                <li class="menu-item">
                    <a href="#"><i class="iconfont icon-configure"></i></a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .page {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: linear-gradient(200deg, #ddd6f3, #faaca8);

        .menu-toggle {
            width: 40px;
            height: 40px;
            z-index: 2;
            opacity: 0;
            cursor: pointer;

            &:hover {
                ~ label {
                    &:before,
                    &:after {
                        background: #fff;
                    }
                }
            }

            &:checked {
                ~ label {
                    background: transparent;
                }
            }

            &:checked {
                ~ label {
                    &:before,
                    &:after {
                        top: 0;
                        width: 40px;
                        transform-origin: 50% 50%;
                    }

                    &:before {
                        transform: rotate(45deg);
                    }

                    &:after {
                        transform: rotate(-45deg);
                    }
                }

                ~ ul {
                    .menu-item:nth-child(1) {
                        transform: rotate(0deg) translateX(-110px);
                    }

                    .menu-item:nth-child(2) {
                        transform: rotate(60deg) translateX(-110px);
                    }

                    .menu-item:nth-child(3) {
                        transform: rotate(120deg) translateX(-110px);
                    }

                    .menu-item:nth-child(4) {
                        transform: rotate(180deg) translateX(-110px);
                    }

                    .menu-item:nth-child(5) {
                        transform: rotate(240deg) translateX(-110px);
                    }

                    .menu-item:nth-child(6) {
                        transform: rotate(300deg) translateX(-110px);
                    }

                    .menu-item {
                        opacity: 1;
                    }

                    a {
                        pointer-events: auto;
                    }
                }
            }
        }

        label {
            width: 40px;
            height: 5px;
            display: block;
            z-index: 1;
            border-radius: 2.5px;
            background-color: rgba(255, 255, 255, 0.7);
            transition: transform 0.5s, top 0.5s;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;

            &:before,
            &:after {
                width: 40px;
                height: 5px;
                display: block;
                z-index: 1;
                border-radius: 2.5px;
                background: rgba(255, 255, 255, 0.7);
                transition: transform 0.5s, top 0.5s;
                content: '';
                position: absolute;
                left: 0;
            }

            &:before {
                top: 10px;
            }

            &:after {
                top: -10px;
            }
        }

        .menu-item {
            position: absolute;
            display: block;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 80px;
            height: 80px;
            opacity: 0;
            transition: all 0.5s;

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: inherit;
                height: inherit;
                color: rgba(255, 255, 255, 0.7);
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                text-align: center;
                font-size: 40px;
                pointer-events: none;
                transition: 0.2s;

                &:hover {
                    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
                    color: #fff;
                    background: rgba(255, 255, 255, 0.3);
                    font-size: 45px;
                }
            }

            &:nth-child(1) {
                transform: rotate(0deg);
            }

            &:nth-child(2) {
                transform: rotate(60deg);
            }

            &:nth-child(3) {
                transform: rotate(120deg);
            }

            &:nth-child(4) {
                transform: rotate(180deg);
            }

            &:nth-child(5) {
                transform: rotate(240deg);
            }

            &:nth-child(6) {
                transform: rotate(300deg);
            }
        }
    }
</style>
