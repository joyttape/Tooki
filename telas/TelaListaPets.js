import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import CardPet from '../components/CardPet';
import PetService from '../servicos/ApiService';

const categorias = ['Todos', 'Cachorro', 'Gato'];

const TelaListaPets = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroSelecionado, setFiltroSelecionado] = useState('Todos');

  useEffect(() => {
    const carregarPets = async () => {
      try {
        const dados = await PetService.buscarPets();
        setPets(dados);
      } catch (erro) {
        console.error('Erro ao carregar pets:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarPets();
  }, []);

  const petsFiltrados =
    filtroSelecionado === 'Todos'
      ? pets
      : pets.filter(pet => pet.tipo.toLowerCase() === filtroSelecionado.toLowerCase());

  if (carregando) {
    return (
      <View style={estilos.container}>
        <Text>Carregando pets...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.filtros}>
        {categorias.map(categoria => (
          <TouchableOpacity
            key={categoria}
            onPress={() => setFiltroSelecionado(categoria)}
            style={[
              estilos.botaoFiltro,
              filtroSelecionado === categoria && estilos.botaoSelecionado,
            ]}
          >
            <Text
              style={[
                estilos.textoFiltro,
                filtroSelecionado === categoria && estilos.textoSelecionado,
              ]}
            >
              {categoria}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={petsFiltrados}
        renderItem={({ item, index }) => (
          <CardPet
            pet={item}
            index={index}
            onPress={() => navigation.navigate('DetalhePet', { petId: item.id })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={estilos.lista}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  filtros: {
    flexGrow: 0,
    marginBottom: 10,
  },
  botaoFiltro: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  textoFiltro: {
    fontSize: 13,
    color: '#555',
  },
  botaoSelecionado: {
    backgroundColor: '#a4a4ec',
  },
  textoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 20,
  },
});

export default TelaListaPets;
