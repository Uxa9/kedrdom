import { useContext, useEffect, useState } from "react";

import axios from 'axios';
import { useRouter } from "next/router";
import Link from "next/link";
import { Noto_Sans } from "@next/font/google";

import styles from "../styles/SideCatalogMenu.module.scss";
import MenuComponent from "../components/MenuComponent";
import MenuPresentComponent from "../components/MenuPresentComponent";

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

    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();

    const renderMenu = (items: any[]) => {
        return <ul>
            {items.map(i => {
                return <li
                        onClick={props.clickHandler}
                    >
                        <span>
                            <Link
                                href={`/catalog/${i.key}?page=1`}
                            >
                                {i.label}
                            </Link>
                            {i.children && <div className={styles.arrow} />}
                        </span>
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
                        children: children.length > 0 ? children : undefined,
                        type: cat.type
                    })
                });


        return nest(data);
    }

    useEffect(() => {
        axios.get("http://localhost:5000/category/").then(res => {
            setCategories(res.data);
        });
    }, []);

    return (
        <aside
            className={`${styles.menu} ${textFont.className}`}
        >
            <nav>
                <ul>
                    <li
                        onClick={props.clickHandler}
                    >
                        <Link
                            href={`/catalog?page=1`}
                            scroll={false}
                        >
                            Показать все
                        </Link>
                    </li>
                    {parseMenuItems(categories).filter(item => item.type !== "present").map(item =>
                        <MenuComponent
                            item={item}
                            onClick={props.clickHandler}
                        />
                    )}
                    <MenuPresentComponent
                        item={{
                            label: "Подарки",
                            children: parseMenuItems(categories).filter(item => item.type === "present"),
                            key: ""
                        }}
                        onClick={props.clickHandler}
                    />
                </ul>
            </nav>
            {/* {parseMenuItems(categories)} */}
            <div
                className={`${styles["aside-bg"]}`}
            />
        </aside>
    )
}

export default SideCatalogMenu;