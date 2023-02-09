import styles from "../styles/Header.module.scss";
import logo from "../public/logo.svg";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = (props) => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(props.isMenuOpen);
    }, [props.isMenuOpen])

    return (
        <>
            <header
                className={
                    (router.pathname !== '/catalog/[id]' && 
                     router.pathname !== '/catalog' && 
                     router.pathname !== '/presents' && 
                     router.pathname !== '/presents/[id]' )  ?
                        styles.header :
                        `${styles.header} ${styles["enable-menu"]}`
                }
            >
                {(router.pathname === '/catalog/[id]' || 
                  router.pathname === '/catalog' ||
                  router.pathname === '/presents' || 
                  router.pathname === '/presents/[id]') &&
                    <div
                        className={
                            !isOpen ?
                                `${styles["burger-button"]}` :
                                `${styles["burger-button"]} ${styles["burger-button-active"]}`
                        }
                        onClick={() => {
                            setIsOpen(!isOpen);
                            props.handleBurgerClick(!isOpen);
                        }}
                    >
                        <div className={styles["burger-stripes"]} />
                    </div>
                }
                <span>
                    Натуральная таёжная продукция
                </span>
                <Link href="/"
                    className={styles.logo}
                >
                    <Image
                        src={logo}
                        alt={"logo"}
                    />
                </Link>
                <div
                    className={styles.links}
                >
                    <a target="_blank" rel="noreferrer" href="https://go.2gis.com/3p0w5">
                        ул. Камская, 6
                    </a>
                    <a href="tel:+79244029072">
                        +79244029072
                    </a>
                </div>
            </header>
        </>
    )
}

export default Header;