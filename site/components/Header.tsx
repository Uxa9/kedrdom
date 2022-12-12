import styles from "../styles/Header.module.scss";
import logo from "../public/logo.png";
import Image from "next/image";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

const Header = (props) => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header
                className={
                    (router.pathname !== '/catalog/[id]' && router.pathname !== '/catalog')  ?
                        styles.header :
                        `${styles.header} ${styles["enable-menu"]}`
                }
            >
                {(router.pathname === '/catalog/[id]' || router.pathname === '/catalog') &&
                    <div
                        className={
                            !isOpen ?
                                `${styles["burger-button"]}` :
                                `${styles["burger-button"]} ${styles["burger-button-active"]}`
                        }
                        onClick={() => {
                            setIsOpen(!isOpen);
                            props.handleBurgerClick(isOpen);
                        }}
                    >
                        <div className={styles["burger-stripes"]} />
                    </div>
                }
                <span>
                    Натуральная таёжная продукция
                </span>
                <a href="/"
                    className={styles.logo}
                >
                    <Image
                        src={logo}
                        alt={"logo"}
                    />
                </a>
                <div
                    className={styles.links}
                >
                    <a target="_blank" href="https://go.2gis.com/3p0w5">
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