import { Link } from "react-router-dom";
import { ProductInterface } from "types";

import { Image } from "../common/Image";

interface Props {
    refference?: (node: any) => void;
    product: ProductInterface;
}

export const ProductItem = ({ product, refference }: Props) => {

    const { id, name, images } = product;

    return (
        <li className="list__item card-animation" ref={refference ? refference : null} >
            <Link to={`/products/${id}`} className="list__link" >
                <Image alt={images[0].alt} src={images[0].id} />
                <h2 className="list__item-title">{name}</h2>
            </Link>
        </li>
    );
};