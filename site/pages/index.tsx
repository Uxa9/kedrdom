import { useRef } from "react";
import Image from "next/image";
import MainLayout from "../layouts/MainLayout";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Navigation, Autoplay } from "swiper";

import { Noto_Sans } from "@next/font/google";

import styles from '../styles/index.module.scss';
import 'swiper/css';
import "swiper/css/navigation";

import main1 from '../public/main_1.jpg';
import main2 from '../public/main_2.jpg';
import main3 from '../public/main_3.jpg';
import icon1 from '../public/icon_1.png';
import icon2 from '../public/icon_2.png';
import icon3 from '../public/icon_3.png';
import icon4 from '../public/icon_4.png';
import cat1  from '../public/jam.webp'; 
import cat2  from '../public/honey.jpg';
import cat3  from '../public/tea.webp';
import cat4  from '../public/oil.jpg';
import cat5  from '../public/sweets.webp';
import cat6  from '../public/meat.webp';     
import present1 from '../public/present_1.jpg';
import present2 from '../public/present_2.jpg';
import present3 from '../public/present_3.jpg';
import whatsapp from '../public/whatsapp.svg';
import telegram from '../public/telegram.svg';
import Button from "../components/Button";
import { useRouter } from "next/router";
import Divider from "../components/Divider";
import Link from "next/link";


const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

const Index = () => {

    const router = useRouter();
    const swiperRef = useRef<SwiperCore>();

    return (
        <MainLayout>
            <div
                className={styles["index-page-wrapper"]}
            >
                <section
                    className={styles["welcome-section"]}
                >
                    <div
                        className={styles["welcome-section-images"]}
                    >
                        <div
                            className={styles["image-container"]}
                        >
                            <div className={styles["background"]} />
                            <Image
                                src={main1}
                                alt={"big-image"}
                            />
                        </div>
                        <div
                            className={styles["image-container"]}
                        >
                            <div className={styles["background"]} />
                            <Image
                                src={main2}
                                alt={"small-image"}
                            />
                        </div>
                    </div>
                    <main>
                        <h1>
                            Добро пожаловать!
                        </h1>
                        <p
                            className={textFont.className}
                        >
                            Кедровый Дом Масловых приветсвует своих гостей.
                            Мы магазин натуральной таежной продукции
                            открываем свои двери каждый день,
                            чтобы радовать вас, приходите!
                        </p>
                        <div
                            className={styles["actions-wrapper"]}
                        >
                            <div
                                className={styles["links-block"]}
                            >
                                <p
                                    className={textFont.className}
                                >
                                    Наши соц. сети
                                </p>
                                <div
                                    className={styles.links}
                                >
                                    <a href="">
                                        <Image
                                            src={whatsapp}
                                            alt={"whatsapp"}
                                        />
                                    </a>
                                    <a href="">
                                        <Image
                                            src={telegram}
                                            alt={"telegram"}
                                        />
                                    </a>
                                </div>
                            </div>
                            <div
                                className={`${textFont.className} ${styles['work-time-block']}`}
                            >
                                <p>
                                    Наш режим работы
                                </p>
                                <p
                                    className={styles['work-time']}
                                >
                                    Пн-Сб с 11 до 19 <br/>
                                    Вс с 11 до 18
                                </p>
                            </div>
                            <Button
                                onClick={() => router.push('/catalog?page=1')}
                                text="Каталог"
                            />
                        </div>
                    </main>
                </section>
                <section
                    className={styles["our-workshop-section"]}
                >
                    <header>
                        <h2>
                            Наше ремесло
                        </h2>
                    </header>
                    <div
                        className={styles["our-workshop-section-content"]}
                    >
                        <main>
                            <p
                                className={textFont.className}
                            >
                                Уже более 4х лет мы являемся производителями
                                натурального-сыродавленного масла из
                                орехов и семян
                            </p>
                            <p
                                className={textFont.className}
                            >
                                Такое масло еще называют ЖИВЫМ.<br />
                                Мы отжимаем его на деревянном прессе, благодаря
                                чему масло не имеет контакта с металлом,
                                и не подвергается окислению,
                                что позволяет сохранить все самые полезные свойства и поделиться ими с вами!
                            </p>
                            <a
                                href="catalog/6395bf41c6b13635e1886c8a"
                                className={styles["open-oil-link"]}
                            >
                                <span className={textFont.className}>
                                    Открыть каталог масел
                                </span>
                                <div className={styles["arrow"]} />
                            </a>
                        </main>
                        <div
                            className={styles["image-container"]}
                        >
                            <Image
                                src={main3}
                                alt={"main_3"}
                            />
                        </div>
                    </div>
                </section>
                <section
                    className={styles["icons-section"]}
                >
                    <div>
                        <div>
                            <Image
                                src={icon1}
                                alt={"icon1"}
                            />
                        </div>
                        <span>
                            Широкий ассортимент
                        </span>
                    </div>
                    <div>
                        <div>
                            <Image
                                src={icon2}
                                alt={"icon2"}
                            />
                        </div>
                        <span>
                            Натуральная продукция
                        </span>
                    </div>
                    <div>
                        <div>
                            <Image
                                src={icon3}
                                alt={"icon3"}
                            />
                        </div>
                        <span>
                            Контроль качества
                        </span>
                    </div>
                    <div>
                        <div>
                            <Image
                                src={icon4}
                                alt={"icon4"}
                            />
                        </div>
                        <span>
                            Лучшая цена
                        </span>
                    </div>
                </section>
                <Divider />
                <nav
                    className={styles["catalog-navigation"]}
                >
                    <header>
                        <h2>
                            Каталог
                        </h2>
                    </header>
                    <main>
                        <Link
                            className={styles["catalog-element"]}
                            href="catalog/63909340c6b13635e188586d"
                        >
                            <span>
                                Варенье
                            </span>
                            <Image
                                src={cat1}
                                alt="Варенье"
                            />
                        </Link>
                        <Link
                            className={styles["catalog-element"]}
                            href="catalog/63941926c6b13635e1885cd2"
                        >
                            <span>
                                Мёд
                            </span>
                            <Image
                                src={cat2}
                                alt="Варенье"
                            />
                        </Link>
                        <Link
                            className={styles["catalog-element"]}
                            href="catalog/63949755c6b13635e1886651"
                        >
                            <span>
                                Чай
                            </span>
                            <Image
                                src={cat3}
                                alt="Варенье"
                            />
                        </Link>
                        <Link
                            className={styles["catalog-element"]}
                            href="catalog/6395bf41c6b13635e1886c8a"
                        >
                            <span>
                                Масло
                            </span>
                            <Image
                                src={cat4}
                                alt="Варенье"
                            />
                        </Link>
                        <Link
                            className={styles["catalog-element"]}
                            href="catalog/6395bf5bc6b13635e1886c90"
                        >
                            <span>
                                Сласти
                            </span>
                            <Image
                                src={cat5}
                                alt="Варенье"
                            />
                        </Link>
                        <Link
                            className={styles["catalog-element"]}
                            href="catalog/6395bf64c6b13635e1886c94"
                        >
                            <span>
                                Дикое мясо
                            </span>
                            <Image
                                src={cat6}
                                alt="Варенье"
                            />
                        </Link>
                    </main>
                    <Button
                        onClick={() => router.push('/catalog?page=1')}
                        text="Показать все"
                    />
                </nav>
                <section
                    className={styles["carousel"]}
                >
                    <div 
                        className={`${styles["swiper-arrow"]} ${styles["arrow-prev"]}`}
                        onClick={() => swiperRef.current?.slidePrev()}
                    />
                    <Swiper
                        // navigation={true}
                        modules={[Autoplay, Navigation]}
                        loop={true}
                        slidesPerView="auto"
                        className={'aboba'}
                        breakpoints={{
                            840: {
                                slidesPerView: 1,
                                spaceBetween: 50,
                            },
                            841: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}                        
                        centeredSlides={true}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                    >
                        <SwiperSlide>
                            <Image
                                src={present1}
                                alt="present 1"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={present2}
                                alt="present 2"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={present3}
                                alt="present 3"
                            />
                        </SwiperSlide>
                    </Swiper>
                    <div 
                        className={`${styles["swiper-arrow"]} ${styles["arrow-next"]}`}
                        onClick={() => swiperRef.current?.slideNext()}
                    />
                    <h2>
                        <Link href={"/"} />
                        Каталог подарков
                    </h2>
                </section>
            </div>
        </MainLayout>
    )
}

export default Index;