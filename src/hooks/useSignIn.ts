import { ref, type Ref } from "vue";
import { supabase } from "@/supabase/supabase";
import type { AuthResponse } from "@supabase/supabase-js";

export const useSignIn = async (email: string, password: string) => {
  const data = ref<AuthResponse>();
  const error = ref();
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    data.value = response;
  } catch (e) {
    error.value = e;
  }
};
