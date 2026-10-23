import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Cuadricula from '../components/Cuadricula';
import TarjetaComida from '../components/TarjetaComida';
import { getRecetasPorCategoria } from '../services/recetaService';
import { colorPastel, FONDO, ROJO, TEXTO_SUAVE } from '../utils/colores';

export default function RecetasScreen({ route, navigation }) {
  const { categoria } = route.params;
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // GET /filter.php?c={categoria}
  useEffect(() => {
    async function cargar() {
      try {
        setRecetas(await getRecetasPorCategoria(categoria));
      } catch (e) {
        setError('No se pudieron cargar las recetas');
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, [categoria]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={ROJO} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.mensaje}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <Cuadricula
        datos={recetas}
        renderTarjeta={(receta, index) => (
          <TarjetaComida
            titulo={receta.nombre}
            imagen={receta.imagen}
            color={colorPastel(index)}
            altoImagen={200}
            onPress={() => navigation.navigate('Detalle', { id: receta.id, nombre: receta.nombre })}
          />
        )}
        ListEmptyComponent={<Text style={styles.mensaje}>No hay recetas en esta categoría</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: FONDO,
  },

  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FONDO,
  },

  mensaje: {
    color: TEXTO_SUAVE,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
});
