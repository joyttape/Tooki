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

const TelaCadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleCadastro = () => {
    if (!nome || !email || !telefone || !senha || !confirmarSenha || !cidade || !estado) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      Alert.alert('Erro', 'Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX');
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      telefone,
      cidade,
      estado,
      dataCadastro: new Date().toISOString(),
    };

    Alert.alert(
      'Sucesso', 
      'Cadastro realizado com sucesso! Bem-vindo(a) ao Tooki!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TelaLogin')
        }
      ]
    );
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  const formatarTelefone = (texto) => {
    const numeros = texto.replace(/\D/g, '');
    
    if (numeros.length <= 2) {
      return `(${numeros}`;
    } else if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }
  };

  const handleTelefoneChange = (texto) => {
    const telefoneFormatado = formatarTelefone(texto);
    setTelefone(telefoneFormatado);
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
            <Text style={styles.subtitulo}>Junte-se à nossa comunidade</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.titulo}>Criar Conta</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#9CA3AF"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

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
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="(XX) XXXXX-XXXX"
                placeholderTextColor="#9CA3AF"
                value={telefone}
                onChangeText={handleTelefoneChange}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sua cidade"
                  placeholderTextColor="#9CA3AF"
                  value={cidade}
                  onChangeText={setCidade}
                  autoCapitalize="words"
                />
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>Estado</Text>
                <TextInput
                  style={styles.input}
                  placeholder="UF"
                  placeholderTextColor="#9CA3AF"
                  value={estado}
                  onChangeText={setEstado}
                  autoCapitalize="characters"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha (mín. 6 caracteres)"
                placeholderTextColor="#9CA3AF"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirme sua senha"
                placeholderTextColor="#9CA3AF"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity style={styles.botaoCadastro} onPress={handleCadastro}>
              <Text style={styles.textoBotaoCadastro}>Criar Conta</Text>
            </TouchableOpacity>

            <View style={styles.divisor}>
              <View style={styles.linha} />
              <Text style={styles.textoDivisor}>ou</Text>
              <View style={styles.linha} />
            </View>

            <TouchableOpacity style={styles.botaoVoltar} onPress={handleVoltar}>
              <Text style={styles.textoBotaoVoltar}>Já tenho uma conta</Text>
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
    marginBottom: 30,
  },
  logoImagem: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logoTexto: {
    fontSize: 28,
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
    padding: 25,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#a4a4ec',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  botaoCadastro: {
    backgroundColor: '#a4a4ec',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 15,
    shadowColor: '#a4a4ec',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textoBotaoCadastro: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  textoDivisor: {
    marginHorizontal: 15,
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
  botaoVoltar: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#a4a4ec',
    borderRadius: 12,
    paddingVertical: 14,
  },
  textoBotaoVoltar: {
    color: '#a4a4ec',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaCadastro;

