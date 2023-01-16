import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout"

import axios from 'axios';
import { useRouter } from "next/router";
import SideCatalogMenu from "../../layouts/SideCatalogMenu";
import GoodsCard from "../../components/GoodsCard";

import styles from "../../styles/Catalog.module.scss";

export async function getServerSideProps(ctx) {
    const products = await axios.get("https://kedrdom27.ru:5000/product/").then(res => {
        return res.data;
    });

    return {
        props: {products}
    }
}

const Catalog = (props) => {

    const products = props.products || [];
    console.log(products)
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     axios.get("https://kedrdom27.ru:5000/product/").then(res => {
    //         setProducts(res.data);
    //     });
    // }, []);

    return (
        <MainLayout>
            <section
                className={styles['catalog']}
            >
                <h1>
                    Каталог
                </h1>
                <div
                    className={styles['cards']}
                >
                    {products.map((pr, index) => {
                        return (
                            <GoodsCard
                                key={index}
                                data={pr}
                            />
                        )
                    })}
                </div>
            </section>
        </MainLayout>
    )
}

export default Catalog;