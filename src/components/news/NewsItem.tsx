import { Link } from "react-router-dom";
import { NewsInterface } from "types";

import { Image } from "../common/Image";

interface Props {
    refference?: (node: any) => void;
    news: NewsInterface;
}

export const NewsItem = ({ news, refference }: Props) => {

    const { id, name, images } = news;

    return (
        <li className="list__item card-animation" ref={refference ?? null} >
            <Link to={`/news/${id}`} className="list__link" >
                <Image alt={images[0].alt} src={images[0].id} />
                <h2 className="list__item-title">{name}</h2>
            </Link>
        </li>
    );
};