import { api } from "../../hooks/useApi";

export const deleteProduct = async (id: string) => {
    
    const result = await api.delete(`product/${id}`);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
