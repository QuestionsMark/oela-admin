import { NavLink } from "react-router-dom";
import { useAuthorization } from "../contexts/authorizationContext";
import { fetchTool } from "../utils/fetchUtils";

export const Nav = () => {
    const { logout } = useAuthorization();

    const handleLogout = async () => {
        const response = await fetchTool('auth/logout');
        if (!response.status) return;
        logout();
    };

    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink to="/product" className="menu__link" end>Produkty</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/collection" className="menu__link" end>Kolekcje</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/news" className="menu__link" end>Nowości</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/hashtag" className="menu__link">Hashtagi</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/product-type" className="menu__link">Typy Produktów</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/cover" className="menu__link">Okładki</NavLink>
                </li>
            </ul>
            <div className="menu__logout">
                <p className="menu__logout-text" onClick={handleLogout}>Wyloguj</p>
            </div>
        </nav>
    );
};