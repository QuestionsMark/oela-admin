import { createContext, FC, useContext, useState, Dispatch, SetStateAction } from 'react';

interface AuthorizationContextValue {
    authorization: boolean;
    setAuthorization: Dispatch<SetStateAction<boolean>>;
}

const AuthorizationContext = createContext<AuthorizationContextValue>(null!);

export const useAuthorization = () => useContext(AuthorizationContext);

export const AuthorizationProvider: FC = ({ children }) => {

    const [authorization, setAuthorization] = useState(false);

    return (
        <AuthorizationContext.Provider value={{ authorization, setAuthorization }}>
            {children}
        </AuthorizationContext.Provider>
    );
};