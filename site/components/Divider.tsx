import Image from "next/image";
import cone from "../public/cone.png";

const Divider = () => {

    return (
        <>
            <div
                className="divider"
            >
                <div className="stripe" />
                <div className="cone">
                    <Image
                        src={cone}
                        alt={"cone"}
                    />
                </div>
                <div className="stripe" />
            </div>

            <style jsx>
                {`
                    .divider {
                        display: flex;
                        align-items: center;
                        width: 100%;
                    }

                    .cone {
                        width: 40px;
                        height: 40px;
                        margin: 0 12px;
                    }

                    .stripe {
                        flex-grow: 1;

                        height: 2px;
                        background: #3C0C02;
                    }
                `}
            </style>
        </>
    )

    
}

export default Divider;