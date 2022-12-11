import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout"

import axios from 'axios';
import { useRouter } from "next/router";
import SideCatalogMenu from "../../layouts/SideCatalogMenu";
import GoodsCard from "../../components/GoodsCard";

import styles from "../../styles/Catalog.module.scss";


const Catalog = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://95.163.242.54:5000/product/").then(res => {
            setProducts(res.data);
        });
    }, []);

    return (
        <MainLayout>
            <SideCatalogMenu />
            <section
                className={styles['catalog']}
            >
                <h1>
                    Каталог
                </h1>
                <div
                    className={styles['cards']}
                >
                    {products.map(pr => {
                        return (
                            <GoodsCard
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