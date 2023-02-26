import { ref } from 'vue';
import { supabase } from '@/supabase/supabase';
import { type AuthResponse, AuthError } from '@supabase/supabase-js';

export const useSignIn = async (email: string, password: string) => {
  const data = ref<AuthResponse>();
  const error = ref();
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password
    });
    data.value = response;

    if (data.value.error instanceof AuthError) {
      throw new Error(data.value.error.message);
    }

    return {
      user: data
    };
  } catch (e) {
    error.value = e;
    if (e instanceof Error) {
      error.value = e.message.toString();
    }
    throw new Error(error.value);
  }
};
