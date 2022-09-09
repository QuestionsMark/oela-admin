import flower1 from '../../images/f5.png';
import flower2 from '../../images/f7.png';
import flower3 from '../../images/f8.png';
import flower4 from '../../images/f3.png';
import flower5 from '../../images/f6.png';

export const Loading = () => {
    return (
        <div className="loading">
            {/* <img src={flower1} alt="Czerwony kwiatek" className="loading__img" />
            <img src={flower2} alt="Fioletowy kwiatek" className="loading__img" />
            <img src={flower3} alt="Czerwony kwiatek" className="loading__img" />
            <img src={flower4} alt="Żółty kwiatek" className="loading__img" />
            <img src={flower5} alt="Czerwony kwiatek" className="loading__img" /> */}
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};