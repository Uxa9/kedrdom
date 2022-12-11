import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout"

import axios from 'axios';
import { useRouter } from "next/router";
import SideCatalogMenu from "../../layouts/SideCatalogMenu";
import GoodsCard from "../../components/GoodsCard";

import styles from "../../styles/Catalog.module.scss";

const Catalog = () => {

    const [catName, setCatName] = useState("");
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (router.query.id === undefined) return;
        
        axios.get(`http://95.163.242.54:5000/category/${router.query.id}`).then(res => {
            setCatName(res.data.name);
        });
        axios.get(`http://95.163.242.54:5000/product/category/${router.query.id}`).then(res => {
            setProducts(res.data);
        });
    }, [router.query.id]);

    return (
        <MainLayout>
            <SideCatalogMenu />
            <section
                className={styles['catalog']}
            >
                <h1>
                    {catName}
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