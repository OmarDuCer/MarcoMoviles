export const ROJO = '#C0392B';
export const FONDO = '#F5F0EA';
export const TEXTO = '#2A1E17';
export const TEXTO_SUAVE = '#7A6A60';
export const CREMA = '#F3EDE6';

// Colores pastel que se van repitiendo detrás de cada tarjeta.
const PASTELES = [
    '#F3D6CC', // rosa durazno
    '#F5E4C3', // arena
    '#F2D8E2', // rosa
    '#F4ECC7', // amarillo
    '#D7E4EF', // azul
    '#DCEAD4', // verde
    '#EDE3D2', // beige
    '#F2D2CC', // coral
    '#F4DCC6', // durazno
];

export function colorPastel(indice) {
    return PASTELES[indice % PASTELES.length];
}
