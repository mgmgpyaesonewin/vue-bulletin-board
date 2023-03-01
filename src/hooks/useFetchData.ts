import { toRefs, reactive } from 'vue';

interface State<T> {
  data: T | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export const useFetchData = async <T>(
  url: string,
  options?: Record<string, unknown>
) => {
  const state = reactive<State<T>>({
    isLoading: true,
    hasError: false,
    errorMessage: '',
    data: null,
  });

  const fetchData = async () => {
    state.isLoading = true;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      state.data = await response.json();
    } catch (error: unknown) {
      const typedError = error as Error;
      state.hasError = true;
      state.errorMessage = typedError.message;
    } finally {
      state.isLoading = false;
    }
  };

  await fetchData();

  return {
    ...toRefs(state),
  };
};
