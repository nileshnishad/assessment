import { ref, computed } from 'vue';

const theme = ref('light');

export function useTheme() {
    console.log( theme.value);
  const themeClass = computed(() => theme.value);

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'light' : 'light';
  };

  return {
    themeClass,
    toggleTheme,
  };
}
