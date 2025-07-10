import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import TelaInicial from './telas/TelaInicial';
import TelaListaPets from './telas/TelaListaPets';
import TelaDetalhePet from './telas/TelaDetalhePet';
import TelaFormularioAdocao from './telas/TelaFormularioAdocao';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={TelaInicial} options={{ title: 'Adoção de Pets' }} />
        <Stack.Screen name="ListaPets" component={TelaListaPets} options={{ title: 'Pets Disponíveis' }} />
        <Stack.Screen name="DetalhePet" component={TelaDetalhePet} options={{ title: 'Detalhes do Pet' }} />
        <Stack.Screen name="FormularioAdocao" component={TelaFormularioAdocao} options={{ title: 'Formulário de Adoção' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;