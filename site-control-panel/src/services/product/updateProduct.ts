import { api } from "../../hooks/useApi";

export const updateProduct = async (params = {}) => {

    const result = await api.post('product', params);

    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
