import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { FileDrop } from "./FileDrop";

interface Props {
    dispatch: Dispatch<FormAction>;
}

export const ImagesForm = ({ dispatch }: Props) => {

    const handleImagesChange = (files: File[] | null) => {
        if (files && files.length > 0) {
            dispatch({ type: "IMAGES_CHANGE", payload: files });
        }
    };

    return (
        <div className="form__section">
            <h3 className="form__title">Grafiki:</h3>
            <FileDrop defaultValue="Wybierz grafiki" fileType="image" multiple handler={handleImagesChange} />
        </div>
    );
};