import Divider from "./Divider";
import styles from "../styles/Footer.module.scss";

import { Noto_Sans } from "@next/font/google";
import Image from "next/image";

import whatsapp from '../public/whatsapp.svg';
import telegram from '../public/telegram.svg';

const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

const Footer: React.FC = () => {

    return (
        <>
            <Divider />
            <footer
                className={`${styles.footer} ${textFont.className}`}
            >
                <div>
                    <a href="/">
                        Kedrdom27.ru
                    </a>
                </div>
                <div>
                    <a href="/">
                        Kedrdom27.ru
                    </a>
                    <a target="_blank" href="https://go.2gis.com/3p0w5">
                        ул. Камская, 6
                    </a>
                    {/* а зачем тут о нас, если такой страницы нет🤔 */}
                    <a href="/">
                        О нас
                    </a>
                </div>
                <div>
                    {/* а зачем тут контакты, если такой страницы нет🤔 */}
                    <a href="/">
                        Контакты
                    </a>
                    <a href="tel:+79244029072">
                        +79244029072
                    </a>
                    <a href="mailto:kedrdom27@gmail.com">
                        kedrdom27@gmail.com
                    </a>
                </div>
                <div>
                    <span>
                        Социальные сети
                    </span>
                    <div
                        className={styles.links}
                    >
                        <a 
                            href=""
                            style={{ marginRight: "5px" }}    
                        >
                            <Image
                                src={whatsapp}
                                alt={"whatsapp"}
                            />
                        </a>
                        <a href="">
                            <Image
                                src={telegram}
                                alt={"telegram"}
                            />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;