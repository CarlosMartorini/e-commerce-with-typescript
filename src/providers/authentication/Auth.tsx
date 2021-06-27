import { createContext, useContext, useState, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { User } from '../../types/User';
import { UserSignUp } from '../../types/UserSignUp';
import { toast } from "react-toastify";
import api from "../../services/api";

interface ProviderProps {
    children: ReactNode
}

interface ProviderData {
    token: string,
    setAuth: (token: string) => void,
    signIn: (user: User, setError: (isTrue: boolean) => void) => void,
    signUpForm: (user: UserSignUp, setError: (isTrue: boolean) => void) => void,
}

const AuthContext = createContext<ProviderData>({} as ProviderData);

export const AuthProvider = ({ children }: ProviderProps) => {
    const history = useHistory()
    const token = localStorage.getItem('token') || ''

    const [auth, setAuth] = useState<string>(token);

    const signIn = (user: User, setError: (isTrue: boolean) => void) => {
        
        api
        .post("/sessions/", user)
        .then((response) => {
            localStorage.setItem("token", response.data.access);
            setAuth(response.data.access);
            toast.info('logado com sucesso')
            history.push("/dashboard");
        })
        .catch((err) => setError(true));
    };

    const signUpForm = (user: User, setError: (isTrue: boolean) => void) => {
        
        api
        .post("/users/", user)
        .then((response) => {
            toast.success('usuario criado com sucesso')
            history.push("/login");
        })
        .catch((err) => toast.error('erro ao criar o usuario, usuario cadastrado'));
    };

    return (
        <AuthContext.Provider value={{ token: auth, setAuth, signIn, signUpForm }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);