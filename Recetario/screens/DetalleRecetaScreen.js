import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getReceta } from '../services/recetaService';
import { ROJO, TEXTO, TEXTO_SUAVE, CREMA } from '../utils/colores';

function FilaIngrediente({ ingrediente, ultima }) {
  return (
    <View style={[styles.filaIngrediente, !ultima && styles.separador]}>
      <View style={styles.miniatura}>
        <Image source={{ uri: ingrediente.imagen }} style={styles.imagenIngrediente} />
      </View>
      <Text style={styles.nombreIngrediente}>{ingrediente.nombre}</Text>
      <Text style={styles.medida}>{ingrediente.medida}</Text>
    </View>
  );
}

export default function DetalleRecetaScreen({ route }) {
  const { id } = route.params;
  const [receta, setReceta] = useState(null);
  const [error, setError] = useState('');

  // GET /lookup.php?i={id}
  useEffect(() => {
    async function cargar() {
      try {
        setReceta(await getReceta(id));
      } catch (e) {
        setError('No se pudo cargar la receta');
      }
    }
    cargar();
  }, [id]);

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.subtitulo}>{error}</Text>
      </View>
    );
  }

  if (!receta) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={ROJO} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.pantalla}>

      <Image source={{ uri: receta.imagen }} style={styles.portada} />

      <View style={styles.contenido}>
        <Text style={styles.titulo}>{receta.nombre}</Text>
        <Text style={styles.subtitulo}>
          {[receta.categoria, receta.area].filter(Boolean).join(' · ')}
        </Text>

        <Text style={styles.seccion}>Ingredientes</Text>
        {receta.ingredientes.map((ingrediente, i) => (
          <FilaIngrediente
            key={ingrediente.nombre + i}
            ingrediente={ingrediente}
            ultima={i === receta.ingredientes.length - 1}
          />
        ))}

        <Text style={styles.seccion}>Preparación</Text>
        {receta.pasos.map((paso, i) => (
          <View key={i} style={styles.paso}>
            <Text style={styles.numeroPaso}>{i + 1}.</Text>
            <Text style={styles.textoPaso}>{paso}</Text>
          </View>
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
    width: '100%',
    height: 340,
    backgroundColor: '#F3D6CC',
  },

  contenido: {
    padding: 20,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: TEXTO,
  },

  subtitulo: {
    fontSize: 15,
    color: TEXTO_SUAVE,
    marginTop: 4,
  },

  seccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXTO,
    marginTop: 22,
    marginBottom: 8,
  },

  filaIngrediente: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },

  separador: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE7E0',
  },

  miniatura: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: CREMA,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  imagenIngrediente: {
    width: 30,
    height: 30,
  },

  nombreIngrediente: {
    flex: 1,
    fontSize: 15,
    color: TEXTO,
  },

  medida: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ROJO,
    marginLeft: 10,
    maxWidth: '45%',
    textAlign: 'right',
  },

  paso: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  numeroPaso: {
    width: 24,
    fontSize: 15,
    color: TEXTO,
  },

  textoPaso: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: TEXTO,
  },
});
