import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }
    Alert.alert('Sucesso', 'Login realizado com sucesso!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('TelaInicial')
      }
    ]);
  };

  const handleCadastro = () => {
    navigation.navigate('TelaCadastro');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../assets/fundo.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/tooki.png')}
              style={styles.logoImagem}
              resizeMode="contain"
            />
            <Text style={styles.logoTexto}>Tooki</Text>
            <Text style={styles.subtitulo}>Conectando corações a patinhas</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.titulo}>Entrar</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#9CA3AF"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity style={styles.botaoLogin} onPress={handleLogin}>
              <Text style={styles.textoBotaoLogin}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkEsqueceuSenha}>
              <Text style={styles.textoLink}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <View style={styles.divisor}>
              <View style={styles.linha} />
              <Text style={styles.textoDivisor}>ou</Text>
              <View style={styles.linha} />
            </View>

            <TouchableOpacity style={styles.botaoCadastro} onPress={handleCadastro}>
              <Text style={styles.textoBotaoCadastro}>Criar nova conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#a4a4ec',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImagem: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  logoTexto: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#a4a4ec',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  botaoLogin: {
    backgroundColor: '#a4a4ec',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 10,
    shadowColor: 'rgba(94, 94, 197, 1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textoBotaoLogin: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkEsqueceuSenha: {
    alignItems: 'center',
    marginTop: 20,
  },
  textoLink: {
    color: '#a4a4ec',
    fontSize: 16,
    fontWeight: '600',
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  textoDivisor: {
    marginHorizontal: 15,
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  botaoCadastro: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#a4a4ec',
    borderRadius: 12,
    paddingVertical: 16,
  },
  textoBotaoCadastro: {
    color: '#a4a4ec',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaLogin;

