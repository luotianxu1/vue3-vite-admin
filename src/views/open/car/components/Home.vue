<template>
    <section id="home" class="home__center section">
        <div class="shape shape__big"></div>
        <div class="shape shape__small"></div>
        <div class="home__container container grid">
            <div class="home__data">
                <h1 class="home__title">Choose The Best Car</h1>
                <h2 class="home__subtitle">Porsche Mission E</h2>
                <h3 class="home__elec">
                    <i class="iconfont shandian">Electric car</i>
                </h3>
            </div>
            <img
                src="../../../../assets/img/car/home.png"
                alt=""
                class="home__img"
            />
            <div class="home__car">
                <div class="home__car-data">
                    <div class="home__car-icon">
                        <i class="iconfont wendu"></i>
                    </div>
                    <h2 class="home__car-number">24°</h2>
                    <h3 class="home__car-name">TEMPERATURE</h3>
                </div>
                <div class="home__car-data">
                    <div class="home__car-icon">
                        <i class="iconfont configure"></i>
                    </div>
                    <h2 class="home__car-number">873</h2>
                    <h3 class="home__car-name">MILEAGE</h3>
                </div>
                <div class="home__car-data">
                    <div class="home__car-icon">
                        <i class="iconfont chongdiandian"></i>
                    </div>
                    <h2 class="home__car-number">94%</h2>
                    <h3 class="home__car-name">BATTERY</h3>
                </div>
            </div>
            <div class="home__button">START</div>
        </div>
    </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .home__center {
        position: relative;
        overflow: hidden;

        .shape {
            background-color: hsl(219, 33%, 32%, 0.5);
            filter: blur(112px);
            border-radius: 50%;
        }

        .shape__small {
            width: 300px;
            height: 300px;
        }

        .shape__smaller {
            width: 180px;
            height: 180px;
            filter: blur(64px);
        }

        .shape__big {
            width: 400px;
            height: 400px;
        }

        .home__container {
            position: relative;
            padding-top: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;

            .home__data {
                text-align: center;

                .home__title {
                    font-size: var(--h1-font-size);
                    margin-bottom: 1rem;
                }

                .home__subtitle {
                    font-size: var(--h3-font-size);
                    margin-bottom: 0.25rem;
                }

                .home__elec {
                    font-size: var(--small-font-size);
                    font-weight: 400;
                    color: var(--text-color);
                    display: inline-flex;
                    align-items: center;
                    margin-bottom: 0.75rem;

                    i {
                        font-size: var(--small-font-size);
                        color: var(--first-color);
                    }
                }
            }

            .home__img {
                width: 360px;
                margin: 0 auto;
            }

            .home__car {
                display: flex;
                justify-content: center;
                align-items: center;
                column-gap: 4rem;
                margin-bottom: 3rem;
                text-align: center;

                .home__car-name {
                    font-size: 0.635rem;
                    font-weight: 400;
                    color: var(--text-color-light);
                }

                .home__car-number {
                    font-size: var(--h2-font-size);
                    font-weight: var(--font-medium);
                    margin-bottom: 0.25rem;
                }

                .home__car-icon {
                    background-color: var(--container-color);
                    border-radius: 50%;
                    padding: 0.376rem;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.875rem;
                    margin-bottom: 0.75rem;
                }
            }

            .home__button {
                position: relative;
                border: 2px solid hsl(158, 89%, 30%);
                width: 70px;
                height: 70px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--small-font-size);
                color: var(--white-color);
                font-weight: var(--font-medium);
                justify-self: center;

                &:before {
                    content: '';
                    border: 2px solid hsl(158, 98%, 43%);
                    width: 90px;
                    height: 90px;
                    position: absolute;
                    border-radius: 50%;
                    box-shadow: 0 0 12px hsl(158, 98%, 43%);
                    transition: 0.3s;
                    animation: button 3s infinite;
                }
            }
        }
    }

    .home__center .shape__big,
    .home__center .shape__small {
        position: absolute;
    }

    .home .shape__big {
        left: -9rem;
        top: -4rem;
    }

    .home__center .shape__small {
        right: -10rem;
        bottom: 3rem;
    }

    @keyframes button {
        0% {
            box-shadow: 0 0 12px hsl(158, 98%, 43%);
        }
        50% {
            box-shadow: 0 0 24px hsl(158, 98%, 43%);
        }
    }

    @media screen and (max-width: 1600px) {
        .home__car {
            column-gap: 6rem!important;
        }
    }

    @media screen and (max-width: 900px) {
        .home__car {
            column-gap: 5rem!important;
        }
    }

    @media screen and (max-width: 800px) {
        .home__car {
            column-gap: 4rem!important;
        }

        .home__img {
            width: 288px!important;
        }
    }
</style>
