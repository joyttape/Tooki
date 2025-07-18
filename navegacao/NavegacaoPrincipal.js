import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from '../telas/TelaInicial';
import TelaListaPets from '../telas/TelaListaPets';
import TelaDetalhePet from '../telas/TelaDetalhePet';
import TelaFormularioAdocao from '../telas/TelaFormularioAdocao';
import TelaLogin from '../telas/TelaLogin';
import TelaCadastro from '../telas/TelaCadastro';

const Stack = createStackNavigator();

const NavegacaoPrincipal = () => {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen 
        name="TelaInicial" 
        component={TelaInicial} 
        options={{ title: 'Adoção de Pets' }} 
      />
      <Stack.Screen 
        name="TelaLogin" 
        component={TelaLogin} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TelaCadastro" 
        component={TelaCadastro} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ListaPets" 
        component={TelaListaPets} 
        options={{ title: 'Pets Disponíveis' }} 
      />
      <Stack.Screen 
        name="DetalhePet" 
        component={TelaDetalhePet} 
        options={{ title: 'Detalhes do Pet' }} 
      />
      <Stack.Screen 
        name="FormularioAdocao" 
        component={TelaFormularioAdocao} 
        options={{ title: 'Formulário de Adoção' }} 
      />
    </Stack.Navigator>
  );
};

export default NavegacaoPrincipal;