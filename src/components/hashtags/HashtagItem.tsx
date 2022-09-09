import { HashtagInterface } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import { DeleteButton } from "../common/DeleteButton";

import { usePopup } from "../../contexts/popupContext";
import { fetchTool } from "../../utils/fetchUtils";
import { getServerMessage } from "../../utils/getServerMessage";

interface Props {
    hashtag: HashtagInterface;
    refference?: (node: any) => void;
    refresh: () => void;
}

export const HashtagItem = ({ hashtag, refference, refresh }: Props) => {

    const { id, name } = hashtag;

    const { setResponsePopup } = usePopup();

    const handleDelete = async () => {
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchTool(`hashtags/${id}`, 'DELETE');
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        refresh();
    };

    return (
        <li className="list__item list__small-item tag-animation" ref={refference ? refference : null}>
            <p className="list__small-item-title">{name}</p>
            <DeleteButton handler={handleDelete} question="Czy napewno chcesz usunąć hashtag?" onlyIcon><FontAwesomeIcon icon={faMinus} /></DeleteButton>
        </li>
    );
};