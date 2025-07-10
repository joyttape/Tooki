import pets from '../dados/petsData';

const PetService = {
  buscarPets: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return pets;
  },

  buscarPetPorId: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return pets.find(pet => pet.id === id);
  },

  enviarFormularioAdocao: async (dados) => {
    console.log('Dados do formulário (simulação):', dados);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Adoção solicitada com sucesso!' };
  }
};

export default PetService;