<template>
    <div class="body">
        <Header></Header>
        <main class="main">
            <Home></Home>
            <About></About>
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
            <Features></Features>
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
            <Offer></Offer>
            <Logos></Logos>
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
    import Header from './components/Header.vue'
    import Home from './components/Home.vue'
    import About from './components/About.vue'
    import Features from './components/Features.vue'
    import Logos from '@/views/open/car/components/Logos.vue'
    import Offer from '@/views/open/car/components/Offer.vue'
</script>

<style lang="scss" scoped>
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

    .scroll-header {
        border-radius: 0 0 1rem 1rem;
        background-color: var(--body-color);
        box-shadow: 0 2px 4px hsla(0, 0%, 1%, 1);
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

    //@media screen and (max-width: 320px){
    //    .container {
    //        margin-left: 1rem;
    //        margin-right: 1rem;
    //    }
    //
    //    .home__car {
    //        column-gap: 2rem;
    //    }
    //
    //    .about__card {
    //        width: 150px;
    //    }
    //
    //    .offer__container {
    //        grid-template-columns: max-content 180px;
    //    }
    //
    //    .offer__img {
    //        width: 340px;
    //    }
    //
    //    .logos__container {
    //        gap: 2.5rem;
    //    }
    //}
    //
    //@media screen and (max-width: 576px) {
    //    .about__group {
    //        width: 350px;
    //        justify-self: center;
    //    }
    //
    //    .features__map {
    //        left: 0;
    //        right: 0;
    //    }
    //
    //    .featured__content {
    //        grid-template-columns: repeat(2,228px);
    //    }
    //
    //    .offer__container {
    //        grid-template-rows: initial;
    //        grid-template-columns: .5fr;
    //        justify-content: center;
    //    }
    //
    //    .offer__img {
    //        position: relative;
    //        bottom: initial;
    //        right: initial;
    //    }
    //
    //    .offer__data {
    //        margin-bottom: 4rem;
    //    }
    //}
    //
    //@media screen and (max-width: 767px) {
    //    .section {
    //        padding: 7rem 0 2rem;
    //    }
    //
    //    .nav {
    //        height: calc(var(--header-height) + 1.5rem);
    //    }
    //
    //    .nav__toggle,
    //    .nav__close {
    //        display: none;
    //    }
    //
    //    .nav__list {
    //        flex-direction: row;
    //        column-gap: 3rem;
    //        padding-top: 0;
    //    }
    //
    //    .nav__link {
    //        font-size: var(--normal-font-size);
    //        text-transform: initial;
    //    }
    //
    //    .about__container {
    //        grid-template-columns: repeat(2,1fr);
    //    }
    //
    //    .logos__container {
    //        gap: 4rem 8rem;
    //    }
    //
    //    .footer__container {
    //        grid-template-columns: repeat(2, 1fr);
    //    }
    //}
    //
    //@media screen and (max-width: 1040px){
    //    .container {
    //        margin-left: auto;
    //        margin-right: auto;
    //    }
    //
    //    .shape__big {
    //        width: 500px;
    //        height: 500px;
    //    }
    //
    //    .shape__small {
    //        width: 400px;
    //        height: 400px;
    //    }
    //
    //    .home__container {
    //        padding-top: 2rem;
    //    }
    //
    //    .home__img {
    //        width: 300px;
    //    }
    //
    //    .home__car {
    //        column-gap: 7rem;
    //    }
    //
    //    .home__car-icon {
    //        font-size: 1.25rem;
    //        margin-bottom: 1rem;
    //    }
    //
    //    .about__container {
    //        column-gap: 6rem;
    //        align-items: center;
    //    }
    //
    //    .about__group,
    //    .about__img {
    //        width: 480px;
    //    }
    //
    //    .about__card {
    //        width: 198px;
    //        padding: 1rem 1.25rem;
    //    }
    //}
</style>
