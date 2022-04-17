<template>
    <section class="logos section">
        <div class="logos__container container grid">
            <div class="logos__content">
                <img
                    src="../../../../assets/img/car/logo1.png"
                    alt=""
                    class="logos__img"
                />
            </div>
            <div class="logos__content">
                <img
                    src="../../../../assets/img/car/logo2.png"
                    alt=""
                    class="logos__img"
                />
            </div>
            <div class="logos__content">
                <img
                    src="../../../../assets/img/car/logo3.png"
                    alt=""
                    class="logos__img"
                />
            </div>
            <div class="logos__content">
                <img
                    src="../../../../assets/img/car/logo4.png"
                    alt=""
                    class="logos__img"
                />
            </div>
            <div class="logos__content">
                <img
                    src="../../../../assets/img/car/logo5.png"
                    alt=""
                    class="logos__img"
                />
            </div>
            <div class="logos__content">
                <img
                    src="../../../../assets/img/car/logo6.png"
                    alt=""
                    class="logos__img"
                />
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .grid {
        display: grid;
        gap: 1.5rem;
    }

    .logos__container {
        grid-template-columns: repeat(6, max-content);
        justify-content: center;
        align-items: center;
        gap: 4rem;
        padding-bottom: 2rem;

        .logos__img {
            width: 40px;
            opacity: 0.4;
            transition: 0.3s;
            &:hover {
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 767px) {
        .logos__container {
            grid-template-columns: repeat(3, max-content);
            justify-content: center;
            align-items: center;
            gap: 4rem;
            padding-bottom: 2rem;
        }
    }
</style>
