import { FlowerAnimation } from "./FlowerAnimation";

export const Home = () => {
    return (
        <main className="main home">
            <div className="home__section section-animation">
                <h2 className="home__title">Admin Panel</h2>
                <p className="home__text">Wybierz zakładkę by wejść w konfigurację</p>
                <FlowerAnimation />
            </div>
        </main>
    );
};