import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token: Ref<string | null> = ref(null);

  const isLoggedIn: Ref<boolean> = computed(() => token.value != null);

  function setToken(value: string | null) {
    token.value = value;
  }

  return { token, isLoggedIn, setToken };
});
