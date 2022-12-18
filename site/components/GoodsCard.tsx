import Image from "next/image";
import { Noto_Sans } from "@next/font/google";

import styles from "../styles/GoodsCard.module.scss";
// import Link from "next/link";
import { useRouter } from "next/router";

const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

const GoodsCard = props => {

    const router = useRouter();

    const findLowestPrice = (arr: any[]) => {
        if (arr.length === 0) return "-- "
        return Math.min(...arr.map(item => item.price));
    }

    return (
        <div
            className={`${styles["card"]} ${textFont.className}`}
            onClick={() => router.push(`/product/${props.data._id}`)}
        >
            {props.data.photos.length > 0 ?
                <Image  
                    src={`https://kedrdom27.ru:5000/${props.data.photos[0]}`}
                    alt={"Товар"}
                    width={1028}
                    height={1028}
                    placeholder={"blur"}
                    blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMM4GWoBwAB8ADeYO5FygAAAABJRU5ErkJggg=="}
                /> :
                <div className={styles["image-boilerplate"]} />
            }
            <div
                className={styles["text"]}
            >
                <span>
                    {props.data.name}
                </span>
                <span>
                    {findLowestPrice(props.data.variants)}₽
                </span>
            </div>
        </div>
    )
}

export default GoodsCard;