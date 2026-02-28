import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const ADMIN_KEY = 'isAdmin';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const v = await AsyncStorage.getItem(ADMIN_KEY);
        if (mounted) setIsAdmin(v === '1');
      } catch (_e) {
        if (mounted) setIsAdmin(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function login(password: string) {
    // mock: accept 'admin' as password
    if (password === 'admin') {
      await AsyncStorage.setItem(ADMIN_KEY, '1');
      setIsAdmin(true);
      return true;
    }
    return false;
  }

  async function logout() {
    await AsyncStorage.removeItem(ADMIN_KEY);
    setIsAdmin(false);
  }

  return { isAdmin, login, logout } as const;
}
