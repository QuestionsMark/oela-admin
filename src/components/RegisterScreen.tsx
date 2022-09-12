import { FormEvent } from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Popup from "reactjs-popup";
import { useAuthorization } from '../contexts/authorizationContext';
import { usePopup } from "../contexts/popupContext";
import { fetchTool } from "../utils/fetchUtils";

export const RegisterScreen = () => {
    const { setResponsePopup } = usePopup();
    const { setIsAccount } = useAuthorization();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setResponsePopup({ status: true, message: 'Wysyłanie...', open: true });
        const response = await fetchTool('user', 'POST', { email, login, password });
        if (!response.status) return setResponsePopup({ status: response.status, message: response.message, open: true });
        setResponsePopup({ status: response.status, message: response.message, open: true });
        setIsAccount(true);
        setTimeout(() => {
            navigate('/login');
            setResponsePopup({ status: false, message: '', open: false });
        }, 2000);
    };

    return (
        <Popup open modal closeOnDocumentClick={false} closeOnEscape={false} className="my-popup my-popup--modal">
            <form className="form login-screen__form" onSubmit={handleSubmit}>
                <input type="email" className="form__inp form__inp--max login-screen__inp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                <input type="text" className="form__inp form__inp--max login-screen__inp" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" />
                <input type="password" className="form__inp form__inp--max login-screen__inp" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
                <input type="submit" className="form__submit" value="Zarejestruj" />
            </form>
        </Popup>
    );
};