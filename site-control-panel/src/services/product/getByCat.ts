import { api } from "../../hooks/useApi";

export const getByCat = async (id: any) => {
    
    const result = await api.get(`product/category/${id}`);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
