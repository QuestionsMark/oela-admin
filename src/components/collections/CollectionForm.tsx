import { Dispatch, FormEvent, useEffect, useMemo, useReducer, useState } from "react";

import { ImagePreview } from "../../react-types/form-types";
import { ImagesForm } from "../form-elements/ImagesForm";
import { Preview } from "../form-elements/Preview";
import { NameForm } from "../form-elements/NameForm";
import { DescriptionForm } from "../form-elements/DescriptionForm";
import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { fetchWithFileUpload } from "../../utils/fetchUtils";
import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { SubmitButton } from "../common/SubmitButton";
import { ChooseCardsForm } from "../form-elements/ChooseCardsForm";
import { checkCollectionValidation } from "../../utils/validation";

interface Props {
    close: () => void;
}

export interface CollectionElement {
    products: string[];
    description: string;
    images: File[] | null;
    name: string;
    preview: ImagePreview[];
}

export const defaultCollection: CollectionElement = {
    products: [],
    description: '',
    images: null,
    name: '',
    preview: [],
}

export const CollectionForm = ({ close }: Props) => {

    const { setResponsePopup } = usePopup();

    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [collection, dispatch] = useReducer(formReducer, defaultCollection) as [CollectionElement, Dispatch<FormAction>];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        const data = new FormData();
        for (const img of collection.images as File[]) {
            data.append('image', img);
        }
        data.append('data', JSON.stringify((({ images, ...o }) => o)({
            ...collection,
            preview: collection.preview.map(p => ({ alt: p.alt })),
        })));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        dispatch({ type: 'FORM_SET', payload: defaultCollection });
        const response = await fetchWithFileUpload('collection', 'POST', data);
        if (!response.status) return setResponsePopup({ status: response.status, message: response.message, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        close();
    };

    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={collection.preview} dispatch={dispatch} />, [collection.preview]);
    const nameFormComponent = useMemo(() => <NameForm value={collection.name} dispatch={dispatch} />, [collection.name]);
    const descriptionFormComponent = useMemo(() => <DescriptionForm value={collection.description} dispatch={dispatch} />, [collection.description]);
    const cardsToChooseFormComponent = useMemo(() => <ChooseCardsForm value={collection.products} dispatch={dispatch} />, [collection.products]);

    useEffect(() => {
        setValidationErrors(checkCollectionValidation(collection));
    }, [collection]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {imagesFormComponent}
            {previewFormComponent}
            {nameFormComponent}
            {descriptionFormComponent}
            {cardsToChooseFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Dodaj Kolekcję" />
        </form>
    );
};