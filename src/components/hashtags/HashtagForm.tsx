import { Dispatch, FormEvent, useEffect, useReducer, useState } from "react";

import { SubmitButton } from "../common/SubmitButton";
import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { NameForm } from "../form-elements/NameForm";

import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { fetchTool } from "../../utils/fetchUtils";
import { checkHashtagValidation } from "../../utils/validation";
import { getServerMessage } from "../../utils/getServerMessage";

interface Props {
    close: () => void;
}

export interface HashtagElement {
    name: string;
}

export const defaultHashtag: HashtagElement = {
    name: '',
}

export const HashtagForm = ({ close }: Props) => {

    const { setResponsePopup } = usePopup();

    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [hashtag, dispatch] = useReducer(formReducer, defaultHashtag) as [HashtagElement, Dispatch<FormAction>];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        dispatch({ type: 'NAME_CHANGE', payload: '' });
        const response = await fetchTool('hashtags', 'POST', hashtag);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        close();
    };

    useEffect(() => {
        setValidationErrors(checkHashtagValidation(hashtag));
    }, [hashtag]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            <NameForm value={hashtag.name} dispatch={dispatch} />
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Dodaj hashtag" />
        </form>
    );
};