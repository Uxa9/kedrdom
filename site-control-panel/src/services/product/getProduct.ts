import { api } from "../../hooks/useApi";

export const getProduct = async (id: any) => {
    
    const result = await api.get(`product/${id}`);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
