import apiClient from '../api/client';

// Imagen pequeña de un ingrediente: "Cherry Tomatoes" → cherry_tomatoes-small.png
export function getImagenIngrediente(nombre) {
    const archivo = nombre.trim().toLowerCase().replace(/ /g, '_');
    return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(archivo)}-small.png`;
}

// TheMealDB guarda los ingredientes en 20 campos sueltos
// (strIngredient1..20 y strMeasure1..20). Los juntamos en un arreglo.
function extraerIngredientes(meal) {
    const ingredientes = [];
    for (let i = 1; i <= 20; i++) {
        const nombre = meal[`strIngredient${i}`];
        const medida = meal[`strMeasure${i}`];
        if (nombre && nombre.trim()) {
            ingredientes.push({
                nombre: nombre.trim(),
                medida: medida ? medida.trim() : '',
                imagen: getImagenIngrediente(nombre),
            });
        }
    }
    return ingredientes;
}

// Las instrucciones vienen en un solo texto; lo partimos en pasos.
function extraerPasos(texto) {
    if (!texto) return [];
    let pasos = texto
        .split(/\r?\n/)
        .map((linea) => linea.trim())
        .filter((linea) => linea && !/^(step\s*)?\d+[.:)]?$/i.test(linea)) // quita líneas "STEP 1" o "1."
        .map((linea) => linea.replace(/^(step\s*)?\d+\s*[.:)\-]\s*/i, '')); // quita "1. " al inicio

    // Si todo venía en un solo párrafo, lo partimos por oraciones.
    if (pasos.length === 1) {
        pasos = (pasos[0].match(/[^.!?]+[.!?]+/g) || pasos).map((p) => p.trim());
    }
    return pasos;
}

function mapearResumen(meal) {
    return {
        id: meal.idMeal,
        nombre: meal.strMeal,
        imagen: meal.strMealThumb,
    };
}

function mapearReceta(meal) {
    return {
        ...mapearResumen(meal),
        categoria: meal.strCategory,
        area: meal.strArea,
        ingredientes: extraerIngredientes(meal),
        pasos: extraerPasos(meal.strInstructions),
    };
}

// GET /categories.php
export async function getCategorias() {
    const res = await apiClient.get('/categories.php');
    return res.data.categories.map((c) => ({
        id: c.idCategory,
        nombre: c.strCategory,
        imagen: c.strCategoryThumb,
    }));
}

// GET /filter.php?c=Seafood
export async function getRecetasPorCategoria(categoria) {
    const res = await apiClient.get('/filter.php', { params: { c: categoria } });
    return (res.data.meals || []).map(mapearResumen);
}

// GET /lookup.php?i=52959
export async function getReceta(id) {
    const res = await apiClient.get('/lookup.php', { params: { i: id } });
    if (!res.data.meals) throw new Error('Receta no encontrada');
    return mapearReceta(res.data.meals[0]);
}

// GET /search.php?s=salmon
export async function buscarRecetas(texto) {
    const res = await apiClient.get('/search.php', { params: { s: texto } });
    return (res.data.meals || []).map(mapearResumen); // si no hay resultados la API manda null
}

// GET /random.php
export async function getRecetaAleatoria() {
    const res = await apiClient.get('/random.php');
    return mapearReceta(res.data.meals[0]);
}
