import { useContext, useEffect, useState } from "react";

import axios from 'axios';
import { useRouter } from "next/router";
import Link from "next/link";
import { Noto_Sans } from "@next/font/google";

import styles from "../styles/SideCatalogMenu.module.scss";

const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

interface Category {
    name: string,
    show: boolean,
    type: string,
    _id: string,
    upCategory: string
}

const SideCatalogMenu = (props) => {

    const [categories, setCategories] = useState([]);
    const router = useRouter();

    const renderMenu = (items: any[]) => {
        return <ul>
            {items.map(i => {
                return <li>
                    <Link
                        href={`/catalog/${i.key}`}
                    >
                        {i.label}
                    </Link>
                    {i.children && renderMenu(i.children)}
                </li>
            })}
        </ul>
    }

    const parseMenuItems = (data: Category[]) => {
        const nest: any = (items: Category[], id = "") =>
            items
                .filter(item => item.upCategory === id)
                .map(cat => {
                    const children = nest(items, cat._id);

                    return ({
                        key: cat._id,
                        label: cat.name,
                        children: children.length > 0 ? children : undefined
                    })
                });


        return nest(data);
    }

    useEffect(() => {
        axios.get("https://kedrdom27.ru:5000/category/").then(res => {
            setCategories(res.data);
            console.log(parseMenuItems(res.data));
        })
    }, []);

    return (
        <aside
            className={`${styles.menu} ${textFont.className}`}
        >
            <nav>
                <ul>
                    <li>
                        <Link
                            href={`/catalog`}
                        >
                            Показать все
                        </Link>
                    </li>
                </ul>
                {renderMenu(parseMenuItems(categories))}
            </nav>
            {/* {parseMenuItems(categories)} */}
        </aside>
    )
}

export default SideCatalogMenu;