import { Dispatch, FormEvent, useEffect, useMemo, useReducer, useState } from "react";

import { SubmitButton } from "../common/SubmitButton";
import { ValidationErrorsList } from "../common/ValidationErrorsList";

import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { fetchWithFileUpload } from "../../utils/fetchUtils";
import { checkCoverValidation } from "../../utils/validation";
import { getServerMessage } from "../../utils/getServerMessage";
import { ImagesForm } from "../form-elements/ImagesForm";
import { Preview } from "../form-elements/Preview";
import { ImagePreview } from "../../react-types/form-types";

interface Props {
    close: () => void;
}

export interface CoverElement {
    images: File[] | null;
    preview: ImagePreview[];
}

export const defaultCover: CoverElement = {
    images: null,
    preview: [],
}

export const CoverForm = ({ close }: Props) => {

    const { setResponsePopup } = usePopup();

    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [cover, dispatch] = useReducer(formReducer, defaultCover) as [CoverElement, Dispatch<FormAction>];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        const data = new FormData();
        for (const img of cover.images as File[]) {
            data.append('img', img);
        }
        data.append('data', JSON.stringify({
            images: cover.preview.map(p => ({ alt: p.alt })),
        }));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        dispatch({ type: 'FORM_SET', payload: defaultCover });
        const response = await fetchWithFileUpload('covers', 'POST', data);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        close();
    };

    useEffect(() => {
        setValidationErrors(checkCoverValidation(cover));
    }, [cover]);

    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={cover.preview} dispatch={dispatch} />, [cover.preview]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {imagesFormComponent}
            {previewFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Dodaj okładkę" />
        </form>
    );
};