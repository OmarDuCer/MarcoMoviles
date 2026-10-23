import axios from 'axios';

// Cliente de axios apuntando a la PokeAPI (https://pokeapi.co).
// A diferencia de TareasAPI, esta API es pública y está en internet,
// así que no hace falta poner la IP de tu computadora.
const apiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
