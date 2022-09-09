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
import { ChooseHashtagForm } from "../form-elements/ChooseHashtagForm";
import { ChooseCardsForm } from "../form-elements/ChooseCardsForm";
import { checkCollectionValidation } from "../../utils/validation";

interface Props {
    close: () => void;
}

export interface CollectionElement {
    cards: string[];
    description: string;
    hashtags: string[];
    images: File[] | null;
    name: string;
    preview: ImagePreview[];
}

export const defaultCollection: CollectionElement = {
    cards: [],
    description: '',
    hashtags: [],
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
            data.append('img', img);
        }
        data.append('data', JSON.stringify({
            ...collection,
            images: collection.preview.map(p => ({ alt: p.alt })),
        }));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        dispatch({ type: 'FORM_SET', payload: defaultCollection });
        const { message, status } = await fetchWithFileUpload('collections', 'POST', data);
        close();
        setResponsePopup({ message, status, open: true });
    };

    // Jest sens wrapować w useMemo jeśli input type="file" jest niemożliwy do kontrolowania???
    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={collection.preview} dispatch={dispatch} />, [collection.preview]);
    const nameFormComponent = useMemo(() => <NameForm value={collection.name} dispatch={dispatch} />, [collection.name]);
    const descriptionFormComponent = useMemo(() => <DescriptionForm value={collection.description} dispatch={dispatch} />, [collection.description]);
    const cardsToChooseFormComponent = useMemo(() => <ChooseCardsForm value={collection.cards} dispatch={dispatch} />, [collection.cards]);
    const chooseHashtagFormComponent = useMemo(() => <ChooseHashtagForm value={collection.hashtags} dispatch={dispatch} />, [collection.hashtags]);

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
            {chooseHashtagFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Dodaj Kolekcję" />
        </form>
    );
};