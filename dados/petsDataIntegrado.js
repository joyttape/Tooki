import authService from '../servicos/AuthService';

const pets = [
  {
    id: 1,
    nome: "Rex",
    imagem: "https://img.freepik.com/fotos-gratis/lindo-retrato-de-cachorro_23-2149218450.jpg",
    imagem2: "https://img.freepik.com/fotos-premium/foto-bernese-mountain-dog-em-um-fundo-branco-tiro-de-estudio-de-um-cachorro-na-frente-de-um-fundo-isolado_447871-2566.jpg",
    idade: 3,
    tipo: 'Cachorro',
    sexo: 'Masculino',
    raca: "Labrador",
    instituicao: 'IVA',
    cidade: "Jaru",
    estado: 'RO',
    peso: 3,
    vacina: true,
    castrar: false,
    descricao: "Rex é um cachorro muito brincalhão e adora crianças. Foi resgatado das ruas e está pronto para um novo lar.",
    historia: "Encontrado abandonado em um parque, Rex foi resgatado por nossa equipe há 6 meses.",
    requisitos: "Precisa de espaço para correr e alguém com tempo para brincar."
  },
  {
    id: 2,
    nome: "Mimi",
    imagem: "https://www.whiskas.com.br/sites/g/files/fnmzdf2156/files/2024-10/gato-siames-02.jpg",
    imagem2: "https://premierpet.com.br/wp-content/uploads/2023/12/shutterstock_2341407545-2048x1365.jpg",
    idade: 2,
    tipo: 'Gato',
    sexo: 'Feminino',
    raca: "Siamês",
    instituicao: 'Amor pelos animais',
    cidade: "Ouro Preto",
    estado: 'RO',
    peso: 1.7,
    vacina: true,
    castrar: true,
    descricao: "Mimi é uma gatinha tranquila que adora carinho e sonecas no sol.",
    historia: "Seu antigo dono faleceu e ela está procurando um novo lar amoroso.",
    requisitos: "Melhor para apartamento. Não gosta de outros animais."
  },
  {
    id: 3,
    nome: "Bobby",
    imagem: "https://blog-static.petlove.com.br/wp-content/uploads/2024/04/29030254/cachorro-vira-lata-Petlove.jpg",
    imagem2: "https://zoodoptuj.pl/uploads/pets/f92f0b7d3a00.jpg",
    idade: 1,
    tipo: 'Cachorro',
    sexo: 'Masculino',
    raca: "Vira-lata",
    instituicao: 'IVA',
    cidade: "Jaru",
    estado: 'RO',
    peso: 6,
    vacina: true,
    castrar: false,
    descricao: "Filhote energético que adora brincar e fazer novos amigos.",
    historia: "Resgatado de um canil superlotado.",
    requisitos: "Precisa de treinamento básico e paciência."
  },
  {
  id: 4,
  nome: "Toby",
  imagem: "https://www.petz.com.br/cachorro/racas/beagle/img/beagle-caracteristicas-fisicas.webp",
  imagem2: "https://blog.polipet.com.br/wp-content/uploads/2023/01/AdobeStock_168506725-445x445.jpeg",
  idade: 2,
  tipo: 'Cachorro',
  sexo: 'Masculino',
  raca: "Beagle",
  instituicao: 'Lar Animal',
  cidade: "Cacoal",
  estado: 'RO',
  peso: 12,
  vacina: true,
  castrar: true,
  descricao: "Toby é um farejador curioso e cheio de energia.",
  historia: "Resgatado em uma fazenda abandonada.",
  requisitos: "Precisa de passeios frequentes e companhia constante."
},
{
  id: 5,
  nome: "Lola",
  imagem: "https://pearsonsaudeanimal.com/wp-content/uploads/2024/06/Design-sem-nome-18.jpg",
  imagem2: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3238967:1654206648/poodle%20toy%20.jpg?f=16x9&h=574&w=1020&$p$f$h$w=fb6c045",
  idade: 4,
  tipo: 'Cachorro',
  sexo: 'Feminino',
  raca: "Poodle",
  instituicao: 'Cão Feliz',
  cidade: "Rolim de Moura",
  estado: 'RO',
  peso: 7,
  vacina: true,
  castrar: true,
  descricao: "Lola é calma, carinhosa e adora colo.",
  historia: "Foi deixada em um pet shop por um tutor que nunca voltou.",
  requisitos: "Ideal para idosos ou famílias tranquilas."
},
{
  id: 6,
  nome: "Fred",
  imagem: "https://preview.redd.it/1-year-old-getting-neutered-soon-what-to-expect-v0-591my7idtv1e1.jpeg?auto=webp&s=bb173d3ce0326e108d39d70586273e4b46a38ab3",
  imagem2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHSbEUZavnQlIqPmuwycvUSJ_ikOzZBilJgQ&s",
  idade: 1,
  tipo: 'Cachorro',
  sexo: 'Masculino',
  raca: "Golden Retriever",
  instituicao: 'Amigos dos Animais',
  cidade: "Ji-Paraná",
  estado: 'RO',
  peso: 18,
  vacina: true,
  castrar: false,
  descricao: "Fred é alegre, sociável e ama crianças.",
  historia: "Entregue voluntariamente por uma família que não pôde mais cuidar.",
  requisitos: "Espaço amplo e tempo para brincadeiras."

},
{
  id: 7,
  nome: "Nina",
  imagem: "https://super.abril.com.br/wp-content/uploads/2024/09/0909-brazilian-shorthair-super-site.jpg?crop=1&resize=1212,909",
  imagem2: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/09/18/pelo-curto-brasileiro-rhr4tmnax3qp.jpg",
  idade: 1,
  tipo: 'Gato',
  sexo: 'Feminino',
  raca: "Pelo Curto",
  instituicao: 'Gatos e Cia',
  cidade: "Porto Velho",
  estado: 'RO',
  peso: 2.3,
  vacina: true,
  castrar: false,
  descricao: "Nina é brincalhona e adora caixas de papelão.",
  historia: "Foi achada embaixo de um carro com os irmãos.",
  requisitos: "Ambiente seguro e interativo."
},
{
  id: 8,
  nome: "Zico",
  imagem: "https://www.whiskas.com.br/sites/g/files/fnmzdf2156/files/2024-12/tudo-sobre-gato-tricolor-04.jpg",
  imagem2: "https://www.patasdacasa.com.br/sites/default/files/noticias/2021/10/todo-gato-de-3-cores-e-femea-veja-o-que-descobrimos.jpg",
  idade: 5,
  tipo: 'Gato',
  sexo: 'Masculino',
  raca: "Tigrado",
  instituicao: 'Lar dos Gatos',
  cidade: "Ariquemes",
  estado: 'RO',
  peso: 4.8,
  vacina: true,
  castrar: true,
  descricao: "Zico é observador, independente e dorme boa parte do dia.",
  historia: "Sobreviveu nas ruas e hoje confia apenas após um tempo.",
  requisitos: "Ambiente silencioso e sem crianças pequenas."
},
{
  id: 9,
  nome: "Luna",
  imagem: "https://www.patasdacasa.com.br/sites/default/files/styles/article_detail_1200/public/2024-09/gato-preto.jpg.webp?itok=VI-YbRBa",
  imagem2: "https://static.wixstatic.com/media/1cbe41_1db56ff59200428f99b87077f3b9f8dc~mv2_d_2304_1728_s_2.jpg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/1cbe41_1db56ff59200428f99b87077f3b9f8dc~mv2_d_2304_1728_s_2.jpg",
  idade: 3,
  tipo: 'Gato',
  sexo: 'Feminino',
  raca: "Preta",
  instituicao: 'Amor pelos Animais',
  cidade: "Jaru",
  estado: 'RO',
  peso: 3.5,
  vacina: true,
  castrar: true,
  descricao: "Luna é quieta, afetuosa e adora lugares altos.",
  historia: "Resgatada durante uma tempestade.",
  requisitos: "Precisa de local telado e sem rotas de fuga."
}
];

export const obterTodosPets = () => {
  return pets.filter(pet => pet.disponivel);
};

export const obterPetPorId = (id) => {
  const pet = pets.find(pet => pet.id === id);
  if (pet) {
    pet.visualizacoes += 1;
  }
  return pet;
};

export const filtrarPets = (filtros) => {
  let petsDisponiveis = pets.filter(pet => pet.disponivel);

  if (filtros.tipo) {
    petsDisponiveis = petsDisponiveis.filter(pet => 
      pet.tipo.toLowerCase() === filtros.tipo.toLowerCase()
    );
  }

  if (filtros.cidade) {
    petsDisponiveis = petsDisponiveis.filter(pet => 
      pet.cidade.toLowerCase().includes(filtros.cidade.toLowerCase())
    );
  }

  if (filtros.estado) {
    petsDisponiveis = petsDisponiveis.filter(pet => 
      pet.estado.toLowerCase() === filtros.estado.toLowerCase()
    );
  }

  if (filtros.sexo) {
    petsDisponiveis = petsDisponiveis.filter(pet => 
      pet.sexo.toLowerCase() === filtros.sexo.toLowerCase()
    );
  }

  if (filtros.vacinado !== undefined) {
    petsDisponiveis = petsDisponiveis.filter(pet => pet.vacina === filtros.vacinado);
  }

  if (filtros.castrado !== undefined) {
    petsDisponiveis = petsDisponiveis.filter(pet => pet.castrar === filtros.castrado);
  }

  if (filtros.idadeMin) {
    petsDisponiveis = petsDisponiveis.filter(pet => pet.idade >= filtros.idadeMin);
  }

  if (filtros.idadeMax) {
    petsDisponiveis = petsDisponiveis.filter(pet => pet.idade <= filtros.idadeMax);
  }

  return petsDisponiveis;
};

export const buscarPetsPorNome = (nome) => {
  return pets.filter(pet => 
    pet.disponivel && 
    pet.nome.toLowerCase().includes(nome.toLowerCase())
  );
};

export const obterPetsFavoritos = () => {
  const usuario = authService.obterUsuarioAtual();
  if (!usuario) {
    return [];
  }

  return pets.filter(pet => usuario.favoritos.includes(pet.id));
};

export const demonstrarInteresse = (petId) => {
  const usuario = authService.obterUsuarioAtual();
  if (!usuario) {
    return {
      sucesso: false,
      mensagem: 'Usuário não está logado'
    };
  }

  const pet = pets.find(p => p.id === petId);
  if (!pet) {
    return {
      sucesso: false,
      mensagem: 'Pet não encontrado'
    };
  }

  if (!pet.disponivel) {
    return {
      sucesso: false,
      mensagem: 'Pet não está mais disponível'
    };
  }

  const jaInteressado = pet.interessados.some(interessado => interessado.usuarioId === usuario.id);
  if (jaInteressado) {
    return {
      sucesso: false,
      mensagem: 'Você já demonstrou interesse neste pet'
    };
  }

  pet.interessados.push({
    usuarioId: usuario.id,
    nomeUsuario: usuario.nome,
    emailUsuario: usuario.email,
    telefoneUsuario: usuario.telefone,
    dataInteresse: new Date().toISOString()
  });

  return {
    sucesso: true,
    mensagem: 'Interesse registrado com sucesso! A instituição entrará em contato.'
  };
};

export const marcarPetComoAdotado = (petId, usuarioId) => {
  const pet = pets.find(p => p.id === petId);
  if (pet) {
    pet.disponivel = false;
    pet.dataAdocao = new Date().toISOString();
    pet.adotadoPor = usuarioId;
    
    authService.registrarAdocaoPet(petId);
    
    return true;
  }
  return false;
};

export const obterEstatisticasGerais = () => {
  const totalPets = pets.length;
  const petsDisponiveis = pets.filter(pet => pet.disponivel).length;
  const petsAdotados = pets.filter(pet => !pet.disponivel).length;
  
  const tiposPets = pets.reduce((acc, pet) => {
    acc[pet.tipo] = (acc[pet.tipo] || 0) + 1;
    return acc;
  }, {});

  const cidadesAtendidas = [...new Set(pets.map(pet => `${pet.cidade}, ${pet.estado}`))];

  return {
    totalPets,
    petsDisponiveis,
    petsAdotados,
    tiposPets,
    cidadesAtendidas: cidadesAtendidas.length,
    listaCidades: cidadesAtendidas
  };
};

export const obterPetsMaisVisualizados = (limite = 5) => {
  return pets
    .filter(pet => pet.disponivel)
    .sort((a, b) => b.visualizacoes - a.visualizacoes)
    .slice(0, limite);
};

export const obterPetsRecemChegados = (limite = 5) => {
  return pets
    .filter(pet => pet.disponivel)
    .sort((a, b) => new Date(b.dataResgate) - new Date(a.dataResgate))
    .slice(0, limite);
};

export default pets;

