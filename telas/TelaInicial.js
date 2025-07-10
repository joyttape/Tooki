import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

const TelaInicial = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/fundo.png')} // Substitua pelo nome da sua imagem de fundo
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/tooki.png')}
          style={styles.logoImagem}
          resizeMode="contain"
        />

        <Text style={styles.subtexto}>
          Bem vindo(a) ao Tooki{'\n'}o mais novo sistema de adoção de animais.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('ListaPets')}
        >
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#a4a4ec',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 5
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  logoImagem: {
    width: 200,
    height: 90,
    marginBottom: 20,
  },
  subtexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F4F4F4',
    textAlign: 'center',
    marginBottom: 80,
  },
  botao: {
    backgroundColor: '#e6f3fb',
    paddingVertical: 17,
    paddingHorizontal: 70,
    borderRadius: 30,
  },
  textoBotao: {
    color: '#a4a4ec',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaInicial;
