// "pikachu" → "Pikachu"
export function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// 1 → "#001"
export function numeroPokedex(id) {
    return '#' + String(id).padStart(3, '0');
}
