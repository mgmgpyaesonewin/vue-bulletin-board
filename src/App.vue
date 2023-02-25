<template>
  <v-app theme="light">
    <v-layout class="bg-grey-lighten-3">
      <v-app-bar>
        <v-app-bar-title>
          <v-btn color="teal-lighten-1" variant="elevated" icon density="comfortable">
            <v-icon icon="fas fa-solid fa-b"></v-icon>
          </v-btn>
          Bulletin Board
        </v-app-bar-title>

        <template v-slot:append>
          <RouterLink to="/login" v-if="!store.isLoggedIn">
            <v-btn color="black" flat value="Login">Login</v-btn>
          </RouterLink>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const store = useAuthStore()

    return { store, RouterLink, RouterView }
  }
}
</script>
