import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import TelaInicial from './telas/TelaInicial';
import TelaListaPets from './telas/TelaListaPets';
import TelaDetalhePet from './telas/TelaDetalhePet';
import TelaFormularioAdocao from './telas/TelaFormularioAdocao';
import TelaLogin from './telas/TelaLogin'; 
import TelaCadastro from './telas/TelaCadastro';

import authService from './servicos/AuthService';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    authService.restaurarSessao();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="TelaLogin" component={TelaLogin} />
      <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
      <Stack.Screen name="TelaInicial" component={TelaInicial} />
      <Stack.Screen name="ListaPets" component={TelaListaPets} />
      <Stack.Screen name="DetalhePet" component={TelaDetalhePet} />
      <Stack.Screen name="FormularioAdocao" component={TelaFormularioAdocao} />
    </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;

