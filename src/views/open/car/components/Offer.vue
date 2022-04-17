<template>
    <section class="offer section">
        <div class="offer__container container grid">
            <img
                src="../../../../assets/img/car/offer-bg.png"
                alt=""
                class="offer__bg"
            />
            <div class="offer__data">
                <h2 class="section__title offer__title">
                    Do You Want To Receive
                    <br />
                    Special Offers
                </h2>
                <p class="offer__description">
                    Be the first to receive all the information about our
                    products and new cars by email by subscribing to our mailing
                    list.
                </p>
                <a href="#" class="button">Subscribe Now</a>
            </div>
            <img
                src="../../../../assets/img/car/offer.png"
                alt=""
                class="offer__img"
            />
        </div>
    </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .container {
        max-width: 1024px;
        margin-right: 1.5rem;
        margin-left: 1.5rem;
    }

    .grid {
        display: grid;
        gap: 1.5rem;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .offer {
        position: relative;
        overflow: hidden;
        padding: 4.5rem 0 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .offer__container {
        grid-template-rows: max-content 224px;
    }

    .offer__bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .offer__data,
    .offer__img {
        position: relative;
    }

    .offer__data {
        text-align: center;
    }

    .offer__title {
        margin-bottom: 2rem;
    }

    .offer__description {
        margin-bottom: 3rem;
    }
    .offer__img {
        position: absolute;
        max-width: initial;
        width: 400px;
        bottom: 2rem;
        right: 11.5rem;
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

    @media screen and (max-width: 767px) {
        .offer__img {
            right: -4.5rem;
        }
    }
</style>
