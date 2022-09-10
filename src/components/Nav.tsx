import { NavLink } from "react-router-dom";

export const Nav = () => {
    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink to="/product" className="menu__link">Produkty</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/collection" className="menu__link">Kolekcje</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/news" className="menu__link">Nowości</NavLink>
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
        </nav>
    );
};