import { api } from "../../hooks/useApi";

export const update = async (params: Object) => {
    
    const result = await api.post(`category`, params);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
