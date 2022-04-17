<template>
    <div id="header" ref="header" class="header">
        <nav class="nav container">
            <a href="#" class="nav__logo">
                <i class="iconfont bilibili-line"></i>
                Elecar
            </a>
            <div
                id="nav-menu"
                class="nav__menu"
                :class="isShowMenu ? 'show-menu' : ''"
            >
                <ul class="nav__list">
                    <li class="nav__item" @click="closeMenu">
                        <a href="#" class="nav__link">Home</a>
                    </li>
                    <li class="nav__item" @click="closeMenu">
                        <a href="" class="nav__link">About</a>
                    </li>
                    <li class="nav__item" @click="closeMenu">
                        <a href="" class="nav__link">Popular</a>
                    </li>
                    <li class="nav__item" @click="closeMenu">
                        <a href="" class="nav__link">Featured</a>
                    </li>
                </ul>
                <div id="nav__choose" class="nav__close" @click="closeMenu">
                    <i class="iconfont qidong"></i>
                </div>
            </div>
            <div id="nav__toggle" class="nav__toggle" @click="openMenu">
                <i class="iconfont caidan"></i>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const isShowMenu = ref(false)
    const openMenu = () => {
        isShowMenu.value = true
    }
    const closeMenu = () => {
        isShowMenu.value = false
    }
</script>

<style scoped lang="scss">
    .header {
        width: 100%;
        background-color: transparent;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
        padding: 0 2rem;
        color: var(--title-color);

        .nav {
            height: var(--header-height);
            display: flex;
            justify-content: space-between;
            align-items: center;

            .nav__logo {
                align-items: center;
                column-gap: 0.25rem;
                font-weight: var(--font-medium);
                color: var(--title-color);
                transition: 0.3s;
                &:hover {
                    color: var(--first-color);
                    cursor: pointer;
                }

                i {
                    font-size: 1.25rem;
                }
            }

            .nav__toggle {
                font-size: 1.25rem;
                cursor: pointer;
                display: none;
            }

            .nav__menu {

                .nav__list {
                    width: 100%;
                    display: flex;
                    text-align: center;
                    row-gap: 3rem;
                    margin-left: 1rem;

                    .nav__item {
                        margin-left: 1rem;
                    }

                    .nav__link {
                        text-transform: uppercase;
                        color: var(--title-color);
                        font-size: var(--h2-font-size);
                        font-weight: var(--font-medium);
                        transition: 0.3s;

                        &:hover {
                            color: var(--first-color);
                        }
                    }
                }

                .nav__close {
                    font-size: 2rem;
                    color: var(--white-color);
                    position: absolute;
                    right: 1rem;
                    top: 1rem;
                    cursor: pointer;
                    display: none;
                }
            }

            .show-menu {
                left: 0;
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 767px) {
        .nav__menu {
            position: fixed;
            background-color: hsla(0, 0%, 100%, 0.1);
            top: 0;
            left: 100%;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(96px);
            transition: 0.3s;
            opacity: 0;
        }

        .nav__list {
            padding-top: 9rem;
            flex-direction: column;

            .nav__item {
                margin-left: 0!important;
            }
        }

        .nav__toggle {
            display: block!important;
        }

        .nav__close {
            display: block!important;
        }
    }
</style>
