import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-medical-navy text-white">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6" />
          <p className="font-bold tracking-widest uppercase text-xs animate-pulse text-white/50">Synchronizing Medical Records...</p>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};
