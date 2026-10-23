import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokedexScreen from './screens/PokedexScreen';
import DetallePokemonScreen from './screens/DetallePokemonScreen';
import { ROJO_POKEDEX } from './utils/colores';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Pokedex"
        screenOptions={{
          headerStyle: { backgroundColor: ROJO_POKEDEX },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      >

        <Stack.Screen
          name="Pokedex"
          component={PokedexScreen}
          options={{ title: 'Pokédex' }}
        />

        <Stack.Screen
          name="Detalle"
          component={DetallePokemonScreen}
          options={({ route }) => ({ title: route.params.nombre.toUpperCase() })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
