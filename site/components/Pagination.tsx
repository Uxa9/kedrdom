import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../styles/Pagination.module.scss";

const Pagination = () => {

    const router = useRouter();
    const [pages, setPages] = useState(0);
    const [showPageNumbers, setShowPageNumbers] = useState<number[]>([]);

    useEffect(() => {

        const goodType = (router.pathname === "/catalog" || router.pathname === "/catalog/[id]") ? "product" : "present"

        if (router.query.id === undefined) {
            axios.get(`http://localhost:5000/${goodType}/pageAmount`).then(res => {
                setPages(res.data);
            });
        } else {
            axios.get(`http://localhost:5000/${goodType}/pageAmount?categoryId=${router.query.id}`).then(res => {
                setPages(res.data);
            });
        }
        
    }, [router.query]);

    useEffect(() => {
        let pageNums = [];
        for (let i = 1; i <= 3; i++) {
            if (Number(router.query.page) - i > 0)
                pageNums.unshift(Number(router.query.page) - i);
            else break;
        }

        pageNums.push(Number(router.query.page));

        for (let i = 1; i <= 3; i++) {
            if (Number(router.query.page) + i <= pages)
                pageNums.push(Number(router.query.page) + i);
            else break;
        }

        setShowPageNumbers(pageNums);

    }, [router.query.page, router.query.id, pages])

    return (
        <div
            className={styles['pagination-wrapper']}
        >
            {Number(router.query.page) !== 1 &&
                <button
                    className={`${styles['arrow']} ${styles['arrow-back']}`}
                    onClick={() => router.push(`${Router.asPath.split('?', 1)[0]}?page=${Number(router.query.page) - 1}`)}
                />
            }
            {showPageNumbers.map(item =>
                <button
                    onClick={() => router.push(`${Router.asPath.split('?', 1)[0]}?page=${item}`)}
                    className={`${styles['pagination-page']} ${Number(router.query.page) === item && styles['active-page']}`}
                    key={item}
                >
                    {item}
                </button>
            )}
            {Number(router.query.page) !== pages &&
                <button
                    className={`${styles['arrow']} ${styles['arrow-forward']}`}
                    onClick={() => router.push(`${Router.asPath.split('?', 1)[0]}?page=${Number(router.query.page) +1}`)}
                />
            }
        </div>
    )
}

export default Pagination;