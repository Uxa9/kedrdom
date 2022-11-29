import { api } from "../../hooks/useApi";

export const getAll = async (params = {}) => {
    
    const result = await api.get('category', {
        params : params
    });
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
