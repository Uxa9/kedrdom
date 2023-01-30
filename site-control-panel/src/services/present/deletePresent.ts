import { api } from "../../hooks/useApi";

export const deletePresent = async (id: string) => {
    
    const result = await api.delete(`present/${id}`);
    
    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
