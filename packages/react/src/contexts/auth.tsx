import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getUser, signIn as sendSignInRequest } from '../api/auth';

interface IUser {
  email: string;
  name: string;
  avatarUrl: string;
}

type IAuthContextType = {
  user?: IUser;
  signIn: (email: string, password: string) => Promise<{isOk: boolean, data?: IUser, message?: string}>;
  signOut: () => void;
  loading: boolean;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider(props: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      setUser(result.data);
    }

    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser(undefined);
  }, []);


  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
  );
}

const AuthContext = createContext<IAuthContextType>({ loading: false } as IAuthContextType);
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
