import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import axios from "axios";

import styles from "../../styles/Product.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Navigation, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import Image from "next/image";
import { Noto_Sans } from "@next/font/google";

const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

const Product = () => {

    const router = useRouter();

    const [cat, setCat] = useState("");
    const [product, setProduct] = useState({});

    useEffect(() => {
        if (router.query.id === undefined) return;

        axios.get(`http://95.163.242.54:5000/product/${router.query.id}`).then(res => {
            console.log(res.data);
            setProduct(res.data);

            axios.get(`http://95.163.242.54:5000/category/${res.data.categoryId}`).then(res => {
                setCat(res.data.name);
            });
        });
    }, [router.query.id])

    return (
        <MainLayout>
            <section
                className={styles["product-wrapper"]}
            >
                <div
                    className={`${styles["breadscrumbs"]} ${textFont.className}`}
                >
                    <Link href={"../catalog"}>
                        Каталог
                    </Link>
                    <Link href={`../catalog/${product?.categoryId}`}>
                        {cat}
                    </Link>
                    <span>
                        {product?.name}
                    </span>
                </div>
                <main>
                    <div
                        className={styles["slider-wrapper"]}
                    >
                        <Swiper
                            // navigation={true}
                            modules={[Autoplay, Navigation]}
                            loop={true}
                            slidesPerView={2}
                            className="patau"
                            // breakpoints={{
                            //     840: {
                            //         slidesPerView: 1,
                            //         spaceBetween: 50,
                            //     },
                            //     841: {
                            //         slidesPerView: 2,
                            //         spaceBetween: 20,
                            //     },
                            //     1024: {
                            //         slidesPerView: 2,
                            //         spaceBetween: 30,
                            //     },
                            // }}             
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: true,
                            }}
                        >
                            <SwiperSlide>
                                <Image
                                    src={""}
                                    alt="present 1"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={""}
                                    alt="present 2"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    src={""}
                                    alt="present 3"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div>
                        <h1>

                        </h1>
                        <p>

                        </p>
                        <div>
                            toggle button
                        </div>
                        <div>
                            <p>
                                price
                            </p>
                            <div>
                                <p>

                                </p>
                                <p>

                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <div>
                    <p>

                    </p>
                </div>
                <div>
                    <div>
                        <span>

                        </span>
                        <ul>

                        </ul>
                    </div>
                    <div>
                        <span>

                        </span>
                        <div>
                            <span>

                            </span>
                            <span>

                            </span>
                            <span>

                            </span>
                        </div>
                    </div>
                    <div>
                        <span>

                        </span>
                        <div>
                            <span>

                            </span>
                            <span>

                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Product;