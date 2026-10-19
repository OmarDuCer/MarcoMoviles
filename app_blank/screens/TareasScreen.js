import { useState } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, StyleSheet } from 'react-native';
import { getTaskById, createTask, deleteTask } from '../services/tareaService';

export default function TareasScreen() {
  const [idBuscar, setIdBuscar] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completada, setCompletada] = useState(false);
  const [idEliminar, setIdEliminar] = useState('');
  const [resultado, setResultado] = useState('');

  // GET /tareas/{id}
  async function buscar() {
    if (!idBuscar) { setResultado('Escribe un Id'); return; }
    try {
      const tarea = await getTaskById(idBuscar);
      setResultado(JSON.stringify(tarea, null, 2));
    } catch (error) {
      setResultado(error.response ? 'Tarea no encontrada' : 'No se pudo conectar con la API');
    }
  }

  // POST /tareas
  async function crear() {
    try {
      const tarea = await createTask({ titulo, descripcion, completada });
      setResultado('Tarea creada:\n' + JSON.stringify(tarea, null, 2));
    } catch (error) {
      setResultado('No se pudo crear la tarea');
    }
  }

  // DELETE /tareas/{id}
  async function eliminar() {
    if (!idEliminar) { setResultado('Escribe un Id'); return; }
    try {
      await deleteTask(idEliminar);
      setResultado('Tarea ' + idEliminar + ' eliminada');
    } catch (error) {
      setResultado(error.response ? 'Tarea no encontrada' : 'No se pudo conectar con la API');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>Buscar por Id</Text>
      <TextInput
        style={styles.input}
        placeholder="Id"
        keyboardType="numeric"
        value={idBuscar}
        onChangeText={setIdBuscar}
      />
      <Button title="Buscar" onPress={buscar} />

      <Text style={styles.titulo}>Crear tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <View style={styles.fila}>
        <Text>Completada</Text>
        <Switch value={completada} onValueChange={setCompletada} />
      </View>
      <Button title="Crear" onPress={crear} />

      <Text style={styles.titulo}>Eliminar por Id</Text>
      <TextInput
        style={styles.input}
        placeholder="Id"
        keyboardType="numeric"
        value={idEliminar}
        onChangeText={setIdEliminar}
      />
      <Button title="Eliminar" color="red" onPress={eliminar} />

      <Text style={styles.titulo}>Resultado</Text>
      <Text style={styles.resultado}>{resultado}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  resultado: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
});
