import { api } from "../../hooks/useApi";

export const updatePresent = async (params = {}) => {

    const result = await api.post('present', params);

    if ( result.status === 200) {
        return result.data;
    } else {
        return [];
    }
}
