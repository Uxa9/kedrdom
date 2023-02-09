import Link from "next/link";
import { useState } from "react";
import sideCatalogMenu from "../layouts/SideCatalogMenu";

const MenuPresentComponent = (props) => {

    const [open, setOpen] = useState(false);

    return <li
        onClick={props.clickHandler}
    >
        {props.item.children ?
            <span
                onClick={() => setOpen(!open)}
            >
                    <span>
                        {props.item.label}
                    </span>
                {props.item.children && <div className={`${open && 'arrow-open'} arrow`}/>}
            </span> :
            <span>
                <Link
                    href={`/presents/${props.item.key}?page=1`}
                    onClick={props.onClick}
                >
                    {props.item.label}
                </Link>
            </span>
        }
        {open && props.item.children &&
            <ul>
                <li>
                    <Link
                        href={`/presents/${props.item.key}?page=1`}
                        onClick={props.onClick}
                    >
                        Показать все
                    </Link>
                </li>
                {props.item.children.map((item: any, index: any) =>
                    <MenuPresentComponent
                        item={item}
                        onClick={props.onClick}
                        key={index}
                    />
                )}
            </ul>
        }
    </li>
}

export default MenuPresentComponent;