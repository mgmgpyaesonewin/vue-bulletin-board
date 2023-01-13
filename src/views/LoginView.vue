<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
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
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useFetchData } from "../hooks/useFetchData";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const form = ref(false);
    const email = ref(null);
    const password = ref(null);
    const loading = ref(false);

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
        console.log(data.value.message);
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
