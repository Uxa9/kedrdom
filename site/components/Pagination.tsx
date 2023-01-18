import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Pagination = () => {

    const [pages, setPages] = useState(0);
    const router = useRouter();

    useEffect(() => {
        console.log(Router.query);
        
        if (router.query.id === undefined) {
            axios.get(`http://localhost:5000/product/pageAmount`).then(res => {
                setPages(res.data);
            });
        } else {
            axios.get(`http://localhost:5000/product/pageAmount?categoryId=${router.query.id}`).then(res => {
                setPages(res.data);
            });
        }
        
    }, [router.query]);

    return (
        <div>
            {Array(pages).fill(0).map((item, index) => (
                <button
                    onClick={() => {
                        const regEx = /[0-9]/g;
                        console.log(Router.asPath.split('?', 1));
                        Router.push(`${Router.asPath.split('?', 1)[0]}?page=${index}`);
                    }}
                >
                    {++index}
                </button>
            ))}
        </div>
    )
}

export default Pagination;