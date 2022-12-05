import { api } from "../../hooks/useApi";

export const add = async (params = {}) => {
    
    const result = await api.put('category', params);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
