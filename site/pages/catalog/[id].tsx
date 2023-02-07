import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout"

import axios from 'axios';
import { useRouter } from "next/router";
import SideCatalogMenu from "../../layouts/SideCatalogMenu";
import GoodsCard from "../../components/GoodsCard";

import styles from "../../styles/Catalog.module.scss";
import Pagination from "../../components/Pagination";

export async function getServerSideProps(ctx) {

    const catName = await axios.get(`http://localhost:5000/category/${ctx.query.id}`).then(res => {
        return res.data.name;
    });

    const products = await axios.get(`http://localhost:5000/product/${ctx.query.id}/page=${ctx.query.page || 1}`).then(res => {
        return res.data;
    });

    return {
        props: { products, catName }
    }
}

const Catalog = (props) => {

    const products = props.products || [];
    const catName = props.catName || "";
    const router = useRouter();

    return (
        <MainLayout>
            <section
                className={styles['catalog']}
            >
                <h1>
                    {catName}
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
                <Pagination />
            </section>
        </MainLayout>
    )
}

export default Catalog;