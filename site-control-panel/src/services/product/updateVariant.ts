import { api } from "../../hooks/useApi";

export const updateVariant = async (params = {}) => {

    const result = await api.post('product/variant/update', params);

    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
