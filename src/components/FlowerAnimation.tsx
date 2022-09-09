import f1 from '../images/f5.png';
import f2 from '../images/f7.png';
import f3 from '../images/f8.png';
import f4 from '../images/f3.png';
import f5 from '../images/f6.png';

export const FlowerAnimation = () => {
    return (
        <div className="flower-animation">
            <img src={f1} alt="Kwiatek" className="flower-animation__img" />
            <img src={f2} alt="Kwiatek" className="flower-animation__img" />
            <img src={f3} alt="Kwiatek" className="flower-animation__img" />
            <img src={f4} alt="Kwiatek" className="flower-animation__img" />
            <img src={f5} alt="Kwiatek" className="flower-animation__img" />
        </div>
    );
};