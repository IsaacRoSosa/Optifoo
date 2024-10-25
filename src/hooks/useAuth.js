import { useEffect, useState } from 'react';

// Hook personalizado para gestionar la autenticación
export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Comprobamos si hay un usuario guardado en localStorage al cargar el componente
    const userId = localStorage.getItem('user_uid');
    if (userId) {
      setUser({ id: userId }); // Simula un objeto usuario con solo el ID
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user_uid'); // Elimina el usuario del localStorage
    setUser(null);
  };

  return { user, logout };
}
