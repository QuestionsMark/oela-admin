import { Dispatch, FormEvent, useEffect, useMemo, useReducer, useState } from "react";
import { NewsInterface } from "types";

import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { SubmitButton } from "../common/SubmitButton";
import { ImagesForm } from "../form-elements/ImagesForm";
import { Preview } from "../form-elements/Preview";
import { NameForm } from "../form-elements/NameForm";
import { DescriptionForm } from "../form-elements/DescriptionForm";

import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { defaultNews, NewsElement } from "./NewsForm";
import { fetchWithFileUpload } from "../../utils/fetchUtils";
import { getServerMessage } from "../../utils/getServerMessage";
import { checkEditNewsValidation } from "../../utils/validation";

interface Props {
    data: NewsInterface;
    id: string;
    refresh: () => Promise<void>;
}

export const NewsEditForm = ({ data, id, refresh }: Props) => {

    const { setResponsePopup } = usePopup();

    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [news, dispatch] = useReducer(formReducer, defaultNews) as [NewsElement, Dispatch<FormAction>];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        const data = new FormData();
        if (news.images) {
            for (const img of news.images as File[]) {
                data.append('img', img);
            }
        }
        data.append('data', JSON.stringify({
            ...news,
            images: news.preview.map(p => ({ alt: p.alt })),
        }));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchWithFileUpload(`news/${id}`, 'PATCH', data);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        dispatch({ type: "IMAGES_CHANGE", payload: null });
        refresh();
    };

    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={news.preview} dispatch={dispatch} />, [news.preview]);
    const nameFormComponent = useMemo(() => <NameForm value={news.name} dispatch={dispatch} />, [news.name]);
    const descriptionFormComponent = useMemo(() => <DescriptionForm value={news.description} dispatch={dispatch} />, [news.description]);

    useEffect(() => {
        setValidationErrors(checkEditNewsValidation(news, data));
    }, [news, data]);

    useEffect(() => {
        if (!data) return;
        dispatch({ type: "FORM_SET", payload: (({ id, ...o }) => o)({ ...data, images: null, preview: [] }) });
    }, [data]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {imagesFormComponent}
            {previewFormComponent}
            {nameFormComponent}
            {descriptionFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value={'Aktualizuj nowość'} />
        </form>
    );
};