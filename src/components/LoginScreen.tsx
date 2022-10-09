import { FormEvent, useState } from "react";
import Popup from "reactjs-popup";
import { fetchTool } from "../utils/fetchUtils";
import { useAuthorization } from "../contexts/authorizationContext";
import { usePopup } from "../contexts/popupContext";
import { getServerMessage } from "../utils/getServerMessage";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {

    const { setAuthorization } = useAuthorization();
    const { setResponsePopup } = usePopup();
    const navigate = useNavigate();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetchTool('auth/login', 'POST', { login, password });
        if (!response.status) return setResponsePopup({ status: response.status, message: getServerMessage(response.message), open: true });
        setAuthorization(true);
        navigate('/');
    };

    return (
        <Popup open modal closeOnDocumentClick={false} closeOnEscape={false} className="my-popup my-popup--modal">
            <form className="form login-screen__form" onSubmit={handleSubmit}>
                <input type="text" className="form__inp form__inp--max login-screen__inp" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" />
                <input type="password" className="form__inp form__inp--max login-screen__inp" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
                <input type="submit" className="form__submit" value="Zaloguj" />
            </form>
        </Popup>
    );
};