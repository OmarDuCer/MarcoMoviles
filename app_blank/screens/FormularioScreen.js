import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function FormularioScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.container2}>

        <Image
          source={require('../assets/image.png')}
          style={styles.image1}
        />

        <Text>Luis Amaranto</Text>

        <Text>Jugador de Cruz Azul</Text>

        <View>

          <Text>Correo</Text>

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo"
          />

          <Text>Telefono</Text>

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu teléfono"
          />

        </View>

        <Button
          title="Guardar"
          onPress={() => console.log("Guardar")}
        />

        <Button
          title="Regresar al Inicio"
          onPress={() => navigation.navigate('Inicio')}
        />

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#b70a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container2: {
    backgroundColor: '#f4efef',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    minHeight: '90%',
    borderRadius: 20,
    padding: 20,
  },

  image1: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 250,
  },
});