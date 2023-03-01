<template>
  <v-card class="mx-auto px-6 py-8" max-width="400">
    <v-card-title class="text-center">
      <h3 class="text-h5">Login</h3>
    </v-card-title>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Password"
        placeholder="Enter your password"
      ></v-text-field>
      <error-message css-class="mb-2" errorType="error" v-show="hasError">
        {{ errorMessage }}
      </error-message>

      <v-btn
        :disabled="!form"
        :loading="loading"
        block
        color="primary"
        type="submit"
        variant="flat"
        prepend-icon="fas fa-sign-in-alt"
      >
        Sign In
      </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../hooks/useAuth';
import { useSignIn } from '@/hooks/useSignIn';
import ErrorMessage from '@/atoms/ErrorMessage.vue';

export default defineComponent({
  name: 'LoginForm',
  components: {
    ErrorMessage
  },
  setup() {
    const form = ref(false);
    const email = ref<string | null>(null);
    const password = ref(null);
    const loading = ref(false);
    const hasError = ref(false);
    const errorMessage = ref('');

    const router = useRouter();
    const { setToken } = useAuth();

    async function onSubmit() {
      if (!form.value) return;

      if (!!email.value && !!password.value) {
        try {
          // Submitting Form Request
          loading.value = true;

          // Signin User to supabase
          const { user: authUser } = await useSignIn(email.value, password.value);
          console.log({
            user: authUser,
            session: authUser.value?.data.session,
            access_token: authUser.value?.data.session?.access_token
          });

          if (!authUser) {
            throw new Error('Failed to sign in. Please try again.');
          }

          // Set session token
          const accessToken = authUser.value?.data.session?.access_token;
          if (!accessToken) {
            throw new Error('Failed to generate token. Please try again.');
          }

          // Set token and change route
          setToken(accessToken);
          router.push('/create-post');
        } catch (e) {
          console.error(e);
          if (e instanceof Error) {
            hasError.value = true;
            errorMessage.value = e.message.toString();
          }
        } finally {
          loading.value = false;
        }
      }
    }

    function required(v: any) {
      return !!v || 'Field is required';
    }

    return {
      form,
      email,
      password,
      loading,
      onSubmit,
      required,
      hasError,
      errorMessage
    };
  }
});
</script>
