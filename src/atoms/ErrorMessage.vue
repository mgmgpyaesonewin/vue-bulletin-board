<template>
  <v-alert
    :value="showError"
    :type="props.errorType"
    dismissible
    :class="cssClass"
  >
    <slot></slot>
  </v-alert>
</template>

<script lang="ts">
import { ref, computed } from "vue";

export default {
  props: {
    errorType: {
      type: String as () =>
        | "error"
        | "success"
        | "warning"
        | "info"
        | undefined,
      required: true,
      default: "error",
    },
    cssClass: {
      type: String,
    },
  },
  setup(props) {
    const showError = ref(false);

    const setError = () => {
      showError.value = true;
    };

    const clearError = () => {
      showError.value = false;
    };

    return {
      showError: computed(() => showError.value),
      props,
      setError,
      clearError,
    };
  },
};
</script>
