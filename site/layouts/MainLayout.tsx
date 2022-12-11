import React, { FC, ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from '../styles/MainLayout.module.scss';

interface Props {
    children?: React.ReactNode
}

const MainLayout: React.FC<Props> = (props) => {

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <div
            className={`${styles["main-wrapper"]} ${isMenuOpen && styles["mobile-menu-active"]}`}
        >
            <div
                className={styles["content-wrapper"]}
            >
                <Header 
                    handleBurgerClick={setIsMenuOpen}
                />
                <main
                    className={styles["content-main-wrapper"]}
                >
                    {props.children}
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout;