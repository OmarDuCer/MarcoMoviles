import apiClient from '../api/client';

// Imagen oficial ("official-artwork") a partir del número del Pokémon.
export function getImageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// La PokeAPI devuelve muchísimos datos; aquí nos quedamos solo con lo que usa la app.
function mapearPokemon(data) {
    return {
        id: data.id,
        nombre: data.name,
        imagen: data.sprites?.other?.['official-artwork']?.front_default || getImageUrl(data.id),
        tipos: data.types.map((t) => t.type.name),
        altura: data.height / 10,  // viene en decímetros → metros
        peso: data.weight / 10,    // viene en hectogramos → kilogramos
        habilidades: data.abilities.map((a) => a.ability.name),
        stats: data.stats.map((s) => ({ nombre: s.stat.name, valor: s.base_stat })),
    };
}

// GET /pokemon/{id o nombre}
export async function getPokemon(idONombre) {
    const res = await apiClient.get(`/pokemon/${idONombre}`);
    return mapearPokemon(res.data);
}

// GET /pokemon?offset=0&limit=20
// La lista solo trae nombre + url, así que pedimos el detalle de cada uno
// para tener sus tipos (el color de la tarjeta depende del tipo).
export async function getPokemons(offset = 0, limit = 20) {
    const res = await apiClient.get('/pokemon', { params: { offset, limit } });
    const pokemons = await Promise.all(
        res.data.results.map((p) => getPokemon(p.name))
    );
    return {
        pokemons,
        hayMas: res.data.next !== null,
    };
}
