import { CoverInterface } from "types";

import { DeleteButton } from "../common/DeleteButton";
import { Image } from "../common/Image";

import { usePopup } from "../../contexts/popupContext";
import { fetchTool } from "../../utils/fetchUtils";
import { getServerMessage } from "../../utils/getServerMessage";

interface Props {
    cover: CoverInterface;
    refference?: (node: any) => void;
    refresh: () => void;
}

export const CoverItem = ({ cover, refference, refresh }: Props) => {

    const { id, image } = cover;

    const { setResponsePopup } = usePopup();

    const handleDelete = async () => {
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchTool(`cover/${id}`, 'DELETE');
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        refresh();
    };

    return (
        <li className="list__item card-animation" ref={refference ? refference : null}>
            <Image alt={image.alt} src={image.id} />
            <DeleteButton className="btn--delete-cover" handler={handleDelete} question="Czy napewno chcesz usunąć okładkę?">Usuń</DeleteButton>
        </li>
    );
};