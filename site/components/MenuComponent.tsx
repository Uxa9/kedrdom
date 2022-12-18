import Link from "next/link";
import { useState } from "react";

const MenuComponent = (props) => {

    const [open, setOpen] = useState(false);

    return <li
            onClick={props.clickHandler}
        >
            <span>
                <Link
                    href={`/catalog/${props.item.key}`}
                    onClick={props.onClick}
                >
                    {props.item.label}
                </Link>
                {props.item.children && <div className={`${open && 'arrow-open'} arrow`} onClick={() => setOpen(!open)}/>}
            </span>
            {open && props.item.children && 
                <ul>
                    {props.item.children.map((item: any) => 
                        <MenuComponent 
                            item={item}
                            onClick={props.onClick}
                        />
                    )}
                </ul>
            }
    </li>
}

export default MenuComponent;