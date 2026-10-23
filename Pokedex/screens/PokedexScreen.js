import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PokemonCard from '../components/PokemonCard';
import { getPokemons, getPokemon } from '../services/pokemonService';
import { ROJO_POKEDEX } from '../utils/colores';

const POR_PAGINA = 20;

export default function PokedexScreen({ navigation }) {
  // Lista paginada
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hayMas, setHayMas] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const cargandoRef = useRef(false); // evita pedir la misma página dos veces

  // Búsqueda
  const [busqueda, setBusqueda] = useState('');
  const [resultadoApi, setResultadoApi] = useState(null);
  const [buscando, setBuscando] = useState(false);

  // GET /pokemon?offset=...&limit=20
  async function cargarMas() {
    if (cargandoRef.current || !hayMas) return;
    cargandoRef.current = true;
    setCargando(true);
    setError('');
    try {
      const pagina = await getPokemons(offset, POR_PAGINA);
      setPokemons((anteriores) => [...anteriores, ...pagina.pokemons]);
      setOffset(offset + POR_PAGINA);
      setHayMas(pagina.hayMas);
    } catch (e) {
      setError('No se pudo conectar con la PokeAPI');
    } finally {
      cargandoRef.current = false;
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarMas();
  }, []);

  // "025" → "25", "Pikachu " → "pikachu"
  const texto = busqueda.trim().toLowerCase();
  const esNumero = /^\d+$/.test(texto);
  const consulta = esNumero ? String(Number(texto)) : texto;

  // Primero buscamos entre los Pokémon que ya cargamos (permite escribir "pika")
  const coincidenciasLocales = texto
    ? pokemons.filter((p) => (esNumero ? String(p.id) === consulta : p.nombre.includes(consulta)))
    : [];

  // Si no está cargado, lo pedimos a la API: GET /pokemon/{nombre o número}
  useEffect(() => {
    setResultadoApi(null);
    if (!texto || coincidenciasLocales.length > 0) {
      setBuscando(false);
      return;
    }
    setBuscando(true);
    const temporizador = setTimeout(async () => {
      try {
        setResultadoApi(await getPokemon(consulta));
      } catch (e) {
        setResultadoApi(null);
      } finally {
        setBuscando(false);
      }
    }, 500); // esperamos a que el usuario deje de escribir
    return () => clearTimeout(temporizador);
  }, [texto, coincidenciasLocales.length]);

  let datos = pokemons;
  if (texto) {
    datos = coincidenciasLocales.length > 0 ? coincidenciasLocales : resultadoApi ? [resultadoApi] : [];
  }

  function abrirDetalle(pokemon) {
    navigation.navigate('Detalle', { id: pokemon.id, nombre: pokemon.nombre });
  }

  return (
    <View style={styles.pantalla}>

      <View style={styles.buscador}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o número (ej. pikachu, 25)"
          placeholderTextColor="#999"
          value={busqueda}
          onChangeText={setBusqueda}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {error && pokemons.length === 0 ? (
        <View style={styles.centro}>
          <Text style={styles.mensaje}>{error}</Text>
          <Button title="Reintentar" color={ROJO_POKEDEX} onPress={cargarMas} />
        </View>
      ) : (
        <FlatList
          data={datos}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <View style={styles.columna}>
              <PokemonCard pokemon={item} onPress={() => abrirDetalle(item)} />
            </View>
          )}
          onEndReached={() => { if (!texto) cargarMas(); }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            cargando || buscando ? (
              <ActivityIndicator size="large" color={ROJO_POKEDEX} style={styles.cargando} />
            ) : null
          }
          ListEmptyComponent={
            texto && !buscando ? (
              <Text style={styles.mensaje}>No se encontró ningún Pokémon con "{busqueda.trim()}"</Text>
            ) : null
          }
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 6,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 15,
  },

  lista: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  columna: {
    width: '50%',
    padding: 6,
  },

  cargando: {
    marginVertical: 20,
  },

  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  mensaje: {
    textAlign: 'center',
    color: '#555',
    fontSize: 15,
    marginVertical: 20,
  },
});
