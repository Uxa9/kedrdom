import Image from "next/image";
import { Noto_Sans } from "@next/font/google";

import styles from "../styles/GoodsCard.module.scss";
// import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";

const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

const GoodsCard = props => {
    const router = useRouter();
    const [available, setAvailable] = useState(false);

    const findLowestPrice = (arr: any[]) => {
        if (arr.length === 0) return "-- "
        return Math.min(...arr.map(item => item.price));
    }

    useEffect(() => {
       props.data.variants.map(item => {
           if (item.available) {
               setAvailable(true);
           }
       })
    }, [props.data._id]);

    return (
        <div
            className={`${styles["card"]} ${textFont.className} ${!available && styles['card-unavilable']}`}
            onClick={() => router.push(`/product/${props.data._id}`)}
            style={{
                position: "relative"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "5px"
                }}
            >
                {props.data.isNew &&
                    <span
                        style={{
                            backgroundColor: "blue",
                            color: "white",
                            padding: "5px 15px",
                            borderRadius: "16px",
                            marginRight: "6px"
                        }}
                    >
                        Новинка
                    </span>
                }
                {props.data.isPopular &&
                    <span
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "5px 15px",
                            borderRadius: "16px"
                        }}
                    >
                         Хит
                    </span>
                }
            </div>
            {props.data.photos.length > 0 ?
                <Image  
                    src={`https://kedrdom27.ru:5000/${props.data.photos[0]}`}
                    alt={"Товар"}
                    width={1028}
                    height={1028}
                    placeholder={"blur"}
                    loading={"eager"}
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