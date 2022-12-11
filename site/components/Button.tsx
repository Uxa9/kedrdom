import { Noto_Sans } from "@next/font/google";
import styles from "../styles/Button.module.scss";

const textFont = Noto_Sans({
    weight: ['400'],
    subsets: ["cyrillic"]
});

interface Props {
    className?: string,
    onClick: () => void,
    text: string
}

const Button = (props: Props) => {

    return (
        <div
            className={`${styles.button} ${props.className} ${textFont.className}`}
            onClick={props.onClick}
        >
            {props.text}
        </div>
    )
}

export default Button;