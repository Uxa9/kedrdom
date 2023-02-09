import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout"

import axios from 'axios';
import { useRouter } from "next/router";
import SideCatalogMenu from "../../layouts/SideCatalogMenu";
import GoodsCard from "../../components/GoodsCard";

import styles from "../../styles/Catalog.module.scss";
import Pagination from "../../components/Pagination";

export async function getServerSideProps(ctx) {

    const catName = await axios.get(`http://localhost:5000/present/${ctx.query.id}`).then(res => {
        console.log(res)
        return res.data;
    });

    const presents = await axios.get(`http://localhost:5000/present/${ctx.query.id}/page=${ctx.query.page || 1}`).then(res => {
        return res.data;
    });

    return {
        props: { presents, catName }
    }
}

const Catalog = (props) => {

    const presents = props.presents || [];
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
                    {presents.map((pr, index) => {
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