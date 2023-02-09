import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useRef, useState} from "react";
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

interface Variant {
    weight: number,
    price: number,
    available: boolean,
    supplyDate: string
}

interface Product {
    name: string,
    brief: string,
    description: string,
    containment: string[],
    pfc: {
        proteins: number,
        fats: number,
        carbohydrates: number
    },
    photos: string[],
    expiredDate: string,
    storageCondition: string,
    show: boolean,
    categoryId: string,
    variants: Variant[]
}

const Product = () => {

    const router = useRouter();
    const swiperRef = useRef<SwiperCore>();

    const [cat, setCat] = useState("");
    const [product, setProduct] = useState<any>({
        brief: "",
        categoryId: "",
        containment: [],
        description: "",
        expiredDate: "",
        name: "",
        pfc: {carbohydrates: 0, fats: 0, proteins: 0},
        photos: [],
        show: false,
        storageCondition: "",
        variants: []
    });

    useEffect(() => {
        if (router.query.id === undefined) return;

        axios.get(`http://localhost:5000/present/${router.query.id}`).then(res => {
            setProduct(res.data);

            axios.get(`http://localhost:5000/category/${res.data.categoryId}`).then(res => {
                setCat(res.data.name);
            });
        });
    }, [router.query.id]);
    console.log(product);

    return (
        <MainLayout>
            <section
                className={`${styles["product-wrapper"]} ${textFont.className}`}
            >
                <div
                    className={`${styles["breadscrumbs"]} ${textFont.className}`}
                >
                    <Link href={"../presents"}>
                        Подарки
                    </Link>
                    <Link href={`../presents/${product.categoryId}?page=1`}>
                        {cat}
                    </Link>
                    <span>
                        {product.name}
                    </span>
                </div>
                <div
                    className={styles["back-button"]}
                    onClick={() => {router.back()}}
                >
                    <div className={styles["arrow"]} />
                    Вернуться назад
                </div>
                <main>
                    <div
                        className={styles["slider-wrapper"]}
                    >
                        {product.photos.length !== 0 &&
                            <>
                                <div
                                    className={`${styles["swiper-arrow"]} ${styles["arrow-prev"]}`}
                                    onClick={() => swiperRef.current?.slidePrev()}
                                />
                                <Swiper
                                    modules={[Autoplay, Navigation]}
                                    loop={true}
                                    slidesPerView={"auto"}
                                    className="patau"
                                    spaceBetween={0}
                                    breakpoints={{
                                        940: {
                                            slidesPerView: 1,
                                            spaceBetween: 0,
                                        },
                                        1024: {
                                            slidesPerView: 1,
                                            spaceBetween: 30,
                                        },
                                        1200: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                    }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: true,
                                    }}
                                    onBeforeInit={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                >
                                    {product.photos.map((photoLink, index) => {
                                        return <SwiperSlide key={index}>
                                            <Image
                                                src={`https://kedrdom27.ru:5000/${photoLink}`}
                                                alt={"Фото подарка"}
                                                width={320}
                                                height={400}
                                            />
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                                <div
                                    className={`${styles["swiper-arrow"]} ${styles["arrow-next"]}`}
                                    onClick={() => swiperRef.current?.slideNext()}
                                />
                            </>
                        }
                    </div>
                    <div
                        className={styles["product-info"]}
                    >
                        <h1>
                            {product.name}
                        </h1>
                        <p>
                            {product.brief}
                        </p>
                        <p
                            className={styles["present-price"]}
                        >
                            {product.price} рублей
                        </p>
                    </div>
                </main>
                <div
                    className={styles['description']}
                >
                    <p>
                        {product.description}
                    </p>
                </div>
                <div
                    className={styles["additional-info"]}
                >
                    <div>
                        <span>
                            Состав:
                        </span>
                        <ul
                            className={styles["compound"]}
                        >
                            {product?.containment.toString().split('\n').map((item, index) => (
                                <li
                                    key={index}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Product;