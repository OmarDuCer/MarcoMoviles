import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert, StyleSheet } from 'react-native';
import Cuadricula from '../components/Cuadricula';
import TarjetaComida from '../components/TarjetaComida';
import BotonAccion from '../components/BotonAccion';
import { getCategorias, getRecetaAleatoria } from '../services/recetaService';
import { colorPastel, FONDO, ROJO, TEXTO_SUAVE } from '../utils/colores';

export default function CategoriasScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [buscandoAleatoria, setBuscandoAleatoria] = useState(false);

  // GET /categories.php
  async function cargar() {
    setCargando(true);
    setError('');
    try {
      setCategorias(await getCategorias());
    } catch (e) {
      setError('No se pudo conectar con TheMealDB');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  // GET /random.php → abre el detalle de esa receta
  async function sorprendeme() {
    setBuscandoAleatoria(true);
    try {
      const receta = await getRecetaAleatoria();
      navigation.navigate('Detalle', { id: receta.id, nombre: receta.nombre });
    } catch (e) {
      Alert.alert('Ups', 'No se pudo obtener una receta aleatoria');
    } finally {
      setBuscandoAleatoria(false);
    }
  }

  const botones = (
    <View style={styles.botones}>
      <BotonAccion titulo="Buscar" icono="search" onPress={() => navigation.navigate('Buscar')} />
      <BotonAccion titulo="Sorpréndeme" icono="shuffle" onPress={sorprendeme} cargando={buscandoAleatoria} />
    </View>
  );

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
        <Button title="Reintentar" color={ROJO} onPress={cargar} />
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <Cuadricula
        datos={categorias}
        ListHeaderComponent={botones}
        renderTarjeta={(categoria, index) => (
          <TarjetaComida
            titulo={categoria.nombre}
            imagen={categoria.imagen}
            color={colorPastel(index)}
            ajuste="contain"
            onPress={() => navigation.navigate('Recetas', { categoria: categoria.nombre })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: FONDO,
  },

  botones: {
    flexDirection: 'row',
    paddingHorizontal: 1,
    paddingTop: 6,
    paddingBottom: 4,
  },

  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FONDO,
    padding: 20,
  },

  mensaje: {
    color: TEXTO_SUAVE,
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
});
