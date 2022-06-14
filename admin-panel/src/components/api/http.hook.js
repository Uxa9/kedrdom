import { useState, useCallback } from "react";

export const useHttp = () => {
    const [dataLoading, setDataLoading] = useState(false);

    setDataLoading(true);

    const request = useCallback(async ( url, method = 'GET', body = null, headers = {} ) => {
        const response = await fetch(url, {method, body, headers});
        const data = await response.json();
    }, []);

    setDataLoading(false);

    return { dataLoading, request }
}