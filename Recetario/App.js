import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriasScreen from './screens/CategoriasScreen';
import RecetasScreen from './screens/RecetasScreen';
import DetalleRecetaScreen from './screens/DetalleRecetaScreen';
import BuscarScreen from './screens/BuscarScreen';
import { ROJO, FONDO } from './utils/colores';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Categorias"
        screenOptions={{
          headerStyle: { backgroundColor: ROJO },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: FONDO },
        }}
      >

        <Stack.Screen
          name="Categorias"
          component={CategoriasScreen}
          options={{ title: 'Recetario', headerTitleStyle: { fontWeight: 'bold', fontSize: 24 } }}
        />

        <Stack.Screen
          name="Recetas"
          component={RecetasScreen}
          options={({ route }) => ({ title: route.params.categoria })}
        />

        <Stack.Screen
          name="Detalle"
          component={DetalleRecetaScreen}
          options={({ route }) => ({ title: route.params.nombre })}
        />

        <Stack.Screen
          name="Buscar"
          component={BuscarScreen}
          options={{ title: 'Buscar' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
