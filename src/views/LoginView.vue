<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="400">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
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

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="teal-lighten-1"
          size="large"
          type="submit"
          variant="elevated"
          prepend-icon="fas fa-sign-in-alt"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useFetchData } from "../hooks/useFetchData";
import { useAuth } from "../hooks/useAuth";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const form = ref(false);
    const email = ref(null);
    const password = ref(null);
    const loading = ref(false);

    const router = useRouter();
    const { setToken } = useAuth();

    async function onSubmit() {
      if (!form.value) return;

      const { data, hasError, errorMessage } = await useFetchData(
        "http://localhost:8082/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!hasError.value) {
        setToken((data.value as { token: string }).token);
        router.push("/home");
      } else {
        console.log(errorMessage.value);
      }
    }

    function required(v: any) {
      return !!v || "Field is required";
    }

    return {
      form,
      email,
      password,
      loading,
      onSubmit,
      required,
    };
  },
});
</script>
