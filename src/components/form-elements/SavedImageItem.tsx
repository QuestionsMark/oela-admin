import { FormEvent, useState } from "react";
import { fetchTool } from "../../utils/fetchUtils";
import { Img, Model } from "types";
import { getModel } from '../../utils/getModel';
import { usePopup } from "../../contexts/popupContext";
import { getServerMessage } from "../../utils/getServerMessage";
import { DeleteButton } from "../common/DeleteButton";
import { Image } from "../common/Image";
import { SubmitButton } from "../common/SubmitButton";

interface Props {
    id: string;
    image: Img;
    model: Model;
    refresh: () => Promise<void>;
}

export const SavedImageItem = ({ id, image, model, refresh }: Props) => {

    const { id: src } = image;

    const { setResponsePopup } = usePopup();

    const [alt, setAlt] = useState<string>(image.alt);

    const handleDelete = async () => {
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchTool(`${getModel(model)}/${id}/image/${src}`, 'DELETE');
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        refresh();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchTool(`${getModel(model)}/${src}/image-alt`, 'PATCH', { alt });
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        refresh();
    };

    return (
        <li className="saved-images__item card-animation card-animation--saved-images">
            <Image alt={alt} src={src} />
            <form className="edit__form" onSubmit={handleSubmit}>
                <input type="text" className="form__inp form__inp--max edit__inp" placeholder="Krótki opis obrazka" value={alt} onChange={(e) => setAlt(e.target.value)} />
                <SubmitButton errors={alt === image.alt || alt === '' ? 1 : 0} value="Zapisz" className="edit__submit" />
            </form>
            <div className="edit__graphic-delete">
                <DeleteButton handler={handleDelete} question="Czy na pewno chcesz usunąć tę grafikę?">
                    Usuń
                </DeleteButton>
            </div>
        </li>
    );
};