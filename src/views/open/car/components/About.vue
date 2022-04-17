<template>
    <section id="about" class="about section">
        <div class="about__container container grid">
            <div class="about__group">
                <img
                    src="../../../../assets/img/car/about.png"
                    alt=""
                    class="about__img"
                />
                <div class="about__card">
                    <h3 class="about__card-title">2500+</h3>
                    <p class="about__card-description">
                        Supercharges placed along routes
                    </p>
                </div>
            </div>
            <div class="about__data">
                <h2 class="section__title about__title">
                    Machines With
                    <br />
                    Future Technology
                </h2>
                <p class="about__description">
                    See the future with high-performance electric cars produced
                    by renowned brands. They feature futuristic builds and
                    designs with new and innovative platforms that last a long
                    time.
                </p>
                <span class="button">Know more</span>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .about__container {
        padding: 0 2rem;

        .about__group {
            position: relative;
            margin-bottom: 4rem;

            .about__img {
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                width: 340px;
                border-radius: 0.5rem;
            }

            .about__card {
                width: 180px;
                position: absolute;
                right: 50%;
                bottom: -2.5rem;
                background-color: hsla(0, 0%, 100%, 0.1);
                backdrop-filter: blur(16px);
                padding: 1rem 0.75rem;
                text-align: center;
                border-radius: 1.25rem;
            }

            .about__card-title {
                font-size: var(--h3-font-size);
                margin-bottom: 0.5rem;
            }

            .about__card-description {
                font-size: var(--small-font-size);
            }
        }

        .about__data {
            display: flex;
            flex-direction: column;

            .about__title {
                text-align: center;
                margin-bottom: 2rem;
            }

            .about__description {
                margin-bottom: 2rem;
                text-align: center;
            }
        }

        .button {
            background-color: var(--first-color);
            color: var(--white-color);
            padding: 1rem 2rem;
            border-radius: 0.25rem;
            font-size: var(--normal-font-size);
            transition: 0.3s;
            margin: 0 auto;

            &:hover {
                background-color: var(--first-color-alt);
            }
        }
    }
</style>
