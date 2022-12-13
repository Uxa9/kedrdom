import {useEffect, useState} from "react";
import { Noto_Sans } from "@next/font/google";

const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

import styles from '../styles/ToggleButtonVariant.module.scss';

const ToggleButtonVariant = (props) => {

    const [active, setActive] = useState(0);
    const [varArr, setVarArr] = useState([]);

    const { variants } = props;

    useEffect(() => {
        setVarArr(props.variants.sort(function(a, b){return a.weight-b.weight}));
    }, [props]);

    const renderVariant = () => {
        const activeVar = variants[active];

        if (activeVar?.available) {
            return (
                <div
                    className={`${styles['variant-price']} ${styles['variant-available']}`}
                >
                    <p>
                        {activeVar?.price}рублей/шт
                    </p>
                </div>
            );
        } else {
            return (
                <div
                    className={`${styles['variant-price']} ${styles['variant-unavailable']}`}
                >
                    <p>
                        {activeVar?.price}рублей/шт
                    </p>
                    <p>
                        плановая дата поступления<br/>{activeVar?.supplyDate}
                    </p>
                </div>

            )
        }
    }

    return (
        <div className={textFont.className}>
            <div
                className={styles["variants-wrapper"]}
            >
                {varArr.map((variant, index) => {
                    return (
                        <div
                            key={index}
                            className={`${styles["variant"]} ${index === active && styles["active-variant"]}`}
                            onClick={() => {setActive(index)}}
                        >
                            {variant?.weight}гр
                        </div>
                    )
                })}
            </div>
            <div>
                {renderVariant()}
            </div>
        </div>
    )
}

export default ToggleButtonVariant;