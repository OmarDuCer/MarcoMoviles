import { View, Text, Button, StyleSheet } from 'react-native';

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Bienvenido a la App
      </Text>

      <Button
        title="Ir a Detalle"
        onPress={() => navigation.navigate('Detalle')}
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