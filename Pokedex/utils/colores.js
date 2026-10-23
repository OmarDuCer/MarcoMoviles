// Color oficial de cada tipo de Pokémon.
export const COLORES_TIPO = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

export const ROJO_POKEDEX = '#E3350D';

export function colorDeTipo(tipo) {
    return COLORES_TIPO[tipo] || '#A8A77A';
}

// Mezcla un color con blanco (factor 0 = igual, 1 = blanco).
export function aclarar(hex, factor) {
    return mezclar(hex, 255, factor);
}

// Mezcla un color con negro (factor 0 = igual, 1 = negro).
export function oscurecer(hex, factor) {
    return mezclar(hex, 0, factor);
}

function mezclar(hex, destino, factor) {
    const n = parseInt(hex.replace('#', ''), 16);
    const canales = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    const resultado = canales.map((c) => Math.round(c + (destino - c) * factor));
    return '#' + resultado.map((c) => c.toString(16).padStart(2, '0')).join('');
}
