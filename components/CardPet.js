import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const larguraTela = Dimensions.get('window').width;
const larguraCard = (larguraTela - 30) / 2;

const coresDeFundo = ['#FFB74D', '#BA68C8', '#4DB6AC', '#64B5F6', '#E57373', '#FFD54F'];

const CardPet = ({ pet, onPress, index }) => {
  const corFundo = coresDeFundo[index % coresDeFundo.length];

  return (
    <TouchableOpacity style={[styles.card, { width: larguraCard }]} onPress={onPress}>
      <View style={[styles.imagemContainer, { backgroundColor: corFundo }]}>
        <Image source={{ uri: pet.imagem }} style={styles.imagem} resizeMode="cover" />
      </View>

      <View style={styles.info}>
        <Text style={styles.nome}>{pet.nome}</Text>
        <Text style={styles.raca}>({pet.raca})</Text>
        <View style={styles.tags}>
          <Text style={[styles.tag, { backgroundColor: '#F4F4F4' }]}>{pet.sexo}</Text>
          <Text style={[styles.tag, { backgroundColor: '#F4F4F4' }]}>{pet.idade} anos</Text>
          <Text style={[styles.tag, { backgroundColor: '#F4F4F4' }]}>{pet.peso} kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  imagemContainer: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
  },
  nome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  raca: {
    fontSize: 12,
    color: '#666',
  },
  tags: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 6,
  },
  tag: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#333',
  },
});

export default CardPet;
