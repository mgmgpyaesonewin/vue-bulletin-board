import { ref } from 'vue';

export function useAuth() {
  const token = ref<string>(localStorage.getItem('token') || '');

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  function removeToken() {
    token.value = '';
    localStorage.removeItem('token');
  }

  return { token, setToken, removeToken };
}
