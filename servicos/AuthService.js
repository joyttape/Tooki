import { 
  adicionarUsuario, 
  validarLogin, 
  emailJaExiste, 
  buscarUsuarioPorId,
  adicionarFavorito,
  removerFavorito,
  registrarAdocao,
  obterEstatisticasUsuario
} from '../dados/userData';

class AuthService {
  constructor() {
    this.usuarioLogado = null;
    this.listeners = [];
  }

  adicionarListener(callback) {
    this.listeners.push(callback);
  }

  removerListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notificarListeners() {
    this.listeners.forEach(callback => callback(this.usuarioLogado));
  }

  async login(email, senha) {
    try {
      const usuario = validarLogin(email, senha);
      
      if (usuario) {
        this.usuarioLogado = usuario;
        this.notificarListeners();
        
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        }
        
        return {
          sucesso: true,
          usuario: usuario,
          mensagem: 'Login realizado com sucesso!'
        };
      } else {
        return {
          sucesso: false,
          mensagem: 'Email ou senha incorretos'
        };
      }
    } catch (error) {
      return {
        sucesso: false,
        mensagem: 'Erro interno. Tente novamente.'
      };
    }
  }

  async cadastrar(dadosUsuario) {
    try {
      const { nome, email, telefone, cidade, estado, senha } = dadosUsuario;

      if (!nome || !email || !telefone || !cidade || !estado || !senha) {
        return {
          sucesso: false,
          mensagem: 'Todos os campos são obrigatórios'
        };
      }

      if (emailJaExiste(email)) {
        return {
          sucesso: false,
          mensagem: 'Este email já está cadastrado'
        };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          sucesso: false,
          mensagem: 'Formato de email inválido'
        };
      }

      if (senha.length < 6) {
        return {
          sucesso: false,
          mensagem: 'A senha deve ter pelo menos 6 caracteres'
        };
      }

      const novoUsuario = adicionarUsuario({
        nome,
        email,
        telefone,
        cidade,
        estado,
        senha 
      });

      const { senha: _, ...usuarioSemSenha } = novoUsuario;

      return {
        sucesso: true,
        usuario: usuarioSemSenha,
        mensagem: 'Cadastro realizado com sucesso!'
      };

    } catch (error) {
      return {
        sucesso: false,
        mensagem: 'Erro interno. Tente novamente.'
      };
    }
  }

  logout() {
    this.usuarioLogado = null;
    this.notificarListeners();
    
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('usuarioLogado');
    }
  }

  estaLogado() {
    return this.usuarioLogado !== null;
  }

  obterUsuarioAtual() {
    return this.usuarioLogado;
  }

  restaurarSessao() {
    try {
      if (typeof localStorage !== 'undefined') {
        const dadosSalvos = localStorage.getItem('usuarioLogado');
        if (dadosSalvos) {
          this.usuarioLogado = JSON.parse(dadosSalvos);
          this.notificarListeners();
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async adicionarPetFavorito(petId) {
    if (!this.usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Usuário não está logado'
      };
    }

    const sucesso = adicionarFavorito(this.usuarioLogado.id, petId);
    
    if (sucesso) {
      this.usuarioLogado.favoritos.push(petId);
      this.notificarListeners();
      
      return {
        sucesso: true,
        mensagem: 'Pet adicionado aos favoritos!'
      };
    } else {
      return {
        sucesso: false,
        mensagem: 'Pet já está nos favoritos ou erro interno'
      };
    }
  }

  async removerPetFavorito(petId) {
    if (!this.usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Usuário não está logado'
      };
    }

    const sucesso = removerFavorito(this.usuarioLogado.id, petId);
    
    if (sucesso) {
      const index = this.usuarioLogado.favoritos.indexOf(petId);
      if (index > -1) {
        this.usuarioLogado.favoritos.splice(index, 1);
      }
      this.notificarListeners();
      
      return {
        sucesso: true,
        mensagem: 'Pet removido dos favoritos!'
      };
    } else {
      return {
        sucesso: false,
        mensagem: 'Erro ao remover pet dos favoritos'
      };
    }
  }

  async registrarAdocaoPet(petId) {
    if (!this.usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Usuário não está logado'
      };
    }

    const sucesso = registrarAdocao(this.usuarioLogado.id, petId);
    
    if (sucesso) {
      const novaAdocao = {
        petId,
        dataAdocao: new Date().toISOString(),
        status: 'concluida'
      };
      this.usuarioLogado.adocoes.push(novaAdocao);
      this.notificarListeners();
      
      return {
        sucesso: true,
        mensagem: 'Adoção registrada com sucesso!'
      };
    } else {
      return {
        sucesso: false,
        mensagem: 'Erro ao registrar adoção'
      };
    }
  }

  obterEstatisticas() {
    if (!this.usuarioLogado) {
      return null;
    }

    return obterEstatisticasUsuario(this.usuarioLogado.id);
  }

  petEstaNosFavoritos(petId) {
    if (!this.usuarioLogado) {
      return false;
    }

    return this.usuarioLogado.favoritos.includes(petId);
  }
}

const authService = new AuthService();

export default authService;

