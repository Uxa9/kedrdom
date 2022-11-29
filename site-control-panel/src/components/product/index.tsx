import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


const Products = () => {
    
    const { id } = useParams();

    useEffect(() => {

    }, [id]);

    return (
        <div>
            { (id !== undefined) ? 
                <>{id}</> :
                <>patau</>
            } 
        </div>
    )
}

export default Products;