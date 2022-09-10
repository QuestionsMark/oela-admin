import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTool } from "../utils/fetchUtils";
import { useAuthorization } from "../contexts/authorizationContext";
import { AdminPanel } from "./AdminPanel";
import { Loading } from "./common/Loading";

export const AuthorizationPanel = () => {
    const { authorization } = useAuthorization();
    const navigate = useNavigate();

    const checkIsUserLogged = async () => {
        const response = await fetchTool('auth/is-logged');
        if (!response.status) return navigate('/login');
        navigate('/');
    };

    return authorization ? <AdminPanel /> : <Loading />;
};