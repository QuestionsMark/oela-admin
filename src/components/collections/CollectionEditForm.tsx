import { Dispatch, FormEvent, useEffect, useMemo, useReducer, useState } from "react";
import { CollectionInterface } from "types";

import { SubmitButton } from "../common/SubmitButton";
import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { ChooseCardsForm } from "../form-elements/ChooseCardsForm";
import { DescriptionForm } from "../form-elements/DescriptionForm";
import { ImagesForm } from "../form-elements/ImagesForm";
import { NameForm } from "../form-elements/NameForm";
import { Preview } from "../form-elements/Preview";

import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { fetchWithFileUpload } from "../../utils/fetchUtils";
import { getServerMessage } from "../../utils/getServerMessage";
import { checkEditCollectionValidation } from "../../utils/validation";
import { CollectionElement, defaultCollection } from "./CollectionForm";

interface Props {
    data: CollectionInterface;
    id: string;
    refresh: () => Promise<void>;
}

export const CollectionEditForm = ({ data, id, refresh }: Props) => {

    const { setResponsePopup } = usePopup();

    const [collection, dispatch] = useReducer(formReducer, defaultCollection) as [CollectionElement, Dispatch<FormAction>];
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        const data = new FormData();
        if (collection.images) {
            for (const img of collection.images as File[]) {
                data.append('image', img);
            }
        }
        data.append('data', JSON.stringify((({ images, ...o}) => o)({
            ...collection,
            preview: collection.preview.map(p => ({ alt: p.alt })),
        })));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchWithFileUpload(`collection/${id}`, 'PUT', data);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        dispatch({ type: "IMAGES_CHANGE", payload: null });
        refresh();
    };

    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={collection.preview} dispatch={dispatch} />, [collection.preview]);
    const nameFormComponent = useMemo(() => <NameForm value={collection.name} dispatch={dispatch} />, [collection.name]);
    const descriptionFormComponent = useMemo(() => <DescriptionForm value={collection.description} dispatch={dispatch} />, [collection.description]);
    const cardsToChooseFormComponent = useMemo(() => <ChooseCardsForm value={collection.products} dispatch={dispatch} />, [collection.products]);

    useEffect(() => {
        setValidationErrors(checkEditCollectionValidation(collection, data));
    }, [collection, data]);

    useEffect(() => {
        if (!data) return;
        dispatch({
            type: "FORM_SET",
            payload: (({ id, ...o }) => o)({
                ...data,
                images: null,
                preview: [],
                products: data.products.map(c => c.id)
            }),
        });
    }, [data]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {imagesFormComponent}
            {previewFormComponent}
            {nameFormComponent}
            {descriptionFormComponent}
            {cardsToChooseFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Aktualizuj Kolekcję" />
        </form>
    );
};