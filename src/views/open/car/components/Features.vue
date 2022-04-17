<template>
    <section id="features" class="features section">
        <h2 class="section__title">More Features</h2>
        <div class="features__container container grid">
            <div class="features__group">
                <img
                    src="../../../../assets/img/car/features.png"
                    alt=""
                    class="features__img"
                />
                <div class="features__card features__card-1">
                    <h3 class="features__card-title">800v</h3>
                    <p class="features__card-description">
                        Turbo
                        <br />
                        Chargin
                    </p>
                </div>
                <div class="features__card features__card-2">
                    <h3 class="features__card-title">350</h3>
                    <p class="features__card-description">
                        Km
                        <br />
                        Range
                    </p>
                </div>
                <div class="features__card features__card-3">
                    <h3 class="features__card-title">480</h3>
                    <p class="features__card-description">
                        Km
                        <br />
                        Travel
                    </p>
                </div>
            </div>
        </div>
        <img
            src="../../../../assets/img/car/map.svg"
            alt=""
            class="features__map"
        />
    </section>
</template>

<script lang='ts' setup>
</script>

<style scoped lang='scss'>
    .features {
        overflow: hidden;
        position: relative;

        .section__title {
            font-size: var(--h2-font-size);
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .features__container {
            padding-top: 2rem;
            justify-content: center;
            align-items: center;

            .features__group {
                display: grid;
                position: relative;
                z-index: 10;
            }

            .features__img {
                width: 150px;
                justify-self: center;
            }

            .features__card {
                width: 112px;
                background-color: hsla(0, 0%, 100%, 0.1);
                backdrop-filter: blur(16px);
                border-radius: 1.25rem;
                padding: 0.75rem 2rem;
                text-align: center;
                color: var(--title-color);
                position: absolute;

                .features__card-title {
                    font-size: var(--h3-font-size);
                    margin-bottom: 0.25rem;
                }

                .features__card-description {
                    font-size: var(--smaller-font-size);
                }
            }

            .features__card-1 {
                top: 4rem;
                left: 1.5rem;
            }

            .features__card-2 {
                top: 8rem;
                right: 1rem;
            }

            .features__card-3 {
                left: 1.5rem;
                bottom: 2rem;
            }
        }

        .features__map {
            width: 450px;
            position: absolute;
            top: 8rem;
            left: 50%;
            margin: auto;
            transform: rotate(-22deg) translateX(-50%);
        }
    }
</style>
