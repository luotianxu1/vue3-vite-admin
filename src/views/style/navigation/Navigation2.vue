<template>
    <div class="page">
        <div class="navbar">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <ul>
                <li><a href="#">点赞</a></li>
                <li><a href="#">关注</a></li>
                <li><a href="#">收藏</a></li>
                <li><a href="#">评论</a></li>
                <li><a href="#">分享</a></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .page {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: linear-gradient(200deg, #ddd6f3, #faaca8);

        .navbar {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 20px;
            background-color: #fff;
            border-radius: 50px;

            input {
                width: 40px;
                height: 40px;
                opacity: 0;
                cursor: pointer;

                &:checked {
                    ~ ul {
                        width: 350px;
                    }

                    ~ span {
                        &:nth-child(2) {
                            top: calc(50% - 2px);
                            transform: rotate(-45deg);
                            background-color: #fb7299;
                            transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s;
                        }

                        &:nth-child(3) {
                            top: calc(50% - 2px);
                            transform: rotate(45deg);
                            background-color: #fb7299;
                            transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s;
                        }
                    }
                }
            }

            span {
                width: 30px;
                height: 4px;
                position: absolute;
                left: 25px;
                top: calc(50% - 10px);
                border-radius: 15px;
                background-color: #999;
                pointer-events: none;
                transition: transform 0.3s ease-in-out,
                    top 0.3s ease-in-out 0.3s;

                &:nth-child(3) {
                    top: calc(50% + 6px);
                }
            }

            ul {
                width: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                transition: all 0.5s;
                white-space: nowrap;

                li {
                    margin: 0 15px;

                    a {
                        font-size: 20px;
                        font-weight: 700;
                        color: #333;

                        &:hover {
                            color: #fb7299;
                        }
                    }
                }
            }
        }
    }
</style>
