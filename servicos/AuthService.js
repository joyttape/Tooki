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

// Classe para gerenciar autenticação e sessão do usuário
class AuthService {
  constructor() {
    this.usuarioLogado = null;
    this.listeners = [];
  }

  // Adicionar listener para mudanças de estado de autenticação
  adicionarListener(callback) {
    this.listeners.push(callback);
  }

  // Remover listener
  removerListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notificar todos os listeners sobre mudanças
  notificarListeners() {
    this.listeners.forEach(callback => callback(this.usuarioLogado));
  }

  // Realizar login
  async login(email, senha) {
    try {
      const usuario = validarLogin(email, senha);
      
      if (usuario) {
        this.usuarioLogado = usuario;
        this.notificarListeners();
        
        // Salvar dados de sessão (em produção, use AsyncStorage)
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

  // Realizar cadastro
  async cadastrar(dadosUsuario) {
    try {
      const { nome, email, telefone, cidade, estado, senha } = dadosUsuario;

      // Validações
      if (!nome || !email || !telefone || !cidade || !estado || !senha) {
        return {
          sucesso: false,
          mensagem: 'Todos os campos são obrigatórios'
        };
      }

      // Verificar se email já existe
      if (emailJaExiste(email)) {
        return {
          sucesso: false,
          mensagem: 'Este email já está cadastrado'
        };
      }

      // Validar formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          sucesso: false,
          mensagem: 'Formato de email inválido'
        };
      }

      // Validar senha
      if (senha.length < 6) {
        return {
          sucesso: false,
          mensagem: 'A senha deve ter pelo menos 6 caracteres'
        };
      }

      // Criar novo usuário
      const novoUsuario = adicionarUsuario({
        nome,
        email,
        telefone,
        cidade,
        estado,
        senha // Em produção, faça hash da senha
      });

      // Remover senha do retorno
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

  // Realizar logout
  logout() {
    this.usuarioLogado = null;
    this.notificarListeners();
    
    // Remover dados de sessão
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('usuarioLogado');
    }
  }

  // Verificar se usuário está logado
  estaLogado() {
    return this.usuarioLogado !== null;
  }

  // Obter usuário atual
  obterUsuarioAtual() {
    return this.usuarioLogado;
  }

  // Restaurar sessão (chamar ao inicializar o app)
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

  // Adicionar pet aos favoritos do usuário logado
  async adicionarPetFavorito(petId) {
    if (!this.usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Usuário não está logado'
      };
    }

    const sucesso = adicionarFavorito(this.usuarioLogado.id, petId);
    
    if (sucesso) {
      // Atualizar dados do usuário logado
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

  // Remover pet dos favoritos do usuário logado
  async removerPetFavorito(petId) {
    if (!this.usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Usuário não está logado'
      };
    }

    const sucesso = removerFavorito(this.usuarioLogado.id, petId);
    
    if (sucesso) {
      // Atualizar dados do usuário logado
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

  // Registrar adoção para o usuário logado
  async registrarAdocaoPet(petId) {
    if (!this.usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Usuário não está logado'
      };
    }

    const sucesso = registrarAdocao(this.usuarioLogado.id, petId);
    
    if (sucesso) {
      // Atualizar dados do usuário logado
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

  // Obter estatísticas do usuário logado
  obterEstatisticas() {
    if (!this.usuarioLogado) {
      return null;
    }

    return obterEstatisticasUsuario(this.usuarioLogado.id);
  }

  // Verificar se pet está nos favoritos
  petEstaNosFavoritos(petId) {
    if (!this.usuarioLogado) {
      return false;
    }

    return this.usuarioLogado.favoritos.includes(petId);
  }
}

// Instância singleton do serviço de autenticação
const authService = new AuthService();

export default authService;

