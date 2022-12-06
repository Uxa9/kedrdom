import { api } from "../../hooks/useApi";

export const deleteVariant = async (params = {}) => {
    
    const result = await api.post(`product/variant/delete`, params);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
