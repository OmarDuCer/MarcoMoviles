import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetalleScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Detalle de la App
      </Text>

      <Button
        title="Ir a Inicio"
        onPress={() => navigation.navigate('Inicio')}
      />

      <Button
        title="Ir a Formulario"
        onPress={() => navigation.navigate('Formulario')}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },

  title: {
    fontSize: 24,
    marginTop: 20,
  },
});