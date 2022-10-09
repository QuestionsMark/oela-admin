import { createContext, FC, useContext, useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApiTool, fetchTool } from '../utils/fetchUtils';

interface AuthorizationContextValue {
    authorization: boolean;
    setAuthorization: Dispatch<SetStateAction<boolean>>;
    isAccount: boolean | null;
    setIsAccount: Dispatch<SetStateAction<boolean | null>>;
    logout: () => void;
}

const AuthorizationContext = createContext<AuthorizationContextValue>(null!);

export const useAuthorization = () => useContext(AuthorizationContext);

export const AuthorizationProvider: FC = ({ children }) => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const [authorization, setAuthorization] = useState(false);
    const [isAccount, setIsAccount] = useState<boolean | null>(null);

    const logout = () => {
        setAuthorization(false);
        checkIsAccount();
    };

    const checkIsAccount = async () => {
        const response = await fetchApiTool<boolean>('user/is-account');
        if (!response.status) {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
                checkIsAccount();
            }, 5000);
            return;
        }
        setIsAccount(response.results);
        if (!response.results) {
            navigate('/');
            return;
        }
        const response2 = await fetchTool('auth/is-logged');
        if (!response2.status) return navigate('/login');
        setAuthorization(true);
        navigate('/');
    };

    useEffect(() => {
        checkIsAccount();
    }, []);

    return (
        <AuthorizationContext.Provider value={{
            authorization,
            setAuthorization,
            isAccount,
            setIsAccount,
            logout
        }}>
            {children}
        </AuthorizationContext.Provider>
    );
};