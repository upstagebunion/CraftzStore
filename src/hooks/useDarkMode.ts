import { useEffect, useState } from 'react';

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Función para verificar la preferencia del sistema
    const checkSystemPreference = () => {
      if (typeof window !== 'undefined') { // Asegura que solo se ejecute en el cliente
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    };

    // Establece el estado inicial
    setIsDarkMode(checkSystemPreference());

    // Escucha cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Limpieza al desmontar el componente
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDarkMode;
}

export default useDarkMode;