import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
    headers: { 'x-apikey': '60eb09146661365596af552f' },
});

export default {
    getApiClient() {
        return apiClient.get('transactions?q={"user_id": "LucasBarbero"}');
    },
    postApiClient(obj) {
        return apiClient.post('/transactions', obj);
    },
    getApiClientId(id) {
        return apiClient.get(`/transactions/${id}`);
    },
    deleteApiClient(id) {
        return apiClient.delete(`/transactions/${id}`);
    },
    editApiClient(id, obj) {
        return apiClient.patch(`/transactions/${id}`, obj);
    },
};