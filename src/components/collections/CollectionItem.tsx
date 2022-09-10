import { Link } from "react-router-dom";
import { CollectionInterface } from "types";

import { Image } from "../common/Image";

interface Props {
    refference?: (node: any) => void;
    collection: CollectionInterface;
}

export const CollectionItem = ({ collection, refference }: Props) => {

    const { id, name, images } = collection;

    return (
        <li className="list__item card-animation" ref={refference ? refference : null} >
            <Link to={`/collection/${id}`} className="list__link" >
                <Image alt={images[0].alt} src={images[0].id} />
                <h2 className="list__item-title">{name}</h2>
            </Link>
        </li>
    );
};