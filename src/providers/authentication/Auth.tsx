import { ReactNode, createContext, useContext, useState } from "react";
import api from '../../services/api';
import { Token } from '../../types/Token';
import { User } from '../../types/User';

interface AuthProvidersProps {
    children: ReactNode;
}

interface AuthProviderData {
    token: Token;
    signIn: (user: User) => void;
}

const AuthContext = createContext<AuthProviderData>(
    {} as AuthProviderData
)

export const AuthProvider = ({children}: AuthProvidersProps) => {
    const token = localStorage.getItem('token') || '';

    const [auth, setAuth] = useState<Token>();

    const signIn = (user: User) => {
        api.post<User>('/sessions/', user)
        .then((response) => {
            localStorage.setItem('token', response.data.access);
            setAuth(response.data.access);
            history.push('/dashboard');
        })
        .catch((err) => console.log(err));
    }

    return (
        <AuthContext.Provider
            value={{ token, signIn}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);