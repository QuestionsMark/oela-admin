import { Dispatch } from "react";
import { faCaretLeft, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormAction } from "../../reducers/formReducer";
import { ImagePreview } from "../../react-types/form-types";

import { DeleteButton } from "../common/DeleteButton";
import { Button } from "../common/Button";

import { getColor, getSize } from "../../utils/previewHelper";

interface Props {
    index: number;
    preview: ImagePreview;
    dispatch: Dispatch<FormAction>;
}

export const PreviewItem = ({ preview, index, dispatch }: Props) => {

    const { alt, size, src } = preview;

    const handleImageDelete = () => {
        dispatch({ type: 'IMAGES_DELETE', payload: index });
    }

    const handleOrderChange = () => {
        dispatch({ type: 'IMAGES_ORDER_CHANGE', payload: index });
    };

    return (
        <li className="image-preview__item">
            <div className="image-preview__img-wrapper">
                <img src={src} alt={alt} className="img" />
            </div>
            <div className="image-preview__properties">
                <input type="text" className="form__inp form__inp--max" value={alt} onChange={e => dispatch({ type: "PREVIEW_ALT_CHANGE", payload: { index, value: e.target.value } })} placeholder="Krótki opis obrazka" />
                <p className="image-preview__info">Rozmiar: <span className="image-preview-size" style={{ color: getColor(size) }}>{getSize(size)}MB</span></p>
            </div>
            <DeleteButton className="image-preview__delete-btn" onlyIcon question="Na pewno usunąć tę grafikę?" handler={handleImageDelete}><FontAwesomeIcon icon={faMinus} /></DeleteButton>
            {index > 0 && <Button className="image-preview__order-btn" handler={handleOrderChange}><FontAwesomeIcon icon={faCaretLeft} /></Button>}
        </li>
    );
};