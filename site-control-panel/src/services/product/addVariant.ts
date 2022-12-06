import { api } from "../../hooks/useApi";

export const addVariant = async (params = {}) => {
    
    const result = await api.put('product/variant', params);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
