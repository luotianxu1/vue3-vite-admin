<template>
    <div class="body">
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

        <main class="main">
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
                        src="../../../assets/img/car/home.png"
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
            <section id="about" class="about section">
                <div class="about__container container grid">
                    <div class="about__group">
                        <img
                            src="../../../assets/img/car/about.png"
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
                            See the future with high-performance electric cars
                            produced by renowned brands. They feature futuristic
                            builds and designs with new and innovative platforms
                            that last a long time.
                        </p>
                        <span class="button">Know more</span>
                    </div>
                </div>
            </section>
            <section id="popular" class="popular section">
                <h2 class="section__title">
                    Choose Your Electric Car
                    <br />
                    Of The Porsche Brand
                </h2>
                <div class="popular__container container">
                    <el-carousel trigger="click" height="350px">
                        <el-carousel-item>
                            <article class="popular__card">
                                <div class="shape shape__smaller"></div>
                                <h1 class="popular__title">Porsche</h1>
                                <h3 class="popular__subtitle">Turbo S</h3>
                                <img
                                    src="../../../assets/img/car/popular1.png"
                                    alt=""
                                    class="popular__img"
                                />
                                <div class="popular__data">
                                    <div class="popular__data-group">
                                        <i class="iconfont configure"></i>
                                        3.7 Sec
                                    </div>
                                    <div class="popular__data-group">
                                        <i class="iconfont shangsheng-2"></i>
                                        256 Km/h
                                    </div>
                                    <div class="popular__data-group">
                                        <i
                                            class="iconfont qichexiangguan-chongdianzhan"
                                        ></i>
                                        Electric
                                    </div>
                                </div>
                                <h3 class="popular__price">$175,900</h3>
                                <button class="button popular__button">
                                    <i class="iconfont shop"></i>
                                </button>
                            </article>
                        </el-carousel-item>
                        <el-carousel-item>
                            <article class="popular__card">
                                <div class="shape shape__smaller"></div>
                                <h1 class="popular__title">Porsche</h1>
                                <h3 class="popular__subtitle">Taycan</h3>
                                <img
                                    src="../../../assets/img/car/popular2.png"
                                    alt=""
                                    class="popular__img"
                                />
                                <div class="popular__data">
                                    <div class="popular__data-group">
                                        <i class="iconfont configure"></i>
                                        3.7 Sec
                                    </div>
                                    <div class="popular__data-group">
                                        <i class="iconfont shangsheng-2"></i>
                                        256 Km/h
                                    </div>
                                    <div class="popular__data-group">
                                        <i
                                            class="iconfont qichexiangguan-chongdianzhan"
                                        ></i>
                                        Electric
                                    </div>
                                </div>
                                <h3 class="popular__price">$114,900</h3>
                                <button class="button popular__button">
                                    <i class="iconfont shop"></i>
                                </button>
                            </article>
                        </el-carousel-item>
                        <el-carousel-item>
                            <article class="popular__card">
                                <div class="shape shape__smaller"></div>
                                <h1 class="popular__title">Porsche</h1>
                                <h3 class="popular__subtitle">Turbo S Cross</h3>
                                <img
                                    src="../../../assets/img/car/popular3.png"
                                    alt=""
                                    class="popular__img"
                                />
                                <div class="popular__data">
                                    <div class="popular__data-group">
                                        <i class="iconfont configure"></i>
                                        3.7 Sec
                                    </div>
                                    <div class="popular__data-group">
                                        <i class="iconfont shangsheng-2"></i>
                                        256 Km/h
                                    </div>
                                    <div class="popular__data-group">
                                        <i
                                            class="iconfont qichexiangguan-chongdianzhan"
                                        ></i>
                                        Electric
                                    </div>
                                </div>
                                <h3 class="popular__price">$150,900</h3>
                                <button class="button popular__button">
                                    <i class="iconfont shop"></i>
                                </button>
                            </article>
                        </el-carousel-item>
                        <el-carousel-item>
                            <article class="popular__card">
                                <div class="shape shape__smaller"></div>
                                <h1 class="popular__title">Porsche</h1>
                                <h3 class="popular__subtitle">Boxster 718</h3>
                                <img
                                    src="../../../assets/img/car/popular4.png"
                                    alt=""
                                    class="popular__img"
                                />
                                <div class="popular__data">
                                    <div class="popular__data-group">
                                        <i class="iconfont configure"></i>
                                        3.7 Sec
                                    </div>
                                    <div class="popular__data-group">
                                        <i class="iconfont shangsheng-2"></i>
                                        256 Km/h
                                    </div>
                                    <div class="popular__data-group">
                                        <i
                                            class="iconfont qichexiangguan-chongdianzhan"
                                        ></i>
                                        Electric
                                    </div>
                                </div>
                                <h3 class="popular__price">$125,900</h3>
                                <button class="button popular__button">
                                    <i class="iconfont shop"></i>
                                </button>
                            </article>
                        </el-carousel-item>
                        <el-carousel-item>
                            <article class="popular__card">
                                <div class="shape shape__smaller"></div>
                                <h1 class="popular__title">Porsche</h1>
                                <h3 class="popular__subtitle">Cayman</h3>
                                <img
                                    src="../../../assets/img/car/popular5.png"
                                    alt=""
                                    class="popular__img"
                                />
                                <div class="popular__data">
                                    <div class="popular__data-group">
                                        <i class="iconfont configure"></i>
                                        3.7 Sec
                                    </div>
                                    <div class="popular__data-group">
                                        <i class="iconfont shangsheng-2"></i>
                                        256 Km/h
                                    </div>
                                    <div class="popular__data-group">
                                        <i
                                            class="iconfont qichexiangguan-chongdianzhan"
                                        ></i>
                                        Electric
                                    </div>
                                </div>
                                <h3 class="popular__price">$128,900</h3>
                                <button class="button popular__button">
                                    <i class="iconfont shop"></i>
                                </button>
                            </article>
                        </el-carousel-item>
                    </el-carousel>
                    <div class="swiper-pagination"></div>
                </div>
            </section>
            <section id="features" class="features section">
                <h2 class="section__title">More Features</h2>
                <div class="features__container container grid">
                    <div class="features__group">
                        <img
                            src="../../../assets/img/car/features.png"
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
                    src="../../../assets/img/car/map.svg"
                    alt=""
                    class="features__map"
                />
            </section>
            <section id="featured" class="featured section">
                <h2 class="section__title">Featured Luxury Cars</h2>
                <div class="featured__container container">
                    <ul class="featured__filters">
                        <li>
                            <button class="featured__item active-featured">
                                <span>All</span>
                            </button>
                        </li>
                        <li>
                            <button class="featured__item">
                                <img src="../../../assets/img/car/logo3.png" />
                            </button>
                        </li>
                        <li>
                            <button class="featured__item">
                                <img src="../../../assets/img/car/logo2.png" />
                            </button>
                        </li>
                        <li>
                            <button class="featured__item">
                                <img src="../../../assets/img/car/logo1.png" />
                            </button>
                        </li>
                    </ul>
                    <div class="featured__content grid">
                        <article class="featured__card">
                            <div class="shape shape__smaller"></div>
                            <h1 class="featured__title">Tesla</h1>
                            <h3 class="featured__subtitle">Model X</h3>
                            <img
                                src="../../../assets/img/car/featured1.png"
                                alt=""
                                class="featured__img"
                            />
                            <h3 class="featured__price">$98,900</h3>
                            <button class="button featured__button">
                                <i class="iconfont shop"></i>
                            </button>
                        </article>
                        <article class="featured__card">
                            <div class="shape shape__smaller">Tesla></div>
                            <h1 class="featured__title">Model 3</h1>
                            <h3 class="featured__subtitle"></h3>
                            <img
                                src="../../../assets/img/car/featured2.png"
                                alt=""
                                class="featured__img"
                            />
                            <h3 class="featured__price">$45,900</h3>
                            <button class="button featured__button">
                                <i class="iconfont shop"></i>
                            </button>
                        </article>
                        <article class="featured__card">
                            <div class="shape shape__smaller"></div>
                            <h1 class="featured__title">Audi</h1>
                            <h3 class="featured__subtitle">E-tron</h3>
                            <img
                                src="../../../assets/img/car/featured3.png"
                                alt=""
                                class="featured__img"
                            />
                            <h3 class="featured__price">$175,900</h3>
                            <button class="button featured__button">
                                <i class="iconfont shop"></i>
                            </button>
                        </article>
                        <article class="featured__card">
                            <div class="shape shape__smaller"></div>
                            <h1 class="featured__title">Porsche</h1>
                            <h3 class="featured__subtitle">Boxster 987</h3>
                            <img
                                src="../../../assets/img/car/featured4.png"
                                alt=""
                                class="featured__img"
                            />
                            <h3 class="featured__price">$126,900</h3>
                            <button class="button featured__button">
                                <i class="iconfont shop"></i>
                            </button>
                        </article>
                        <article class="featured__card">
                            <div class="shape shape__smaller"></div>
                            <h1 class="featured__title">Porsche</h1>
                            <h3 class="featured__subtitle">Panamera</h3>
                            <img
                                src="../../../assets/img/car/featured5.png"
                                alt=""
                                class="featured__img"
                            />
                            <h3 class="featured__price">$126,900</h3>
                            <button class="button featured__button">
                                <i class="iconfont shop"></i>
                            </button>
                        </article>
                    </div>
                </div>
            </section>
            <section class="offer section">
                <div class="offer__container container grid">
                    <img
                        src="../../../assets/img/car/offer-bg.png"
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
                            Be the first to receive all the information about
                            our products and new cars by email by subscribing to
                            our mailing list.
                        </p>
                        <a href="#" class="butto">Subscribe Now</a>
                    </div>
                    <img
                        src="../../../assets/img/car/offer.png"
                        alt=""
                        class="offer__img"
                    />
                </div>
            </section>
            <section class="logos section">
                <div class="logos__container container grid">
                    <div class="logos__content">
                        <img
                            src="../../../assets/img/car/logo1.png"
                            alt=""
                            class="logos__img"
                        />
                    </div>
                    <div class="logos__content">
                        <img
                            src="../../../assets/img/car/logo2.png"
                            alt=""
                            class="logos__img"
                        />
                    </div>
                    <div class="logos__content">
                        <img
                            src="../../../assets/img/car/logo3.png"
                            alt=""
                            class="logos__img"
                        />
                    </div>
                    <div class="logos__content">
                        <img
                            src="../../../assets/img/car/logo4.png"
                            alt=""
                            class="logos__img"
                        />
                    </div>
                    <div class="logos__content">
                        <img
                            src="../../../assets/img/car/logo5.png"
                            alt=""
                            class="logos__img"
                        />
                    </div>
                    <div class="logos__content">
                        <img
                            src="../../../assets/img/car/logo6.png"
                            alt=""
                            class="logos__img"
                        />
                    </div>
                </div>
            </section>
            <footer class="footer section">
                <div class="shape shape__big"></div>
                <div class="shape shape__small"></div>
                <div class="footer__container container grid">
                    <div class="footer__content">
                        <a href="#" class="footer__logo">
                            <i class="iconfont streering"></i>
                            Elecar
                        </a>
                        <p class="fotter__description">
                            We offer the best electric cars of
                            <br />
                            the most recognized brands in
                            <br />
                            the world.
                        </p>
                    </div>
                    <div class="fotter_content">
                        <h3 class="footer__title">Company</h3>
                        <ul class="footer__links">
                            <li>
                                <a href="#" class="footer__link">About</a>
                            </li>
                            <li>
                                <a href="#" class="footer__link">Cars</a>
                            </li>
                            <li>
                                <a href="#" class="footer__link">History</a>
                            </li>
                            <li>
                                <a href="#" class="footer__link">Shop</a>
                            </li>
                        </ul>
                    </div>
                    <div class="fotter_content">
                        <h3 class="footer__title">Information</h3>
                        <ul class="footer__links">
                            <li>
                                <a href="#" class="footer__link">
                                    Request a quote
                                </a>
                            </li>
                            <li>
                                <a href="#" class="footer__link">
                                    Find a dealer
                                </a>
                            </li>
                            <li>
                                <a href="#" class="footer__link">Contact us</a>
                            </li>
                            <li>
                                <a href="#" class="footer__link">Services</a>
                            </li>
                        </ul>
                    </div>
                    <div class="fotter_content">
                        <h3 class="footer__title">Follow us</h3>
                        <ul class="footer__social">
                            <a href="#" class="footer__social-link">
                                <i class="iconfont facebook"></i>
                            </a>
                            <a href="#" class="footer__social-link">
                                <i class="iconfont linkedin"></i>
                            </a>

                            <a href="#" class="footer__social-link">
                                <i class="iconfont twitter"></i>
                            </a>
                        </ul>
                    </div>
                </div>
                <span class="footer__copy">
                    &#169; Bedimcode. All rigths reserved
                </span>
            </footer>
            <a href="" class="scrollup">
                <i class="iconfont arrowup"></i>
            </a>
        </main>
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

<style lang="scss" scoped>
    /*=============== GOOGLE FONTS ===============*/
    @import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600&display=swap');

    .body {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: var(--body-font);
        font-size: var(--normal-font-size);
        background-color: var(--body-color) !important;
        color: var(--text-color);
        overflow: auto;
    }

    html {
        scroll-behavior: smooth;
    }

    h1,
    h2,
    h3 {
        color: var(--title-color);
        font-weight: var(--font-semi-bold);
    }

    img {
        max-width: 100%;
        height: auto;
    }

    /*=============== REUSABLE CSS CLASSES ===============*/
    .container {
        max-width: 1024px;
        margin-right: 1.5rem;
        margin-left: 1.5rem;
    }

    .grid {
        display: grid;
        gap: 1.5rem;
    }

    .section {
        padding: 4.5rem 0 2rem;
    }

    .section__title {
        font-size: var(--h2-font-size);
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .header {
        width: 100%;
        background-color: transparent;
        position: fixed;
        top: 0;
        left: 0;
        z-index: var(--z-fixed);
    }

    .nav {
        height: var(--header-height);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav__logo,
    .nav__toggle {
        color: var(--title-color);
        display: inline-flex;
    }

    .nav__logo {
        align-items: center;
        column-gap: 0.25rem;
        font-weight: var(--font-medium);
        transition: 0.3s;
    }

    .nav__logo i {
        font-size: 1.25rem;
    }

    .nav__logo:hover {
        color: var(--first-color);
    }

    .nav__toggle {
        font-size: 1.25rem;
        cursor: pointer;
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
        }
    }

    .nav__list {
        display: flex;
        flex-direction: column;
        text-align: center;
        row-gap: 3rem;
        padding-top: 9rem;
    }

    .nav__link {
        text-transform: uppercase;
        color: var(--title-color);
        font-size: var(--h2-font-size);
        font-weight: var(--font-medium);
        transition: 0.3s;
    }

    .nav__link:hover {
        color: var(--first-color);
    }

    .nav__close {
        font-size: 2rem;
        color: var(--white-color);
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
    }

    .scroll-header {
        border-radius: 0 0 1rem 1rem;
        background-color: var(--body-color);
        box-shadow: 0 2px 4px hsla(0, 0%, 1%, 1);
    }

    .show-menu {
        left: 0;
    }

    .home__center {
        position: relative;
        overflow: hidden;
    }

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
    }

    .home__data {
        text-align: center;
    }

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
        column-gap: 0.25rem;
    }

    .home__elec i {
        font-size: var(--small-font-size);
        color: var(--first-color);
    }

    .home__img {
        width: 280px;
        justify-self: center;
    }

    .home__car {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 4rem;
        margin-bottom: 2rem;
    }

    .home__car-name {
        font-size: 0.635rem;
        font-weight: 400;
        color: var(--text-color-light);
    }

    .home__car-data {
        text-align: center;
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
    }

    .home__button::before {
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

    .about__container {
        row-gap: 6rem;
    }

    .about__group {
        position: relative;
    }

    .about__img {
        width: 310px;
        border-radius: 0.5rem;
    }

    .about__card {
        width: 180px;
        position: absolute;
        right: 0;
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

    .about__title {
        text-align: center;
        margin-bottom: 2rem;
    }

    .about__description {
        margin-bottom: 2rem;
    }

    .button {
        background-color: var(--first-color);
        color: var(--white-color);
        padding: 1rem 2rem;
        border-radius: 0.25rem;
        font-size: var(--normal-font-size);
        transition: 0.3s;
    }

    .button:hover {
        background-color: var(--first-color-alt);
    }

    .popular__container {
        padding-top: 1rem;
    }

    .popular__card {
        position: relative;
        width: 238px;
        background-color: var(--container-color);
        padding: 2rem 1.5rem 1.5rem;
        border-radius: 1rem;
        margin-bottom: 3.5rem;
        overflow: hidden;
    }

    .popular__card .shape__smaller {
        position: absolute;
        top: -2.5rem;
        left: 2.5rem;
    }

    .popular__title,
    .popular__subtitle,
    .popular__img {
        position: relative;
    }

    .popular__title {
        font-size: var(--h2-font-size);
        margin-bottom: 0.25rem;
    }

    .popular__subtitle {
        font-size: var(--normal-font-size);
        color: var(--text-color);
        font-weight: 400;
    }

    .popular__img {
        width: 160px;
        margin: 0.75rem 0 1.25rem 1.25rem;
        transition: 0.3s;
    }

    .popular__data {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        gap: 0.5rem 1.25rem;
        margin-bottom: 2rem;
    }

    .popular__data-group {
        display: inline-flex;
        align-items: center;
        column-gap: 0.5rem;
        font-size: var(--small-font-size);
        color: var(--white-color);
    }

    .popular__data i {
        font-size: 1rem;
    }

    .popular__price {
        font-size: var(--h3-font-size);
    }

    .popular__button {
        border: none;
        outline: none;
        padding: 0.75rem 1rem;
        position: absolute;
        right: 0;
        bottom: 0;
        border-radius: 1rem 0 1rem 0;
        cursor: pointer;
    }

    .popular__button i {
        font-size: 1.25rem;
    }

    .popular__card:hover .popular__img {
        transform: translateY(-0.25rem);
    }

    .features {
        overflow: hidden;
        position: relative;
    }

    .features__container {
        padding-top: 2rem;
        grid-template-columns: 285px;
        justify-content: center;
    }

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

    .features__card-title {
        font-size: var(--h3-font-size);
        margin-bottom: 0.25rem;
    }

    .features__card-description {
        font-size: var(--smaller-font-size);
    }

    .features__map {
        max-width: initial;
        width: 450px;
        position: absolute;
        top: 8rem;
        //left: 2rem;
        margin: auto;
        transform: rotate(-22deg);
    }

    .featured__content {
        padding-top: 1rem;
    }

    .featured__filters {
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
        column-gap: 1rem;
        margin-bottom: 3.5rem;
    }

    .featured__item {
        width: 48px;
        height: 48px;
        border: none;
        outline: none;
        padding: 0.75rem;
        border-radius: 0.75rem;
        background-color: var(--container-color);
        color: var(--white-color);
        font-size: var(--normal-font-size);
        cursor: pointer;
        transition: 0.3s;
    }

    .featured__item img {
        width: 1.5rem;
    }

    .featured__item span,
    .featured__item img {
        opacity: 0.3s;
        transition: 0.3s;
    }

    .featured__item:hover {
        background-color: var(--first-color);
    }

    .featured__item:hover span,
    .featured__item:hover img {
        opacity: 1;
    }

    .featured__content {
        grid-template-columns: 228px;
        row-gap: 2.5rem;
        justify-content: center;
    }

    .featured__card {
        position: relative;
        background-color: var(--container-color);
        padding: 2rem 1.5rem 1.5rem;
        border-radius: 1rem;
    }

    .featured__card .shape__smaller {
        position: absolute;
        inset: 0;
        margin: auto;
    }

    .featured__title,
    .featured__subtitle,
    .featured__img {
        position: relative;
    }

    .featured__title {
        font-size: var(--h2-font-size);
        margin-bottom: 0.25rem;
    }

    .featured__subtitle {
        font-size: var(--normal-font-size);
        color: var(--text-color);
        font-weight: 400;
    }

    .featured__img {
        width: 180px;
        margin: 1.5rem 0;
        transition: 0.3s;
    }

    .featured__price {
        font-size: var(--h3-font-size);
    }

    .featured__button {
        border: none;
        outline: none;
        padding: 0.75rem 1rem;
        position: absolute;
        right: 0;
        bottom: 0;
        border-radius: 1rem 0 1rem 0;
        cursor: pointer;
    }

    .featured__button i {
        font-size: 1.25rem;
    }

    .featured__card:hover .featured__img {
        transform: translateX(-0.25rem);
    }

    .active-featured {
        background-color: var(--first-color);
    }

    .active-featured span,
    .active-featured i {
        opacity: 1;
    }

    .offer {
        position: relative;
        overflow: hidden;
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
        right: -5.5rem;
    }

    .logos__img {
        width: 40px;
        opacity: 0.4;
        transition: 0.3s;
    }

    .logos__container {
        grid-template-columns: repeat(3, max-content);
        justify-content: center;
        align-items: center;
        gap: 4rem;
        padding-bottom: 2rem;
    }

    .logos__img:hover {
        opacity: 1;
    }

    .footer {
        position: relative;
        overflow: hidden;
    }

    .footer .shape__big,
    .footer .shape__small {
        position: absolute;
    }

    .footer .shape__big {
        width: 300px;
        height: 300px;
        left: -2rem;
        top: 6rem;
    }

    .footer .shape__small {
        right: -13rem;
        bottom: -6rem;
    }

    .footer__container {
        row-gap: 2.5rem;
        position: relative;
    }

    .footer__logo {
        display: inline-flex;
        align-items: center;
        column-gap: 0.25rem;
        color: var(--title-color);
        font-size: var(--h2-font-size);
        font-weight: var(--font-semi-bold);
        margin-bottom: 1.25rem;
        transition: 0.3s;
    }

    .footer__logo:hover {
        color: var(--first-color);
    }

    .footer__title {
        font-size: var(--h3-font-size);
        margin-bottom: 1.25rem;
    }

    .footer__links {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
    }

    .footer__link,
    .footer__social-link {
        color: var(--text-color);
        transition: 0.3s;
    }

    .footer__link:hover,
    .footer__social-link:hover {
        color: var(--first-color);
    }

    .footer__social {
        display: flex;
        column-gap: 1.5rem;
    }

    .footer__social-link {
        font-size: 1.25rem;
    }

    .footer__copy {
        display: block;
        margin-top: 4.5rem;
        text-align: center;
        font-size: var(--small-font-size);
        color: var(--text-color-light);
    }

    ::-webkit-scrollbar {
        width: 0.6rem;
        background-color: hsl(219, 4%, 16%);
        border-radius: 1rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: hsl(219, 4%, 24%);
        border-radius: 1rem;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: hsl(219, 4%, 32%);
    }

    .scrollup {
        position: fixed;
        right: 1rem;
        bottom: 3rem;
        background-color: hsla(0, 0%, 100%, 0.1);
        backdrop-filter: blur(16px);
        display: inline-flex;
        padding: 0.45rem;
        border-radius: 0.5rem;
        font-size: 1.5rem;
        color: var(--white-color);
        z-index: var(--z-tooltip);
        transition: 0.4s;
    }

    .scrollup:hover {
        transform: translateY(-0.25rem);
    }

    .show-scroll {
        bottom: 3rem;
    }
</style>
