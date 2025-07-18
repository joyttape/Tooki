import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const TelaFormularioAdocao = ({ route, navigation }) => {
  const { petId } = route.params;

  const [formulario, setFormulario] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    experiencia: '',
    motivo: '',
    tipoResidencia: '',
    temOutrosAnimais: '',
    temCriancas: '',
    disponibilidadeTempo: '',
    condicoesFinanceiras: '',
  });

  const [erros, setErros] = useState({});

  const handleChange = (campo, valor) => {
    setFormulario({ ...formulario, [campo]: valor });
    setErros({ ...erros, [campo]: '' }); 
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formulario.nome || formulario.nome.length < 3) {
      novosErros.nome = 'Nome deve ter ao menos 3 letras.';
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formulario.email || !regexEmail.test(formulario.email)) {
      novosErros.email = 'Email inválido.';
    }

    const telefoneNumeros = formulario.telefone.replace(/\D/g, '');
    if (!telefoneNumeros || telefoneNumeros.length < 10) {
      novosErros.telefone = 'Telefone inválido.';
    }

    if (!formulario.tipoResidencia) {
      novosErros.tipoResidencia = 'Informe o tipo de residência.';
    }

    if (!formulario.condicoesFinanceiras) {
      novosErros.condicoesFinanceiras = 'Informe se tem condições financeiras.';
    }

    if (!formulario.disponibilidadeTempo) {
      novosErros.disponibilidadeTempo = 'Informe sua disponibilidade.';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const enviarFormulario = () => {
    if (!validarFormulario()) return;

    console.log('Formulário enviado:', { petId, ...formulario });

    alert('Formulário enviado com sucesso!');
    navigation.navigate('TelaInicial');
  };

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>Formulário de Adoção</Text>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Nome Completo *</Text>
        <TextInput
          style={estilos.input}
          value={formulario.nome}
          onChangeText={(texto) => handleChange('nome', texto)}
        />
        {erros.nome && <Text style={estilos.erro}>{erros.nome}</Text>}
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Email *</Text>
        <TextInput
          style={estilos.input}
          keyboardType="email-address"
          value={formulario.email}
          onChangeText={(texto) => handleChange('email', texto)}
        />
        {erros.email && <Text style={estilos.erro}>{erros.email}</Text>}
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Telefone *</Text>
        <TextInputMask
          type={'cel-phone'}
          options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
          style={estilos.input}
          value={formulario.telefone}
          onChangeText={(texto) => handleChange('telefone', texto)}
          keyboardType="phone-pad"
        />
        {erros.telefone && <Text style={estilos.erro}>{erros.telefone}</Text>}
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Endereço</Text>
        <TextInput
          style={estilos.input}
          value={formulario.endereco}
          onChangeText={(texto) => handleChange('endereco', texto)}
        />
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Você mora em: *</Text>
        <TextInput
          style={estilos.input}
          value={formulario.tipoResidencia}
          onChangeText={(texto) => handleChange('tipoResidencia', texto)}
          placeholder="Apartamento, casa..."
        />
        {erros.tipoResidencia && <Text style={estilos.erro}>{erros.tipoResidencia}</Text>}
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Possui outros animais?</Text>
        <TextInput
          style={estilos.input}
          value={formulario.temOutrosAnimais}
          onChangeText={(texto) => handleChange('temOutrosAnimais', texto)}
        />
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Tem crianças em casa?</Text>
        <TextInput
          style={estilos.input}
          value={formulario.temCriancas}
          onChangeText={(texto) => handleChange('temCriancas', texto)}
        />
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Disponibilidade de tempo diário *</Text>
        <TextInput
          style={estilos.input}
          value={formulario.disponibilidadeTempo}
          onChangeText={(texto) => handleChange('disponibilidadeTempo', texto)}
        />
        {erros.disponibilidadeTempo && <Text style={estilos.erro}>{erros.disponibilidadeTempo}</Text>}
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>
          Você possui condições financeiras para manter um pet? *
        </Text>
        <TextInput
          style={estilos.input}
          value={formulario.condicoesFinanceiras}
          onChangeText={(texto) => handleChange('condicoesFinanceiras', texto)}
        />
        {erros.condicoesFinanceiras && <Text style={estilos.erro}>{erros.condicoesFinanceiras}</Text>}
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Experiência com Pets</Text>
        <TextInput
          style={[estilos.input, estilos.textArea]}
          value={formulario.experiencia}
          onChangeText={(texto) => handleChange('experiencia', texto)}
          multiline
        />
      </View>

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Motivo para Adoção</Text>
        <TextInput
          style={[estilos.input, estilos.textArea]}
          value={formulario.motivo}
          onChangeText={(texto) => handleChange('motivo', texto)}
          multiline
        />
      </View>

      <View style={estilos.botaoContainer}>
        <TouchableOpacity style={estilos.botao} onPress={enviarFormulario}>
          <Text style={estilos.textoBotao}>Enviar Formulário</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#a4a4ec',
  },
  grupo: {
    marginBottom: 15,
  },
  rotulo: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
  erro: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  botaoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
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

export default TelaFormularioAdocao;
