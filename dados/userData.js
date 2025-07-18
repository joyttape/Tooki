// Arquivo para armazenar dados dos usuários cadastrados
const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    cidade: "São Paulo",
    estado: "SP",
    senha: "123456",
    dataCadastro: "2024-01-15T10:30:00.000Z",
    ativo: true,
    favoritos: [1, 3],
    adocoes: [],
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(21) 88888-8888",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    senha: "senha123",
    dataCadastro: "2024-02-20T14:15:00.000Z",
    ativo: true,
    favoritos: [2, 4, 5],
    adocoes: [],
  }
];

export const adicionarUsuario = (novoUsuario) => {
  const usuario = {
    id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
    ...novoUsuario,
    dataCadastro: new Date().toISOString(),
    ativo: true,
    favoritos: [],
    adocoes: [],
  };
  
  usuarios.push(usuario);
  return usuario;
};

export const buscarUsuarioPorEmail = (email) => {
  return usuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());
};

export const buscarUsuarioPorId = (id) => {
  return usuarios.find(usuario => usuario.id === id);
};

export const validarLogin = (email, senha) => {
  const usuario = buscarUsuarioPorEmail(email);
  if (usuario && usuario.senha === senha && usuario.ativo) {
    const { senha: _, ...dadosUsuario } = usuario;
    return dadosUsuario;
  }
  return null;
};

export const atualizarUsuario = (id, dadosAtualizados) => {
  const index = usuarios.findIndex(usuario => usuario.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...dadosAtualizados };
    return usuarios[index];
  }
  return null;
};

export const adicionarFavorito = (usuarioId, petId) => {
  const usuario = buscarUsuarioPorId(usuarioId);
  if (usuario && !usuario.favoritos.includes(petId)) {
    usuario.favoritos.push(petId);
    return true;
  }
  return false;
};

export const removerFavorito = (usuarioId, petId) => {
  const usuario = buscarUsuarioPorId(usuarioId);
  if (usuario) {
    const index = usuario.favoritos.indexOf(petId);
    if (index > -1) {
      usuario.favoritos.splice(index, 1);
      return true;
    }
  }
  return false;
};

export const registrarAdocao = (usuarioId, petId, dataAdocao = new Date().toISOString()) => {
  const usuario = buscarUsuarioPorId(usuarioId);
  if (usuario) {
    const adocao = {
      petId,
      dataAdocao,
      status: 'concluida'
    };
    usuario.adocoes.push(adocao);
    return true;
  }
  return false;
};

export const emailJaExiste = (email) => {
  return usuarios.some(usuario => usuario.email.toLowerCase() === email.toLowerCase());
};

export const obterEstatisticasUsuario = (usuarioId) => {
  const usuario = buscarUsuarioPorId(usuarioId);
  if (usuario) {
    return {
      totalFavoritos: usuario.favoritos.length,
      totalAdocoes: usuario.adocoes.length,
      dataCadastro: usuario.dataCadastro,
      tempoComoMembro: Math.floor((new Date() - new Date(usuario.dataCadastro)) / (1000 * 60 * 60 * 24)) // dias
    };
  }
  return null;
};

export default usuarios;

