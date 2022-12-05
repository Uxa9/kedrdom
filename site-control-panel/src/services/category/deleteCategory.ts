import { api } from "../../hooks/useApi";

export const deleteCat = async (id: string) => {
    
    const result = await api.delete(`category/${id}`);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
