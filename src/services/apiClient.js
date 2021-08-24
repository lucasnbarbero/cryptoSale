import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
    headers: { 'x-apikey': '60eb09146661365596af552f' },
});

export default {
    getApiClien() {
        return apiClient.get('transactions?q={"user_id": "LucasBarbero"}');
    },
    postApiClien(obj) {
        return apiClient.post('/transactions', obj);
    },
    getApiClienId(id) {
        return apiClient.get(`/transactions/${id}`);
    },
    deleteApiClien(id) {
        return apiClient.delete(`/transactions/${id}`);
    },
    editApiClien(id, obj) {
        return apiClient.patch(`/transactions/${id}`, obj);
    },
};