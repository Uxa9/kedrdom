import { api } from "../../hooks/useApi";

export const add = async (params = {}) => {
    
    const result = await api.put('present', params);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
