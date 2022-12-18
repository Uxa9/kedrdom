import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from '../styles/MainLayout.module.scss';
import SideCatalogMenu from "./SideCatalogMenu";

interface Props {
    children?: React.ReactNode
}

const MainLayout: React.FC<Props> = (props) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <div
            className={`${styles["main-wrapper"]} ${isMenuOpen && styles["mobile-menu-active"]}`}
        >
            <div
                className={styles["content-wrapper"]}
            >
                <Header 
                    handleBurgerClick={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                />
                <main
                    className={styles["content-main-wrapper"]}
                >
                    {(router.route === "/catalog" || router.route === "/catalog/[id]") && 
                        <SideCatalogMenu 
                            clickHandler={() => setIsMenuOpen(false)}
                        />
                    }
                    {props.children}
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout;