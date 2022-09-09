import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { fetchTool } from "../utils/fetchUtils";
import { ClientResponse, ClientApiResponse } from "types";
import { useAuthorization } from "../contexts/authorizationContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePopup } from "../contexts/popupContext";
import { getServerMessage } from "../utils/getServerMessage";

export const LoginScreen = () => {

    const { setAuthorization } = useAuthorization();
    const { setResponsePopup } = usePopup();

    // const [token, setToken] = useLocalStorage('token', '') as [string, Dispatch<SetStateAction<string>>];

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // const checkAuthorization = async () => {
    //     const { status } = await fetchTool(`authorization/${token}`) as ClientResponse;
    //     if (status) return setAuthorization(true);
    //     setAuthorization(false);
    // };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetchTool(`login/${login}/${password}`);
        if (!response.status) return setResponsePopup({ status: response.status, message: getServerMessage(response.message), open: true });
        // setToken((response.results as LoginApi).token);
    };

    // useEffect(() => {
    //     if (!token) return;
    //     checkAuthorization();
    // }, [token]);

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