import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import PetService from '../servicos/ApiService';

const TelaDetalhePet = ({ route, navigation }) => {
  const { petId } = route.params;
  const [pet, setPet] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPet = async () => {
      try {
        const dados = await PetService.buscarPetPorId(petId);
        setPet(dados);
      } catch (erro) {
        console.error('Erro ao carregar pet:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarPet();
  }, [petId]);

  if (carregando || !pet) {
    return (
      <View style={estilos.container}><Text>Carregando...</Text></View>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <View style={[estilos.imagemContainer, { backgroundColor: '#a4a4ec' }]}>  
        <Image source={{ uri: pet.imagem }} style={estilos.imagemGrande} />
      </View>

      <View style={estilos.conteudo}>
        <View style={estilos.headerPet}>
          <Text style={estilos.nome}>{pet.nome}</Text>
        </View>

        <Text style={estilos.raca}>{pet.raca}</Text>

        <View style={estilos.infoLinha}>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Gênero</Text>
            <Text style={estilos.infoTexto}>{pet.sexo}</Text>
          </View>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Idade</Text>
            <Text style={estilos.infoTexto}>{pet.idade} ano(s)</Text>
          </View>
        </View>

        <View style={estilos.infoLinha}>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Peso</Text>
            <Text style={estilos.infoTexto}>{pet.peso} Kg</Text>
          </View>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Vacinado(a)?</Text>
            <Text style={estilos.infoTexto}>{pet.vacina ? 'Sim' : 'Não'}</Text>
          </View>
        </View>

        <View style={estilos.infoLinha}>
          <View style={estilos.infoBoxcastra}>
            <Text style={estilos.infoTitulo}>Castrado(a)?</Text>
            <Text style={estilos.infoTexto}>{pet.castrar ? 'Sim' : 'Não'}</Text>
          </View>
        </View>

        <View style={estilos.ownerBox}>
          <Image source={require('../assets/coracao.png')} style={estilos.ownerAvatar} />
          <View>
            <Text style={estilos.ownerNome}>{pet.instituicao}</Text>
            <Text style={estilos.ownerLocal}>{pet.cidade} - {pet.estado}</Text>
          </View>
          <TouchableOpacity style={estilos.chatBotao}>
            <Text style={estilos.chatTexto}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={[estilos.imagemContainer, { backgroundColor: '#a4a4ec' }]}>  
        <Image source={{ uri: pet.imagem2 }} style={estilos.imagemGrande1} />
        </View>

        <Text></Text>
        <Text style={estilos.tituloSecao}>Sobre {pet.nome}</Text>
        <Text style={estilos.texto}>{pet.descricao}</Text>


         <Text style={estilos.tituloSecao}>Sua história </Text>
         <Text style={estilos.texto}>{pet.historia}</Text>

         <Text style={estilos.tituloSecao}>Requisitos: </Text>
         <Text style={estilos.texto}>{pet.requisitos}</Text>

        <TouchableOpacity
          style={estilos.botaoAdotar}
          onPress={() => navigation.navigate('FormularioAdocao', { petId: pet.id })}
        >
          <Text style={estilos.textoAdotar}>Adotar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imagemContainer: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    overflow: 'hidden'
  },
  imagemGrande: {
    width: '100%',
    height: 300
  },
  imagemContainer1: {
    paddingBottom: 10
  },
  imagemGrande1: {
    width: '100%',
    height: 300,
  },
  conteudo: {
    padding: 20
  },
  headerPet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  distancia: {
    color: '#ff6b6b',
    fontWeight: '600'
  },
  raca: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20
  },
  infoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  infoBox: {
    width: '48%',
    backgroundColor: '#f4f4f4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center'
  },
  infoBoxcastra:{
    width: '100%',
    backgroundColor: '#f4f4f4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center'
  },
  infoTitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  infoTexto: {
    fontSize: 16,
    fontWeight: '600'
  },
  ownerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20
  },
  ownerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  ownerNome: {
    fontWeight: 'bold'
  },
  ownerLocal: {
    color: '#999',
    fontSize: 12
  },
  chatBotao: {
    backgroundColor: '#a4a4ec',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 'auto'
  },
  chatTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  texto: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 20
  },
  botaoAdotar: {
    backgroundColor: '#d7ff89',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center'
  },
  textoAdotar: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333'
  }
});

export default TelaDetalhePet;
