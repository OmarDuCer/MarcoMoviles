import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './screens/InicioScreen';
import DetalleScreen from './screens/DetalleScreen';
import FormularioScreen from './screens/FormularioScreen';
import PerfilScreen from './screens/PerfilScreen';
import LicenciaScreen from './screens/LicenciaScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = 'home';
          }
          else if (route.name === 'Detalle') {
            iconName = 'search';
          }
          else if (route.name === 'Formulario') {
            iconName = 'create';
          }
          else if (route.name === 'Licencia') {
            iconName = 'document';
          }
          return <Ionicons name={iconName} size={size} color={color} />;

        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
      })}
    >

        <Tab.Screen name="Inicio" component={InicioScreen} />

        <Tab.Screen name="Detalle" component={DetalleScreen}/>

        <Tab.Screen name="Formulario" component={FormularioScreen} />

        <Tab.Screen name="Perfil" component={PerfilScreen} />

        <Tab.Screen name= "Licencia" component={LicenciaScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}











































// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import InicioScreen from './screens/InicioScreen';
// import DetalleScreen from './screens/DetalleScreen';
// import FormularioScreen from './screens/FormularioScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Inicio">

//         <Stack.Screen name="Inicio" component={InicioScreen} />

//         <Stack.Screen name="Detalle" component={DetalleScreen}/>

//         <Stack.Screen name="Formulario" component={FormularioScreen} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }