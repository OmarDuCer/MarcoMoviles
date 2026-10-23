import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import StatBar from '../components/StatBar';
import { getPokemon } from '../services/pokemonService';
import { colorDeTipo, aclarar, oscurecer, ROJO_POKEDEX } from '../utils/colores';
import { capitalizar } from '../utils/formato';

// Nombres de las estadísticas en la PokeAPI → texto en español
const NOMBRES_STATS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

export default function DetallePokemonScreen({ route }) {
  const { id } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  // GET /pokemon/{id}
  useEffect(() => {
    async function cargar() {
      try {
        setPokemon(await getPokemon(id));
      } catch (e) {
        setError('No se pudo cargar el Pokémon');
      }
    }
    cargar();
  }, [id]);

  if (error) {
    return (
      <View style={styles.centro}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={ROJO_POKEDEX} />
      </View>
    );
  }

  const color = colorDeTipo(pokemon.tipos[0]);

  return (
    <ScrollView style={styles.pantalla}>

      <View style={[styles.portada, { backgroundColor: color }]}>
        <View style={[styles.circulo, { backgroundColor: aclarar(color, 0.45) }]}>
          <Image source={{ uri: pokemon.imagen }} style={styles.imagen} />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.nombre}>#{pokemon.id} {capitalizar(pokemon.nombre)}</Text>

        <View style={styles.tipos}>
          {pokemon.tipos.map((tipo) => (
            <View key={tipo} style={[styles.badge, { backgroundColor: colorDeTipo(tipo) }]}>
              <Text style={styles.badgeTexto}>{capitalizar(tipo)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.dato}>Altura: {pokemon.altura} m · Peso: {pokemon.peso} kg</Text>
        <Text style={styles.dato}>
          Habilidades: {pokemon.habilidades.map(capitalizar).join(', ')}
        </Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Estadísticas base</Text>
        {pokemon.stats.map((stat) => (
          <StatBar
            key={stat.nombre}
            etiqueta={NOMBRES_STATS[stat.nombre] || stat.nombre}
            valor={stat.valor}
            color={oscurecer(color, 0.2)}
          />
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#fff',
  },

  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  portada: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  circulo: {
    width: 215,
    height: 215,
    borderRadius: 108,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagen: {
    width: 175,
    height: 175,
  },

  info: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  nombre: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111',
  },

  tipos: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  badge: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 4,
  },

  badgeTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },

  dato: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },

  seccion: {
    padding: 22,
  },

  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 14,
  },
});
