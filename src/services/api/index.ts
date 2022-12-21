import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-ranguinho.onrender.com/v1/',
});

export default api;