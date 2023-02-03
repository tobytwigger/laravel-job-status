import { onMounted, onUnmounted, ref } from 'vue';
import Timeout = NodeJS.Timeout;

export function useApi(callApi: (after: () => void) => void) {
  const loading = ref<boolean>(false);

  function triggerApiCall() {
    loading.value = true;
    function after(): void {
      loading.value = false;
    }
    callApi(after);
  }

  let intervalId: Timeout;

  onMounted(() => {
    intervalId = setInterval(() => triggerApiCall(), 1000);
    triggerApiCall();
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return {
    loading,
    triggerApiCall,
  };
}
