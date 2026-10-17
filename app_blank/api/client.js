import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://http://localhost:5289',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    
});

export default apiClient;