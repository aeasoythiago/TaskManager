import api from './interceptor';

// Função de autenticação para a rota /login
export async function login(email, senha) {
  const response = await api.post('users/login', { email, senha });
  console.log(response);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

// Função de cadastro de usuário
export async function signup(nome, email, senha) {
  // Cria o usuário
  await api.post('users/criarusuario', { primeironome: nome, email, senha });
  // Faz login automático
  return await login(email, senha);
}

export default api;
