import { ProductTypeInterface } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import { DeleteButton } from "../common/DeleteButton";

import { usePopup } from "../../contexts/popupContext";
import { getServerMessage } from "../../utils/getServerMessage";
import { fetchTool } from "../../utils/fetchUtils";

interface Props {
    productType: ProductTypeInterface;
    refference?: (node: any) => void;
    refresh: () => void;
}

export const ProductTypeItem = ({ productType, refference, refresh }: Props) => {

    const { id, name } = productType;

    const { setResponsePopup } = usePopup();

    const handleDelete = async () => {
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchTool(`product-type/${id}`, 'DELETE');
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        refresh();
    };

    return (
        <li className="list__item list__small-item tag-animation" ref={refference ? refference : null} >
            <p className="list__small-item-title">{name}</p>
            <DeleteButton handler={handleDelete} question="Czy napewno chcesz usunąć ten typ produktu?" onlyIcon><FontAwesomeIcon icon={faMinus} /></DeleteButton>
        </li>
    );
};