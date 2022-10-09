import { Dispatch, FormEvent, useEffect, useMemo, useReducer, useState } from "react";
import { ImagePreview } from "../../react-types/form-types";

import { SubmitButton } from "../common/SubmitButton";
import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { DescriptionForm } from "../form-elements/DescriptionForm";
import { ImagesForm } from "../form-elements/ImagesForm";
import { Preview } from "../form-elements/Preview";
import { NameForm } from "../form-elements/NameForm";

import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { fetchWithFileUpload } from "../../utils/fetchUtils";
import { checkNewsValidation } from "../../utils/validation";
import { getServerMessage } from "../../utils/getServerMessage";

interface Props {
    close: () => void;
}

export interface NewsElement {
    name: string;
    description: string;
    images: File[] | null;
    preview: ImagePreview[];
}

export const defaultNews: NewsElement = {
    name: '',
    description: '',
    images: null,
    preview: [],
}

export const NewsForm = ({ close }: Props) => {

    const { setResponsePopup } = usePopup();

    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [news, dispatch] = useReducer(formReducer, defaultNews) as [NewsElement, Dispatch<FormAction>];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        const data = new FormData();
        for (const img of news.images as File[]) {
            data.append('image', img);
        }
        data.append('data', JSON.stringify((({ images, ...o }) => o)({
            ...news,
            preview: news.preview.map(p => ({ alt: p.alt })),
        })));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        dispatch({ type: 'FORM_SET', payload: defaultNews });
        const response = await fetchWithFileUpload('news', 'POST', data);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        close();
    };

    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={news.preview} dispatch={dispatch} />, [news.preview]);
    const nameFormComponent = useMemo(() => <NameForm value={news.name} dispatch={dispatch} />, [news.name]);
    const descriptionFormComponent = useMemo(() => <DescriptionForm value={news.description} dispatch={dispatch} />, [news.description]);

    useEffect(() => {
        setValidationErrors(checkNewsValidation(news));
    }, [news]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {imagesFormComponent}
            {previewFormComponent}
            {nameFormComponent}
            {descriptionFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Dodaj nowość" />
        </form>
    );
};