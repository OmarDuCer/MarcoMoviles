import axios from 'axios';

// Cliente de axios apuntando a TheMealDB (https://www.themealdb.com).
// El "1" de la URL es la llave pública de prueba que da la API.
const apiClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
