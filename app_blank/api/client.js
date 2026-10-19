import axios from 'axios';

// Cambia 192.168.X.X por la IP de tu computadora (en Windows: ipconfig → "Dirección IPv4").
// El celular no entiende "localhost", porque para él localhost es el propio celular.
const apiClient = axios.create({
    baseURL: 'http://172.20.10.4',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },

});

export default apiClient;
