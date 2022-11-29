import { api } from "../../hooks/useApi";

export const getByCat = async (params = {}) => {
    
    const result = await api.get('product', {
        params : params
    });
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
