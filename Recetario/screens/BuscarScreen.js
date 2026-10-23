import { useEffect, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cuadricula from '../components/Cuadricula';
import TarjetaComida from '../components/TarjetaComida';
import { buscarRecetas } from '../services/recetaService';
import { colorPastel, FONDO, ROJO, TEXTO_SUAVE } from '../utils/colores';

export default function BuscarScreen({ navigation }) {
  const [texto, setTexto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState('');

  // GET /search.php?s={texto}, esperando a que el usuario deje de escribir
  useEffect(() => {
    const consulta = texto.trim();
    setError('');
    if (!consulta) {
      setResultados([]);
      setBuscando(false);
      return;
    }
    setBuscando(true);
    const temporizador = setTimeout(async () => {
      try {
        setResultados(await buscarRecetas(consulta));
      } catch (e) {
        setError('No se pudo conectar con TheMealDB');
      } finally {
        setBuscando(false);
      }
    }, 500);
    return () => clearTimeout(temporizador);
  }, [texto]);

  let mensaje = null;
  if (error) mensaje = error;
  else if (!texto.trim()) mensaje = 'Escribe el nombre de una receta (ej. salmon, pasta, curry)';
  else if (!buscando) mensaje = `No se encontraron recetas con "${texto.trim()}"`;

  return (
    <View style={styles.pantalla}>

      <View style={styles.buscador}>
        <Ionicons name="search" size={20} color={TEXTO_SUAVE} />
        <TextInput
          style={styles.input}
          placeholder="Buscar receta..."
          placeholderTextColor="#A89A90"
          value={texto}
          onChangeText={setTexto}
          autoFocus
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {buscando && <ActivityIndicator size="large" color={ROJO} style={styles.cargando} />}

      <Cuadricula
        datos={buscando ? [] : resultados}
        renderTarjeta={(receta, index) => (
          <TarjetaComida
            titulo={receta.nombre}
            imagen={receta.imagen}
            color={colorPastel(index)}
            altoImagen={200}
            onPress={() => navigation.navigate('Detalle', { id: receta.id, nombre: receta.nombre })}
          />
        )}
        ListEmptyComponent={mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: FONDO,
  },

  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4DAD0',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginHorizontal: 13,
    marginTop: 14,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 15,
  },

  cargando: {
    marginTop: 30,
  },

  mensaje: {
    color: TEXTO_SUAVE,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
